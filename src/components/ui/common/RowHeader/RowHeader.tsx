import type { RowHeaderProps } from './index';
import Title from '@components/ui/basic/Title/Title';
import './RowHeader.css';

export default function RowHeader({
  icon: Icon,
  children,
  active,
  variant = 'default',
  className = '',
}: RowHeaderProps) {
  return (
    <Title
      size="lg"
      className={`row-header ${active ? 'active' : ''} ${variant !== 'default' ? variant : ''} ${className}`}
    >
      {Icon && <Icon className="row-header-icon" />}
      {children}
    </Title>
  );
}
