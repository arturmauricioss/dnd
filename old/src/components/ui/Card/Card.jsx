import './Card.css'

export default function Card({ children, variant = 'default', className = '', onClick, ...props }) {
  return (
    <div 
      className={`card card-${variant} ${onClick ? 'card-clickable' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}