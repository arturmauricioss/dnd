import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCampaign } from '../../context/CampaignContext'
import { Page } from '../global'
import './CreateCampaign.css'

export default function CreateCampaign() {
  const [searchParams] = useSearchParams()
  const { user, updateUser } = useAuth()
  const { createCampaign } = useCampaign()
  const navigate = useNavigate()

  const campaignName = searchParams.get('nome') || ''
  const [name, setName] = useState(campaignName)
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    if (!name.trim()) return
    
    setLoading(true)
    const campaign = await createCampaign(name, user.email)
    
    if (campaign) {
      await updateUser({
        campaignId: campaign.id,
        campaignName: campaign.name,
        isMaster: true
      })
    }

    navigate('/home')
    setLoading(false)
  }

  return (
    <Page title="Criar Campanha">
      <div className="create-campaign-container">
        <div className="create-campaign-card">
          <h2>🎲 Criar Campanha</h2>
          <p>Como mestre, você irá gerenciar este mundo.</p>
          
          <div className="form-group">
            <label>Nome da Campanha</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: A Maldição do Rei Null"
            />
          </div>

          <div className="campaign-config">
            <h3>Configurações Iniciais</h3>
            <div className="config-item">
              <span>Sistema:</span>
              <select defaultValue="35">
                <option value="35">D&D 3.5</option>
                <option value="5e">D&D 5ª edição</option>
                <option value="2e">D&D 2ª edição</option>
              </select>
            </div>
            <div className="config-item">
              <span>Atributos:</span>
              <select defaultValue="buy_points">
                <option value="buy_points">Comprar Pontos</option>
                <option value="rolled">Rolagem</option>
                <option value="manual">Manual</option>
              </select>
            </div>
          </div>

          <div className="form-buttons">
            <button 
              className="btn-primary"
              onClick={handleCreate}
              disabled={loading || !name.trim()}
            >
              {loading ? 'Criando...' : 'Criar Campanha'}
            </button>
            <button 
              className="btn-cancel"
              onClick={() => navigate('/home')}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Page>
  )
}