import { useNavigate } from 'react-router-dom'
import { useCampaign } from '../../context/CampaignContext'
import { useAuth } from '../../context/AuthContext'
import PanelMenu from '../global/PanelMenu/PanelMenu'
import { Page } from '../global'
import './Gerenciar.css'

export default function GerenciarCampanha() {
  const { user, logout } = useAuth()
  const { campaigns, getCampaign } = useCampaign()
  const navigate = useNavigate()

  const campaign = user?.campaignId ? campaigns[user.campaignId] : null

  return (
    <Page title="Gerenciar Campanha">
      <div className="gerenciar-container">
        <div className="gerenciar-header">
          <h2>🎲 {campaign?.name || 'Campanha'}</h2>
          <span className="role-badge">Mestre</span>
        </div>

        <div className="gerenciar-content">
          <PanelMenu />
          
          <div className="gerenciar-main">
            <div className="welcome-card">
              <h3>Bem-vindo, {user?.nome}!</h3>
              <p>Você está gerenciando esta campanha como mestre.</p>
              
              <div className="quick-actions">
                <button onClick={() => navigate('/campanha/tempo')}>
                  ⏱️ Controlar Tempo
                </button>
                <button onClick={() => navigate('/campanha/lojas')}>
                  🏪 Gerenciar Lojas
                </button>
                <button onClick={() => navigate('/personagem')}>
                  📋 Ver Fichas
                </button>
              </div>
            </div>

            <div className="info-card">
              <h4>Informações</h4>
              <p><strong>Criada em:</strong> {campaign?.created_at ? new Date(campaign.created_at).toLocaleDateString('pt-BR') : '-'}</p>
              <p><strong>Status:</strong> {campaign?.status || 'open'}</p>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}