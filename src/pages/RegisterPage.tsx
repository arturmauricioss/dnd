import { useState } from 'react'
import { Link } from 'react-router-dom'
import Page from '@components/shell/Page/Page'
import Title from '@components/ui/basic/Title/Title'
import Box from '@components/ui/basic/Box/Box'
import Input from '@components/ui/basic/Input/Input'
import RowButton from '@components/ui/common/RowButton/RowButton'
import { useAuth } from '@hooks/useAuth'
import './Auth.css'

export default function RegisterPage() {
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit() {
    if (!email || !password || !confirmPassword) {
      setError('Preencha todos os campos')
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    if (password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres')
      return
    }

    setLoading(true)
    setError('')

    try {
      await signUp(email, password)
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Page>
        <Title size="xl" className="mt-md">Verifique seu email</Title>
        <Box className="auth-form">
          <p className="auth-success">
            Enviamos um link de confirmação para <strong>{email}</strong>.
            Clique no link para ativar sua conta.
          </p>
          <p className="auth-link">
            <Link to="/login">Voltar para login</Link>
          </p>
        </Box>
      </Page>
    )
  }

  return (
    <Page>
      <Title size="xl" className="mt-md">Criar Conta</Title>
      
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
        <Input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        
        {error && <p className="auth-error">{error}</p>}
        
        <RowButton
          buttons={[
            { 
              label: loading ? 'Criando...' : 'Criar Conta', 
              onClick: handleSubmit,
              disabled: loading 
            },
          ]}
        />
        
        <p className="auth-link">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </Box>
    </Page>
  )
}