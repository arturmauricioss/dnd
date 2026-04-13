import { useState } from 'react'
import { useCharacter } from '../context/CharacterContext'
import { calcularModificador } from '../data/opcoes'

const armasPredefinidas = [
  { nome: 'Adaga', tipo: 'perfurando', dano: '1d4', critico: '19-20/x2', alcance: '1,5m', peso: '0,5kg' },
  { nome: 'Arco Curto', tipo: 'perfurante', dano: '1d6', critico: 'x3', alcance: '15m', peso: '1kg' },
  { nome: 'Arco Longo', tipo: 'perfurante', dano: '1d8', critico: 'x3', alcance: '30m', peso: '1kg' },
  { nome: 'Bastao', tipo: 'contusão', dano: '1d6', critico: 'x2', alcance: '1,5m', peso: '2kg' },
  { nome: 'Espada Curta', tipo: 'cortante', dano: '1d6', critico: '19-20/x2', alcance: '1,5m', peso: '1kg' },
  { nome: 'Espada Longa', tipo: 'cortante', dano: '1d8', critico: '19-20/x2', alcance: '1,5m', peso: '1,5kg' },
  { nome: 'Machado de Guerra', tipo: 'cortante', dano: '1d10', critico: 'x3', alcance: '1,5m', peso: '3kg' },
  { nome: 'Machado Médio', tipo: 'cortante', dano: '1d8', critico: 'x3', alcance: '1,5m', peso: '2kg' },
  { nome: 'Maça', tipo: 'contusão', dano: '1d8', critico: 'x2', alcance: '1,5m', peso: '2,5kg' },
  { nome: 'Manopla', tipo: 'contusão', dano: '1d6', critico: 'x2', alcance: '1,5m', peso: '1kg' },
]

export default function Weapons() {
  const { getModificador } = useCharacter()
  const forMod = getModificador('forca') || calcularModificador(10)
  const dexMod = getModificador('destreza') || calcularModificador(10)
  
  const [armas, setArmas] = useState([
    { nome: '', tipo: '', dano: '', critico: '', alcance: '', peso: '', quantidade: 1, bonusAtaque: 0, bonusDano: 0 }
  ])

  const handleWeaponChange = (index, campo, valor) => {
    const novasArmas = [...armas]
    novasArmas[index] = { ...novasArmas[index], [campo]: valor }
    setArmas(novasArmas)
  }

  const handleSelectWeapon = (index, armaNome) => {
    const arma = armasPredefinidas.find(a => a.nome === armaNome)
    if (arma) {
      handleWeaponChange(index, 'nome', arma.nome)
      handleWeaponChange(index, 'tipo', arma.tipo)
      handleWeaponChange(index, 'dano', arma.dano)
      handleWeaponChange(index, 'critico', arma.critico)
      handleWeaponChange(index, 'alcance', arma.alcance)
      handleWeaponChange(index, 'peso', arma.peso)
    }
  }

  const adicionarArma = () => {
    setArmas([...armas, { nome: '', tipo: '', dano: '', critico: '', alcance: '', peso: '', quantidade: 1, bonusAtaque: 0, bonusDano: 0 }])
  }

  const removerArma = (index) => {
    setArmas(armas.filter((_, i) => i !== index))
  }

  return (
    <div className="weapons-container">
      <h3>Armas</h3>
      
      <div className="weapons-list">
        {armas.map((arma, index) => (
          <div key={index} className="weapon-item">
            <div className="weapon-header">
              <select onChange={(e) => handleSelectWeapon(index, e.target.value)} value={arma.nome}>
                <option value="">Selecionar arma...</option>
                {armasPredefinidas.map((a) => (
                  <option key={a.nome} value={a.nome}>{a.nome}</option>
                ))}
              </select>
              <button onClick={() => removerArma(index)}>X</button>
            </div>

            <div className="weapon-fields">
              <div className="field">
                <label>Tipo</label>
                <input type="text" value={arma.tipo} onChange={(e) => handleWeaponChange(index, 'tipo', e.target.value)} />
              </div>
              <div className="field">
                <label>Dano</label>
                <input type="text" value={arma.dano} onChange={(e) => handleWeaponChange(index, 'dano', e.target.value)} />
              </div>
              <div className="field">
                <label>Crítico</label>
                <input type="text" value={arma.critico} onChange={(e) => handleWeaponChange(index, 'critico', e.target.value)} />
              </div>
              <div className="field">
                <label>Alcance</label>
                <input type="text" value={arma.alcance} onChange={(e) => handleWeaponChange(index, 'alcance', e.target.value)} />
              </div>
              <div className="field">
                <label>Peso</label>
                <input type="text" value={arma.peso} onChange={(e) => handleWeaponChange(index, 'peso', e.target.value)} />
              </div>
              <div className="field small">
                <label>Qtd</label>
                <input type="number" min="1" value={arma.quantidade} onChange={(e) => handleWeaponChange(index, 'quantidade', parseInt(e.target.value) || 1)} />
              </div>
              <div className="field small">
                <label>Bônus Ataque</label>
                <input type="number" value={arma.bonusAtaque} onChange={(e) => handleWeaponChange(index, 'bonusAtaque', parseInt(e.target.value) || 0)} />
              </div>
              <div className="field small">
                <label>Bônus Dano</label>
                <input type="number" value={arma.bonusDano} onChange={(e) => handleWeaponChange(index, 'bonusDano', parseInt(e.target.value) || 0)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={adicionarArma} className="add-weapon">+ Adicionar Arma</button>
    </div>
  )
}