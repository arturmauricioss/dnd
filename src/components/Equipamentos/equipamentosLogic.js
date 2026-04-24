import { getDanoPorTamanho, getPesoPorTamanho } from './armasLogic'
import { getDinheiroInicial } from '../Classes/classesData'

import { armadurasNormalizadas, escudosNormalizados } from './armadurasData'
import { armasNormalizadas } from './armasData'
import { instrumentosNormalizados } from './instrumentosData'
import { todosItensNormalizados } from './itensData'

/* =========================
   EXPORTS BASE
========================= */

export { getDanoPorTamanho, getPesoPorTamanho, getDinheiroInicial }

/* =========================
   ITENS
========================= */

export const todosItens = {
  ...armasNormalizadas,
  ...armadurasNormalizadas,
  ...escudosNormalizados,
  ...instrumentosNormalizados,
  ...todosItensNormalizados
}

/* =========================
   ITEM HELPERS
========================= */

export function getItemPorId(id) {
  if (!id) return null
  return todosItens[id] || null
}

export function isItemValido(id) {
  return !!todosItens[id]
}

export function getNomeItem(id) {
  return getItemPorId(id)?.nome || 'Item desconhecido'
}

export function getTipoItem(id) {
  return getItemPorId(id)?.tipo || null
}

/* =========================
   PESO
========================= */

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

/* =========================
   CAPACIDADE
========================= */

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
  20: { leve: 66.5, media: 133, pesada: 200 }
}

export function getCapacidade(forca) {
  const f = typeof forca === 'string' ? parseInt(forca) : forca
  const data = capacidadeCargaPorForca[f] || capacidadeCargaPorForca[10]

  return {
    leve: data.leve,
    media: data.media,
    pesada: data.pesada
  }
}

export function tabelaCarga() {
  return {
    leve: { maxDex: 999 },
    media: { maxDex: 3 },
    pesada: { maxDex: 1 },
    excessiva: { maxDex: 0 }
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