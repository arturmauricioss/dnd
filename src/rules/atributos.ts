import type { MetodoAtributos } from '@data/atributosData'
import { custoPontos, pontosCompraMax, limiteModificadorMinimo } from '@data/atributosData'
import { modificadoresRaciais } from '@data/racasData'

export interface Atributos {
  forca: number
  destreza: number
  constituicao: number
  inteligencia: number
  sabedoria: number
  carisma: number
}

export interface Regra {
  nome: string
  tipo: 'validacao' | 'acao' | 'calculo'
  descricao: string
  executar: (contexto: RegraContexto) => ResultadoRegra
}

export interface RegraContexto {
  atributos: Atributos
  metodo: MetodoAtributos | null
  raca?: string | null
}

export interface ResultadoRegra {
  sucesso: boolean
  mensagem?: string
  dados?: unknown
}

export const regrasAtributos: Regra[] = [
  {
    nome: 'validar-minimo',
    tipo: 'validacao',
    descricao: 'Valores não podem ser menores que 3',
    executar: ({ atributos }) => {
      const menores = Object.entries(atributos)
        .filter(([, valor]) => valor < 3)
        .map(([chave]) => chave)
      
      if (menores.length > 0) {
        return { sucesso: false, mensagem: `Atributos com valor menor que 3: ${menores.join(', ')}` }
      }
      return { sucesso: true }
    }
  },
  {
    nome: 'validar-maximo',
    tipo: 'validacao',
    descricao: 'Valores não podem ser maiores que 18',
    executar: ({ atributos }) => {
      const maiores = Object.entries(atributos)
        .filter(([, valor]) => valor > 18)
        .map(([chave]) => chave)
      
      if (maiores.length > 0) {
        return { sucesso: false, mensagem: `Atributos com valor maior que 18: ${maiores.join(', ')}` }
      }
      return { sucesso: true }
    }
  },
  {
    nome: 'validar-minimo-pontos',
    tipo: 'validacao',
    descricao: 'No método pontos, valores não podem ser menores que 8',
    executar: ({ atributos, metodo }) => {
      if (metodo !== 'compra') return { sucesso: true }
      
      const menores = Object.entries(atributos)
        .filter(([, valor]) => valor < 8)
        .map(([chave]) => chave)
      
      if (menores.length > 0) {
        return { sucesso: false, mensagem: `Atributos com valor menor que 8: ${menores.join(', ')}` }
      }
      return { sucesso: true }
    }
  },
  {
    nome: 'calcular-modificador',
    tipo: 'calculo',
    descricao: 'Calcula modificador: floor((valor - 10) / 2)',
    executar: ({ atributos }) => {
      const modificadores: Record<string, number> = {}
      
      for (const [chave, valor] of Object.entries(atributos)) {
        modificadores[chave] = Math.floor((valor - 10) / 2)
      }
      
      const soma = Object.values(modificadores).reduce((acc, val) => acc + val, 0)
      
      return { sucesso: true, dados: { modificadores, soma } }
    }
  },
  {
    nome: 'calcular-custo-pontos',
    tipo: 'calculo',
    descricao: 'Calcula custo total dos pontos',
    executar: ({ atributos, metodo }) => {
      if (metodo !== 'compra') return { sucesso: true, dados: { custo: 0, restantes: pontosCompraMax } }
      
      const custo = Object.values(atributos).reduce((acc, val) => acc + (custoPontos[val] || 0), 0)
      const restantes = pontosCompraMax - custo
      
      return { sucesso: true, dados: { custo, restantes } }
    }
  },
  {
    nome: 'verificar-reroll',
    tipo: 'acao',
    descricao: 'Verifica se tem direito a reroll (soma mods <= 3)',
    executar: ({ atributos, metodo }) => {
      if (metodo !== '4d6-baixo' && metodo !== 'livre') {
        return { sucesso: true, dados: { temDireito: false } }
      }
      
      const soma = Object.values(atributos).reduce((acc, val) => acc + Math.floor((val - 10) / 2), 0)
      const temDireito = soma <= limiteModificadorMinimo
      
      return { sucesso: true, dados: { temDireito, soma } }
    }
  },
  {
    nome: 'aplicar-modificador-racial-forca',
    tipo: 'calculo',
    descricao: 'Aplica modificador racial de força',
    executar: ({ raca }) => {
      if (!raca) return { sucesso: true, dados: { modificado: false } }
      const mods = modificadoresRaciais[raca]
      if (!mods || mods.forca === undefined) return { sucesso: true, dados: { modificado: false } }
      return { sucesso: true, dados: { atributo: 'forca', modificador: mods.forca, modificado: true } }
    }
  },
  {
    nome: 'aplicar-modificador-racial-destreza',
    tipo: 'calculo',
    descricao: 'Aplica modificador racial de destreza',
    executar: ({ raca }) => {
      if (!raca) return { sucesso: true, dados: { modificado: false } }
      const mods = modificadoresRaciais[raca]
      if (!mods || mods.destreza === undefined) return { sucesso: true, dados: { modificado: false } }
      return { sucesso: true, dados: { atributo: 'destreza', modificador: mods.destreza, modificado: true } }
    }
  },
  {
    nome: 'aplicar-modificador-racial-constituicao',
    tipo: 'calculo',
    descricao: 'Aplica modificador racial de constituição',
    executar: ({ raca }) => {
      if (!raca) return { sucesso: true, dados: { modificado: false } }
      const mods = modificadoresRaciais[raca]
      if (!mods || mods.constituicao === undefined) return { sucesso: true, dados: { modificado: false } }
      return { sucesso: true, dados: { atributo: 'constituicao', modificador: mods.constituicao, modificado: true } }
    }
  },
  {
    nome: 'aplicar-modificador-racial-inteligencia',
    tipo: 'calculo',
    descricao: 'Aplica modificador racial de inteligência',
    executar: ({ raca }) => {
      if (!raca) return { sucesso: true, dados: { modificado: false } }
      const mods = modificadoresRaciais[raca]
      if (!mods || mods.inteligencia === undefined) return { sucesso: true, dados: { modificado: false } }
      return { sucesso: true, dados: { atributo: 'inteligencia', modificador: mods.inteligencia, modificado: true } }
    }
  },
  {
    nome: 'aplicar-modificador-racial-sabedoria',
    tipo: 'calculo',
    descricao: 'Aplica modificador racial de sabedoria',
    executar: ({ raca }) => {
      if (!raca) return { sucesso: true, dados: { modificado: false } }
      const mods = modificadoresRaciais[raca]
      if (!mods || mods.sabedoria === undefined) return { sucesso: true, dados: { modificado: false } }
      return { sucesso: true, dados: { atributo: 'sabedoria', modificador: mods.sabedoria, modificado: true } }
    }
  },
  {
    nome: 'aplicar-modificador-racial-carisma',
    tipo: 'calculo',
    descricao: 'Aplica modificador racial de carisma',
    executar: ({ raca }) => {
      if (!raca) return { sucesso: true, dados: { modificado: false } }
      const mods = modificadoresRaciais[raca]
      if (!mods || mods.carisma === undefined) return { sucesso: true, dados: { modificado: false } }
      return { sucesso: true, dados: { atributo: 'carisma', modificador: mods.carisma, modificado: true } }
    }
  },
  {
    nome: 'aplicar-modificadores-raciais-minimo-int',
    tipo: 'calculo',
    descricao: 'Aplica modificadores raciais com mínimo de 3 apenas para inteligência',
    executar: ({ atributos, raca }) => {
      if (!raca) return { sucesso: true, dados: { atributosFinais: atributos } }
      
      const mods = modificadoresRaciais[raca] || {}
      const atributosFinais: Atributos = { ...atributos }
      
      for (const chave of Object.keys(atributosFinais) as (keyof Atributos)[]) {
        const mod = mods[chave] || 0
        const valorComMod = atributosFinais[chave] + mod
        atributosFinais[chave] = chave === 'inteligencia' ? Math.max(3, valorComMod) : valorComMod
      }
      
      return { sucesso: true, dados: { atributosFinais } }
    }
  }
]

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