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
}

interface RowSelectProps {
  selects?: SelectConfig[]
  multi?: boolean
}

export default function RowSelect({ selects = [], multi = false }: RowSelectProps) {
  const handleClick = (select: SelectConfig, option: SelectOption) => {
    if (multi) {
      // Multi-select: toggle no array
      const currentValues = select.value ? select.value.split(',') : []
      const isSelected = currentValues.includes(option.value)
      
      let newValue: string
      if (isSelected) {
        newValue = currentValues.filter(v => v !== option.value).join(',')
      } else {
        newValue = [...currentValues, option.value].join(',')
      }
      select.onChange(newValue)
    } else {
      // Single-select: replace
      select.onChange(option.value)
    }
  }

  const isSelected = (select: SelectConfig, option: SelectOption): boolean => {
    if (multi) {
      const currentValues = select.value ? select.value.split(',') : []
      return currentValues.includes(option.value)
    }
    return select.value === option.value
  }

  return (
    <Box className="row-select">
      <Box className="row-select-items">
        {selects.map((select, index) => (
          <Box key={index} className="row-select-item">
            {select.options.map((option) => (
              <Box
                key={option.value}
                className={`row-select-option ${isSelected(select, option) ? 'selected' : ''}`}
                onClick={() => handleClick(select, option)}
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