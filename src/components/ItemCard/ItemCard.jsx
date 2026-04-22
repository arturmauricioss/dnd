import { useRef, useState, useEffect } from 'react'
import { traducoes } from '../Equipamentos/armasData'
import './ItemCard.css'

export default function ItemCard({
  item,
  onClick,
  peso,
  local,
  onLocalChange,
  onSell,
  tipoItem,
  extraBtn
}) {

  const isArma =
    item.categoria === 'simples' ||
    item.categoria === 'comum' ||
    item.categoria === 'exotica'

  const nameRef = useRef(null)
  const containerRef = useRef(null)
  const [overflow, setOverflow] = useState(0)
  const [qtdMove, setQtdMove] = useState('')

  // =========================
  // 📁 PASTA DE IMAGEM (REGRA PRINCIPAL)
  // =========================
  const getPastaImg = (tipo) => {
    const pastas = {
      arma: 'armas',
      armadura: 'armaduras',
      escudo: 'escudos',
      montaria: 'montarias',
      item: 'itens',
      instrumento: 'instrumentos',
      especial: 'especiais',
      comida: 'comida',
      bebida: 'comida',       // 🔥 importante
      alojamento: 'comida',   // 🔥 importante
      fornecimento: 'fornecimentos',
      indumentaria: 'indumentaria'
    }
    return pastas[tipo] || 'itens'
  }

  // 👉 prioridade correta:
  // 1. arma força pasta arma
  // 2. item.tipo (principal)
  // 3. tipoItem (fallback)
  const pastaKey = isArma
    ? 'arma'
    : (item.tipo || item.tipoLoja || tipoItem || 'item')

  const pastaImg = getPastaImg(pastaKey)

  const imgId = item.id?.replace(/-/g, '_')
  const imgPadrao = `/dnd/${pastaImg}/${imgId}.png`

  // =========================
  // 📦 QUANTIDADE
  // =========================
  const matchQuantidade = item.nome?.match(/\((\d+)\)$/)
  const quantidadePack = matchQuantidade ? parseInt(matchQuantidade[1]) : null

  const quantidadeDisplay =
    item.quantidade > 1 ? item.quantidade : null

  // =========================
  // 📏 overflow texto
  // =========================
  useEffect(() => {
    if (nameRef.current && containerRef.current) {
      const textWidth = nameRef.current.scrollWidth
      const containerWidth = containerRef.current.clientWidth
      const charWidth = textWidth / item.nome.length
      const overflowAmount = textWidth - containerWidth

      setOverflow(Math.round(Math.max(0, overflowAmount > 0 ? charWidth : 0)))
    }
  }, [item.nome])

  // =========================
  // ações
  // =========================
  const handleLocalChange = (novoLocal) => {
    const qtd = parseInt(qtdMove) || item.quantidade || 1
    onLocalChange(novoLocal, qtd, local)
    setQtdMove('')
  }

  const handleSell = () => {
    const qtd = parseInt(qtdMove) || item.quantidade || 1
    onSell(qtd)
    setQtdMove('')
  }

  // =========================
  // UI
  // =========================
  return (
    <div className={`card item-card ${item.tipo || ''}`} onClick={onClick}>

      {/* HEADER */}
      <div className="card-header">
        <div className="item-name-container" ref={containerRef}>
          <span
            ref={nameRef}
            className={`item-name ${overflow > 0 ? 'scrolling' : ''}`}
            style={{ '--overflow': `-${Math.round(overflow)}px` }}
          >
            {item.nome}
          </span>
        </div>

        <div className="item-meta">
          {isArma && <span className="item-icon">⚔️</span>}
          {tipoItem === 'montaria' && <span className="item-icon">🐴</span>}
        </div>
      </div>

      {/* IMAGE */}
      <div className="card-image">
        {item.imagem ? (
          <img src={item.imagem} alt={item.nome} className="item-img" />
        ) : (
          <img
            src={imgPadrao}
            alt={item.nome}
            className="item-img"
            onError={(e) => {
              e.target.style.display = 'none'
              if (e.target.nextSibling) {
                e.target.nextSibling.style.display = 'flex'
              }
            }}
          />
        )}
        <span className="arma-emoji" style={{ display: 'none' }}>
          {isArma ? '⚔️' : '📦'}
        </span>
      </div>

      {/* DESCRIPTION */}
      {item.descricao && (
        <div className="card-description">
          {item.descricao}
        </div>
      )}

      {/* STATS */}
      <div className="card-stats">

        {isArma && item.dano && item.critico && (
          <div className="stats-row">
            <span><b>Dano:</b> {item.dano}</span>
            <span><b>Crit:</b> {item.critico}</span>
          </div>
        )}

        {isArma && (
          <div className="stats-row">
            <span><b>Cat:</b> {traducoes.categoria[item.categoria] || item.categoria || '-'}</span>
            <span><b>Sub:</b> {traducoes.subcategoria[item.subcategoria] || item.subcategoria || '-'}</span>
          </div>
        )}

        {isArma && (
          <div className="stats-row">
            <span><b>Alcance:</b> {item.alcance || '-'}</span>
            <span><b>Peso:</b> {item.peso ?? '-'}</span>
          </div>
        )}

        {(item.tipo1 || item.tipo2) && (
          <div>
            <b>Tipo:</b> {item.tipo1 || '-'}
            {item.tipo2 ? `, ${item.tipo2}` : ''}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="card-footer">
        {quantidadeDisplay && (
          <span className="quantidade-badge">×{quantidadeDisplay}</span>
        )}

        <span className="price">
          {item.custo ? (item.custo / 100).toFixed(2).replace('.', ',') : '0,00'} PO
        </span>

        {peso !== undefined && (
          <span className="item-peso">{peso.toFixed(1)} kg</span>
        )}
      </div>

      {/* AÇÕES */}
      {(local || onSell || extraBtn) && (
        <div className="local-selector">
          {extraBtn}

          {local && onLocalChange && item.quantidade > 1 && (
            <input
              type="number"
              className="qtd-input"
              placeholder="Qtd"
              min={1}
              max={item.quantidade}
              value={qtdMove}
              onChange={(e) => setQtdMove(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          )}

          {local && onLocalChange && (
            <select
              value={local}
              onChange={(e) => handleLocalChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            >
              <option value="equipped">🧤</option>
              <option value="carregando">🎒</option>
              <option value="tesoureiro">🏠</option>
            </select>
          )}

          {onSell && (
            <button
              className="sell-btn"
              onClick={(e) => {
                e.stopPropagation()
                handleSell()
              }}
            >
              💰
            </button>
          )}
        </div>
      )}

    </div>
  )
}