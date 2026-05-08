import Button from '@components/ui/atoms/Button/Button'
import type { AparenciaSelectionProps } from '@types'
import './SelectionSection.css'

export default function AparenciaSelection({
  raca,
  genero,
  variacao,
  totalImagens,
  onVariacaoChange,
  onConfirm,
  getImagemPath
}: AparenciaSelectionProps) {
  return (
    <div className="selection-section">
      <h3 className="section-title">Selecione a Aparência</h3>
      <div className="options-grid" key={raca}>
        {Array.from({ length: totalImagens || 1 }, (_, i) => i + 1).map(num => (
          <button
            key={`${raca}-${num}`}
            type="button"
            className={`option-image-btn ${variacao === num ? 'active' : ''}`}
            onClick={() => onVariacaoChange(num)}
          >
            <img 
              src={getImagemPath(raca, genero, num)} 
              alt={`Opção ${num}`}
              className="option-thumbnail"
            />
          </button>
        ))}
      </div>
      <Button variant="primary" onClick={onConfirm}>
        Confirmar Aparência
      </Button>
    </div>
  )
}