import { useNavigate } from 'react-router-dom'
import './Navigation.css'

export default function Navigation({ prev, next }) {
  const navigate = useNavigate()

  return (
    <div className="nav-wrapper">
      <div className="nav-buttons">

        {prev ? (
          <button className="btn-prev" onClick={() => navigate(prev)}>
            ←
          </button>
        ) : <div />}

        {next && (
          <button className="btn-next" onClick={() => navigate(next)}>
            →
          </button>
        )}

      </div>
    </div>
  )
}