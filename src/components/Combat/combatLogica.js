import { getClasse } from '../Classes/classesData'
import { getModificadoresTamanho } from './tamanhoData'
import { getBBABase, getProgressaoBBA, bonusRacialResistencia } from './bbaData'
import { getDeslocamento, deslocamentoPorRaca } from './deslocamentoData'
import { bonusDeslocamentoPorClasse } from '../Classes/classesData'
import { caValoresIniciais } from './combatData'
import { getItemPorId, getPesoItem, getCapacidade, getLoad, tabelaCarga } from '../Equipamentos/equipamentosLogic'

export function calcularBBA(classeId, nivel) {
  const progressao = getProgressaoBBA(classeId)
  return getBBABase(progressao, nivel)
}

export function getBBAForcaBase(classeId, nivel, forMod, modTamanho) {
  const progressao = getProgressaoBBA(classeId)
  const bbaBase = getBBABase(progressao, nivel)
  return bbaBase + forMod + modTamanho.agarrar
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

export function calcularDeslocamento(raca, classe) {
  return getDeslocamento(raca, classe)
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

export function calcularSaves(classeId, conMod, dexMod, sabMod, race) {
  const classe = getClasse(classeId)
  const bonusSaveRacial = bonusRacialResistencia[race] || { fort: 0, ref: 0, von: 0 }

  return {
    fort: (classe.fort || 0) + conMod + (bonusSaveRacial.fort || 0),
    ref: (classe.ref || 0) + dexMod + (bonusSaveRacial.ref || 0),
    von: (classe.von || 0) + sabMod + (bonusSaveRacial.von || 0),
  }
}

export function getDadosCombate(personagem, getModificador) {
  const { race, classe: classeId, level_class: nivel, equipment } = personagem

  const conMod = getModificador('constituicao')
  const dexMod = getModificador('destreza')
  const forca = (personagem.atributos?.forca || 10) + (personagem.atributosRacial?.forca || 0)
  const forMod = getModificador('forca')
  const sabMod = getModificador('sabibilidade')

  const modTamanho = getModificadoresTamanho(personagem.tamanho || '')
  const progressao = getProgressaoBBA(classeId)

  const bbaBase = getBBABase(progressao, nivel)
  const bba = calcularBBA(classeId, nivel)

  const agarrarTotal = bbaBase + forMod + modTamanho.agarrar

  const hpMax = calcularHP(classeId, nivel, conMod)

  const deslocamentoBase = getDeslocamento(race, classeId)

  const caValores = caValoresIniciais

  const caNormal = calcularCA(caValores, dexMod, modTamanho)
  const caToque = calcularCAToque(dexMod, modTamanho)
  const caSurpresa = calcularCASurpresa(caValores, modTamanho)

  const saves = calcularSaves(classeId, conMod, dexMod, sabMod, race)

  const capacidade = getCapacidade(forca)
  
  const getArmaduraData = () => {
    if (!equipment?.armor) return null
    const armadura = getItemPorId(equipment.armor)
    if (!armadura) return null
    return {
      bonus: parseInt(armadura.bonus?.replace('+', '') || 0),
      tipo: armadura.tipo,
      dexMax: parseInt(armadura.dex_max?.replace('+', '') || 999),
      penalidade: armadura.penalidade || 0,
      deslocamento_9: armadura.deslocamento_9 || '9 m',
      deslocamento_6: armadura.deslocamento_6 || '6 m'
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
  
  const pesoArmasEquipped = (equipment?.weapons || [])
    .filter(a => (a.local || 'carregando') === 'equipped')
    .reduce((total, a) => total + (getPesoItem(getItemPorId(a.id)) || 0) * (a.quantidade || 1), 0)
  
  const pesoItensEquipped = (equipment?.itens || [])
    .filter(i => (i.local || 'carregando') === 'equipped')
    .reduce((total, i) => total + (getPesoItem(getItemPorId(i.id)) || 0) * (i.quantidade || 1), 0)
  
  const pesoArmasCarregando = (equipment?.weapons || [])
    .filter(a => (a.local || 'carregando') === 'carregando')
    .reduce((total, a) => total + (getPesoItem(getItemPorId(a.id)) || 0) * (a.quantidade || 1), 0)
  
  const pesoItensCarregando = (equipment?.itens || [])
    .filter(i => (i.local || 'carregando') === 'carregando')
    .reduce((total, i) => total + (getPesoItem(getItemPorId(i.id)) || 0) * (i.quantidade || 1), 0)

  const pesoTotal = pesoArmadura + pesoEscudo + pesoArmasEquipped + pesoItensEquipped + pesoArmasCarregando + pesoItensCarregando
  const cargaAtual = getLoad(pesoTotal, forca)
  const dadosCarga = tabelaCarga[cargaAtual]

  const getDeslocamentoFinal = () => {
    const base = deslocamentoBase
    
    let deslocamentoArmadura = base
    if (armaduraData) {
      if (armaduraData.tipo === 'media') {
        deslocamentoArmadura = 6
      } else if (armaduraData.tipo === 'pesada') {
        deslocamentoArmadura = 6
      }
    }
    
    let deslocamentoCarga = base
    if (cargaAtual === 'medium' || cargaAtual === 'heavy') {
      deslocamentoCarga = 6
    }
    
    return Math.min(deslocamentoArmadura, deslocamentoCarga)
  }

  const deslocamento = getDeslocamentoFinal()

  const getDexMaxFinal = () => {
    const dexArmadura = armaduraData ? armaduraData.dexMax : 999
    const dexCarga = dadosCarga.maxDex !== null ? dadosCarga.maxDex : 999
    return Math.min(dexArmadura, dexCarga)
  }

  const getPenalidadeFinal = () => {
    const penArmadura = armaduraData ? Math.abs(armaduraData.penalidade) : 0
    const penEscudo = escudoData ? Math.abs(escudoData.penalidade) : 0
    const penCarga = Math.abs(dadosCarga.checkPenalty)
    return Math.max(penArmadura, penEscudo, penCarga)
  }

  const dexMaxFinal = getDexMaxFinal()
  const penalidadeFinal = getPenalidadeFinal()

  return {
    bba,
    bbaBase,
    hpMax,
    deslocamento,
    caNormal,
    caToque,
    caSurpresa,
    fort: saves.fort,
    ref: saves.ref,
    von: saves.von,
    agarrar: agarrarTotal,
    detalhes: {
      deslocamentoBase: deslocamentoPorRaca[race] || 6,
      deslocamentoBonus: bonusDeslocamentoPorClasse[classeId] || 0,
    },
    encumbrance: {
      pesoTotal,
      cargaAtual,
      capacidade,
      dadosCarga,
      pesoExcedente: pesoTotal > capacidade.medium ? pesoTotal - capacidade.medium : 0
    },
    armadura: armaduraData,
    escudo: escudoData,
    dexMaxFinal,
    penalidadeFinal
  }
}