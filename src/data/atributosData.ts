export type MetodoAtributos = 'livre' | '4d6-baixo' | 'definido' | 'compra'

export const METODOS: MetodoAtributos[] = ['4d6-baixo', 'definido', 'compra', 'livre']

export const metodoLabels: Record<MetodoAtributos, string> = {
  'livre': 'Livre',
  '4d6-baixo': '4d6',
  'definido': 'Definido',
  'compra': 'Pontos'
}

export const metodoDescricoes: Record<MetodoAtributos, string> = {
  'livre': 'Role dados e adicione os valores.',
  '4d6-baixo': 'Clique para trocar os atributos de ordem',
  'definido': 'Clique para trocar os atributos de ordem',
  'compra': 'Custo 1 de 9-14. Custo 2 de 15-16. Custo 3 de 17-18'
}

export const valoresDefinidos = [15, 14, 13, 12, 10, 8]

export const custoPontos: Record<number, number> = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 6,
  15: 8,
  16: 10,
  17: 13,
  18: 16
}

export const pontosCompraMax = 25

export const limiteModificadorMinimo = 3