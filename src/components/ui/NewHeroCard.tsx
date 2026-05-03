import { useNavigate } from 'react-router-dom'

export default function NewHeroCard() {
  const navigate = useNavigate()

  return (
    <div className="new-hero-card" onClick={() => navigate('/herois/novo')}>
      <span className="new-hero-card-icon">+</span>
      <span className="new-hero-card-label">Novo Herói</span>
    </div>
  )
}