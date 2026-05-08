import type { ToggleProps } from '@types'
import './Toggle.css'

export default function Toggle({ active, onClick, label }: ToggleProps) {
  return (
    <button
      type="button"
      className={`toggle ${active ? 'active' : ''}`}
      onClick={onClick}
      aria-label={label}
    >
      <span className="toggle-thumb" />
    </button>
  )
}