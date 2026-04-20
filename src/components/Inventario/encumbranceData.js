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
  1: { light: 1.5, medium: 3, heavy: 5 },
  2: { light: 3, medium: 6.5, heavy: 10 },
  3: { light: 5, medium: 10, heavy: 15 },
  4: { light: 6.5, medium: 13, heavy: 20 },
  5: { light: 8, medium: 16.5, heavy: 25 },
  6: { light: 10, medium: 20, heavy: 30 },
  7: { light: 11.5, medium: 23, heavy: 35 },
  8: { light: 13, medium: 26.5, heavy: 40 },
  9: { light: 15, medium: 30, heavy: 45 },
  10: { light: 16.5, medium: 33, heavy: 50 },
  11: { light: 19, medium: 38, heavy: 57.5 },
  12: { light: 21.5, medium: 43, heavy: 65 },
  13: { light: 25, medium: 50, heavy: 75 },
  14: { light: 29, medium: 58, heavy: 87.5 },
  15: { light: 33, medium: 66.5, heavy: 100 },
  16: { light: 38, medium: 76.5, heavy: 115 },
  17: { light: 43, medium: 86.5, heavy: 130 },
  18: { light: 50, medium: 100, heavy: 150 },
  19: { light: 58, medium: 116.5, heavy: 175 },
  20: { light: 66.5, medium: 133, heavy: 200 },
  21: { light: 76.5, medium: 153, heavy: 230 },
  22: { light: 86.5, medium: 173, heavy: 260 },
  23: { light: 100, medium: 200, heavy: 300 },
  24: { light: 116.5, medium: 233, heavy: 350 },
  25: { light: 133, medium: 266.5, heavy: 400 },
  26: { light: 153, medium: 306.5, heavy: 460 },
  27: { light: 173, medium: 346.5, heavy: 520 },
  28: { light: 200, medium: 400, heavy: 600 },
  29: { light: 233, medium: 466.5, heavy: 700 }
}

export const tabelaCarga = {
  light: { maxDex: null, checkPenalty: 0, speed9m: 9, speed6m: 6, corrida: 4 },
  medium: { maxDex: 3, checkPenalty: -3, speed9m: 6, speed6m: 4.5, corrida: 4 },
  heavy: { maxDex: 1, checkPenalty: -6, speed9m: 6, speed6m: 4.5, corrida: 3 }
}

export function getCapacidade(forca) {
  const forcaNum = typeof forca === 'string' ? parseInt(forca) : forca
  return capacidadeCargaPorForca[forcaNum] || capacidadeCargaPorForca[10]
}

export function getLoad(peso, forca) {
  const capacidade = getCapacidade(forca)
  
  if (peso <= capacidade.light) return 'light'
  if (peso <= capacidade.medium) return 'medium'
  return 'heavy'
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