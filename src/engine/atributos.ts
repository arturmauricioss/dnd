export type MetodoAtributos = 'livre' | '4d6-baixo' | 'definido' | 'compra'

export function metodoLabel(method: MetodoAtributos): string {
  switch (method) {
    case 'livre':
      return 'Livre'
    case '4d6-baixo':
      return '4d6'
    case 'definido':
      return 'Definido'
    case 'compra':
      return 'Pontos'
  }
}

export function metodoDescricao(method: MetodoAtributos): string {
  switch (method) {
    case 'livre':
      return 'Escolha qualquer valor entre 1 e 20'
    case '4d6-baixo':
      return 'Rola 4 dados, remove o menor. Repita 6 vezes.'
    case 'definido':
      return 'Use: 15, 14, 13, 12, 10, 8'
    case 'compra':
      return '27 pontos para comprar. Mín 8, máx 18.'
  }
}

export function roll4d6Low(): number {
  const rolls = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1
  ]
  rolls.sort((a, b) => a - b)
  return rolls[1] + rolls[2] + rolls[3]
}

export function gerarAtributos4d6(): number[] {
  const atributos: number[] = []
  for (let i = 0; i < 6; i++) {
    atributos.push(roll4d6Low())
  }
  return atributos
}

export const valoresDefinidos = [15, 14, 13, 12, 10, 8]

const custoPontos: Record<number, number> = {
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

export function calcularCusto(valor: number): number {
  return custoPontos[valor] || 0
}

export function getValorMinimo(): number {
  return 8
}

export function getValorMaximo(): number {
  return 18
}