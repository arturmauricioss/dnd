import { useEffect, useState } from 'react'
import { buscarCommits, Commit } from '../../services/api'
import SVG from '../ui/SVG'

export default function Novidades() {
  const [commits, setCommits] = useState<Commit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    buscarCommits().then((data) => {
      setCommits(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return null
  }

  if (commits.length === 0) {
    return null
  }

  function formatarData(dataStr: string) {
    const data = new Date(dataStr)
    const agora = new Date()
    const diffMs = agora.getTime() - data.getTime()
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDias === 0) return 'Hoje'
    if (diffDias === 1) return 'Ontem'
    if (diffDias < 7) return `Há ${diffDias} dias`
    return data.toLocaleDateString('pt-BR')
  }

  return (
    <div className="novidades">
      <h3 className="section-title active">
        <SVG name="add" className="section-icon" />
        Novidades
      </h3>

      <div className="novidades-list">
        {commits.slice(0, 3).map((commit, index) => (
          <div key={index} className="novidade-card">
            <span className="novidade-mensagem">{commit.mensagem}</span>
            <span className="novidade-data">{formatarData(commit.data)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}