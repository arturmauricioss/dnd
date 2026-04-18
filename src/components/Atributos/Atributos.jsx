import { useCharacter } from '../../context/CharacterContext'
import { atributos } from './atributosData'
import { calcularModificador, getValorBase, getBonusRaca, getTotalAtributo, formatModificador } from './atributosLogic'
import { getBonusRacial } from '../Racas/racasLogic'
import { Navigation } from '../global'
import './Atributos.css'

export default function Atributos() {
  const { personagem, atualizarAtributo } = useCharacter()

  const bonusRacial = getBonusRacial(personagem.race)

  return (
    <div className="atributos-container">

      <div className="atributos-tabela">

        {/* HEADER */}
        <div className="atributos-header">
          <span>Atributos</span>
          <span>Base</span>
          <span>Racial</span>
          <span>Total</span>
          <span>Mod</span>
        </div>

        {/* LINHAS */}
        {atributos.map((attr) => {
          const valorBase = getValorBase(personagem, attr.id)
          const bonusRaca = getBonusRaca(bonusRacial, attr.id)
          const total = getTotalAtributo(valorBase, bonusRaca, attr.id)
          const mod = calcularModificador(total)

          return (
            <div key={attr.id} className="atributos-row">

              <span className="nome">
                <span className="nome-full">{attr.nome}</span>
                <span className="nome-short">{attr.curto}</span>
              </span>

              <input
                type="number"
                value={valorBase}
                onChange={(e) => {
                  const valor = parseInt(e.target.value)
                  if (!isNaN(valor)) atualizarAtributo(attr.id, valor)
                }}
              />

              <span className="racial">
                {formatModificador(bonusRaca)}
              </span>

              <span className="total">{total}</span>

              <span className={`mod ${mod >= 0 ? 'positivo' : 'negativo'}`}>
                {formatModificador(mod)}
              </span>

            </div>
          )
        })}
      </div>

      {/* NAVIGATION */}
      <Navigation prev="/" next="/combat" />
    </div>
  )
}