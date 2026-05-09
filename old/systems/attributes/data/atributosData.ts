import type { MetodoAtributos, Regra } from '../types'

export type { MetodoAtributos }

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

export const regrasAtributos: Regra[] = [
  {
    nome: 'calcular-modificador',
    tipo: 'calculo',
    descricao: 'Calcula o modificador de cada atributo',
    executar: (contexto) => {
      const modificadores: Record<string, number> = {}
      let soma = 0
      for (const [key, value] of Object.entries(contexto.atributos)) {
        const mod = Math.floor((value - 10) / 2)
        modificadores[key] = mod
        soma += mod
      }
      return { sucesso: true, dados: { modificadores, soma } }
    }
  },
  {
    nome: 'validar-mod-minimo',
    tipo: 'validacao',
    descricao: 'Valida modificadores mínimos',
    executar: (contexto) => {
      const mods = Object.values(contexto.atributos).map(v => Math.floor((v - 10) / 2))
      const valido = mods.every(m => m >= -5)
      return valido 
        ? { sucesso: true } 
        : { sucesso: false, mensagem: 'Modificador mínimo é -5' }
    }
  },
  {
    nome: 'calcular-custo-pontos',
    tipo: 'calculo',
    descricao: 'Calcula custo de pontos para método compra',
    executar: (contexto) => {
      if (contexto.metodo !== 'compra') {
        return { sucesso: true, dados: { custo: 0, restantes: pontosCompraMax } }
      }
      const custo = Object.values(contexto.atributos).reduce((acc, val) => acc + (custoPontos[val] || 0), 0)
      const restantes = pontosCompraMax - custo
      return { sucesso: true, dados: { custo, restantes } }
    }
  }
]