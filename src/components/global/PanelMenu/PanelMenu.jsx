import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { useTema } from '../../../context/TemaContext'
import './PanelMenu.css'

export default function PanelMenu() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const { tema, proximoTema } = useTema()
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem('menuOpen')
    return saved === null ? true : saved === 'true'
  })

  useEffect(() => {
    localStorage.setItem('menuOpen', isOpen.toString())
  }, [isOpen])

  const temaNome = { 0: 'Claro', 1: 'Penumbra', 2: 'Escuro' }
  const temaIcon = { 0: '☀️', 1: '🌗', 2: '🌙' }

const menuLabels = {
    '/home': 'Início',
    '/personagem': 'Personagens',
    '/livros': 'Livros',
    '/campanha/gerenciar': 'Gerenciar',
    '/campanha/jogadores': 'Jogadores',
    '/campanha/tempo': 'Tempo',
  }

  const hasCampaign = user?.campaignId
  const isMaster = user?.isMaster

  const noCampaignMenu = [
    { path: '/home', icon: '🏠' },
    { path: '/campanhas', icon: '🎲', label: 'Campanhas' },
    { path: '/personagem', icon: '🧝', label: 'Personagens' },
    { path: '/livros', icon: '📚' },
  ]

  const masterMenu = [
    { path: '/home', icon: '🏠' },
    { path: '/campanhas', icon: '🎲', label: 'Campanhas' },
    { path: '/personagem', icon: '🧝', label: 'Personagens' },
    { path: '/campanha/gerenciar', icon: '🛠️' },
    { path: '/campanha/jogadores', icon: '🧙' },
    { path: '/campanha/tempo', icon: '⏱️' },
    { path: '/livros', icon: '📚' },
  ]

  const playerMenu = [
    { path: '/home', icon: '🏠' },
    { path: '/campanhas', icon: '🎲', label: 'Campanhas' },
    { path: '/personagem', icon: '🧝', label: 'Personagens' },
    { path: '/livros', icon: '📚' },
  ]

  const menu = hasCampaign ? (isMaster ? masterMenu : playerMenu) : noCampaignMenu

  return (
    <>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '◀' : '☰'}
      </button>
      
      <nav className={`panel-menu ${isOpen ? 'open' : ''}`}>
        <div className="panel-header">
          <div className="user-info">
            <span className="user-name">{user?.nome}</span>
            {hasCampaign && (
              <span className="user-role">{isMaster ? '🎲 Mestre' : '🧙 Jogador'}</span>
            )}
          </div>
        </div>

        <div className="panel-menu-items">
          {menu.map((item, idx) => (
            <Link key={item.label || idx} to={item.path} className={`panel-item ${location.pathname.startsWith(item.path) ? 'active' : ''}`}>
              <span className="panel-icon">{item.icon}</span>
              <span className="panel-label">{item.label || menuLabels[item.path] || item.path.replace('/', '')}</span>
            </Link>
          ))}
        </div>

<div className="panel-footer">
          <button className="panel-item logout" onClick={logout}>
            <span className="panel-icon">🚪</span>
            <span className="panel-label">Sair</span>
          </button>
        </div>
      </nav>
    </>
  )
}