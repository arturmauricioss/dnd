import { useMemo } from 'react'
import { useCharacter } from '../../context/CharacterContext'
import { getItemPorId, getItemAjustadoPorTamanho } from '../Equipamentos/equipamentosLogic'
import { getPesoItem } from '../Carga/cargaLogic'
import ItemCard from '../ItemCard/ItemCard'

export default function TreasurerSection({ onMoveItem, onSellItem, TODAS_MONTARIAS }) {
  const { personagem } = useCharacter()

  const armas = useMemo(() => 
    (personagem.equipment?.weapons || []).filter(a => (a.local || 'carregando') === 'tesoureiro'),
    [personagem.equipment?.weapons]
  )

  const itens = useMemo(() => 
    (personagem.equipment?.itens || []).filter(i => (i.local || 'carregando') === 'tesoureiro'),
    [personagem.equipment?.itens]
  )

  const renderItem = (item, tipo, quantidade = 1) => {
    const itemData = getItemPorId(item.id)
    if (!itemData) return null
    const itemAjustado = getItemAjustadoPorTamanho(itemData, personagem.race)
    const peso = getPesoItem(itemAjustado) * quantidade
    const isMontariaItem = !!TODAS_MONTARIAS[item.id]

    return (
      <ItemCard 
        key={`${tipo}-${item.id}-${item.local}`}
        item={{ id: item.id, ...itemAjustado, quantidade }} 
        peso={peso}
        local={item.local}
        onLocalChange={(novoLocal, qtd) => onMoveItem(tipo, item.id, novoLocal, qtd, item.local)}
        onSell={(qtd) => onSellItem(tipo, item.id, qtd)}
        tipoItem={isMontariaItem ? 'montaria' : tipo}
      />
    )
  }

  if (armas.length === 0 && itens.length === 0) {
    return null
  }

  return (
    <div className="treasurer-section">
      <h4>🏠 Tesouro / Base</h4>
      <div className="tesouro-grid">
        {armas.map(a => renderItem(a, 'arma', a.quantidade || 1))}
        {itens.map(i => renderItem(i, 'item', i.quantidade || 1))}
      </div>
    </div>
  )
}