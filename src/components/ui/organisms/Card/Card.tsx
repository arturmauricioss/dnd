import type { CardProps } from '@types'
import './Card.css'

export default function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}