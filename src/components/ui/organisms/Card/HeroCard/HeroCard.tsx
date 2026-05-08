import type { HeroCardProps } from '@types'
import Card from '../Card'
import './HeroCard.css'

export default function HeroCard({ nome, level, imagem, isDead }: HeroCardProps) {
  return (
    <Card className={`hero-card ${isDead ? 'dead' : ''}`}>
      <div className="hero-card-image">
        <img src={imagem} alt={nome} className="hero-card-image-blur" />
        <img src={imagem} alt={nome} className="hero-card-image-sharp" />
        <div className="hero-card-frame" />
        <div className="hero-card-gradient" />
        <div className="hero-card-info">
          <span className="hero-card-name">{nome}</span>
          <span className="hero-card-level">Nv {level}</span>
        </div>
      </div>
    </Card>
  )
}