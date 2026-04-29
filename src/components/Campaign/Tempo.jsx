import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Page } from '../global'
import './Tempo.css'

export default function Tempo() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <Page title="Controle de Tempo">
      <div className="tempo-container">
        <h2>⏱️ Controle de Tempo</h2>
        
        <div className="tempo-card">
          <p>Controle o tempo da campanha</p>
          
          <div className="tempo-actions">
            <button>+1 Rodada (6s)</button>
            <button>+1 Minuto (10 rodadas)</button>
            <button>+10 Minutos (100 rodadas)</button>
            <button>+1 Hora (600 rodadas)</button>
            <button>+1 Dia (8640 rodadas)</button>
          </div>

          <div className="tempo-input">
            <input type="number" placeholder="Rodadas" />
            <button>Avançar Tempo</button>
          </div>
        </div>

        <div className="tempo-info">
          <p>1 rodada = 6 segundos no jogo</p>
          <p>10 rodadas = 1 minuto</p>
          <p>600 rodadas = 1 hora</p>
          <p>6000 rodadas = 10 horas (efeitos expiram)</p>
        </div>
      </div>
    </Page>
  )
}