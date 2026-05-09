import type { SectionHeaderProps } from './types'
import './SectionHeader.css'

export default function SectionHeader({ icon: Icon, children, active, className = '' }: SectionHeaderProps) {
  return (
    <h3 className={`section-header ${active ? 'active' : ''} ${className}`}>
      <Icon className="section-icon" />
      {children}
    </h3>
  )
}