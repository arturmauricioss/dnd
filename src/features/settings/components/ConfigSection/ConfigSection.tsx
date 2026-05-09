import type { ConfigSectionProps, ConfigRowProps, ConfigLabelProps } from '@features/settings/types'
import './ConfigSection.css'

export default function ConfigSection({ children }: ConfigSectionProps) {
  return <div className="config-section">{children}</div>
}

export function ConfigRow({ children }: ConfigRowProps) {
  return <div className="config-row">{children}</div>
}

export function ConfigLabel({ emoji, title, description }: ConfigLabelProps) {
  return (
    <div className="config-label">
      {emoji && <span className="config-emoji">{emoji}</span>}
      <div className="config-info">
        <p className="config-title">{title}</p>
        {description && <p className="config-desc">{description}</p>}
      </div>
    </div>
  )
}