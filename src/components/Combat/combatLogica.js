import { getClasse } from '../Classes/classesData'
import { getModificadoresTamanho } from './tamanhoData'
import { getBBABase, getProgressaoBBA, bonusRacialResistencia } from './bbaData'
import { getDeslocamento, deslocamentoPorRaca } from './deslocamentoData'
import { bonusDeslocamentoPorClasse } from '../Classes/classesData'
import { caValoresIniciais } from './combatData'
import { getItemPorId, getPesoItem, getCapacidade, getCapacidadeMontaria, tabelaCarga } from '../Equipamentos/equipamentosLogic'

export function calcularBBA(classeId, nivel) {
  const progressao = getProgressaoBBA(classeId)
  return getBBABase(progressao, nivel)
}

export function calcularHP(classeId, nivel, conMod) {
  const classe = getClasse(classeId)
  if (!classe.dadoVida) return 0

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

export function calcularCA(caValores, dexMod, modTamanho) {
  return (
    10 +
    caValores.armadura +
    caValores.escudo +
    dexMod +
    modTamanho.ca +
    caValores.natural +
    caValores.deflexao +
    caValores.outros
  )
}

export function calcularCAToque(dexMod, modTamanho) {
  return 10 + dexMod + modTamanho.ca
}

export function calcularCASurpresa(caValores, modTamanho) {
  return (
    10 +
    caValores.armadura +
    caValores.escudo +
    modTamanho.ca +
    caValores.natural +
    caValores.deflexao +
    caValores.outros
  )
}

export function getDadosCombate(personagem, getModificador) {
  const { race, classe: classeId, level_class: nivel, equipment } = personagem

  const classe = getClasse(classeId)

  const conMod = getModificador('constituicao')
  const dexMod = getModificador('destreza')
  const forca = (personagem.atributos?.forca || 10) + (personagem.atributosRacial?.forca || 0)
  const forMod = getModificador('forca')
  const sabMod = getModificador('sabedoria')

  const modTamanho = getModificadoresTamanho(personagem.tamanho || '')

  const progressao = getProgressaoBBA(classeId)
  const bbaBase = getBBABase(progressao, nivel)
  const bba = calcularBBA(classeId, nivel)

  const agarrarTotal = bbaBase + forMod + modTamanho.agarrar

  const hpMax = calcularHP(classeId, nivel, conMod)

  const deslocamentoBase = getDeslocamento(race, classeId)
  const caValores = caValoresIniciais

  const capacidade = (() => {
    const cap = getCapacidade(forca)
    return {
      leve: cap.leve || cap.light || 0,
      media: cap.media || cap.medium || 0,
      pesada: cap.pesada || cap.heavy || 0
    }
  })()

  const getArmaduraData = () => {
    if (!equipment?.armor) return null
    const armadura = getItemPorId(equipment.armor)
    if (!armadura) return null
    return {
      bonus: parseInt(armadura.bonus?.replace('+', '') || 0),
      tipo: armadura.tipo,
      dexMax: parseInt(armadura.dex_max?.replace('+', '') || 999),
      penalidade: armadura.penalidade || 0
    }
  }

  const getEscudoData = () => {
    if (!equipment?.shield) return null
    const escudo = getItemPorId(equipment.shield)
    if (!escudo) return null
    return {
      bonus: parseInt(escudo.bonus?.replace('+', '') || 0),
      penalidade: escudo.penalidade || 0
    }
  }

  const armaduraData = getArmaduraData()
  const escudoData = getEscudoData()

  const pesoArmadura = armaduraData ? getPesoItem(getItemPorId(equipment.armor)) : 0
  const pesoEscudo = escudoData ? getPesoItem(getItemPorId(equipment.shield)) : 0

  const pesoTotal =
    pesoArmadura +
    pesoEscudo +
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

  const dadosCarga = tabelaCarga[cargaAtual]

  const dexMaxFinal = Math.min(
    armaduraData?.dexMax ?? 999,
    dadosCarga.maxDex ?? 999
  )

  const dexModLimitado = Math.min(dexMod, dexMaxFinal)

  const caNormal = calcularCA(caValores, dexModLimitado, modTamanho)
  const caToque = calcularCAToque(dexModLimitado, modTamanho)
  const caSurpresa = calcularCASurpresa(caValores, modTamanho)

  // ✅ SAVES CORRIGIDO
  const bonusSaveRacial = bonusRacialResistencia[race] || { fort: 0, ref: 0, von: 0 }

  const saves = {
    fort: {
      total: (classe.fort || 0) + conMod + bonusSaveRacial.fort,
      classe: classe.fort || 0,
      atributo: conMod,
      racial: bonusSaveRacial.fort
    },
    ref: {
      total: (classe.ref || 0) + dexModLimitado + bonusSaveRacial.ref,
      classe: classe.ref || 0,
      atributo: dexModLimitado,
      racial: bonusSaveRacial.ref
    },
    von: {
      total: (classe.von || 0) + sabMod + bonusSaveRacial.von,
      classe: classe.von || 0,
      atributo: sabMod,
      racial: bonusSaveRacial.von
    }
  }

  return {
    bba,
    bbaBase,
    hpMax,
    deslocamento: deslocamentoBase,
    caNormal,
    caToque,
    caSurpresa,

    // ✅ TOTAL
    fort: saves.fort.total,
    ref: saves.ref.total,
    von: saves.von.total,

    // ✅ DETALHES (ESSA LINHA QUE FALTAVA NO JSX)
    savesDetalhes: saves,

    agarrar: agarrarTotal,

    detalhes: {
      deslocamentoBase: deslocamentoPorRaca[race] || 6,
      deslocamentoBonus: bonusDeslocamentoPorClasse[classeId] || 0,
    },

    encumbrance: {
      pesoTotal,
      cargaAtual,
      capacidade,
      dadosCarga
    },

    armadura: armaduraData,
    escudo: escudoData,
    dexMaxFinal
  }
}