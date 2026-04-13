import { useCharacter } from '../context/CharacterContext'
import { getItensClasse } from '../data/itens'

function calcularTotalPO(pl, po, pp, pc) {
  const total = (parseInt(pl) || 0) * 10 + 
               (parseInt(po) || 0) + 
               (parseInt(pp) || 0) * 0.1 + 
               (parseInt(pc) || 0) * 0.01
  return total.toFixed(2).replace(/\.?0+$/, '').replace(/\.$/, '')
}

export default function Dinheiro() {
  const { personagem, atualizarCampo } = useCharacter()
  
  const classe = personagem.classe
  const itensClasse = getItensClasse(classe)
  const dinheiroClasse = itensClasse?.dinheiro_sem_kit || { po: '0', pl: '0', pp: '0', pc: '0' }
  
  const money = personagem.equipment?.money || {}
  const po = money.po || dinheiroClasse.po || '0'
  const pl = money.pl || dinheiroClasse.pl || '0'
  const pp = money.pp || dinheiroClasse.pp || '0'
  const pc = money.pc || dinheiroClasse.pc || '0'
  
  const totalPO = calcularTotalPO(pl, po, pp, pc)
  
  const handleChange = (campo, valor) => {
    atualizarCampo('equipment', {
      ...personagem.equipment,
      money: {
        ...personagem.equipment?.money,
        [campo]: valor
      }
    })
  }
  
  return (
    <div className="dinheiro-container">
      <h3>Dinheiro</h3>
      <div className="money-row">
        <div className="money-total">
          <strong>Total: {totalPO} PO</strong>
        </div>
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
    </div>
  )
}