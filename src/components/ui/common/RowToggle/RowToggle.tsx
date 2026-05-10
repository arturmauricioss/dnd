import Box from '@components/ui/basic/Box/Box'
import Text from '@components/ui/basic/Text/Text'
import Toggle from '@components/ui/basic/Toggle/Toggle'
import './RowToggle.css'

interface RowToggleProps {
  label: string
  active: boolean
  onClick: () => void
}

export default function RowToggle({ label, active, onClick }: RowToggleProps) {
  return (
    <Box className="row-toggle">
      <Text size="md">{label}</Text>
      <Toggle active={active} onClick={onClick} />
    </Box>
  )
}