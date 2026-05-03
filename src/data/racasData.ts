export const racas = [
  { id: 'humano', nome: 'Humano', prefixo: 'humano' },
  { id: 'anao', nome: 'Anão', prefixo: 'anao' },
  { id: 'gnomo', nome: 'Gnomo', prefixo: 'gnomo' },
  { id: 'halfling', nome: 'Halfling', prefixo: 'halfling' },
  { id: 'elfo', nome: 'Elfo', prefixo: 'elfo' },
  { id: 'meio-elfo', nome: 'Meio-Elfo', prefixo: 'meio-elfo' },
  { id: 'meio-orc', nome: 'Meio-Orc', prefixo: 'meio-orc' }
]

export type AtributoNome = 'forca' | 'destreza' | 'constituicao' | 'inteligencia' | 'sabedoria' | 'carisma'

export const modificadoresRaciais: Record<string, Partial<Record<AtributoNome, number>>> = {
  'humano': {},
  'anao': { constituicao: 2, carisma: -2 },
  'elfo': { destreza: 2, constituicao: -2 },
  'gnomo': { constituicao: 2, forca: -2 },
  'meio-elfo': {},
  'meio-orc': { forca: 2, inteligencia: -2, carisma: -2 },
  'halfling': { destreza: 2, forca: -2 }
}

// TODO:Gerar automaticamente via script
export const totalImagensPorRaca: Record<string, number> = {
  'humano': 2,
  'elfo': 0,
  'anao': 0,
  'gnomo': 0,
  'meio-elfo': 0,
  'meio-orc': 0,
  'halfling': 0
}

export function getImagemPath(racaId: string, genero: 'm' | 'f', numero: number): string {
  const raca = racas.find(r => r.id === racaId)
  const prefixo = raca?.prefixo || racaId
  const generoStr = genero === 'm' ? 'm' : 'f'
  return `/racas/${prefixo}_${generoStr}${String(numero).padStart(2, '0')}.png`
}