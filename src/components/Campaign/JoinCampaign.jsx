import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCampaign } from '../../context/CampaignContext'
import { Page } from '../global'
import './JoinCampaign.css'

export default function JoinCampaign() {
  const { user, updateUser } = useAuth()
  const { campaigns, addPlayer } = useCampaign()
  const navigate = useNavigate()

  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Todas as campanhas exceto as que o usuário já participa OU que ele é mestre
  const availableCampaigns = Object.values(campaigns).filter(
    c => {
      // Não mostra se já está nessa campanha
      if (user?.campaignId && c.id === user.campaignId) return false
      // Não mostra se ele é o mestre dessa campanha
      if (c.master_email === user?.email) return false
      return true
    }
  )

  const handleJoin = async (campaignId) => {
    setLoading(true)
    setError('')

    const campaign = campaigns[campaignId]
    if (!campaign) {
      setError('Campanha não encontrada')
      setLoading(false)
      return
    }

    await addPlayer(campaignId, user.email, user.nome)

    await updateUser({
      campaignId: campaign.id,
      campaignName: campaign.name,
      isMaster: false
    })

    navigate('/home')
    setLoading(false)
  }

  return (
    <Page title="Entrar em Campanha">
      <div className="join-campaign-container">
        <div className="join-campaign-card">
          <h2>🧙 Entrar em Campanha</h2>
          <p>Junte-se a uma aventura existente!</p>

          {availableCampaigns.length === 0 ? (
            <div className="no-campaigns">
              <p>Nenhuma campanha disponível no momento.</p>
              <p>Peça ao mestre o código da campanha.</p>
            </div>
          ) : (
            <div className="campaigns-list">
              {availableCampaigns.map(campaign => (
                <div key={campaign.id} className="campaign-item">
                  <div className="campaign-info">
                    <h3>{campaign.name}</h3>
                    <p>🎲 Mestre: {campaign.masterEmail?.split('@')[0]}</p>
                    <p>👥 {campaign.players?.length || 0} jogadores</p>
                  </div>
                  <button 
                    className="btn-primary"
                    onClick={() => handleJoin(campaign.id)}
                    disabled={loading}
                  >
                    Entrar
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="divider">
            <span>ou digite o código</span>
          </div>

          <div className="code-input">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Código da campanha"
            />
            <p className="help-text">
              O código deve ser fornecido pelo mestre da campanha
            </p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            className="btn-cancel full-width"
            onClick={() => navigate('/home')}
          >
            Voltar
          </button>
        </div>
      </div>
    </Page>
  )
}