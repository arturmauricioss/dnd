export interface Campanha {
  id: string
  nome: string
  descricao: string
  jogadores: number
  imagem: string
}

export interface CampaignCardProps {
  campanha: Campanha
}

export interface CampaignListProps {
  children: React.ReactNode
}