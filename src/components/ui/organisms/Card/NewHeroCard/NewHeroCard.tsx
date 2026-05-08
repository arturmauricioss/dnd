import { useNavigate } from 'react-router-dom'
import Card from '../Card'
import './NewHeroCard.css'

export default function NewHeroCard() {
  const navigate = useNavigate()

  return (
    <Card className="new-hero-card" onClick={() => navigate('/herois/novo')}>
      <span className="new-hero-card-icon">+</span>
      <span className="new-hero-card-label">Novo Herói</span>
    </Card>
  )
}