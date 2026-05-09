import type { CampaignListProps } from '@features/campaigns/types'
import './CampaignList.css'

export default function CampaignList({ children }: CampaignListProps) {
  return <div className="campaigns-list">{children}</div>
}