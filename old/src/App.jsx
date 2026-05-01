import { useEffect, useState } from 'react'
import { CharacterProvider, useCharacter } from '@context/CharacterContext'
import { AuthProvider, useAuth } from '@context/AuthContext'
import { CampaignProvider } from '@context/CampaignContext'
import { TemaProvider } from '@context/TemaContext'
import Personagem from '@pages/Personagem/Personagem'
import Combat from '@pages/Combat/Combat'
import Inventario from '@pages/Inventario/Inventario'
import Menu from '@pages/Menu/Menu'
import Atributos from '@pages/Atributos/Atributos'
import Pericias from '@pages/Pericias/Pericias'
import Habilidades from '@pages/Habilidades/Habilidades'
import Talentos from '@pages/Talentos/Talentos'
import Idiomas from '@pages/Idiomas/Idiomas'
import Loja from '@pages/Loja/Loja'
import Login from '@pages/Auth/Login'
import Home from '@pages/Home/Home'
import GerenciarCampanha from '@pages/Campaign/GerenciarCampanha'
import Tempo from '@pages/Campaign/Tempo'
import Jogadores from '@pages/Campaign/Jogadores'
import Livros from '@pages/Config/Livros'
import Configuracoes from '@pages/Config/Configuracoes'
import Temas from '@pages/ConfigTemas/Temas'
import AppLayout from '@layout/AppLayout'
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