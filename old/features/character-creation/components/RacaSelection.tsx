import Button from '@components/ui/basic/Button/Button'
import OptionCard from '@components/ui/common/OptionCard/OptionCard'
import type { RacaSelectionProps } from '@features/character-creation/types'
import './SelectionSection.css'

export default function RacaSelection({ racas, racaSelecionada, onSelect, onConfirm }: RacaSelectionProps) {
  return (
    <div className="selection-section">
      <h2 className="section-title section-label">Raças</h2>
      <div className="options-grid">
        {racas.map(r => (
          <OptionCard
            key={r.id}
            active={racaSelecionada === r.id}
            onClick={() => onSelect(r.id)}
          >
            {r.nome}
          </OptionCard>
        ))}
      </div>
      
      {racaSelecionada && (
        <Button variant="primary" onClick={onConfirm}>
          Confirmar Raça
        </Button>
      )}
    </div>
  )
}