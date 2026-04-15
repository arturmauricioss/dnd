import { useMemo, useState, useEffect } from 'react'
import { useCharacter } from '../context/CharacterContext'
import { getDinheiroInicial } from '../data/itemDatabase'
import { converterParaPO } from '../data/dinheiro'
import './dinheiro.css'

export default function Dinheiro() {
  const { personagem, atualizarCampo } = useCharacter()
  const [expandido, setExpandido] = useState(true)

  const money = useMemo(() => {
    return personagem.equipment?.money || {
      pl: 0,
      po: 0,
      pp: 0,
      pc: 0
    }
  }, [personagem.equipment?.money])

  const dinheiroClasse = useMemo(() => {
    return getDinheiroInicial(personagem.classe) || {
      pl: 0,
      po: 0,
      pp: 0,
      pc: 0
    }
  }, [personagem.classe])

  useEffect(() => {
    if (!personagem.classe) return
    if (personagem.equipment?.money && Object.values(personagem.equipment.money).some(v => v > 0)) return
    
    atualizarCampo('equipment', {
      ...personagem.equipment,
      money: dinheiroClasse
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personagem.classe, dinheiroClasse, atualizarCampo])

  const totalPO = useMemo(() => {
    return converterParaPO(money)
  }, [money])

  const handleChange = (campo, valor) => {
    atualizarCampo('equipment', {
      ...personagem.equipment,
      money: {
        ...money,
        [campo]: Number(valor) || 0
      }
    })
  }

  return (
    <div className="dinheiro-container">
      <div className="section-header">
        <h3>Dinheiro</h3>
        <button className="btn-collapse" onClick={() => setExpandido(!expandido)}>
          {expandido ? '▼' : '▶'}
        </button>
      </div>
      {expandido && (
        <div className="dinheiro-content">
        <div className="money-row">
          <div className="money-total">
            <strong>
              Total: {totalPO.toFixed(2).replace(/\.?0+$/, '')} PO
            </strong>
          </div>

          <label>
            <span>PL</span>
            <input
              type="number"
              min="0"
              value={money.pl}
              onChange={(e) => handleChange('pl', e.target.value)}
            />
          </label>

          <label>
            <span>PO</span>
            <input
              type="number"
              min="0"
              value={money.po}
              onChange={(e) => handleChange('po', e.target.value)}
            />
          </label>

          <label>
            <span>PP</span>
            <input
              type="number"
              min="0"
              value={money.pp}
              onChange={(e) => handleChange('pp', e.target.value)}
            />
          </label>

          <label>
            <span>PC</span>
            <input
              type="number"
              min="0"
              value={money.pc}
              onChange={(e) => handleChange('pc', e.target.value)}
            />
          </label>
        </div>
      </div>
      )}
    </div>
  )
}