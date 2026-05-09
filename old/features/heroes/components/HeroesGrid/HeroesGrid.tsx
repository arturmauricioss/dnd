import type { HeroesGridProps } from '@features/heroes/types'
import './HeroesGrid.css'

export default function HeroesGrid({ children, className = '' }: HeroesGridProps) {
  return <div className={`heroes-grid ${className}`}>{children}</div>
}