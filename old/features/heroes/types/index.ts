export interface HeroCardProps {
  nome: string
  level: number
  imagem?: string
  isDead?: boolean
}

export interface Heroi {
  id: string
  nome: string
  level: number
  imagem: string
  status: 'alive' | 'dead'
}

export interface HeroesGridProps {
  children: React.ReactNode
  className?: string
}