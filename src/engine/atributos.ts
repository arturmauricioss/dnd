import { metodoLabels, custoPontos, pontosCompraMax, valoresDefinidos } from '@data/dnd/atributosData'
import type { MetodoAtributos } from '@data/dnd/atributosData'

export { metodoLabels, pontosCompraMax, valoresDefinidos }
export type { MetodoAtributos }

export function metodoLabel(method: MetodoAtributos): string {
  return metodoLabels[method]
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

export function calcularCusto(valor: number): number {
  return custoPontos[valor] || 0
}

export function calcularModificador(valor: number): number {
  return Math.floor((valor - 10) / 2)
}