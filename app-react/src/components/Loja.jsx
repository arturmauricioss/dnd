import { useMemo, useState } from 'react'
import { useCharacter } from '../context/CharacterContext'
import { todosItens } from '../data/itemDatabase'
import { converterParaCobre } from '../data/dinheiro'
import ItemCard from '../components/ItemCard'
import './Loja.css'

// ⚠️ IMPORTANTE: tudo aqui precisa bater com IDs do itemDatabase
const kitsClasse = {
  barbaro: ['machadoGrande', 'arcoCurto', 'adaga', 'couroBatido', 'mochila', 'cantil', 'racao', 'sacoDormir', 'saco', 'pederneira', 'isqueiro'],
  bardo: ['espadaLonga', 'bestaLeve', 'couroBatido', 'mochila', 'cantil', 'racao', 'alaude', 'bolsaComponentes'],
  clerigo: ['macaPesada', 'bestaLeve', 'brunea', 'madeiraPesado', 'simboloSagrado', 'mochila', 'cantil'],
  druida: ['cimitarra', 'clava', 'funda', 'azevinho', 'mochila', 'cantil'],
  feiticeiro: ['lancaCurta', 'bestaLeve', 'bolsaComponentes', 'lanterna', 'oleo500', 'mochila'],
  guerreiro: ['machadoGrande', 'arcoCurto', 'brunea', 'madeiraPesado', 'mochila', 'cantil'],
  ladino: ['espadaCurta', 'bestaLeve', 'adaga', 'couro', 'ferramentasLadrao', 'mochila'],
  mago: ['bestaLeve', 'grimorio', 'mochila', 'cantil'],
  monge: ['funda', 'clava', 'tochas', 'mochila'],
  paladino: ['espadaLonga', 'arcoCurto', 'brunea', 'madeiraPesado', 'simboloSagrado', 'lanterna'],
  ranger: ['espadaLonga', 'espadaCurta', 'arcoLongo', 'couroBatido', 'mochila']
}

export default function Loja() {
  const { personagem, atualizarCampo } = useCharacter()
  const [carrinho, setCarrinho] = useState([])

  const classe = personagem.classe

  const money = personagem.equipment?.money || {
    pl: 0, po: 0, pp: 0, pc: 0
  }

  const totalDisponivel = useMemo(() => {
    return converterParaCobre(money)
  }, [money])

  const totalCarrinho = useMemo(() => {
    return carrinho.reduce((acc, item) =>
      acc + (item.preco * item.quantidade), 0
    )
  }, [carrinho])

  const restante = Math.max(0, totalDisponivel - totalCarrinho)

  const podeComprar = totalCarrinho > 0 && totalDisponivel >= totalCarrinho

  const adicionarAoCarrinho = (item) => {
    setCarrinho((prev) => {
      const existente = prev.find((i) => i.id === item.id)

      if (existente) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantidade: i.quantidade + 1 }
            : i
        )
      }

      return [...prev, { ...item, quantidade: 1 }]
    })
  }

  const comprarKitBasico = () => {
    const kit = kitsClasse?.[classe]
    if (!kit?.length) return

    setCarrinho((prev) => {
      const novo = [...prev]

      kit.forEach((id) => {
        const item = todosItens[id]
        if (!item) return

        const existente = novo.find((i) => i.id === id)

        if (existente) {
          existente.quantidade += 1
        } else {
          novo.push({ id, ...item, quantidade: 1 })
        }
      })

      return novo
    })
  }

  const finalizarCompra = () => {
    if (!podeComprar) return

    const moedasRestantes = {
      po: Math.floor(restante / 100),
      pp: Math.floor((restante % 100) / 10),
      pc: restante % 10,
      pl: 0
    }

    const armadura = carrinho.find(i => i.tipo === 'armadura')
    const escudo = carrinho.find(i => i.tipo === 'escudo')
    const armas = carrinho.filter(i => i.tipo === 'arma')
    const outros = carrinho.filter(i =>
      i.tipo !== 'arma' &&
      i.tipo !== 'armadura' &&
      i.tipo !== 'escudo'
    )

    atualizarCampo('equipment', {
      ...personagem.equipment,
      money: moedasRestantes,
      armor: armadura?.id || '',
      shield: escudo?.id || '',
      weapons: armas,
      itens: outros
    })

    setCarrinho([])
  }

  return (
    <div className="loja-container">

      <h3>Loja</h3>

      <div className="loja-layout">

        {/* ITENS */}
        <div className="loja-items">

          <div className="carrinho-info">
            <span>Carrinho: {(totalCarrinho / 100).toFixed(2)} PO</span>
            <span>Disponível: {(totalDisponivel / 100).toFixed(2)} PO</span>
            <span>Restante: {(restante / 100).toFixed(2)} PO</span>

            <span className={podeComprar ? 'ok' : 'faltando'}>
              {podeComprar ? 'OK' : 'Saldo insuficiente'}
            </span>
          </div>

          <div className="loja-actions">

            {!!kitsClasse?.[classe]?.length && (
              <button className="btn-kit" onClick={comprarKitBasico}>
                Kit da Classe
              </button>
            )}

            <button className="btn-clear" onClick={() => setCarrinho([])}>
              Limpar Carrinho
            </button>

          </div>

          <div className="itens-grid">
            {Object.entries(todosItens).map(([id, item]) => (
              <ItemCard
                key={id}
                item={{ id, ...item }}
                onClick={() => adicionarAoCarrinho({ id, ...item })}
              />
            ))}
          </div>

        </div>

        {/* CARRINHO */}
        <aside className="loja-aside">

          <h4>Carrinho</h4>

          {carrinho.length === 0 ? (
            <p>Vazio</p>
          ) : (
            carrinho.map(item => (
              <div key={item.id}>
                {item.nome} x{item.quantidade}
              </div>
            ))
          )}

          <button
            className="btn-buy"
            disabled={!podeComprar}
            onClick={finalizarCompra}
          >
            Comprar
          </button>

        </aside>

      </div>
    </div>
  )
}