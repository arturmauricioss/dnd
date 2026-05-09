import type { OptionCardProps } from './types'
import './OptionCard.css'

export default function OptionCard({ children, className = '', active, disabled, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      className={`option-card ${active ? 'active' : ''} ${disabled ? 'disabled' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}