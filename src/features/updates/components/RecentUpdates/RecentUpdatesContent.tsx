import type { NovidadesContentProps } from './types'
import { Git } from '@components/ui/icons'
import { formatarData } from '@features/updates/utils/dateUtils'
import './RecentUpdates.css'

export default function RecentUpdatesContent({ commits, erro }: NovidadesContentProps) {
  return (
    <div className="recent-updates">
      <h2 className="section-header active">
        <Git className="section-icon" />
        Atualizações {erro && <span className="recent-updates-offline">(modo offline)</span>}
      </h2>

      <div className="recent-updates-list">
        {commits.slice(0, 10).map((commit, index) => (
          <div key={index} className="update-card">
            <span className="update-message">{commit.mensagem}</span>
            <span className="update-date">{formatarData(commit.data)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}