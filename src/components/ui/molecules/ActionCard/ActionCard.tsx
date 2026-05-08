import type { ActionCardProps } from '@types'
import './ActionCard.css'

export default function ActionCard({ icon: Icon, label, description, onClick, className = '' }: ActionCardProps) {
  return (
    <button type="button" className={`action-card ${className}`} onClick={onClick}>
      <Icon className="action-card-icon" />
      <span className="action-card-label">{label}</span>
      {description && <span className="action-card-desc">{description}</span>}
    </button>
  )
}