import type { RowHeaderProps } from './index'
import Title from '@components/ui/basic/Title/Title'
import './RowHeader.css'

export default function RowHeader({ icon: Icon, children, active, className = '' }: RowHeaderProps) {
  return (
    <Title size="lg" className={`row-header ${active ? 'active' : ''} ${className}`}>
      {Icon && <Icon className="row-header-icon" />}
      {children}
    </Title>
  )
}