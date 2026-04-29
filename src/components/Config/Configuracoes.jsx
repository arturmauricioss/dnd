import { Page } from '../global'
import { Link } from 'react-router-dom'
import './Config.css'

export default function Configuracoes() {
  return (
    <Page title="Configurações">
      <div className="config-container">
        <h2>⚙️ Configurações</h2>

        <div className="config-section">
          <Link to="/temas" className="config-btn">
            🎨 Editar Temas
          </Link>
        </div>

        <div className="config-section">
          <h3>Sobre</h3>
          <p className="about">D&Tabletop v0.1</p>
        </div>
      </div>
    </Page>
  )
}