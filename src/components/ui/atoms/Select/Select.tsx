import type { SelectProps } from '@types'
import './Select.css'

export default function Select({ options, ...props }: SelectProps) {
  return (
    <select className="select" {...props}>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}