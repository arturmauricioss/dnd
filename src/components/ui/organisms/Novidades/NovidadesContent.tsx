import type { NovidadesContentProps } from '@types'
import { Git } from '@components/icons'
import { formatarData } from '@utils/dateUtils'
import './Novidades.css'

export default function NovidadesContent({ commits, erro }: NovidadesContentProps) {
  return (
    <div className="novidades">
      <h3 className="section-header active">
        <Git className="section-icon" />
        Novidades {erro && <span className="novidades-offline">(modo offline)</span>}
      </h3>

      <div className="novidades-list">
        {commits.slice(0, 10).map((commit, index) => (
          <div key={index} className="novidade-card">
            <span className="novidade-mensagem">{commit.mensagem}</span>
            <span className="novidade-data">{formatarData(commit.data)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}