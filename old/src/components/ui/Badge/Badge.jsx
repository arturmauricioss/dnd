import './Badge.css'

export default function Badge({ children, variant = 'default', size = 'sm', className = '', ...props }) {
  return (
    <span className={`badge badge-${variant} badge-${size} ${className}`} {...props}>
      {children}
    </span>
  )
}