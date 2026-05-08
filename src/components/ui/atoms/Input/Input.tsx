import type { InputProps } from '@types'
import './Input.css'

export default function Input(props: InputProps) {
  return <input className="input" {...props} />
}