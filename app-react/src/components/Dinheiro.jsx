import { useEffect } from 'react'
import { useCharacter } from '../context/CharacterContext'
import { getItensClasse } from '../data/itens'
import { converterParaPO, converterDePO } from '../data/dinheiro'
import './dinheiro.css'

export default function Dinheiro() {
  const { personagem, atualizarCampo } = useCharacter()

  const itensClasse = getItensClasse(personagem.classe)
  const dinheiroClasse = itensClasse?.dinheiro_sem_kit || {
    pl: '0',
    po: '0',
    pp: '0',
    pc: '0'
  }

  const money = personagem.equipment?.money || {}

  useEffect(() => {
    if (!personagem.classe) return

    const moneyAtual = personagem.equipment?.money

    const vazio =
      !moneyAtual ||
      (
        Number(moneyAtual.pl || 0) === 0 &&
        Number(moneyAtual.po || 0) === 0 &&
        Number(moneyAtual.pp || 0) === 0 &&
        Number(moneyAtual.pc || 0) === 0
      )

    if (vazio) {
      atualizarCampo('equipment', {
        ...personagem.equipment,
        money: dinheiroClasse,
      })
    }
  }, [personagem.classe])

  const pl = money.pl || '0'
  const po = money.po || '0'
  const pp = money.pp || '0'
  const pc = money.pc || '0'

  const totalPO = converterParaPO(money)

  const handleChange = (campo, valor) => {
    atualizarCampo('equipment', {
      ...personagem.equipment,
      money: {
        ...money,
        [campo]: valor
      }
    })
  }

  return (
    <div className="dinheiro-container">
      <h3>Dinheiro</h3>

      <div className="money-row">
        <div className="money-total">
          <strong>Total: {totalPO.toFixed(2).replace(/\.?0+$/, '')} PO</strong>
        </div>

        <label>
          <span>PL</span>
          <input type="number" value={pl} min="0" onChange={(e) => handleChange('pl', e.target.value)} />
        </label>

        <label>
          <span>PO</span>
          <input type="number" value={po} min="0" onChange={(e) => handleChange('po', e.target.value)} />
        </label>

        <label>
          <span>PP</span>
          <input type="number" value={pp} min="0" onChange={(e) => handleChange('pp', e.target.value)} />
        </label>

        <label>
          <span>PC</span>
          <input type="number" value={pc} min="0" onChange={(e) => handleChange('pc', e.target.value)} />
        </label>
      </div>
    </div>
  )
}