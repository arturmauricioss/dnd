import Button from '@components/ui/basic/Button/Button'
import type { MetodoSelectorProps } from '@features/character-creation/types'
import type { MetodoAtributos } from '@systems/attributes/types'
import './MetodoSelector.css'

const metodos: MetodoAtributos[] = ['4d6-baixo', 'definido', 'compra', 'livre']

const metodoLabels: Record<MetodoAtributos, string> = {
  'livre': 'Livre',
  '4d6-baixo': '4d6',
  'definido': 'Definido',
  'compra': 'Pontos'
}

const metodoDescricoes: Record<MetodoAtributos, string> = {
  'livre': 'Role dados e adicione os valores.',
  '4d6-baixo': 'Clique para trocar os atributos de ordem',
  'definido': 'Clique para trocar os atributos de ordem',
  'compra': 'Custo 1 de 9-14. Custo 2 de 15-16. Custo 3 de 17-18'
}

export default function MetodoSelector({ 
  metodo, 
  onMetodoChange, 
  onConfirmar, 
  nome,
  gerarNome,
  onNomeChange
}: MetodoSelectorProps) {
  const handleConfirmar = () => {
    let nomeFinal = nome.trim()
    if (!nomeFinal) {
      nomeFinal = gerarNome()
      onNomeChange(nomeFinal)
    }
    onConfirmar()
  }

  return (
    <div className="metodo-selector">
      <label className="form-label">Método de Atributos</label>
      <div className="metodos-grid">
        {metodos.map(m => (
          <button
            key={m}
            type="button"
            className={`metodo-btn ${metodo === m ? 'active' : ''}`}
            onClick={() => onMetodoChange(m)}
          >
            {metodoLabels[m]}
          </button>
        ))}
      </div>
      
      {metodo && (
        <p className="metodo-dica">{metodoDescricoes[metodo]}</p>
      )}
      
      {metodo && (
        <Button variant="primary" onClick={handleConfirmar}>
          Confirmar {metodoLabels[metodo]}
        </Button>
      )}
    </div>
  )
}