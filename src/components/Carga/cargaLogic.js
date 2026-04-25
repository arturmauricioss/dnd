import { getDanoPorTamanho, getPesoPorTamanho } from '../Equipamentos/armasLogic'
import { getTamanhoPorRaca } from '../Racas/racasLogic'
import { getItemPorId } from '../Equipamentos/equipamentosLogic'
import { getDinheiroInicial } from '../Classes/classesData'

export const PESO_MOEDA = 0.01 // 10g por moeda

export function getPesoDinheiro(money = {}, classe = 'guerreiro') {
  const moneyExistente = money
  const temDinheiro = moneyExistente && Object.values(moneyExistente).some(v => v > 0)
  const moneyFinal = temDinheiro ? moneyExistente : getDinheiroInicial(classe)
  
  const totalMoedas = 
    (Number(moneyFinal.po) || 0) + 
    (Number(moneyFinal.pl) || 0) + 
    (Number(moneyFinal.pp) || 0) + 
    (Number(moneyFinal.pc) || 0)
  return totalMoedas * PESO_MOEDA
}

export const capacidadeCargaPorForca = {
  1: { leve: 1.5, media: 3, pesada: 5 },
  2: { leve: 3, media: 6.5, pesada: 10 },
  3: { leve: 5, media: 10, pesada: 15 },
  4: { leve: 6.5, media: 13, pesada: 20 },
  5: { leve: 8, media: 16.5, pesada: 25 },
  6: { leve: 10, media: 20, pesada: 30 },
  7: { leve: 11.5, media: 23, pesada: 35 },
  8: { leve: 13, media: 26.5, pesada: 40 },
  9: { leve: 15, media: 30, pesada: 45 },
  10: { leve: 16.5, media: 33, pesada: 50 },
  11: { leve: 19, media: 38, pesada: 57.5 },
  12: { leve: 21.5, media: 43, pesada: 65 },
  13: { leve: 25, media: 50, pesada: 75 },
  14: { leve: 29, media: 58, pesada: 87.5 },
  15: { leve: 33, media: 66.5, pesada: 100 },
  16: { leve: 38, media: 76.5, pesada: 115 },
  17: { leve: 43, media: 86.5, pesada: 130 },
  18: { leve: 50, media: 100, pesada: 150 },
  19: { leve: 58, media: 116.5, pesada: 175 },
  20: { leve: 66.5, media: 133, pesada: 200 },
  21: { leve: 76.5, media: 153, pesada: 230 },
  22: { leve: 86.5, media: 173, pesada: 260 },
  23: { leve: 100, media: 200, pesada: 300 },
  24: { leve: 116.5, media: 233, pesada: 350 },
  25: { leve: 133, media: 266.5, pesada: 400 }
}

export function normalizarPeso(peso) {
  if (peso === undefined || peso === null || peso === '-') return 0
  if (typeof peso === 'number') return peso

  if (typeof peso === 'string') {
    const num = parseFloat(
      peso.replace(',', '.').replace('kg', '').replace(' kg', '').trim()
    )
    return isNaN(num) ? 0 : num
  }

  return 0
}

export function getPesoItem(item) {
  if (!item) return 0
  return normalizarPeso(item.peso)
}

export function getPesoItemComQuantidade(item, quantidade = 1) {
  return getPesoItem(item) * quantidade
}

export function getCapacidade(forca, tamanho = 'media') {
  const f = typeof forca === 'string' ? parseInt(forca) : forca
  const data = capacidadeCargaPorForca[f] || capacidadeCargaPorForca[10]
  const multiplicador = tamanho === 'pequena' ? 0.75 : 1

  return {
    leve: data.leve * multiplicador,
    media: data.media * multiplicador,
    pesada: data.pesada * multiplicador
  }
}

export function getLoad(peso, forca) {
  const cap = getCapacidade(forca)

  if (peso <= cap.leve) return 'leve'
  if (peso <= cap.media) return 'media'
  if (peso <= cap.pesada) return 'pesada'
  return 'excessiva'
}

export function getCapacidadeMontaria(montaria) {
  if (!montaria) return { leve: 0, media: 0, pesada: 0 }
  
  const forcaMontaria = montaria.forca || montaria.forcaMontaria || 10
  const cap = getCapacidade(forcaMontaria)
  
  return {
    leve: cap.leve,
    media: cap.media,
    pesada: cap.pesada
  }
}

export function getItemAjustadoPorTamanho(item, racaId) {
  const isArma = item.categoria === 'simples' || item.categoria === 'comum' || item.categoria === 'exotica'
  const tipo = isArma ? 'arma' : (item.tipo || item.tipoLoja)
  const tamanho = getTamanhoPorRaca(racaId)
  
  if (!tamanho || tamanho === 'media') return item
  
  if (isArma) {
    return {
      ...item,
      dano: getDanoPorTamanho(item.dano, tamanho),
      critico: item.critico,
      peso: getPesoPorTamanho(normalizarPeso(item.peso), tamanho)
    }
  }
  
  if (tipo === 'armadura' || tipo === 'escudo') {
    return {
      ...item,
      peso: getPesoPorTamanho(normalizarPeso(item.peso), tamanho)
    }
  }
  
  return item
}

export function tabelaCarga() {
  return {
    leve: { maxDex: 999, checkPenalty: 0, corrida: 4 },
    media: { maxDex: 3, checkPenalty: -3, corrida: 4 },
    pesada: { maxDex: 1, checkPenalty: -6, corrida: 3 },
    excessiva: { maxDex: 0, checkPenalty: -6, corrida: 1 }
  }
}

export function getPesoTotalEquipamentos(equipment, raca, classe = 'guerreiro') {
  if (!equipment) return 0
  
  const dinheiro = getPesoDinheiro(equipment.money, classe)
  
  const pesoArmadura = (() => {
    const item = equipment.armor ? getItemAjustadoPorTamanho(getItemPorId(equipment.armor), raca) : null
    return item ? getPesoItem(item) : 0
  })()
  
  const pesoEscudo = (() => {
    const item = equipment.shield ? getItemAjustadoPorTamanho(getItemPorId(equipment.shield), raca) : null
    return item ? getPesoItem(item) : 0
  })()
  
  const pesoWeapons = (equipment.weapons || []).reduce((total, a) => {
    const itemOriginal = getItemPorId(a.id)
    const item = getItemAjustadoPorTamanho(itemOriginal, raca)
    return total + (getPesoItem(item) || 0) * (a.quantidade || 1)
  }, 0)
  
  const pesoItens = (equipment.itens || []).reduce((total, i) => {
    const itemOriginal = getItemPorId(i.id)
    const item = getItemAjustadoPorTamanho(itemOriginal, raca)
    return total + (getPesoItem(item) || 0) * (i.quantidade || 1)
  }, 0)
  
  return dinheiro + pesoArmadura + pesoEscudo + pesoWeapons + pesoItens
}