import Box from '@components/ui/basic/Box/Box'
import './RowSelect.css'

interface SelectOption {
  value: string
  label: string
}

interface SelectConfig {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  selectedValue?: string
}

interface RowSelectProps {
  selects?: SelectConfig[]
}

export default function RowSelect({ selects = [] }: RowSelectProps) {
  return (
    <Box className="row-select">
      <Box className="row-select-items">
        {selects.map((select, index) => (
          <Box key={index} className="row-select-item">
            {select.options.map((option) => (
              <Box
                key={option.value}
                className={`row-select-option ${select.value === option.value ? 'selected' : ''}`}
                onClick={() => select.onChange(option.value)}
              >
                {option.label}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  )
}