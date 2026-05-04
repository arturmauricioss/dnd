import { getClasse, bonusDeslocamentoPorClasse } from '@data/classesData'
import { getModificadoresTamanho } from '@data/tamanhoData'
import { getBBABase, getProgressaoBBA, getBBATamanho } from '@data/bbaData'
import { deslocamentoPorRaca, bonusRacialResistencia } from '@data/racasData'
import { caValoresIniciais } from '@data/combatData'
import { getTotalArmorPenalty } from '@rules/armor'

import { getCapacidade, tabelaCarga, getPesoTotalEquipamentos } from '@rules/carga'
import { getTamanhoPorRaca, getBonusRacial } from '@rules/racas'

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

function aplicarPenalidadeCargaDeslocamento(base, carga, race, tamanho) {
  const isAnao = race === 'anao'

  if (isAnao && carga !== 'excessiva') return base
  if (carga === 'excessiva') return 1.5

  if (carga === 'media' || carga === 'pesada') {
    if (base >= 9) return Math.round((2/3) * base * 10) / 10
    if (tamanho === 'pequena' && base === 6) return 4.5
  }

  return base
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

  const modTamanho = getModificadoresTamanho(getTamanhoPorRaca(race))

  const progressao = getProgressaoBBA(classeId)
  const tamanho = getTamanhoPorRaca(race)
  const bbaBase = getBBABase(progressao, nivel)
  const bbaTamanho = getBBATamanho(tamanho)
  const bba = bbaBase + bbaTamanho

  const agarrar = bbaBase + forMod + modTamanho.agarrar
  const hpMax = calcularHP(classeId, nivel, conMod)

const deslocamentoBase = deslocamentoPorRaca[race] || 6

  /* =========================
     CARGA
   ========================= */

  const forca =
    (personagem.atributos?.forca || 10) +
    (getBonusRacial(personagem.race)?.forca || 0)

  const cap = getCapacidade(forca, tamanho)

  const capacidade = {
    leve: cap.leve,
    media: cap.media,
    pesada: cap.pesada
  }

  const pesoTotal = getPesoTotalEquipamentos(equipment, race, classeId)

  const cargaAtual =
    pesoTotal <= capacidade.leve
      ? 'leve'
      : pesoTotal <= capacidade.media
      ? 'media'
      : pesoTotal <= capacidade.pesada
      ? 'pesada'
      : 'excessiva'

const dadosCarga = tabelaCarga()[cargaAtual]

  const bonusClasseMovimento =
    classeId === 'barbaro' && (cargaAtual === 'leve' || cargaAtual === 'media')
      ? (bonusDeslocamentoPorClasse[classeId] || 0)
      : 0

  /* =========================
     DESLOCAMENTO
   ========================= */

  const deslocamentoBaseFinal =
    deslocamentoBase + bonusClasseMovimento

const deslocamento = aplicarPenalidadeCargaDeslocamento(
    deslocamentoBaseFinal,
    cargaAtual,
    race,
    tamanho
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

  const multiplicadorCorrida = personagem.talentos?.includes('corrida')
    ? 5
    : dadosCarga?.corrida ?? 4

  /* =========================
     HABILIDADES
   ========================= */

  const habilidades = personagem.habilidadesEspeciais || [];

  return {
    bba,
    bbaBase,
    bbaTamanho,
    hpMax,

    deslocamento,

    caNormal,
    caToque,
    caSurpresa,

    fort: (classe.fort || 0) + conMod + (bonusRacialResistencia[race]?.fort || 0),
    ref: (classe.ref || 0) + dexModLimitado + (bonusRacialResistencia[race]?.ref || 0),
    von: (classe.von || 0) + sabMod + (bonusRacialResistencia[race]?.von || 0),

    agarrar,

    dexMaxFinal,

    encumbrance: {
      pesoTotal,
      cargaAtual,
      capacidade,
      dadosCarga,
      penalidadeCargaDeslocamento: cargaAtual === 'excessiva' ? 100 : cargaAtual === 'pesada' ? 50 : cargaAtual === 'media' ? 25 : 0
    },

    detalhes: {
      deslocamentoBase,
      deslocamentoBonus: bonusClasseMovimento
    },

    savesDetalhes: {
      fort: {
        classe: classe.fort || 0,
        atributo: conMod,
        racial: bonusRacialResistencia[race]?.fort || 0
      },
      ref: {
        classe: classe.ref || 0,
        atributo: dexModLimitado,
        racial: bonusRacialResistencia[race]?.ref || 0
      },
      von: {
        classe: classe.von || 0,
        atributo: sabMod,
        racial: bonusRacialResistencia[race]?.von || 0
      }
    },

    movimentoEspecial: {
      capacidadeCarregamento: capacidade.pesada,
      levantarCabeca: capacidade.pesada,
      levantarChao: capacidade.pesada * 2,
      empurrarArrastar: capacidade.pesada * 5,
    },

    corrida: {
      multiplicador: multiplicadorCorrida,
      metros: deslocamento * multiplicadorCorrida
    },

    habilidades,
  }
}