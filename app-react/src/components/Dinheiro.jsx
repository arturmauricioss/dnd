import { useEffect, useMemo } from 'react'
import { useCharacter } from '../context/CharacterContext'
import { todosItens } from '../data/itemDatabase'
import { converterParaPO, converterParaCobre } from '../data/dinheiro'
import './dinheiro.css'

export default function Dinheiro() {
  const { personagem, atualizarCampo } = useCharacter()

  const itensClasse = getItensClasse(personagem.classe)

  const dinheiroClasse = itensClasse?.dinheiro_sem_kit || {
    pl: 0,
    po: 0,
    pp: 0,
    pc: 0
  }

  const money = personagem.equipment?.money || {
    pl: 0,
    po: 0,
    pp: 0,
    pc: 0
  }

  // inicializa dinheiro padrão se estiver vazio
  useEffect(() => {
    if (!personagem.classe) return

    const vazio = converterParaCobre(money) === 0

    if (vazio) {
      atualizarCampo('equipment', {
        ...personagem.equipment,
        money: dinheiroClasse
      })
    }
  }, [personagem.classe])

  // total sempre baseado em cobre (seguro)
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
      <h3>Dinheiro</h3>

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
  )
}