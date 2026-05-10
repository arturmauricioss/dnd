import type { ReactNode, MouseEventHandler, CSSProperties } from 'react'
import './Box.css'

interface BoxProps {
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  style?: CSSProperties
}

export default function Box({ children, className = '', onClick, style }: BoxProps) {
  return <div className={`box ${className}`} onClick={onClick} style={style}>{children}</div>
}