import type { GridProps } from './types'
import './Grid.css'

export default function Grid({ children, cols = 2, className = '' }: GridProps) {
  return <div className={`grid grid-${cols} ${className}`}>{children}</div>
}