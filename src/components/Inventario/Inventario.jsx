import { useMemo } from 'react'
import { useCharacter } from '../../context/CharacterContext'
import { converterParaPO } from './dinheiroData'
import { getItemPorId } from '../Equipamentos/equipamentosLogic'
import { getDinheiroInicial } from '../Classes/classesData'
import ItemCard from '../ItemCard/ItemCard'
import { Navigation, Page } from '../global'
import './Inventario.css'

export default function Inventario() {
  const { personagem } = useCharacter()

  const dinheiroInicial = useMemo(() => {
    return getDinheiroInicial(personagem.classe) || { po: 0, pl: 0, pp: 0, pc: 0 }
  }, [personagem.classe])

  const money = useMemo(() => {
    const moneyExistente = personagem.equipment?.money
    const temDinheiro = moneyExistente && Object.values(moneyExistente).some(v => v > 0)
    return temDinheiro ? moneyExistente : dinheiroInicial
  }, [personagem.equipment?.money, dinheiroInicial])

  const totalPO = useMemo(() => converterParaPO(money), [money])

  const armadura = useMemo(() => {
    const armorId = personagem.equipment?.armor
    return armorId ? getItemPorId(armorId) : null
  }, [personagem.equipment?.armor])

  const escudo = useMemo(() => {
    const shieldId = personagem.equipment?.shield
    return shieldId ? getItemPorId(shieldId) : null
  }, [personagem.equipment?.shield])

  const armas = useMemo(() => {
    return personagem.equipment?.weapons || []
  }, [personagem.equipment?.weapons])

  const itens = useMemo(() => {
    return personagem.equipment?.itens || []
  }, [personagem.equipment?.itens])

  return (

      <div className="inventario-container">
        <div className="inventario-content">
          <div className="money-display">
            <span className="money-label">Dinheiro:</span>
            <span className="money-value">{totalPO.toFixed(2).replace(/\.?0+$/, '')} PO</span>
            <span className="money-detail">
              ({money.pl} PL, {money.po} PO, {money.pp} PP, {money.pc} PC)
            </span>
          </div>

          {(!armadura && !escudo && armas.length === 0 && itens.length === 0) && (
            <div className="inventario-empty">
              <p>Nenhum item encontrado. Visite a Loja para comprar itens.</p>
            </div>
          )}

          {(armadura || escudo || armas.length > 0 || itens.length > 0) && (
            <div className="inventario-itens-grid">
              {armadura && (
                <ItemCard item={{ id: armadura.id, ...armadura }} />
              )}
              {escudo && (
                <ItemCard item={{ id: escudo.id, ...escudo }} />
              )}
              {armas.map((arma, idx) => {
                const item = getItemPorId(arma.id)
                if (!item) return null
                return (
                  <ItemCard key={`arma-${idx}`} item={{ id: arma.id, ...item, quantidade: arma.quantidade || 1 }} />
                )
              })}
              {itens.map((item, idx) => {
                const itemData = getItemPorId(item.id)
                if (!itemData) return null
                return (
                  <ItemCard key={`item-${idx}`} item={{ id: item.id, ...itemData, quantidade: item.quantidade || 1 }} />
                )
              })}
            </div>
          )}
        </div>
        <Navigation prev="/loja"/>
      </div>
  )
}