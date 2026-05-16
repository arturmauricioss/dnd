import type { TitleProps } from './types';
import './Title.css';

export default function Title({
  children,
  size = 'md',
  className = '',
}: TitleProps) {
  const Tag = size === 'xl' ? 'h1' : size === 'lg' ? 'h2' : 'h3';
  return <Tag className={`title title-${size} ${className}`}>{children}</Tag>;
}
