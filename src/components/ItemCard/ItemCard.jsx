import { useRef, useState, useEffect } from 'react'
import { traducoes } from '../Equipamentos/armasData'
import './ItemCard.css'

export default function ItemCard({ item, onClick }) {
  const isArma = item.categoria === 'simples' || item.categoria === 'comum' || item.categoria === 'exotica'
  const nameRef = useRef(null)
  const containerRef = useRef(null)
  const [overflow, setOverflow] = useState(0)

  const matchQuantidade = item.nome.match(/\((\d+)\)$/)
  const quantidadePack = matchQuantidade ? parseInt(matchQuantidade[1]) : null

  useEffect(() => {
    if (nameRef.current && containerRef.current) {
      const textWidth = nameRef.current.scrollWidth
      const containerWidth = containerRef.current.clientWidth
      const charWidth = textWidth / item.nome.length
      const overflowAmount = textWidth - containerWidth
      setOverflow(Math.round(Math.max(0, overflowAmount > 0 ? charWidth : 0)))
    }
  }, [item.nome])

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
        </div>
      </div>

      {/* IMAGE */}
      <div className="card-image">
        {isArma ? (
          item.img ? (
            <img
              src={item.img}
              alt={item.nome}
              className="arma-img"
            />
          ) : (
            <span className="arma-emoji">{item.icon}</span>
          )
        ) : (
          <img
            src={item.imagem || '/placeholder.png'}
            alt={item.nome}
          />
        )}
      </div>

      {/* DESCRIPTION */}
      {item.descricao && (
        <div className="card-description">
          {item.descricao}
        </div>
      )}

      {/* STATS ZONE (GENÉRICA) */}
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
            <span><b>Alcance:</b> {item.alcance && item.alcance !== '-' ? item.alcance : '-'}</span>
            <span><b>Peso:</b> {item.peso !== undefined ? (item.peso === 0 ? '0' : `${item.peso} kg`) : '-'}</span>
          </div>
        )}

        {(item.tipo1 || item.tipo2) && (
          <div><b>Tipo:</b> {item.tipo1 || '-'}{item.tipo2 ? `, ${item.tipo2}` : ''}</div>
        )}
      </div>

      {/* FOOTER */}
      <div className="card-footer">
        {quantidadePack && quantidadePack > 1 ? (
          <span className="quantidade-badge">×{quantidadePack}</span>
        ) : item.quantidade && item.quantidade > 1 ? (
          <span className="quantidade-badge">×{item.quantidade}</span>
        ) : null}
        <span className="price">
          {item.custo ? (item.custo / 100).toFixed(2).replace('.', ',') : '0,00'} PO
        </span>
      </div>
    </div>
  )
}