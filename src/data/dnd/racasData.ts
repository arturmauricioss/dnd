import type { AtributoNome, Tamanho } from '@types'

export type { AtributoNome, Tamanho }

export const racas = [
  { id: 'humano', nome: 'Humano', prefixo: 'humano' },
  { id: 'anao', nome: 'Anão', prefixo: 'anao' },
  { id: 'gnomo', nome: 'Gnomo', prefixo: 'gnomo' },
  { id: 'halfling', nome: 'Halfling', prefixo: 'halfling' },
  { id: 'elfo', nome: 'Elfo', prefixo: 'elfo' },
  { id: 'meio-elfo', nome: 'Meio-Elfo', prefixo: 'meio-elfo' },
  { id: 'meio-orc', nome: 'Meio-Orc', prefixo: 'meio-orc' }
]

export const modificadoresRaciais: Record<string, Partial<Record<AtributoNome, number>>> = {
  'humano': {},
  'anao': { constituicao: 2, carisma: -2 },
  'elfo': { destreza: 2, constituicao: -2 },
  'gnomo': { constituicao: 2, forca: -2 },
  'meio-elfo': {},
  'meio-orc': { forca: 2, inteligencia: -2, carisma: -2 },
  'halfling': { destreza: 2, forca: -2 }
}

export const tamanhos: Record<string, Tamanho> = {
  'humano': 'medio',
  'elfo': 'medio',
  'anao': 'medio',
  'gnomo': 'pequeno',
  'meio-elfo': 'medio',
  'meio-orc': 'medio',
  'halfling': 'pequeno'
}

export const deslocamentos: Record<string, number> = {
  'humano': 9,
  'elfo': 9,
  'anao': 6,
  'gnomo': 6,
  'meio-elfo': 9,
  'meio-orc': 9,
  'halfling': 6
}

// TODO:Gerar automaticamente via script
export const totalImagensPorRaca: Record<string, number> = {
  'humano': 1,
  'elfo': 1,
  'anao': 1,
  'gnomo': 1,
  'meio-elfo': 1,
  'meio-orc': 1,
  'halfling': 1
}