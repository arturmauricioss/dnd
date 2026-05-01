import { createContext, useContext, useState, useEffect } from 'react'

const API_URL = 'http://localhost:3001'

const CampaignContext = createContext(null)

export function CampaignProvider({ children }) {
  const [campaigns, setCampaigns] = useState({})
  const [loading, setLoading] = useState(true)

  const loadCampaigns = async () => {
    try {
      const res = await fetch(`${API_URL}/api/campaigns`)
      const data = await res.json()
      const camps = {}
      data.forEach(row => {
        camps[row.id] = row
      })
      setCampaigns(camps)
    } catch (err) {
      console.error('Erro ao carregar campanhas:', err)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadCampaigns()
  }, [])

  const createCampaign = async (name, masterEmail) => {
    try {
      const res = await fetch(`${API_URL}/api/campaigns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, masterEmail })
      })
      const campaign = await res.json()
      setCampaigns(prev => ({ ...prev, [campaign.id]: campaign }))
      return campaign
    } catch (err) {
      console.error('Erro ao criar campanha:', err)
      return null
    }
  }

  const getCampaign = (id) => {
    return campaigns[id]
  }

  const addPlayer = async (campaignId, playerEmail, playerName) => {
    try {
      const res = await fetch(`${API_URL}/api/campaigns/${campaignId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerEmail, playerName })
      })
      return await res.json()
    } catch (err) {
      console.error('Erro ao adicionar jogador:', err)
      return null
    }
  }

  const getPlayers = async (campaignId) => {
    try {
      const res = await fetch(`${API_URL}/api/campaigns/${campaignId}/players`)
      return await res.json()
    } catch (err) {
      console.error('Erro ao buscar jogadores:', err)
      return []
    }
  }

  return (
    <CampaignContext.Provider value={{
      campaigns, loading, createCampaign, getCampaign, addPlayer, getPlayers,
      refresh: loadCampaigns
    }}>
      {children}
    </CampaignContext.Provider>
  )
}

export function useCampaign() {
  const context = useContext(CampaignContext)
  if (!context) {
    throw new Error('useCampaign must be used within CampaignProvider')
  }
  return context
}