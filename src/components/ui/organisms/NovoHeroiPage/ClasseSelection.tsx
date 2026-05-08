import Button from '@components/ui/atoms/Button/Button'
import OptionCard from '@components/ui/molecules/OptionCard/OptionCard'
import type { ClasseSelectionProps } from '@types'
import './SelectionSection.css'

export default function ClasseSelection({
  classes,
  classeSelecionada,
  nivel,
  onSelect,
  onNivelChange,
  onConfirm
}: ClasseSelectionProps) {
  return (
    <div className="selection-section">
      <h2 className="section-title section-label">Classe</h2>
      <div className="options-grid">
        {classes.map(c => (
          <OptionCard
            key={c.id}
            active={classeSelecionada === c.id}
            onClick={() => onSelect(c.id)}
          >
            {c.nome}
          </OptionCard>
        ))}
      </div>
      
      {classeSelecionada && (
        <div className="nivel-selector">
          <label className="form-label">Nível</label>
          <div className="nivel-controls">
            <button 
              type="button" 
              className="nivel-btn"
              onClick={() => onNivelChange(Math.max(1, nivel - 1))}
            >
              -
            </button>
            <span className="nivel-valor">{nivel}</span>
            <button 
              type="button" 
              className="nivel-btn"
              onClick={() => onNivelChange(Math.min(20, nivel + 1))}
            >
              +
            </button>
          </div>
        </div>
      )}

      {classeSelecionada && (
        <Button variant="primary" onClick={onConfirm}>
          Confirmar Classe e Nível
        </Button>
      )}
    </div>
  )
}