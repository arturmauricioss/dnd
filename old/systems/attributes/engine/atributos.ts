import { custoPontos, pontosCompraMax } from '../data/atributosData'
import type { Atributos, AtributoNome, Modificador } from '../types'

export interface AtributosState {
  valores: Atributos
  modificadores: Atributos
  custo: number
  pontosRestantes: number
  somaModificadores: number
}

export function criarEstadoInicial(): AtributosState {
  const valores: Atributos = {
    forca: 10,
    destreza: 10,
    constituicao: 10,
    inteligencia: 10,
    sabedoria: 10,
    carisma: 10
  }
  return {
    valores,
    modificadores: calcularTodosModificadores(valores),
    custo: 0,
    pontosRestantes: pontosCompraMax,
    somaModificadores: 0
  }
}

export function calcularModificador(valor: number): number {
  return Math.floor((valor - 10) / 2)
}

export function calcularCusto(valor: number): number {
  return custoPontos[valor] || 0
}

export function calcularTodosModificadores(valores: Atributos): Atributos {
  const modificadores: Atributos = { forca: 0, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 }
  for (const chave of Object.keys(valores) as AtributoNome[]) {
    modificadores[chave] = calcularModificador(valores[chave])
  }
  return modificadores
}

export function calcularSomaModificadores(modificadores: Atributos): number {
  return Object.values(modificadores).reduce((acc, mod) => acc + mod, 0)
}

export function calcularCustoTotal(valores: Atributos): number {
  return Object.values(valores).reduce((acc, val) => acc + calcularCusto(val), 0)
}

export function setValor(state: AtributosState, atributo: AtributoNome, valor: number): AtributosState {
  const novosValores = { ...state.valores, [atributo]: valor }
  const novosModificadores = { ...state.modificadores, [atributo]: calcularModificador(valor) }
  const custo = calcularCustoTotal(novosValores)
  
  return {
    ...state,
    valores: novosValores,
    modificadores: novosModificadores,
    custo,
    pontosRestantes: pontosCompraMax - custo,
    somaModificadores: calcularSomaModificadores(novosModificadores)
  }
}

export function setValores(state: AtributosState, valores: Atributos): AtributosState {
  const modificadores = calcularTodosModificadores(valores)
  const custo = calcularCustoTotal(valores)
  
  return {
    ...state,
    valores,
    modificadores,
    custo,
    pontosRestantes: pontosCompraMax - custo,
    somaModificadores: calcularSomaModificadores(modificadores)
  }
}

export function somar(base: number, bonus: number): number {
  return base + bonus
}

export function aplicarBonus(valores: Atributos, bonus: Partial<Atributos>): Atributos {
  const resultado: Atributos = { forca: 0, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 }
  
  for (const chave of Object.keys(valores) as AtributoNome[]) {
    resultado[chave] = somar(valores[chave], bonus[chave] || 0)
  }
  
  return resultado
}

export function aplicarModificadoresExternos(valores: Atributos, modificadores: Modificador[]): Atributos {
  const resultado = { ...valores }
  
  for (const mod of modificadores) {
    const valorAtual = resultado[mod.atributo] || 0
    resultado[mod.atributo] = valorAtual + mod.valor
  }
  
  return resultado
}

export function calcularModificadoresDosValores(valores: Atributos, valoresBase: Atributos): Modificador[] {
  const modificadores: Modificador[] = []
  
  for (const chave of Object.keys(valores) as AtributoNome[]) {
    const diferenca = valores[chave] - valoresBase[chave]
    if (diferenca !== 0) {
      modificadores.push({
        atributo: chave,
        valor: diferenca,
        origem: 'raca'
      })
    }
  }
  
  return modificadores
}