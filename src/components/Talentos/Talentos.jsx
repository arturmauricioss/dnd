import { useMemo } from 'react'
import { useCharacter } from '../../context/CharacterContext'
import { Navigation } from '../global'
import './Talentos.css'

export default function Talentos() {
  const { personagem } = useCharacter()

  const talentos = useMemo(() => {
    return personagem.talentos || []
  }, [personagem.talentos])

  return (
    <div className="talentos-container">
      <div className="talentos-list">
        {talentos.length === 0 ? (
          <div className="empty-message">
            Nenhum talento selecionado.
          </div>
        ) : (
          talentos.map((talento, index) => (
            <div key={index} className="talento-row">
              <div className="talento-nome">{talento}</div>
            </div>
          ))
        )}
      </div>

      <Navigation prev="/atributos" next="/pericias" />
    </div>
  )
}