export const racas = [
  { id: 'humano', nome: 'Humano', prefixo: 'humano' },
  { id: 'elfo', nome: 'Elfo', prefixo: 'elfo' },
  { id: 'anao', nome: 'Anão', prefixo: 'anao' },
  { id: 'gnomo', nome: 'Gnomo', prefixo: 'gnomo' },
  { id: 'meio-elfo', nome: 'Meio-Elfo', prefixo: 'meio-elfo' },
  { id: 'meio-orc', nome: 'Meio-Orc', prefixo: 'meio-orc' },
  { id: 'halfling', nome: 'Halfling', prefixo: 'halfling' }
]

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