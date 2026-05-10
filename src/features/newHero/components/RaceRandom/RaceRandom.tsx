import Box from '@components/ui/basic/Box/Box'
import Text from '@components/ui/basic/Text/Text'
import './RaceRandom.css'

interface RaceRandomProps {
  onRandom: () => void
  disabled?: boolean
}

export default function RaceRandom({ onRandom, disabled }: RaceRandomProps) {
  return (
    <Box className={`random-button ${disabled ? 'disabled' : ''}`} onClick={disabled ? undefined : onRandom}>
      <Text size="md">?</Text>
    </Box>
  )
}