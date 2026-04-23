import { getBonusPericiaRacial } from '../Classes/bonusPericias'
import { getPenalidadeTotal } from '../Equipamentos/equipamentosLogic'
import { periciasConfig, periciasPorClasse } from './periciasData'
import { podeUsarAlfabetizacao } from '../Classes/classesData'

export const pontosPorClasse = {
  barbaro: 4,
  bardo: 6,
  clerigo: 2,
  druida: 4,
  feiticeiro: 2,
  guerreiro: 2,
  ladino: 8,
  mago: 2,
  monge: 4,
  paladino: 2,
  ranger: 6,
}

export function getPericiasAtivas(personagem) {
  return periciasConfig.filter(p => {
    if (p.nome === 'Alfabetização') {
      return podeUsarAlfabetizacao(personagem.classe)
    }
    return true
  })
}

export function calculatePontosPericia(personagem, getModificador) {
  if (!personagem.classe || personagem.classe === 'selecione') return 0

  const base = pontosPorClasse[personagem.classe] || 0
  const intMod = getModificador('inteligencia')
  const nivel = personagem.level_class || 1

  let total = (base + intMod) * 4

  if (nivel > 1) {
    total += (nivel - 1) * base
  }

  if (personagem.race === 'humano') {
    total += 4 + (nivel - 1)
  }

  return Math.max(0, total)
}

export function calculatePenalidadeArmadura(personagem) {
  const armor = personagem.equipment?.armor
  const shield = personagem.equipment?.shield
  return getPenalidadeTotal(armor, shield)
}

export function calculateMaxGradPorNivel(personagem) {
  if (!personagem.classe || personagem.classe === 'selecione') return 0
  return (personagem.level_class || 1) + 3
}

export function calculatePontosGastos(personagem, periciasState) {
  const periciasAtivas = getPericiasAtivas(personagem)
  let gastos = 0

  periciasAtivas.forEach((p) => {
    const estado = periciasState[p.nome] || {}
    const grad = estado.graduacao || 0
    if (grad > 0) {
      const eClasse = periciasPorClasse[personagem.classe]?.includes(p.nome)
      const custo = eClasse ? 1 : 2
      gastos += grad * custo
    }
  })

  return gastos
}

export function calculateHabilidadesOrdenadas(personagem) {
  const periciasAtivas = getPericiasAtivas(personagem)
  const primeira = []
  const segunda = []

  periciasAtivas.forEach((p, index) => {
    if (index % 2 === 0) {
      primeira.push(p)
    } else {
      segunda.push(p)
    }
  })

  return { primeira, segunda }
}

export function calculateOutrosTotal(periciasState, pericia) {
  const estado = periciasState[pericia.nome] || {}
  return estado.outros || 0
}

export function isPericiaDeClasse(personagem, nomePericia) {
  const pericias = periciasPorClasse[personagem.classe] || []
  return pericias.includes(nomePericia)
}

export function calculatePericiaTotal(pericia, personagem, periciasState, getModificador, dexMaxLimit = null) {
  const estado = periciasState[pericia.nome] || { graduacao: 0, outros: 0 }
  const grad = estado.graduacao
  const bonusRacial = getBonusPericiaRacial(personagem.race, pericia.nome)

  let modHab = getModificador(pericia.habilidade)
  
  if (pericia.habilidade === 'destreza' && dexMaxLimit !== null) {
    modHab = Math.min(modHab, dexMaxLimit)
  }

  const maxGrad = calculateMaxGrad(personagem, pericia.nome)
  const gradLimitado = Math.min(grad, maxGrad)
  const outrosTotal = calculateOutrosTotal(periciasState, pericia)
  const penalidadeArmadura = calculatePenalidadeArmadura(personagem)

  return modHab + gradLimitado + bonusRacial + outrosTotal - penalidadeArmadura
}

export function calculateMaxGrad(personagem, nomePericia) {
  if (!personagem.classe || personagem.classe === 'selecione') return 0
  
  if (nomePericia === 'Alfabetização') {
    return 2
  }
  
  const eClasse = isPericiaDeClasse(personagem, nomePericia)
  const nivel = personagem.level_class || 1
  const maxGradPorNivel = nivel + 3
  return eClasse ? maxGradPorNivel : Math.floor(maxGradPorNivel / 2)
}

export function getPericiaTotalPorNome(personagem, nomePericia, getModificador) {
  const pericia = periciasConfig.find(p => p.nome === nomePericia)
  if (!pericia) return 0
  return calculatePericiaTotal(pericia, personagem, personagem.pericias || {}, getModificador)
}

export function getTodasPericiasTotais(personagem, getModificador) {
  const result = {}
  periciasConfig.forEach(pericia => {
    result[pericia.nome] = calculatePericiaTotal(pericia, personagem, personagem.pericias || {}, getModificador)
  })
  return result
}