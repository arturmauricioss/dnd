import { useState } from 'react'
import { useCharacter } from '../context/CharacterContext'
import { getItensClasse } from '../data/itemDatabase'

function calcularTotalPO(pl, po, pp, pc) {
  const total = (parseInt(pl) || 0) * 10 + 
               (parseInt(po) || 0) + 
               (parseInt(pp) || 0) * 0.1 + 
               (parseInt(pc) || 0) * 0.01
  return total.toFixed(2).replace(/\.?0+$/, '').replace(/\.$/, '')
}

export default function Kit() {
  const { personagem, atualizarCampo } = useCharacter()
  const [usarKit, setUsarKit] = useState(personagem.usarKit || false)
  
  const classe = personagem.classe
  const itensClasse = getItensClasse(classe)
  const dinheiroClasse = itensClasse?.dinheiro_sem_kit || { po: '0', pl: '0' }
  
  const money = personagem.equipment?.money || {}
  const po = money.po ?? dinheiroClasse.po ?? '0'
  const pl = money.pl ?? dinheiroClasse.pl ?? '0'
  const pp = money.pp ?? dinheiroClasse.pp ?? '0'
  const pc = money.pc ?? dinheiroClasse.pc ?? '0'
  const totalPO = calcularTotalPO(pl, po, pp, pc)
  
const handleUsarKitChange = (e) => {
    const usar = e.target.checked
    setUsarKit(usar)
    atualizarCampo('usarKit', usar)
    
    if (usar && itensClasse) {
      const itensLista = itensClasse.itens?.map(i => i.nome).join('\n') || ''
      atualizarCampo('equipment', {
        ...personagem.equipment,
        itens: itensLista
      })
    }
  }

  const handleChange = (campo, valor) => {
    atualizarCampo('equipment', {
      ...personagem.equipment,
      money: {
        ...personagem.equipment?.money,
        [campo]: valor
      }
    })
  }

  if (!itensClasse) {
    return (
      <div className="kit-container">
        <h3>Kit Inicial</h3>
        <p>Selecione uma classe</p>
      </div>
    )
  }

  const dinheiroAtual = usarKit 
    ? itensClasse.dinheiro_kit?.po || ''
    : itensClasse.dinheiro_sem_kit?.po || ''

  return (
    <div className="kit-container">
      <h3>Kit Inicial</h3>
      
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={usarKit}
          onChange={handleUsarKitChange}
        />
        Usar Kit Inicial da Classe
      </label>
      
      {usarKit && (
        <div className="kit-preview">
          <p><strong>Armas:</strong> {itensClasse.armas?.map(a => a.nome).join(', ')}</p>
          <p><strong>Armadura:</strong> {itensClasse.armadura?.nome || 'Nenhuma'}</p>
          <p><strong>Escudo:</strong> {itensClasse.escudo?.nome || 'Nenhum'}</p>
          <p><strong>Outros:</strong> {itensClasse.itens?.map(i => i.nome).join(', ')}</p>
        </div>
      )}
      
      <div className="money-inputs">
        <label>
          <span>PL (Platina):</span>
          <input
            type="number"
            value={pl}
            onChange={(e) => handleChange('pl', e.target.value)}
            min="0"
          />
        </label>
        <label>
          <span>PO (Ouro):</span>
          <input
            type="number"
            value={po}
            onChange={(e) => handleChange('po', e.target.value)}
            placeholder={dinheiroAtual}
            min="0"
          />
        </label>
        <label>
          <span>PP (Prata):</span>
          <input
            type="number"
            value={pp}
            onChange={(e) => handleChange('pp', e.target.value)}
            min="0"
          />
        </label>
        <label>
          <span>PC (Cobre):</span>
          <input
            type="number"
            value={pc}
            onChange={(e) => handleChange('pc', e.target.value)}
            min="0"
          />
        </label>
      </div>
      <div className="money-total">
        <strong>Total: {totalPO} PO</strong>
      </div>
    </div>
  )
}