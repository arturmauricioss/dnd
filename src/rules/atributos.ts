import type { MetodoAtributos, Atributos, RegraContexto } from '@types'
import { pontosCompraMax, custoPontos, regrasAtributos } from '@data/atributosData'
import { metodoLabels } from '@data/dnd/atributosData'

export function metodoLabel(method: MetodoAtributos): string {
  return metodoLabels[method]
}

export function executarRegras(contexto: RegraContexto): {
  valido: boolean
  erros: string[]
  modificadores: Record<string, number>
  somaModificadores: number
  custoPontos: number
  pontosRestantes: number
  temDireitoReroll: boolean
  atributosFinais: Atributos
} {
  const erros: string[] = []
  let modificadores: Record<string, number> = {}
  let somaModificadores = 0
  let custoPontos = 0
  let pontosRestantes = pontosCompraMax
  let temDireitoReroll = false
  let atributosFinais = contexto.atributos
  
  for (const regra of regrasAtributos) {
    const resultado = regra.executar(contexto)
    
    if (!resultado.sucesso && resultado.mensagem) {
      erros.push(resultado.mensagem)
      continue
    }
    
    if (regra.nome === 'calcular-modificador' && resultado.dados) {
      const dados = resultado.dados as { modificadores: Record<string, number>; soma: number }
      modificadores = dados.modificadores
      somaModificadores = dados.soma
    }
    
    if (regra.nome === 'calcular-custo-pontos' && resultado.dados) {
      const dados = resultado.dados as { custo: number; restantes: number }
      custoPontos = dados.custo
      pontosRestantes = dados.restantes
    }
    
    if (regra.nome === 'verificar-reroll' && resultado.dados) {
      const dados = resultado.dados as { temDireito: boolean; soma: number }
      temDireitoReroll = dados.temDireito
    }

    if (regra.nome === 'aplicar-modificadores-raciais-minimo-int' && resultado.dados) {
      const dados = resultado.dados as { atributosFinais: Atributos }
      atributosFinais = dados.atributosFinais
    }
  }
  
  return {
    valido: erros.length === 0,
    erros,
    modificadores,
    somaModificadores,
    custoPontos,
    pontosRestantes,
    temDireitoReroll,
    atributosFinais
  }
}

// Funções utilitárias para atributos
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