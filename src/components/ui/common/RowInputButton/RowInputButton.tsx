import Box from '@components/ui/basic/Box/Box'
import Input from '@components/ui/basic/Input/Input'
import Button from '@components/ui/basic/Button/Button'
import './RowInputButton.css'

interface ButtonConfig {
  label: string
  onClick: () => void
  disabled?: boolean
}

interface RowInputButtonProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  buttons?: ButtonConfig[]
}

export default function RowInputButton({ inputProps, buttons = [] }: RowInputButtonProps) {
  return (
    <Box className="row-input-button">
      <Input className="row-input-button-input" {...inputProps} />
      <Box className="row-input-button-buttons">
        {buttons.map((btn, index) => (
          <Button
            key={index}
            className="row-input-button-btn"
            onClick={btn.disabled ? undefined : btn.onClick}
            disabled={btn.disabled}
          >
            {btn.label}
          </Button>
        ))}
      </Box>
    </Box>
  )
}