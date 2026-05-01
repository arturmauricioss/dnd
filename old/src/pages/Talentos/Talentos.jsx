import { useMemo } from 'react'
import { useCharacter } from '@context/CharacterContext'
import { talentosData } from '@data/talentosData'
import { podeEscolherTalento } from '@rules/talento'
import { Navigation } from '@layout'
import './Talentos.css'

export default function Talentos() {
  const { personagem, atualizarCampo, getAtributoTotal } = useCharacter()

  const talentosSelecionados = personagem.talentos || []

  const talentosDisponiveis = useMemo(() => {
    return Object.values(talentosData)
  }, [])

  const adicionarTalento = (id) => {
    if (talentosSelecionados.includes(id)) return

    atualizarCampo('talentos', [...talentosSelecionados, id])
  }

  return (
    <div className="talentos-container">
      <div className="talentos-list">

        {talentosDisponiveis.map((talento) => {
          const selecionado = talentosSelecionados.includes(talento.id)

          const podeEscolher = podeEscolherTalento(
            talento,
            personagem,
            getAtributoTotal
          )

          return (
            <div
              key={talento.id}
              className={`talento-card 
                ${selecionado ? 'selected' : ''} 
                ${!podeEscolher ? 'locked' : ''}`}
            >
              <div className="talento-header">
                <span className="talento-nome">{talento.nome}</span>

                {!selecionado && podeEscolher && (
                  <button onClick={() => adicionarTalento(talento.id)}>+</button>
                )}

                {selecionado && <span>✓</span>}
              </div>

              <div className="talento-desc">{talento.descricao}</div>

              {talento.requisitos.length > 0 && (
                <div className="talento-req">
                  Req:
                  {talento.requisitos.map((r, i) => (
                    <span key={i}>
                      {r.tipo === 'atributo' && `${r.atributo} ${r.valor}`}
                      {r.tipo === 'talento' && r.talento}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )
        })}

      </div>

      <Navigation prev="/personagem/atributos" next="/personagem/pericias" />
    </div>
  )
}