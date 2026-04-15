import { useState } from 'react'
import { useCharacter } from '../context/CharacterContext'

const armadurasPredefinidas = [
  { nome: 'Couro', bonus: 2, penalidade: 5, maxDex: 6 },
  { nome: 'Couro Hardened', bonus: 3, penalidade: 6, maxDex: 4 },
  { nome: 'Camisa de Malha', bonus: 4, penalidade: 6, maxDex: 4 },
  { nome: 'Cota de Malha', bonus: 5, penalidade: 7, maxDex: 3 },
  { nome: 'Meia Armadura', bonus: 6, penalidade: 8, maxDex: 2 },
  { nome: 'Armadura de Placas', bonus: 8, penalidade: 10, maxDex: 0 },
]

const escudosPredefinidos = [
  { nome: 'Leve', bonus: 1, penalidade: 2 },
  { nome: 'Pesado', bonus: 2, penalidade: 5 },
  { nome: 'Grande', bonus: 2, penalidade: 7 },
]

export default function Equipment() {
  const { personagem, atualizarCampo } = useCharacter()
  
  const [armadura, setArmadura] = useState(null)
  const [escudo, setEscudo] = useState(null)
  const [dinheiro, setDinheiro] = useState({ po: 0, pl: 0, pp: 0, pc: 0 })

  const handleDinheiroChange = (moeda, valor) => {
    setDinheiro({ ...dinheiro, [moeda]: valor })
  }

  return (
    <div className="equipment-container">
      <h3>Equipamentos</h3>

      <div className="equipment-section">
        <h4>Dinheiro</h4>
        <div className="money-row">
          <div className="money-item">
            <label>PO (Ouro)</label>
            <input
              type="number"
              min="0"
              value={dinheiro.po}
              onChange={(e) => handleDinheiroChange('po', parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="money-item">
            <label>PL (Prata)</label>
            <input
              type="number"
              min="0"
              value={dinheiro.pl}
              onChange={(e) => handleDinheiroChange('pl', parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="money-item">
            <label>PP (Bronze)</label>
            <input
              type="number"
              min="0"
              value={dinheiro.pp}
              onChange={(e) => handleDinheiroChange('pp', parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="money-item">
            <label>PC (Cobre)</label>
            <input
              type="number"
              min="0"
              value={dinheiro.pc}
              onChange={(e) => handleDinheiroChange('pc', parseInt(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>

      <div className="equipment-section">
        <h4>Armadura</h4>
        <div className="armor-row">
          <select onChange={(e) => {
            const nome = e.target.value
            setArmadura(armadurasPredefinidas.find(a => a.nome === nome) || null)
          }}>
            <option value="">Nenhuma</option>
            {armadurasPredefinidas.map((a) => (
              <option key={a.nome} value={a.nome}>{a.nome} (+{a.bonus})</option>
            ))}
          </select>
          {armadura && (
            <>
              <span>Bônus: +{armadura.bonus}</span>
              <span>Penalidade: -{armadura.penalidade}</span>
              <span>Máx Dex: {armadura.maxDex}</span>
            </>
          )}
        </div>
      </div>

      <div className="equipment-section">
        <h4>Escudo</h4>
        <div className="shield-row">
          <select onChange={(e) => {
            const nome = e.target.value
            setEscudo(escudosPredefinidos.find(s => s.nome === nome) || null)
          }}>
            <option value="">Nenhum</option>
            {escudosPredefinidos.map((s) => (
              <option key={s.nome} value={s.nome}>{s.nome} (+{s.bonus})</option>
            ))}
          </select>
          {escudo && (
            <>
              <span>Bônus: +{escudo.bonus}</span>
              <span>Penalidade: -{escudo.penalidade}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}