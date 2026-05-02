import { useTheme } from '../context/ThemeContext'

export default function ConfigPage() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="page container">
      <h1 className="mt-md">Configurações</h1>
      
      <div className="config-section mt-lg">
        <div className="config-row">
          <div className="config-label">
            <span className="config-emoji">{theme === 'dark' ? '🌙' : '☀️'}</span>
            <div>
              <p className="config-title">Tema</p>
              <p className="config-desc">{theme === 'dark' ? 'Escuro' : 'Claro'}</p>
            </div>
          </div>
          <button 
            className={`theme-toggle ${theme}`}
            onClick={toggleTheme}
            aria-label="Alternar tema"
          >
            <span className="toggle-thumb" />
          </button>
        </div>
      </div>
    </div>
  )
}