import Box from '@components/ui/basic/Box/Box'
import Text from '@components/ui/basic/Text/Text'
import './RowMessage.css'

interface RowMessageProps {
  message: string
  date: string
}

export default function RowMessage({ message, date }: RowMessageProps) {
  return (
    <Box className="row-message">
      <Text size="md">{message}</Text>
      <span className="row-message-date">{date}</span>
    </Box>
  )
}