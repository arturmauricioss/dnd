import type { MetodoAtributos, Atributos } from '@systems/attributes/types'

export type CharacterStep = 
  | 'nome' 
  | 'atributos' 
  | 'raca' 
  | 'aparencia' 
  | 'classe' 
  | 'tendencias' 
  | 'resumo'

export interface NomeFormProps {
  nome: string
  genero: 'm' | 'f'
  onNomeChange: (nome: string) => void
  onGeneroChange: (genero: 'm' | 'f') => void
}

export interface MetodoSelectorProps {
  metodo: MetodoAtributos | null
  onMetodoChange: (metodo: MetodoAtributos) => void
  onConfirmar: () => void
  nome: string
  gerarNome: () => string
  onNomeChange: (nome: string) => void
}

export interface AtributosGridProps {
  atributos: Atributos
  metodo: MetodoAtributos | null
  valoresConfirmados: boolean
  podeReroll: boolean
  somaModificadores: number
  pontosUsados?: number
  atributoSelecionado: string | null
  onAtributoClick: (campo: string) => void
  onMouseDownPontos: (campo: string) => void
  onMouseUpPontos: (campo: string, e: React.MouseEvent) => void
  onAtualizarAtributo: (campo: string, valor: string | number) => void
  onValidarAtributo: (campo: string, valor: number) => void
  onConfirmarReroll: () => void
  onConfirmarValores: () => void
}

export interface RacaSelectionProps {
  racas: { id: string; nome: string }[]
  racaSelecionada: string | null
  onSelect: (raca: string) => void
  onConfirm: () => void
}

export interface AparenciaSelectionProps {
  raca: string
  genero: 'm' | 'f'
  variacao: number
  totalImagens: number
  onVariacaoChange: (variacao: number) => void
  onConfirm: () => void
  getImagemPath: (raca: string, genero: 'm' | 'f', numero: number) => string
}

export interface ClasseSelectionProps {
  classes: { id: string; nome: string }[]
  classeSelecionada: string | null
  nivel: number
  onSelect: (classe: string) => void
  onNivelChange: (nivel: number) => void
  onConfirm: () => void
}

export interface TendenciaSelectionProps {
  alinhamentos: { id: string; nome: string; eixo: string }[]
  divindadesOrdenadas: { id: string; nome: string }[]
  classeId: string | null
  tendenciaSelecionada: string | null
  divindadeSelecionada: string | null
  raca: string | null
  onTendenciaSelect: (tendencia: string) => void
  onDivindadeSelect: (divindade: string) => void
  onConfirm: () => void
  tendenciaPermitida: (classeId: string, tendenciaId: string) => boolean
  getPontuacaoDeus: (deusId: string, racaId: string | null, tendenciaId: string | null, classeId: string | null) => number
}

export interface PersonagemCardProps {
  nome: string
  racaNome: string
  genero: 'm' | 'f'
  tamanho: string
  deslocamento: number
  classeNome: string
  nivel: number
  tendenciaNome: string
  divindadeNome: string
  atributos: Atributos | Record<string, number>
  imagem: string
}