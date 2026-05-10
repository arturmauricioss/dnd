import type { InputProps } from './types'
import './Input.css'

export default function Input({ className = '', ...props }: InputProps) {
  return <input className={`input ${className}`} {...props} />
}