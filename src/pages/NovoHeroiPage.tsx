import { useState, useEffect, useRef, useMemo } from 'react'
import { MetodoAtributos, metodoLabel, gerarAtributos4d6, pontosCompraMax, calcularCusto } from '../engine/atributos'
import { tendenciaPermitida } from '../data/tendenciasClassesData'
import { valoresDefinidos } from '../data/atributosData'
import { executarRegras } from '../rules/atributos'
import { racas, totalImagensPorRaca, getImagemPath, tamanhos, deslocamentos } from '../data/racasData'
import { classes } from '../data/classesData'
import { alinhamentos, divindades, getDivindadesOrdenadas, getPontuacaoDeus } from '../data/tendenciasData'

export default function NovoHeroiPage() {
  const [nome, setNome] = useState('')
  const [genero, setGenero] = useState<'m' | 'f'>('m')
  const [raca, setRaca] = useState<string | null>(null)
  const [racaConfirmada, setRacaConfirmada] = useState(false)
  const [aparenciaConfirmada, setAparenciaConfirmada] = useState(false)
  const [variacaoImagem, setVariacaoImagem] = useState(1)
  const [classe, setClasse] = useState<string | null>(null)
  const [nivel, setNivel] = useState(1)
  const [classeConfirmada, setClasseConfirmada] = useState(false)
  const [tendincia, setTendincia] = useState<string | null>(null)
  const [divindade, setDivindade] = useState<string | null>(null)
  const [tendinciaConfirmada, setTendinciaConfirmada] = useState(false)
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

  const divindadesOrdenadas = useMemo(() => {
    if (!tendincia) return []
    return getDivindadesOrdenadas(tendincia, raca, classe)
  }, [tendincia, raca, classe])

  useEffect(() => {
    if (metodoConfirmado && metodo === 'compra') {
      setAtributos({ forca: 8, destreza: 8, constituicao: 8, inteligencia: 8, sabedoria: 8, carisma: 8 })
    }
  }, [metodoConfirmado, metodo])

  const resultadoRegras = useMemo(() => 
    executarRegras({ atributos, metodo, raca }), 
    [atributos, metodo, raca]
  )

  const atributosComModificador = resultadoRegras.atributosFinais
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

      {tendinciaConfirmada && (
        <div className="personagem-card">
          <div className="personagem-info">
            <span className="personagem-nome">{nome}</span>
            <div className="personagem-detalhes">
              <span>{racas.find(r => r.id === raca)?.nome} {genero === 'm' ? '♂' : '♀'}</span>
              <span>{tamanhos[raca!]} • {deslocamentos[raca!]}m</span>
              <span>{classes.find(c => c.id === classe)?.nome} {nivel}</span>
              <span>{alinhamentos.find(a => a.id === tendincia)?.nome}</span>
              <span>{divindades.find(d => d.id === divindade)?.nome}</span>
            </div>
          </div>
          <div className="personagem-body">
            <img 
              src={getImagemPath(raca!, genero, variacaoImagem)} 
              alt={nome}
              className="personagem-foto"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
            <div className="personagem-atributos">
              {Object.entries(atributosComModificador).map(([key, value]) => (
                <div key={key} className="personagem-atributo">
                  <span className="atributo-label">{key.toUpperCase().slice(0,3)}</span>
                  <span className="atributo-valor">{value}</span>
                  <span className="atributo-mod">{Math.floor((value - 10) / 2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="form-heroi">
        {!metodoConfirmado && (
        <div className="form-row">
          <div className="form-group" style={{ flex: 3, marginTop: '2rem' }}>
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
                onClick={() => setGenero('m')}
              >
                ♂
              </button>
              <button 
                type="button" 
                className={`genero-btn ${genero === 'f' ? 'active' : ''}`}
                onClick={() => setGenero('f')}
              >
                ♀
              </button>
            </div>
          </div>
        </div>
        )}

        {!valoresConfirmados && (
        <div className="form-group" style={{ marginTop: '2rem' }}>
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
          
          {metodo && (
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
                if (!nome.trim()) {
                  alert('Por favor, insira um nome para o herói')
                  return
                }
                setMetodoConfirmado(true)
                if (metodo === '4d6-baixo') aplicarMetodo4d6()
                else if (metodo === 'definido') aplicarMetodoDefinido()
              }}
            >
              Confirmar {metodoLabel(metodo)}
            </button>
          )}
        </div>
        )}

        {metodoConfirmado && metodo === 'compra' && (
          <div className="pontos-compra">
            Pontos usados: {pontosUsados}/{pontosCompraMax}
          </div>
        )}

        {metodoConfirmado && !valoresConfirmados && (
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
                    Salvar Atributos
                  </button>
                </div>
              </>
            )}
            {!podeReroll() && (
              <>
                <p className="reroll-text">Clique em salvar para continuar</p>
                <button type="button" className="btn btn-primary" onClick={manterValores}>
                  Salvar Atributos
                </button>
              </>
            )}
          </div>
        )}

        {valoresConfirmados && !racaConfirmada && !aparenciaConfirmada && (
          <div className="raca-section">
            <h2 className="section-title raca-title">Raças</h2>
            <div className="raca-grid">
              {racas.map(r => (
                <button
                  key={r.id}
                  type="button"
                  className={`raca-btn ${raca === r.id ? 'active' : ''}`}
                  onClick={() => {
                    setRaca(r.id)
                    setVariacaoImagem(1)
                  }}
                >
                  {r.nome}
                </button>
              ))}
            </div>
            
            {raca && (
              <>
                <h3 className="section-title">Selecione a Aparência</h3>
                <div className="raca-grid" key={raca}>
                  {Array.from({ length: totalImagensPorRaca[raca || ''] || 1 }, (_, i) => i + 1).map(num => (
                    <button
                      key={`${raca}-${num}`}
                      type="button"
                      className={`raca-img-btn ${variacaoImagem === num ? 'active' : ''}`}
                      onClick={() => setVariacaoImagem(num)}
                    >
                      <img 
                        src={getImagemPath(raca!, genero, num)} 
                        alt={`Opção ${num}`}
                        className="raca-thumbnail"
                      />
                    </button>
                  ))}
                </div>
                <button 
                  type="button" 
                  className="btn btn-primary mt-sm"
                  style={{ display: 'block', margin: 'var(--space-md) auto 0' }}
                  onClick={() => {
                    setRacaConfirmada(true)
                    setAparenciaConfirmada(true)
                  }}
                >
                  Confirmar Raça e Aparência
                </button>
              </>
            )}
          </div>
        )}

        {aparenciaConfirmada && !classeConfirmada && (
          <div className="raca-section">
            <h2 className="section-title raca-title">Classe</h2>
            <div className="raca-grid">
              {classes.map(c => (
                <button
                  key={c.id}
                  type="button"
                  className={`raca-btn ${classe === c.id ? 'active' : ''}`}
                  onClick={() => setClasse(c.id)}
                >
                  {c.nome}
                </button>
              ))}
            </div>
            
            {classe && (
              <div className="form-group mt-md">
                <label className="form-label">Nível</label>
                <div className="nivel-selector">
                  <button 
                    type="button" 
                    className="nivel-btn"
                    onClick={() => setNivel(Math.max(1, nivel - 1))}
                  >
                    -
                  </button>
                  <span className="nivel-valor">{nivel}</span>
                  <button 
                    type="button" 
                    className="nivel-btn"
                    onClick={() => setNivel(Math.min(20, nivel + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {classe && (
              <button 
                type="button" 
                className="btn btn-primary mt-sm"
                onClick={() => setClasseConfirmada(true)}
              >
                Confirmar Classe e Nível
              </button>
            )}
          </div>
        )}

        {classeConfirmada && !tendinciaConfirmada && (
          <div className="raca-section">
            <h2 className="section-title raca-title">Tendência</h2>
            <div className="tendencia-grid">
              {alinhamentos.map(a => {
                const permitir = tendenciaPermitida(classe!, a.id)
                return (
                  <button
                    key={a.id}
                    type="button"
                    className={`raca-btn ${!permitir ? 'disabled' : ''} ${tendincia === a.id ? 'active' : ''}`}
                    disabled={!permitir}
                    onClick={() => {
                      setTendincia(a.id)
                      setDivindade(null)
                    }}
                    title={!permitir ? `Classe ${classes.find(c => c.id === classe)?.nome} não permite esta tendência` : undefined}
                  >
                    {a.nome}
                  </button>
                )
              })}
            </div>
            
            {tendincia && (
              <>
                <h3 className="section-title">Divindade</h3>
                <div className="raca-grid">
                  {divindadesOrdenadas.map(d => {
                    const pontos = getPontuacaoDeus(d.id, raca, tendincia, classe)
                    const Destaque = pontos >= 2
                    const estrelas = '★'.repeat(pontos)
                    return (
                      <button
                        key={d.id}
                        type="button"
                        className={`raca-btn ${divindade === d.id ? 'active' : ''} ${Destaque ? 'destaque' : ''}`}
                        onClick={() => setDivindade(d.id)}
                      >
                        {d.nome}
                        {pontos > 0 && <span className="estrelas-badge">{estrelas}</span>}
                      </button>
                    )
                  })}
                </div>
              </>
            )}

            {tendincia && divindade && (
              <button 
                type="button" 
                className="btn btn-primary mt-sm"
                onClick={() => setTendinciaConfirmada(true)}
              >
                Confirmar Tendência e Divindade
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}