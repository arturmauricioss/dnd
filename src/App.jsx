import { CharacterProvider } from './context/CharacterContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CampaignProvider } from './context/CampaignContext'
import { TemaProvider } from './context/TemaContext'
import { useEffect } from 'react'
import Personagem from './components/Personagem/Personagem'
import Atributos from './components/Atributos/Atributos'
import Pericias from './components/Pericias/Pericias'
import Idiomas from './components/Idiomas/Idiomas'
import Combat from './components/Combat/Combat'
import Habilidades from './components/Habilidades/Habilidades'
import Talentos from './components/Talentos/Talentos'
import Inventario from './components/Inventario/Inventario'
import Loja from './components/Loja/Loja'
import Menu from './components/Menu/Menu'
import Login from './components/Auth/Login'
import Home from './components/Home/Home'
import GerenciarCampanha from './components/Campaign/GerenciarCampanha'
import Tempo from './components/Campaign/Tempo'
import Jogadores from './components/Campaign/Jogadores'
import Livros from './components/Config/Livros'
import Configuracoes from './components/Config/Configuracoes'
import Temas from './components/ConfigTemas/Temas'
import AppLayout from './components/global/AppLayout'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'

import './App.css'

const temaMap = ['light', 'penumbra', 'dark']

function ThemeLoader() {
  useEffect(() => {
    const themeIndex = localStorage.getItem('themeIndex') || '0'
    const customThemes = localStorage.getItem('customThemes')
    
    document.documentElement.setAttribute('data-theme', temaMap[themeIndex])
    
    if (customThemes) {
      const themes = JSON.parse(customThemes)
      const vars = themes[themeIndex]
      if (vars) {
        Object.entries(vars).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value)
        })
      }
    }
  }, [])
  
  return null
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <div>Carregando...</div>
  return isAuthenticated ? children : <Navigate to="/login" />
}

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <div>Carregando...</div>

  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/home" /> : <Login />
      } />
      
<Route element={<AppLayout />}>
        <Route path="/home" element={<ProtectedRoute><div style={{padding: '2rem'}}>Dashboard em breve...</div></ProtectedRoute>} />
        <Route path="/campanhas" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        
        <Route path="/campanha/criar" element={<ProtectedRoute><GerenciarCampanha /></ProtectedRoute>} />
        <Route path="/campanha/entrar" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/campanha/gerenciar" element={<ProtectedRoute><GerenciarCampanha /></ProtectedRoute>} />
        <Route path="/campanha/jogadores" element={<ProtectedRoute><Jogadores /></ProtectedRoute>} />
        <Route path="/campanha/tempo" element={<ProtectedRoute><Tempo /></ProtectedRoute>} />
        
        <Route path="/livros" element={<ProtectedRoute><Livros /></ProtectedRoute>} />
        <Route path="/configuracoes" element={<ProtectedRoute><Configuracoes /></ProtectedRoute>} />
        <Route path="/temas" element={<ProtectedRoute><Temas /></ProtectedRoute>} />
        
        <Route path="/personagem" element={<ProtectedRoute><Menu /><Personagem /></ProtectedRoute>} />
        <Route path="/personagem/atributos" element={<ProtectedRoute><Menu /><Atributos /></ProtectedRoute>} />
        <Route path="/personagem/talentos" element={<ProtectedRoute><Menu /><Talentos /></ProtectedRoute>} />
        <Route path="/personagem/pericias" element={<ProtectedRoute><Menu /><Pericias /></ProtectedRoute>} />
        <Route path="/personagem/idiomas" element={<ProtectedRoute><Menu /><Idiomas /></ProtectedRoute>} />
        <Route path="/personagem/habilidades" element={<ProtectedRoute><Menu /><Habilidades /></ProtectedRoute>} />
        <Route path="/personagem/combat" element={<ProtectedRoute><Menu /><Combat /></ProtectedRoute>} />
        <Route path="/personagem/inventario" element={<ProtectedRoute><Menu /><Inventario /></ProtectedRoute>} />
        
        <Route path="/loja" element={<ProtectedRoute><Loja /></ProtectedRoute>} />
      </Route>

      <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <CampaignProvider>
        <CharacterProvider>
          <TemaProvider>
            <HashRouter>
              <div className="app">
                <ThemeLoader />
                <AppRoutes />
              </div>
            </HashRouter>
          </TemaProvider>
        </CharacterProvider>
      </CampaignProvider>
    </AuthProvider>
  )
}

export default App