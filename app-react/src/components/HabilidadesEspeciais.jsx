import { useState } from 'react'

const habilidadesPorClasse = {
  barbaro: [
    'Fúria (1/dia) - +4 For, +2 Fort, -2 CA',
    'Movimento Acelerado',
    'Péleve',
    'Escalada Ágil',
  ],
  bardo: [
    'Gestos Sombras',
    'Inspiração Bardica (1/dia)',
    'Conhecimento Bardo',
    'Música (Façanhas)',
  ],
  clerigo: [
    'Exorcismo',
    'Dom Divino',
    'Canalizar Energia (+d6)',
  ],
  druida: [
    'Empatia com Animais',
    'Resistência Natureza',
    'Exploração',
    'Companheiro Animal',
  ],
  feiticeiro: [
    'Sangue Arcano',
    'Metamagia Sugestão',
    'Cantrip',
  ],
  guerreiro: [
    'Movimento Acelerado',
    'Arquétipo de Classe',
    'Pontos de Mana',
  ],
  ladino: [
    'Ataque Furtivo (+1d6)',
    'Testemunha',
    'Gíria dos Ladrões',
    'Evitação',
  ],
  mago: [
    'Metamagia Extensão',
    'Magias',
    'Cajado',
    'Livro de Magias',
  ],
  monge: [
    'Bônus de Sab',
    'Movimento Silencioso',
    'Queda Suave',
    'Punhos Ágeis',
  ],
  paladino: [
    'Detectar Mal',
    'Canalizar Energia',
    'Graça Divina',
    'Montaria',
  ],
  ranger: [
    'Inimigo Favorito',
    'Companheiro Animal',
    'Fúria do Ranger',
  ],
}

export default function HabilidadesEspeciais() {
  const [habTexto, setHabTexto] = useState('')
  const [habSalvas, setHabSalvas] = useState([])

  const classeSelecionada = 'barbaro'
  const habilidadesDefault = habilidadesPorClasse[classeSelecionada] || []

  const handleAdd = () => {
    if (habTexto.trim()) {
      setHabSalvas([...habSalvas, habTexto])
      setHabTexto('')
    }
  }

  const handleRemove = (index) => {
    setHabSalvas(habSalvas.filter((_, i) => i !== index))
  }

  return (
    <div className="habilidades-container">
      <h3>Habilidades Especiais</h3>

      <div className="hab-default">
        <h4>Padrão da Classe</h4>
        <ul>
          {habilidadesDefault.map((hab, i) => (
            <li key={i}>{hab}</li>
          ))}
        </ul>
      </div>

      <div className="hab-custom">
        <h4>Adicionais</h4>
        <div className="hab-list">
          {habSalvas.map((hab, i) => (
            <div key={i} className="hab-item">
              <span>{hab}</span>
              <button onClick={() => handleRemove(i)}>X</button>
            </div>
          ))}
        </div>

        <div className="hab-input">
          <input
            type="text"
            value={habTexto}
            onChange={(e) => setHabTexto(e.target.value)}
            placeholder="Nova habilidade..."
          />
          <button onClick={handleAdd}>+</button>
        </div>
      </div>
    </div>
  )
}