import Box from '@components/ui/basic/Box/Box'
import './Form.css'

interface FormProps {
  children: React.ReactNode
  onSubmit?: (e: React.FormEvent) => void
}

export default function Form({ children, onSubmit }: FormProps) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <Box className="form-content">
        {children}
      </Box>
    </form>
  )
}