import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCampaign } from '../../context/CampaignContext'
import './Home.css'

export default function Home() {
  const { user, updateUser } = useAuth()
  const { createCampaign } = useCampaign()
  const navigate = useNavigate()
  const [showCreate, setShowCreate] = useState(false)
  const [campaignName, setCampaignName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    if (!campaignName.trim()) return
    setLoading(true)
    const campaign = await createCampaign(campaignName, user.email)
    if (campaign) {
      await updateUser({
        campaignId: campaign.id,
        campaignName: campaign.name,
        isMaster: true
      })
    }
    setLoading(false)
    setShowCreate(false)
    setCampaignName('')
  }

  return (
    <div className="home-container">
      {!user?.campaignId ? (
        <div className="no-campaign">
          <h2>Você não está em nenhuma campanha</h2>
          
          <div className="home-actions">
            <button className="btn-primary" onClick={() => setShowCreate(true)}>
              + Criar Campanha
            </button>
            <button className="btn-secondary" onClick={() => navigate('/campanha/entrar')}>
              Entrar em Campanha
            </button>
          </div>

          {showCreate && (
            <div className="create-form">
              <input
                type="text"
                placeholder="Nome da campanha"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
              <div className="form-actions">
                <button onClick={handleCreate} disabled={loading}>
                  {loading ? '...' : 'Criar'}
                </button>
                <button className="cancel" onClick={() => setShowCreate(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="in-campaign">
          <div className="campaign-card">
            <span className="campaign-name">{user.campaignName}</span>
            <span className="campaign-role">
              {user.isMaster ? '🎲 Mestre' : '🧙 Jogador'}
            </span>
          </div>
          
          <button 
            className="btn-primary enter-btn"
            onClick={() => navigate(user.isMaster ? '/campanha/gerenciar' : '/personagem')}
          >
            {user.isMaster ? 'Gerenciar Campanha' : 'Entrar na Ficha'}
          </button>
        </div>
      )}
    </div>
  )
}