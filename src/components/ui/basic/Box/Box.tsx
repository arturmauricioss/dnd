import type { ReactNode } from 'react'
import './Box.css'

interface BoxProps {
  children: ReactNode
  className?: string
}

export default function Box({ children, className = '' }: BoxProps) {
  return <div className={`box ${className}`}>{children}</div>
}