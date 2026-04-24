import { getClasse, bonusDeslocamentoPorClasse } from '../Classes/classesData'
import { getModificadoresTamanho } from './tamanhoData'
import { getBBABase, getProgressaoBBA } from './bbaData'
import { deslocamentoPorRaca, bonusRacialResistencia } from '../Racas/racasData'
import { caValoresIniciais } from './combatData'
import { getTotalArmorPenalty } from '../Equipamentos/armorLogic'

import {
  getItemPorId,
  getPesoItem,
  getCapacidade,
  tabelaCarga
} from '../Equipamentos/equipamentosLogic'

/* =========================
   UTILITÁRIOS
========================= */

export function calcularBBA(classeId, nivel) {
  const progressao = getProgressaoBBA(classeId)
  return getBBABase(progressao, nivel)
}

export function calcularHP(classeId, nivel, conMod) {
  const classe = getClasse(classeId)
  if (!classe?.dadoVida) return 0

  const dado = classe.dadoVida
  let total = Math.max(1, dado + conMod)

  if (nivel > 1) {
    const hpMedio = Math.floor(dado / 2)
    for (let i = 2; i <= nivel; i++) {
      total += Math.max(1, hpMedio + conMod)
    }
  }

  return total
}

/* =========================
   CA
========================= */

export function calcularCA(ca, dexMod, modTamanho) {
  return (
    10 +
    ca.armadura +
    ca.escudo +
    dexMod +
    modTamanho.ca +
    ca.natural +
    ca.deflexao +
    ca.outros
  )
}

export function calcularCAToque(dexMod, modTamanho) {
  return 10 + dexMod + modTamanho.ca
}

export function calcularCASurpresa(ca, modTamanho) {
  return (
    10 +
    ca.armadura +
    ca.escudo +
    modTamanho.ca +
    ca.natural +
    ca.deflexao +
    ca.outros
  )
}

/* =========================
   DESLOCAMENTO
========================= */

function aplicarPenalidadeCargaDeslocamento(base, carga, race) {
  const isAnao = race === 'anao'

  if (isAnao && carga !== 'excessiva') return base
  if (carga === 'excessiva') return 1.5

  const tabela = {
    leve: 1,
    media: 0.75,
    pesada: 0.5
  }

  return Math.max(1.5, base * (tabela[carga] ?? 1))
}

/* =========================
   MAIN
========================= */

export function getDadosCombate(personagem, getModificador) {
  const { race, classe: classeId, level_class: nivel, equipment } = personagem

  const classe = getClasse(classeId)

  const conMod = getModificador('constituicao')
  const dexMod = getModificador('destreza')
  const forMod = getModificador('forca')
  const sabMod = getModificador('sabedoria')

  const modTamanho = getModificadoresTamanho(personagem.tamanho || '')

  const progressao = getProgressaoBBA(classeId)
  const bbaBase = getBBABase(progressao, nivel)
  const bba = calcularBBA(classeId, nivel)

  const agarrar = bbaBase + forMod + modTamanho.agarrar
  const hpMax = calcularHP(classeId, nivel, conMod)

  const deslocamentoBase = deslocamentoPorRaca[race] || 6

  const bonusClasseMovimento =
    classeId === 'barbaro'
      ? (bonusDeslocamentoPorClasse[classeId] || 0)
      : 0

  /* =========================
     CARGA
  ========================= */

  const forca =
    (personagem.atributos?.forca || 10) +
    (personagem.atributosRacial?.forca || 0)

  const cap = getCapacidade(forca)

  const capacidade = {
    leve: cap.leve,
    media: cap.media,
    pesada: cap.pesada
  }

  const pesoTotal =
    (equipment?.weapons || []).reduce(
      (t, a) => t + (getPesoItem(getItemPorId(a.id)) || 0) * (a.quantidade || 1),
      0
    ) +
    (equipment?.itens || []).reduce(
      (t, i) => t + (getPesoItem(getItemPorId(i.id)) || 0) * (i.quantidade || 1),
      0
    )

  const cargaAtual =
    pesoTotal <= capacidade.leve
      ? 'leve'
      : pesoTotal <= capacidade.media
      ? 'media'
      : pesoTotal <= capacidade.pesada
      ? 'pesada'
      : 'excessiva'

  const dadosCarga = tabelaCarga()[cargaAtual]

  /* =========================
     DESLOCAMENTO
  ========================= */

  const deslocamentoBaseFinal =
    deslocamentoBase + bonusClasseMovimento

  const deslocamento = aplicarPenalidadeCargaDeslocamento(
    deslocamentoBaseFinal,
    cargaAtual,
    race
  )

  const dexMaxFinal = dadosCarga?.maxDex ?? 999
  const dexModLimitado = Math.min(dexMod, dexMaxFinal)

  /* =========================
     CA BASE
  ========================= */

  const armorPenalty = getTotalArmorPenalty(
    equipment?.armor,
    equipment?.shield
  )

  const caBase = {
    ...caValoresIniciais,
    armadura: caValoresIniciais.armadura - armorPenalty
  }

  const caNormal = calcularCA(caBase, dexModLimitado, modTamanho)
  const caToque = calcularCAToque(dexModLimitado, modTamanho)
  const caSurpresa = calcularCASurpresa(caBase, modTamanho)

  /* =========================
     RETURN
  ========================= */

  return {
    bba,
    bbaBase,
    hpMax,

    deslocamento,

    caNormal,
    caToque,
    caSurpresa,

    fort: (classe.fort || 0) + conMod + (bonusRacialResistencia[race]?.fort || 0),
    ref: (classe.ref || 0) + dexModLimitado + (bonusRacialResistencia[race]?.ref || 0),
    von: (classe.von || 0) + sabMod + (bonusRacialResistencia[race]?.von || 0),

    agarrar,

    encumbrance: {
      pesoTotal,
      cargaAtual,
      capacidade,
      dadosCarga
    },

    dexMaxFinal
  }
}