import { getDanoPorTamanho, getPesoPorTamanho } from '@rules/armas'
import { getTamanhoPorRaca } from '@rules/racas'
import { getItemPorId } from '@rules/equipamentos'

export const PESO_MOEDA = 0.01

// Capacidade: leve = força, média = x2, pesada = x3
export function getCapacidade(forca, tamanho = 'media') {
  const base = typeof forca === 'string' ? parseInt(forca) : forca
  const mult = tamanho === 'pequena' ? 0.75 : 1
  const leve = base * mult
  return {
    leve,
    media: leve * 2,
    pesada: leve * 3
  }
}

export function getCapacidadeMontaria(montaria) {
  if (!montaria) return { leve: 0, media: 0, pesada: 0 }
  const forcaMontaria = montaria.forca || montaria.forcaMontaria || 10
  return getCapacidade(forcaMontaria)
}

function normalizarPeso(peso) {
  if (!peso || peso === '-') return 0
  if (typeof peso === 'number') return peso
  if (typeof peso === 'string') {
    const num = parseFloat(peso.replace(',', '.').replace('kg', '').replace(' kg', '').trim())
    return isNaN(num) ? 0 : num
  }
  return 0
}

export function getPesoItem(item) {
  return item ? normalizarPeso(item.peso) : 0
}

export function getItemAjustadoPorTamanho(item, racaId) {
  if (!item) return null
  const isArma = item.categoria === 'simples' || item.categoria === 'comum' || item.categoria === 'exotica'
  const tipo = isArma ? 'arma' : (item.tipo || item.tipoLoja)
  const tamanho = getTamanhoPorRaca(racaId)
  
  if (!tamanho || tamanho === 'media') return item
  
  if (isArma) {
    return { ...item, dano: getDanoPorTamanho(item.dano, tamanho), peso: getPesoPorTamanho(normalizarPeso(item.peso), tamanho) }
  }
  if (tipo === 'armadura' || tipo === 'escudo') {
    return { ...item, peso: getPesoPorTamanho(normalizarPeso(item.peso), tamanho) }
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

export function getPesoTotalEquipamentos(equipment, raca) {
  if (!equipment) return 0
  
  let peso = 0
  
  // Armadura
  if (equipment.armor) {
    const item = getItemAjustadoPorTamanho(getItemPorId(equipment.armor), raca)
    peso += getPesoItem(item)
  }
  
  // Escudo
  if (equipment.shield) {
    const item = getItemAjustadoPorTamanho(getItemPorId(equipment.shield), raca)
    peso += getPesoItem(item)
  }
  
  // Armas
  ;(equipment.weapons || []).forEach(a => {
    if (a.local && a.local !== 'carregando' && a.local !== 'equipped') return
    const item = getItemAjustadoPorTamanho(getItemPorId(a.id), raca)
    peso += (getPesoItem(item) || 0) * (a.quantidade || 1)
  })
  
  // Itens
  ;(equipment.itens || []).forEach(i => {
    if (i.local && i.local !== 'carregando' && i.local !== 'equipped') return
    const item = getItemAjustadoPorTamanho(getItemPorId(i.id), raca)
    peso += (getPesoItem(item) || 0) * (i.quantidade || 1)
  })
  
  // Dinheiro (simplificado: 1kg por 1000 moedas)
  const totalMoedas = (equipment.money?.po || 0) + (equipment.money?.pl || 0) + (equipment.money?.pp || 0) + (equipment.money?.pc || 0)
  peso += totalMoedas / 1000 * PESO_MOEDA * 1000  // ~1kg por 1000 moedas
  
  return peso
}