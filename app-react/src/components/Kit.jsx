import { useState } from 'react'
import { useCharacter } from '../context/CharacterContext'
import { getItensClasse } from '../data/itens'

export default function Kit() {
  const { personagem, atualizarCampo } = useCharacter()
  const [usarKit, setUsarKit] = useState(personagem.usarKit || false)
  
  const classe = personagem.classe
  const itensClasse = getItensClasse(classe)
  
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
  
  const money = personagem.equipment?.money || {}
  
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
      
      <div>
        <label>PO</label>
        <input
          type="text"
          value={money.po || ''}
          onChange={(e) => handleChange('po', e.target.value)}
          placeholder={dinheiroAtual}
        />
      </div>
      
      <div className="money-row">
        <div>
          <label>PL</label>
          <input type="text" value={money.pl || ''} onChange={(e) => handleChange('pl', e.target.value)} />
        </div>
        <div>
          <label>PP</label>
          <input type="text" value={money.pp || ''} onChange={(e) => handleChange('pp', e.target.value)} />
        </div>
        <div>
          <label>Pc</label>
          <input type="text" value={money.pc || ''} onChange={(e) => handleChange('pc', e.target.value)} />
        </div>
      </div>
    </div>
  )
}