import Button from '@components/ui/basic/Button/Button'
import OptionCard from '@components/ui/common/OptionCard/OptionCard'
import type { TendenciaSelectionProps } from '@features/character-creation/types'
import './SelectionSection.css'

export default function TendenciaSelection({
  alinhamentos,
  divindadesOrdenadas,
  classeId,
  tendenciaSelecionada,
  divindadeSelecionada,
  onTendenciaSelect,
  onDivindadeSelect,
  onConfirm,
  tendenciaPermitida,
  getPontuacaoDeus,
  raca
}: TendenciaSelectionProps) {
  return (
    <div className="selection-section">
      <h2 className="section-title section-label">Tendência</h2>
      <div className="tendencia-grid">
        {alinhamentos.map(a => {
          const permitir = classeId ? tendenciaPermitida(classeId, a.id) : true
          return (
            <OptionCard
              key={a.id}
              active={tendenciaSelecionada === a.id}
              disabled={!permitir}
              onClick={() => onTendenciaSelect(a.id)}
            >
              {a.nome}
            </OptionCard>
          )
        })}
      </div>
      
      {tendenciaSelecionada && (
        <>
          <h3 className="section-title">Divindade</h3>
          <div className="options-grid">
            {divindadesOrdenadas.map(d => {
              const pontos = getPontuacaoDeus(d.id, raca, tendenciaSelecionada, classeId)
              const estrelas = '★'.repeat(pontos)
              return (
                <OptionCard
                  key={d.id}
                  active={divindadeSelecionada === d.id}
                  onClick={() => onDivindadeSelect(d.id)}
                >
                  {d.nome}
                  {pontos > 0 && <span className="estrelas-badge">{estrelas}</span>}
                </OptionCard>
              )
            })}
          </div>
        </>
      )}

      {tendenciaSelecionada && divindadeSelecionada && (
        <Button variant="primary" onClick={onConfirm}>
          Confirmar Tendência e Divindade
        </Button>
      )}
    </div>
  )
}