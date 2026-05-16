import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Page from '@components/shell/Page/Page'
import Title from '@components/ui/basic/Title/Title'
import Box from '@components/ui/basic/Box/Box'
import Input from '@components/ui/basic/Input/Input'
import RowButton from '@components/ui/common/RowButton/RowButton'
import { useAuth } from '@hooks/useAuth'
import './Auth.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!email || !password) {
      setError('Preencha email e senha')
      return
    }

    setLoading(true)
    setError('')

    try {
      await signIn(email, password)
      navigate('/heroes')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page>
      <Title size="xl" className="mt-md">Entrar</Title>
      
      <Box className="auth-form">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        
        {error && <p className="auth-error">{error}</p>}
        
        <RowButton
          buttons={[
            { 
              label: loading ? 'Entrando...' : 'Entrar', 
              onClick: handleSubmit,
              disabled: loading 
            },
          ]}
        />
        
        <p className="auth-link">
          Não tem conta? <Link to="/register">Criar conta</Link>
        </p>
      </Box>
    </Page>
  )
}