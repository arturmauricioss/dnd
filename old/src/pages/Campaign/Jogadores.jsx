import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import { useCampaign } from '@context/CampaignContext'
import { Page, PanelMenu } from '@layout'
import './Jogadores.css'

export default function Jogadores() {
  const { user } = useAuth()
  const { getPlayers, campaigns } = useCampaign()
  const navigate = useNavigate()
  const [players, setPlayers] = useState([])

  const campaignId = user?.campaignId

  useEffect(() => {
    if (campaignId) {
      getPlayers(campaignId).then(setPlayers)
    }
  }, [campaignId])

  const handleVerFicha = (player) => {
    //Future: navigate to player's character sheet
    alert(`Ver ficha de ${player.player_name || player.player_email}`)
  }

  return (
    <Page title="Jogadores">
      <div className="jogadores-layout">
        <PanelMenu />
        <div className="jogadores-container">
          <h2>🧙 Jogadores da Campanha</h2>
          
          <div className="players-list">
            {players.length === 0 ? (
              <p className="no-players">Nenhum jogador na campanha ainda.</p>
            ) : (
              players.map(player => (
                <div key={player.id} className="player-card">
                  <div className="player-info">
                    <span className="player-name">
                      {player.player_name || player.player_email.split('@')[0]}
                    </span>
                    <span className="player-email">{player.player_email}</span>
                  </div>
                  <div className="player-actions">
                    <button onClick={() => handleVerFicha(player)}>
                      📋 Ver Ficha
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Page>
  )
}