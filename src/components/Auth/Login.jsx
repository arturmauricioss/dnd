import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Page } from '../global'
import './Auth.css'

export default function Login() {
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login, register } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = isRegister 
      ? register(email, password, nome)
      : login(email, password)

    if (!result.success) {
      setError(result.error)
      setLoading(false)
      return
    }

    setLoading(false)
  }

  return (
    <Page title={isRegister ? 'Criar Conta' : 'Login'}>
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          {isRegister && (
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                required={isRegister}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? '...' : isRegister ? 'Criar Conta' : 'Entrar'}
          </button>

          <button 
            type="button" 
            className="auth-switch"
            onClick={() => {
              setIsRegister(!isRegister)
              setError('')
            }}
          >
            {isRegister ? 'Já tem conta? Entrar' : 'Criar nova conta'}
          </button>
        </form>
      </div>
    </Page>
  )
}