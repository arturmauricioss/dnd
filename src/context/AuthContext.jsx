import { createContext, useContext, useState, useEffect } from 'react'

const API_URL = 'http://localhost:3001'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('dnd_current_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem('dnd_current_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      
      if (!res.ok) {
        return { success: false, error: data.error || 'Erro ao fazer login' }
      }

      setUser(data)
      localStorage.setItem('dnd_current_user', JSON.stringify(data))
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const register = async (email, password, nome) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, nome })
      })
      const data = await res.json()
      
      if (!res.ok) {
        return { success: false, error: data.error || 'Erro ao cadastrar' }
      }

      setUser(data)
      localStorage.setItem('dnd_current_user', JSON.stringify(data))
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('dnd_current_user')
  }

  const updateUser = async (updates) => {
    if (!user) return
    try {
      const res = await fetch(`${API_URL}/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updates, email: user.email })
      })
      const data = await res.json()
      if (data.success) {
        setUser(prev => ({ ...prev, ...updates }))
        localStorage.setItem('dnd_current_user', JSON.stringify({ ...user, ...updates }))
      }
    } catch (err) {
      console.error('Erro ao atualizar:', err)
    }
  }

  return (
    <AuthContext.Provider value={{
      user, loading, login, register, logout, updateUser,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}