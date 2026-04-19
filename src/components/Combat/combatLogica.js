import { getClasse } from '../Classes/classesData'
import { getModificadoresTamanho } from './tamanhoData'
import { getBBABase, getProgressaoBBA, bonusRacialResistencia } from './bbaData'
import { getDeslocamento, deslocamentoPorRaca } from './deslocamentoData'
import { bonusDeslocamentoPorClasse } from '../Classes/classesData'
import { caValoresIniciais } from './combatData'

export function calcularBBA(classeId, nivel, modTamanho) {
  const progressao = getProgressaoBBA(classeId)
  const base = getBBABase(progressao, nivel)
  return base + modTamanho.bba
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
  const { race, classe: classeId, level_class: nivel } = personagem

  const conMod = getModificador('constituicao')
  const dexMod = getModificador('destreza')
  const forMod = getModificador('forca')
  const sabMod = getModificador('sabedoria')

  const modTamanho = getModificadoresTamanho(personagem.tamanho || '')
  const progressao = getProgressaoBBA(classeId)

  const bbaBase = getBBABase(progressao, nivel)
  const bba = calcularBBA(classeId, nivel, modTamanho)

  const agarrarTotal = bbaBase + forMod + modTamanho.agarrar

  const hpMax = calcularHP(classeId, nivel, conMod)

  const deslocamento = calcularDeslocamento(race, classeId)

  const caValores = caValoresIniciais

  const caNormal = calcularCA(caValores, dexMod, modTamanho)
  const caToque = calcularCAToque(dexMod, modTamanho)
  const caSurpresa = calcularCASurpresa(caValores, modTamanho)

  const saves = calcularSaves(classeId, conMod, dexMod, sabMod, race)

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
  }
}