export function normalizarPeso(peso) {
  if (peso === undefined || peso === null || peso === '-') return 0
  if (typeof peso === 'number') return peso
  if (typeof peso === 'string') {
    const num = parseFloat(peso.replace(',', '.').replace(' kg', '').replace('kg', '').trim())
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

export const capacidadeCargaPorForca = {
  1: { leve: 1.5, media: 3, maxima: 5 },
  2: { leve: 3, media: 6.5, maxima: 10 },
  3: { leve: 5, media: 10, maxima: 15 },
  4: { leve: 6.5, media: 13, maxima: 20 },
  5: { leve: 8, media: 16.5, maxima: 25 },
  6: { leve: 10, media: 20, maxima: 30 },
  7: { leve: 11.5, media: 23, maxima: 35 },
  8: { leve: 13, media: 26.5, maxima: 40 },
  9: { leve: 15, media: 30, maxima: 45 },
  10: { leve: 16.5, media: 33, maxima: 50 },
  11: { leve: 19, media: 38, maxima: 57.5 },
  12: { leve: 21.5, media: 43, maxima: 65 },
  13: { leve: 25, media: 50, maxima: 75 },
  14: { leve: 29, media: 58, maxima: 87.5 },
  15: { leve: 33, media: 66.5, maxima: 100 },
  16: { leve: 38, media: 76.5, maxima: 115 },
  17: { leve: 43, media: 86.5, maxima: 130 },
  18: { leve: 50, media: 100, maxima: 150 },
  19: { leve: 58, media: 116.5, maxima: 175 },
  20: { leve: 66.5, media: 133, maxima: 200 },
  21: { leve: 76.5, media: 153, maxima: 230 },
  22: { leve: 86.5, media: 173, maxima: 260 },
  23: { leve: 100, media: 200, maxima: 300 },
  24: { leve: 116.5, media: 233, maxima: 350 },
  25: { leve: 133, media: 266.5, maxima: 400 },
  26: { leve: 153, media: 306.5, maxima: 460 },
  27: { leve: 173, media: 346.5, maxima: 520 },
  28: { leve: 200, media: 400, maxima: 600 },
  29: { leve: 233, media: 466.5, maxima: 700 }
}

export const tabelaCarga = {
  leve: { maxDex: 99, checkPenalty: 0, speed9m: 9, speed6m: 6, corrida: 3 },
  media: { maxDex: 3, checkPenalty: -3, speed9m: 6, speed6m: 4.5, corrida: 3 },
  maxima: { maxDex: 1, checkPenalty: -6, speed9m: 6, speed6m: 4.5, corrida: 3 }
}

export function getCapacidade(forca) {
  const forcaNum = typeof forca === 'string' ? parseInt(forca) : forca
  const data = capacidadeCargaPorForca[forcaNum] || capacidadeCargaPorForca[10]
  return {
    leve: data.leve,
    media: data.media,
    maxima: data.maxima
  }
}

export function getLoad(peso, forca) {
  const capacidade = getCapacidade(forca)
  
  if (peso <= capacidade.leve) return 'leve'
  if (peso <= capacidade.media) return 'media'
  return 'maxima'
}

export function getDadosEncumbrance(forca) {
  const forcaNum = typeof forca === 'string' ? parseInt(forca) : forca
  const capacidade = getCapacidade(forcaNum)
  
  return {
    forca: forcaNum,
    lightMax: capacidade.light,
    mediumMax: capacidade.medium,
    heavyMax: capacidade.heavy
  }
}