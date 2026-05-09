import type { MetodoAtributos, Atributos, AtributoNome, Modificador } from '../types'
import { metodoLabels, valoresDefinidos } from '@systems/attributes/data/atributosData'
import { criarEstadoInicial, setValores, aplicarModificadoresExternos } from '@systems/attributes/engine/atributos'

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

export function gerarAtributos4d6(): Atributos {
  const valores: Atributos = { forca: 0, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 }
  const chaves: AtributoNome[] = ['forca', 'destreza', 'constituicao', 'inteligencia', 'sabedoria', 'carisma']
  
  for (let i = 0; i < 6; i++) {
    valores[chaves[i]] = roll4d6Low()
  }
  
  return valores
}

export function aplicarMetodoDefinido(): Atributos {
  const chaves: AtributoNome[] = ['forca', 'destreza', 'constituicao', 'inteligencia', 'sabedoria', 'carisma']
  const valores: Atributos = { forca: 0, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 }
  
  for (let i = 0; i < 6; i++) {
    valores[chaves[i]] = valoresDefinidos[i]
  }
  
  return valores
}

export function gerarAtributosPorMetodo(metodo: MetodoAtributos): Atributos | null {
  if (metodo === '4d6-baixo') return gerarAtributos4d6()
  if (metodo === 'definido') return aplicarMetodoDefinido()
  return null
}

export function verificarValidade(valores: Atributos): string[] {
  const erros: string[] = []
  
  for (const [chave, valor] of Object.entries(valores)) {
    if (valor < 3) {
      erros.push(`${chave} mínimo é 3`)
    }
    if (valor > 18) {
      erros.push(`${chave} máximo é 18`)
    }
  }
  
  return erros
}

export function verificarReroll(valores: Atributos): boolean {
  const soma = Object.values(valores).reduce((acc, val) => acc + val, 0)
  return soma >= 70
}

export interface ContextoExecucao {
  valoresBase: Atributos
  modificadores: Modificador[]
}

export function executarRegras(contexto: ContextoExecucao): {
  valido: boolean
  erros: string[]
  modificadores: Atributos
  somaModificadores: number
  custoPontos: number
  pontosRestantes: number
  temDireitoReroll: boolean
  atributosFinais: Atributos
} {
  let state = criarEstadoInicial()
  
  state = setValores(state, contexto.valoresBase)
  
  if (contexto.modificadores.length > 0) {
    const valoresComModificadores = aplicarModificadoresExternos(state.valores, contexto.modificadores)
    state = setValores(state, valoresComModificadores)
  }
  
  const erros = verificarValidade(state.valores)
  const temDireitoReroll = verificarReroll(state.valores)
  
  return {
    valido: erros.length === 0,
    erros,
    modificadores: state.modificadores,
    somaModificadores: state.somaModificadores,
    custoPontos: state.custo,
    pontosRestantes: state.pontosRestantes,
    temDireitoReroll,
    atributosFinais: state.valores
  }
}