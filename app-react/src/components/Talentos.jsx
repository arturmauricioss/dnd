import { useState } from 'react'

const talentosPredefinidos = [
  { nome: 'Academico', tipo: 'geral', beneficio: { pericia: { 'Conhecimento (História)': 2 } } },
  { nome: 'Agilidade Felina', tipo: 'geral', beneficio: { esquiva: true } },
  { nome: 'Ataque Poderoso', tipo: 'combate', beneficio: { dano: 1 } },
  { nome: 'ATAQUE Em FOCO', tipo: 'combate', beneficio: { ataque: 1 } },
  { nome: 'Combate Defensivo', tipo: 'combate', beneficio: { ca: 2 } },
  { nome: 'Esquiva', tipo: 'geral', beneficio: { esquiva: true } },
  { nome: 'Foco em Arma (Arma)', tipo: 'combate', beneficio: { ataque: 1 } },
  { nome: 'Foco em Arma Maior', tipo: 'combate', beneficio: { ataque: 1 } },
  { nome: 'Grito de Guerra', tipo: 'geral', beneficio: { iniciativa: 2 } },
  { nome: 'Iniciativa Aprimorada', tipo: 'geral', beneficio: { iniciativa: 4 } },
  { nome: 'Mobilidade', tipo: 'geral', beneficio: { ac: 4 } },
  { nome: 'Percepcao Aprimorada', tipo: 'geral', beneficio: { pericia: { 'Observar': 2, 'Ouvir': 2 } } },
  { nome: 'Reflexos de Combate', tipo: 'geral', beneficio: { iniciativa: 2 } },
  { nome: 'Robustez', tipo: 'geral', beneficio: { pv: 3 } },
  { nome: 'Sangue Frio', tipo: 'geral', beneficio: { resistencia: 2 } },
  { nome: 'Talento de Raça', tipo: 'racial', beneficio: {} },
  { nome: 'Treino Aprimorado', tipo: 'geral', beneficio: { save: 2 } },
  { nome: 'Vontade de Ferro', tipo: 'geral', beneficio: { save: 2 } },
]

export default function Talentos() {
  const [talentos, setTalentos] = useState(['', '', ''])

  const handleTalentChange = (index, valor) => {
    const novos = [...talentos]
    novos[index] = valor
    setTalentos(novos)
  }

  const adicionarTalentos = () => {
    if (talentos.length < 10) {
      setTalentos([...talentos, ''])
    }
  }

  const removerTalentos = (index) => {
    setTalentos(talentos.filter((_, i) => i !== index))
  }

  return (
    <div className="talentos-container">
      <h3>Talentos</h3>
      
      <div className="talentos-list">
        {talentos.map((talento, index) => (
          <div key={index} className="talento-item">
            <select value={talento} onChange={(e) => handleTalentChange(index, e.target.value)}>
              <option value="">Selecionar talento...</option>
              {talentosPredefinidos.map((t) => (
                <option key={t.nome} value={t.nome}>{t.nome}</option>
              ))}
            </select>
            {talentos.length > 1 && (
              <button onClick={() => removerTalentos(index)}>X</button>
            )}
          </div>
        ))}
      </div>

      <button onClick={adicionarTalentos} className="add-talento">+ Adicionar Talento</button>
    </div>
  )
}