interface HeroCardProps {
  nome: string
  level: number
  imagem?: string
  isDead?: boolean
}

export default function HeroCard({ nome, level, imagem, isDead }: HeroCardProps) {
  return (
    <div className={`hero-card ${isDead ? 'dead' : ''}`}>
      <div className="hero-card-image">
        <img src={imagem} alt={nome} />
        <div className="hero-card-gradient" />
        <div className="hero-card-info">
          <span className="hero-card-name">{nome}</span>
          <span className="hero-card-level">Nv {level}</span>
        </div>
      </div>
    </div>
  )
}