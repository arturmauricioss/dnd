export interface Alinhamento {
  id: string
  nome: string
  eixo: 'bom' | 'neutro' | 'mal' | 'ordem' | 'caos'
}

export interface Divindade {
  id: string
  nome: string
  alinhamento: string
}