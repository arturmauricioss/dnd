import Box from '@components/ui/basic/Box/Box'
import Button from '@components/ui/basic/Button/Button'
import './RowButton.css'

interface ButtonConfig {
  label: string
  onClick: () => void
  disabled?: boolean
  selected?: boolean
  variant?: 'primary' | 'secondary'
}

interface RowButtonProps {
  buttons: ButtonConfig[]
}

export default function RowButton({ buttons = [] }: RowButtonProps) {
  return (
    <Box className="row-button">
      <Box className="row-button-buttons">
        {buttons.map((btn, index) => (
          <Button
            key={index}
            className={`row-button-btn ${btn.selected ? 'selected' : ''} ${btn.variant || ''}`}
            onClick={btn.disabled ? undefined : btn.onClick}
            disabled={btn.disabled}
            variant={btn.variant}
          >
            {btn.label}
          </Button>
        ))}
      </Box>
    </Box>
  )
}