import { useState, useEffect, useRef, useMemo } from 'react'
import { MetodoAtributos, metodoLabel, gerarAtributos4d6, pontosCompraMax, calcularCusto } from '../engine/atributos'
import { valoresDefinidos } from '../data/atributosData'
import { executarRegras } from '../rules/atributos'

export default function NovaHeroiPage() {
  const [nome, setNome] = useState('')
  const [genero, setGenero] = useState<'m' | 'f' | null>('m')
  const [metodo, setMetodo] = useState<MetodoAtributos | null>(null)
  const [metodoConfirmado, setMetodoConfirmado] = useState(false)
  const [valoresConfirmados, setValoresConfirmados] = useState(false)
  const [atributoSelecionado, setAtributoSelecionado] = useState<string | null>(null)
  const [atributos, setAtributos] = useState({
    forca: 10,
    destreza: 10,
    constituicao: 10,
    inteligencia: 10,
    sabedoria: 10,
    carisma: 10
  })

  useEffect(() => {
    if (metodoConfirmado && metodo === 'compra') {
      setAtributos({ forca: 8, destreza: 8, constituicao: 8, inteligencia: 8, sabedoria: 8, carisma: 8 })
    }
  }, [metodoConfirmado, metodo])

  const resultadoRegras = useMemo(() => 
    executarRegras({ atributos, metodo }), 
    [atributos, metodo]
  )
  const pontosUsados = resultadoRegras.custoPontos

  function podeReroll(): boolean {
    return resultadoRegras.temDireitoReroll
  }

function aplicarMetodo4d6() {
    const valores = gerarAtributos4d6()
    setAtributos({
      forca: valores[0],
      destreza: valores[1],
      constituicao: valores[2],
      inteligencia: valores[3],
      sabedoria: valores[4],
      carisma: valores[5]
    })
  }

  function aplicarMetodoDefinido() {
    setAtributos({
      forca: valoresDefinidos[0],
      destreza: valoresDefinidos[1],
      constituicao: valoresDefinidos[2],
      inteligencia: valoresDefinidos[3],
      sabedoria: valoresDefinidos[4],
      carisma: valoresDefinidos[5]
    })
  }

  function handleAtributoClick(campo: string) {
    const podeTrocar = valoresConfirmados || metodo === '4d6-baixo' || metodo === 'definido'
    if (!podeTrocar) return
    
    if (!atributoSelecionado) {
      setAtributoSelecionado(campo)
    } else if (atributoSelecionado !== campo) {
      const valor1 = atributos[atributoSelecionado as keyof typeof atributos]
      const valor2 = atributos[campo as keyof typeof atributos]
      setAtributos(prev => ({
        ...prev,
        [atributoSelecionado]: valor2,
        [campo]: valor1
      }))
      setAtributoSelecionado(null)
    } else {
      setAtributoSelecionado(null)
    }
  }

  function confirmarReroll() {
    aplicarMetodo4d6()
  }

  function manterValores() {
    setValoresConfirmados(true)
    console.log({ nome, metodo, atributos })
  }

  const pressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const currentCampoRef = useRef<string>('')

  function ajustarPontosClick(campo: string, shiftKey: boolean) {
    const valorAtual = atributos[campo as keyof typeof atributos]
    const novoValor = valorAtual + (shiftKey ? -1 : 1)
    if (novoValor < 8 || novoValor > 18) return
    
    const custoAtual = calcularCusto(valorAtual)
    const custoNovo = calcularCusto(novoValor)
    const pontosRestantes = pontosCompraMax - pontosUsados
    
    if (shiftKey ? true : custoNovo - custoAtual <= pontosRestantes) {
      setAtributos(prev => ({ ...prev, [campo]: novoValor }))
    }
  }

  function handleMouseDownPontos(campo: string) {
    if (metodo !== 'compra') return
    currentCampoRef.current = campo
    
    pressTimerRef.current = setTimeout(() => {
      setAtributos({ forca: 8, destreza: 8, constituicao: 8, inteligencia: 8, sabedoria: 8, carisma: 8 })
    }, 400)
  }

  function handleMouseUpPontos(campo: string, e: React.MouseEvent) {
    if (metodo !== 'compra') return
    
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current)
      pressTimerRef.current = null
      ajustarPontosClick(campo, e.shiftKey)
    }
  }

  function atualizarAtributo(campo: string, valor: string | number) {
    const num = typeof valor === 'number' ? valor : parseInt(valor, 10) || 0
    if (metodo === 'compra') {
      const custo = calcularCusto(num)
      if (custo > pontosCompraMax - (pontosUsados - calcularCusto(atributos[campo as keyof typeof atributos]))) {
        return
      }
    }
    setAtributos(prev => ({ ...prev, [campo]: num }))
  }

  function validarAtributo(campo: string, valor: number) {
    let str = String(valor).replace(/^0+/, '')
    let valorFinal = parseInt(str, 10) || 0
    if (valorFinal < 3) valorFinal = 3
    if (valorFinal > 18) valorFinal = 18
    if (metodo === 'compra' && valorFinal < 8) valorFinal = 8
    setAtributos(prev => ({ ...prev, [campo]: valorFinal }))
  }

  return (
    <div className="page container">
      <h1 className="mt-md">Novo Herói</h1>

      <div className="form-heroi">
        <div className="form-row">
          <div className="form-group" style={{ flex: 3 }}>
            <label className="form-label">Nome</label>
            <input
              type="text"
              className="form-input"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do herói"
            />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Gênero</label>
            <div className="genero-buttons">
              <button 
                type="button" 
                className={`genero-btn ${genero === 'm' ? 'active' : ''}`}
                onClick={() => setGenero(genero === 'm' ? null : 'm')}
              >
                ♂
              </button>
              <button 
                type="button" 
                className={`genero-btn ${genero === 'f' ? 'active' : ''}`}
                onClick={() => setGenero(genero === 'f' ? null : 'f')}
              >
                ♀
              </button>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Método de Atributos</label>
          <div className="metodos-grid">
            {(['4d6-baixo', 'definido', 'compra', 'livre'] as MetodoAtributos[]).map(m => (
              <button
                key={m}
                type="button"
                className={`metodo-btn ${metodo === m ? 'active' : ''}`}
                disabled={metodoConfirmado}
                onClick={() => {
                  setMetodo(m)
                  setMetodoConfirmado(false)
                }}
              >
                {metodoLabel(m)}
              </button>
            ))}
          </div>
          
          {metodo && !valoresConfirmados && (
            <p className="metodo-dica">
              {metodo === '4d6-baixo' || metodo === 'definido' ? 'Clique em dois atributos para trocar os valores de posição' : 
               metodo === 'compra' ? 'Custo 1 de 9-14. Custo 2 de 15-16. Custo 3 de 17-18' : 
               'Role dados e adicione os valores.'}
            </p>
          )}
          
          {metodo && !metodoConfirmado && (
            <button 
              type="button" 
              className="btn btn-primary mt-sm"
              onClick={() => {
                setMetodoConfirmado(true)
                if (metodo === '4d6-baixo') aplicarMetodo4d6()
                else if (metodo === 'definido') aplicarMetodoDefinido()
              }}
            >
              Confirmar {metodoLabel(metodo)}
            </button>
          )}
        </div>

        {metodoConfirmado && metodo === 'compra' && (
          <div className="pontos-compra">
            Pontos usados: {pontosUsados}/{pontosCompraMax}
          </div>
        )}

        {metodoConfirmado && (
        <div className="atributos-grid">
          {Object.entries(atributos).map(([key, value]) => {
            const podeTrocar = valoresConfirmados || metodo === '4d6-baixo' || metodo === 'definido'
            return (
            <div 
              key={key} 
              className={`atributo ${podeTrocar && atributoSelecionado === key ? 'selected' : ''}`}
              onClick={() => podeTrocar && handleAtributoClick(key)}
            >
              <label className="form-label">{key.toUpperCase()}</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="form-input text-center"
                value={value}
                readOnly={valoresConfirmados || metodo === '4d6-baixo' || metodo === 'definido' || metodo === 'compra'}
                onMouseDown={() => {
                  if (metodo === 'compra' && !valoresConfirmados) handleMouseDownPontos(key)
                  else if (podeTrocar) handleAtributoClick(key)
                }}
                onMouseUp={(e) => {
                  if (metodo === 'compra' && !valoresConfirmados) handleMouseUpPontos(key, e)
                  else if (podeTrocar) handleAtributoClick(key)
                }}
                onMouseLeave={() => {
                  if (pressTimerRef.current) {
                    clearTimeout(pressTimerRef.current)
                    pressTimerRef.current = null
                  }
                }}
                onChange={(e) => atualizarAtributo(key, e.target.value.replace(/\D/g, ''))}
                onBlur={(e) => validarAtributo(key, parseInt(e.target.value.replace(/\D/g, ''), 10) || 0)}
              />
            </div>
            );
          })}
        </div>
        )}

        {valoresConfirmados && (
          <p className="metodo-dica">Clique em dois atributos para trocar os valores de posição</p>
        )}

        {metodoConfirmado && !valoresConfirmados && (
          <div className="reroll-inline">
            {podeReroll() && (
              <>
                <p className="reroll-text">Valores baixos (modificadores: {resultadoRegras.somaModificadores})</p>
                <div className="reroll-actions">
                  <button type="button" className="btn btn-primary" onClick={confirmarReroll}>
                    Re-roll
                  </button>
                  <button type="button" className="btn btn-primary" onClick={manterValores}>
                    Manter
                  </button>
                </div>
              </>
            )}
            {!podeReroll() && (
              <>
                <p className="reroll-text">Clique em manter para fixar os valores</p>
                <button type="button" className="btn btn-primary" onClick={manterValores}>
                  Manter
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}