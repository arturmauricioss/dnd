export interface Atributos {
  forca: number
  constituicao: number
  destreza: number
  inteligencia: number
  sabedoria: number
  carisma: number
}

export type MetodoAtributos = 'livre' | '4d6-baixo' | 'definido' | 'compra'

export type AtributoNome = 'forca' | 'destreza' | 'constituicao' | 'inteligencia' | 'sabedoria' | 'carisma'

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

export type OrigemModificador = 'raca' | 'efeito' | 'item' | 'classe'

export interface Modificador {
  atributo: AtributoNome
  valor: number
  origem: OrigemModificador
}