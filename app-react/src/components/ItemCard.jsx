import './ItemCard.css'
export default function ItemCard({ item, onClick }) {
  return (
    <div className={`card item-card ${item.tipo || ''}`} onClick={onClick}>
      
      {/* HEADER */}
      <div className="card-header">
        <span className="item-name">{item.nome}</span>

        <div className="item-meta">
          <span className="item-icon">{item.icon || '⚔️'}</span>
          <span className="item-stars">
            {'★'.repeat(item.estrelas || 1)}
          </span>
        </div>
      </div>

      {/* IMAGE */}
      <div className="card-image">
        <img
          src={item.imagem || '/placeholder.png'}
          alt={item.nome}
        />
      </div>

      {/* DESCRIPTION */}
      <div className="card-description">
        {item.descricao || 'Sem descrição.'}
      </div>

      {/* STATS ZONE (GENÉRICA) */}
      <div className="card-stats">
        {item.dano && (
          <div><b>ATK:</b> {item.dano}</div>
        )}

        {item.defesa && (
          <div><b>DEF:</b> {item.defesa}</div>
        )}

        {item.critico && (
          <div><b>Crit:</b> {item.critico}</div>
        )}

        {item.alcance && (
          <div><b>Range:</b> {item.alcance}</div>
        )}

        {item.peso && (
          <div><b>Peso:</b> {item.peso}</div>
        )}

        {item.bonus_ca && (
          <div><b>CA:</b> {item.bonus_ca}</div>
        )}

        {item.tipo_dano && (
          <div><b>Dano:</b> {item.tipo_dano}</div>
        )}
      </div>

      {/* FOOTER */}
      <div className="card-footer">
        <span className="price">
          {item.preco / 100} PO
        </span>
      </div>
    </div>
  )
}