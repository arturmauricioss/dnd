import Form from '@components/ui/common/Form/Form'
import './AuthForm.css'

interface AuthFormProps {
  children: React.ReactNode
  onSubmit?: (e: React.FormEvent) => void
}

export default function AuthForm({ children, onSubmit }: AuthFormProps) {
  return (
    <Form onSubmit={onSubmit}>
      {children}
    </Form>
  )
}