import { Page } from '@layout'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useTema } from '../../context/TemaContext'
import '../Config/Config.css'

const API_URL = 'http://localhost:3001'

export default function Temas() {
  const { user } = useAuth()
  const { tema, setTema } = useTema()
  const [customThemes, setCustomThemes] = useState({})

  useEffect(() => {
    const saved = localStorage.getItem('customThemes')
    if (saved) {
      setCustomThemes(JSON.parse(saved))
    }
  }, [])

  const temasPadrao = [
    { id: '0', name: 'Claro', icon: '☀️' },
    { id: '1', name: 'Penumbra', icon: '🌗' },
    { id: '2', name: 'Escuro', icon: '🌙' },
  ]

  const defaultVars = {
    '0': {
      '--primary': '#4a90d9',
      '--primary-dark': '#357abd',
      '--primary-light': '#e8f0fa',
      '--bg': '#ffffff',
      '--bg-secondary': '#f9f9f9',
      '--card-bg': '#ffffff',
      '--text-primary': '#333333',
      '--text-secondary': '#666666',
      '--border-color': '#e0e0e0',
      '--bg-hover': '#f5f5f5',
    },
    '1': {
      '--primary': '#9b59b6',
      '--primary-dark': '#8e44ad',
      '--primary-light': '#f4ecf7',
      '--bg': '#2c2c2c',
      '--bg-secondary': '#1a1a1a',
      '--card-bg': '#333333',
      '--text-primary': '#e0e0e0',
      '--text-secondary': '#a0a0a0',
      '--border-color': '#444444',
      '--bg-hover': '#404040',
    },
    '2': {
      '--primary': '#00bcd4',
      '--primary-dark': '#0097a7',
      '--primary-light': '#e0f7fa',
      '--bg': '#0a0a0a',
      '--bg-secondary': '#1a1a1a',
      '--card-bg': '#151515',
      '--text-primary': '#e0e0e0',
      '--text-secondary': '#808080',
      '--border-color': '#333333',
      '--bg-hover': '#252525',
    },
  }

  const themeLabels = {
    '--primary': 'Cor de destaque (botoes e links)',
    '--primary-dark': 'Destaque ao pressionar',
    '--primary-light': 'Fundo de destaque',
    '--bg': 'Fundo principal',
    '--bg-secondary': 'Fundo secundario',
    '--card-bg': 'Fundo dos cards',
    '--text-primary': 'Texto principal',
    '--text-secondary': 'Texto secundario',
    '--border-color': 'Cor das bordas',
    '--bg-hover': 'Cor ao passar o mouse',
  }

  const theme = tema.toString()
  const temaAtual = temasPadrao.find(t => t.id === theme) || temasPadrao[0]
  const vars = customThemes[theme] || defaultVars[theme]

  const changeTheme = (id) => {
    setTema(parseInt(id))
    localStorage.setItem('themeIndex', id)
    const temasMap = ['light', 'penumbra', 'dark']
    document.documentElement.setAttribute('data-theme', temasMap[id])
    
    if (customThemes[id]) {
      Object.entries(customThemes[id]).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value)
      })
    }
  }

  const updateVar = async (key, value) => {
    const newCustom = { ...customThemes, [theme]: { ...vars, [key]: value } }
    setCustomThemes(newCustom)
    localStorage.setItem('customThemes', JSON.stringify(newCustom))
    document.documentElement.style.setProperty(key, value)
    
    try {
      await fetch(`${API_URL}/api/users/${user.id}/themes`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustom)
      })
    } catch (e) {
      console.error('Erro ao salvar no banco:', e)
    }
  }

  const resetTheme = () => {
    const newCustom = { ...customThemes }
    delete newCustom[theme]
    setCustomThemes(newCustom)
    localStorage.setItem('customThemes', JSON.stringify(newCustom))
    
    const defaultTheme = defaultVars[theme]
    Object.entries(defaultTheme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }

  return (
    <Page title="Editar Temas">
      <div className="config-container">
        <h2>🎨 Editar Temas</h2>

        <div className="config-section">
          <h3>Tema: {temaAtual.icon} {temaAtual.name}</h3>
          <p className="hint">Selecione qual tema editar</p>
          <div className="theme-tabs">
            {temasPadrao.map(t => (
              <button
                key={t.id}
                className={`theme-tab ${theme === t.id ? 'active' : ''}`}
                onClick={() => changeTheme(t.id)}
              >
                {t.icon} {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="config-section">
          <h3>Cores do Tema</h3>
          <button className="reset-btn" onClick={resetTheme}>
            ↺
          </button>
          <div className="vars-list">
            {Object.entries(vars).map(([key, value]) => (
              <div key={key} className="var-item">
                <div className="var-input">
                  <input 
                    type="color" 
                    value={value} 
                    onChange={(e) => updateVar(key, e.target.value)}
                  />
                  <input 
                    type="text" 
                    value={value} 
                    onChange={(e) => updateVar(key, e.target.value)}
                  />
                </div>
                <label>{themeLabels[key] || key}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="config-section">
          <h3>Sobre</h3>
          <p className="about">D&Tabletop v0.1</p>
        </div>
      </div>
    </Page>
  )
}