import Input from '@components/ui/atoms/Input/Input'
import Button from '@components/ui/atoms/Button/Button'
import type { AtributosGridProps } from '@types'
import './AtributosGrid.css'

export default function AtributosGrid({
  atributos,
  metodo,
  valoresConfirmados,
  podeReroll,
  somaModificadores,
  pontosUsados,
  onAtributoClick,
  onMouseDownPontos,
  onMouseUpPontos,
  onAtualizarAtributo,
  onValidarAtributo,
  onConfirmarReroll,
  onConfirmarValores,
  atributoSelecionado
}: AtributosGridProps) {
  const podeTrocar = valoresConfirmados || metodo === '4d6-baixo' || metodo === 'definido'
  const isReadOnly = valoresConfirmados || metodo === '4d6-baixo' || metodo === 'definido' || metodo === 'compra'

  return (
    <div className="atributos-section">
      {metodo === 'compra' && (
        <div className="pontos-compra">
          Pontos usados: {pontosUsados}/25
        </div>
      )}

      <div className="atributos-grid">
        {Object.entries(atributos).map(([key, value]) => (
          <div 
            key={key} 
            className={`atributo ${podeTrocar && atributoSelecionado === key ? 'selected' : ''}`}
            onClick={() => podeTrocar && onAtributoClick(key)}
          >
            <label className="form-label">{key.toUpperCase()}</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={value}
              readOnly={isReadOnly || valoresConfirmados}
              onMouseDown={() => {
                if (metodo === 'compra' && !valoresConfirmados) onMouseDownPontos(key)
                else if (podeTrocar) onAtributoClick(key)
              }}
              onMouseUp={(e) => {
                if (metodo === 'compra' && !valoresConfirmados) onMouseUpPontos(key, e)
                else if (podeTrocar) onAtributoClick(key)
              }}
              onMouseLeave={() => {}}
              onChange={(e) => onAtualizarAtributo(key, e.target.value.replace(/\D/g, ''))}
              onBlur={(e) => onValidarAtributo(key, parseInt(e.target.value.replace(/\D/g, ''), 10) || 0)}
            />
          </div>
        ))}
      </div>

      <div className="reroll-inline">
        {podeReroll && (
          <>
            <p className="reroll-text">Valores baixos (modificadores: {somaModificadores})</p>
            <div className="reroll-actions">
              <Button variant="primary" onClick={onConfirmarReroll}>Re-roll</Button>
              <Button variant="primary" onClick={onConfirmarValores}>Salvar Atributos</Button>
            </div>
          </>
        )}
        {!podeReroll && (
          <>
            <p className="reroll-text">Clique em salvar para continuar</p>
            <Button variant="primary" onClick={onConfirmarValores}>Salvar Atributos</Button>
          </>
        )}
      </div>
    </div>
  )
}