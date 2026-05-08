import type { CampaignCardProps } from '@types'
import './CampaignCard.css'

export default function CampaignCard({ campanha }: CampaignCardProps) {
  return (
    <div className="campaign-card">
      <img src={campanha.imagem} alt={campanha.nome} className="campaign-img" />
      <div className="campaign-info">
        <div className="campaign-header">
          <span className="campaign-nome">{campanha.nome}</span>
          <span className="campaign-jogadores">{campanha.jogadores} jogadores</span>
        </div>
        <span className="campaign-desc">{campanha.descricao}</span>
      </div>
    </div>
  )
}