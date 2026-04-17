import { useState } from 'react'
import { useCharacter } from '../context/CharacterContext'
import { atributos, calcularModificador, getBonusRacial } from '../data/opcoes'
import Navigation from './Navigation'
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
          const valorBase = personagem.atributos[attr.id] || 10
          const bonusRaca = bonusRacial[attr.id] || 0

          let total = valorBase + bonusRaca
          if (attr.id === 'inteligencia' && total < 3) total = 3

          const mod = calcularModificador(total)
          const sinal = mod >= 0 ? '+' : ''

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
                {bonusRaca >= 0 ? `+${bonusRaca}` : bonusRaca}
              </span>

              <span className="total">{total}</span>

              <span className={`mod ${mod >= 0 ? 'positivo' : 'negativo'}`}>
                {sinal}{mod}
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