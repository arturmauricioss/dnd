import { namesCultures } from '@systems/names'

export interface Nome {
  id: string
  nome: string
  culturas: string[]
  genero: 'masculino' | 'feminino' | 'unissex'
}

export type SortField = 'nome' | 'genero' | string

export const cultureColumns = namesCultures.map(c => ({
  label: c.label.substring(0, 2),
  value: c.key,
}))