import { useCharacter } from '../context/CharacterContext'
import { atributos, calcularModificador, getBonusRacial } from '../data/opcoes'

export default function Atributos() {
  const { personagem, atualizarAtributo } = useCharacter()

  const bonusRacial = getBonusRacial(personagem.race)

  return (
    <div className="atributos-container">
      <h3>Atributos</h3>
      <div className="atributos-grid">
        {atributos.map((attr) => {
          const valorBase = personagem.atributos[attr.id] || 10
          const bonusRaca = bonusRacial[attr.id] || 0
          let total = valorBase + bonusRaca
          if (attr.id === 'inteligencia' && total < 3) total = 3
          const mod = calcularModificador(total)
          const sinal = mod >= 0 ? '+' : ''

          return (
            <div key={attr.id} className="atributo-card">
              <div className="atributo-nome">{attr.nome}</div>
              
              <div className="atributo-linha">
                <span className="atributo-label">Base</span>
                <input
                  type="number"
                  className="atributo-input"
                  value={valorBase}
                  onChange={(e) => {
                    const valor = parseInt(e.target.value)
                    if (!isNaN(valor)) {
                      atualizarAtributo(attr.id, valor)
                    }
                  }}
                  onBlur={(e) => {
                    const valor = parseInt(e.target.value) || 3
                    const valoreLimitado = Math.max(3, Math.min(18, valor))
                    atualizarAtributo(attr.id, valoreLimitado)
                  }}
                />
              </div>

              <div className="atributo-linha">
                <span className="atributo-label">Racial</span>
                <span className="atributo-value">{bonusRaca >= 0 ? `+${bonusRaca}` : bonusRaca}</span>
              </div>

              <div className="atributo-linha">
                <span className="atributo-label">Total</span>
                <span className="atributo-value valor-total">{total}</span>
              </div>

              <div className="atributo-linha">
                <span className="atributo-label">Mod</span>
                <span className={`atributo-value mod ${mod >= 0 ? 'positivo' : 'negativo'}`}>
                  {sinal}{mod}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}