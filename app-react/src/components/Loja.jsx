import { useMemo, useState } from 'react'
import { useCharacter } from '../context/CharacterContext'
import { itensLoja, calcularTotal } from '../data/loja'
import { converterParaPO, converterDePO } from '../data/dinheiro'
import './Loja.css'

const kitsClasse = {
  barbaro: ['machado_guerra', 'arco_curto', 'adaga', 'couro_batido', 'mochila', 'cantil', 'racao', 'saco_dormir', 'saco', 'pederneira', 'isqueiro'],
  bardo: ['espada_longa', 'besta', 'couro_batido', 'mochila', 'cantil', 'racao', 'alaude', 'bolsa_componentes'],
  clerigo: ['maca', 'besta', 'brunea', 'escudo_pesado', 'simbolo_sagrado', 'mochila', 'cantil'],
  druida: ['cimitarra', 'clava', 'funda', 'azevinho', 'mochila', 'cantil'],
  feiticeiro: ['lanco', 'besta', 'bolsa_componentes', 'lanterna', 'oleo500', 'mochila'],
  guerreiro: ['machado_guerra', 'arco_curto', 'brunea', 'escudo_pesado', 'mochila', 'cantil'],
  ladino: ['espada_curta', 'besta', 'adaga', 'couro', 'ferramentas_ladrao', 'mochila'],
  mago: ['besta', 'grimorio', 'mochila', 'cantil'],
  monge: ['funda', 'clava', 'tochas', 'mochila'],
  paladino: ['espada_longa', 'arco_curto', 'brunea', 'escudo_pesado', 'simbolo_sagrado', 'lanterna'],
  ranger: ['espada_longa', 'espada_curta', 'arco_longo', 'couro_batido', 'mochila']
}

export default function Loja() {
  const { personagem, atualizarCampo } = useCharacter()
  const [carrinho, setCarrinho] = useState([])

  const classe = personagem.classe
  const money = personagem.equipment?.money || {}

  const totalDisponivel = useMemo(() => {
    return converterParaPO(money)
  }, [money])

  const totalCarrinho = useMemo(() => calcularTotal(carrinho), [carrinho])
  const restante = Math.max(0, totalDisponivel - totalCarrinho)
  const podeComprar = totalCarrinho > 0 && totalDisponivel >= totalCarrinho

  const adicionarAoCarrinho = (item) => {
    setCarrinho((prev) => {
      const existente = prev.find((i) => i.id === item.id)

      if (existente) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i
        )
      }

      return [...prev, { ...item, quantidade: 1 }]
    })
  }

  const diminuirQuantidade = (itemId) => {
    setCarrinho((prev) =>
      prev.flatMap((item) => {
        if (item.id !== itemId) return item

        if (item.quantidade > 1) {
          return [{ ...item, quantidade: item.quantidade - 1 }]
        }

        return []
      })
    )
  }

  const removerItem = (itemId) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== itemId))
  }

  const comprarKitBasico = () => {
    const kit = kitsClasse?.[classe]
    if (!kit?.length) return

    setCarrinho((prev) => {
      const novoCarrinho = [...prev]

      kit.forEach((id) => {
        const item = itensLoja.find((i) => i.id === id)
        if (!item) return

        const existente = novoCarrinho.find((i) => i.id === id)

        if (existente) {
          existente.quantidade += 1
        } else {
          novoCarrinho.push({ ...item, quantidade: 1 })
        }
      })

      return [...novoCarrinho]
    })
  }

  const finalizarCompra = () => {
    if (!podeComprar) return

    const moedasRestantes = converterDePO(restante)

    const armadura = carrinho.find((item) => item.tipo === 'armadura')
    const escudo = carrinho.find((item) => item.tipo === 'escudo')
    const armas = carrinho.filter((item) => item.tipo === 'arma')
    const outrosItens = carrinho.filter(
      (item) => item.tipo !== 'arma' && item.tipo !== 'armadura' && item.tipo !== 'escudo'
    )

    atualizarCampo('equipment', {
      ...personagem.equipment,
      money: moedasRestantes,
      armor: armadura?.id || '',
      shield: escudo?.id || '',
      weapons: armas,
      itens: outrosItens
    })

    setCarrinho([])
  }

  return (
    <div className="loja-container">
      <h3>Loja</h3>

      <div className="carrinho-info">
        <span>Carrinho: {totalCarrinho} PO</span>
        <span>Disponível: {totalDisponivel} PO</span>
        <span>Restante: {restante.toFixed(2).replace(/\.00$/, '')} PO</span>
        <span className={podeComprar || totalCarrinho === 0 ? 'ok' : 'faltando'}>
          {podeComprar || totalCarrinho === 0 ? 'OK' : 'Saldo insuficiente'}
        </span>
      </div>

      <div className="loja-top-actions">
        {!!kitsClasse?.[classe]?.length && (
          <button className="btn-kit" onClick={comprarKitBasico}>
            Adicionar Kit da Classe
          </button>
        )}

        <button className="btn-limpar" onClick={() => setCarrinho([])}>
          Limpar Carrinho
        </button>
      </div>

      <div className="loja-layout">
        <div className="loja-items">
          <h4>Itens Disponíveis</h4>

          <div className="itens-grid">
            {itensLoja.map((item) => (
              <button
                key={item.id}
                className="item-loja"
                onClick={() => adicionarAoCarrinho(item)}
              >
                <span>{item.nome}</span>
                <strong>{item.preco} PO</strong>
              </button>
            ))}
          </div>
        </div>

        <div className="loja-carrinho">
          <h4>Carrinho ({carrinho.length} itens)</h4>

          {carrinho.length === 0 ? (
            <p>Carrinho vazio</p>
          ) : (
            <ul className="carrinho-lista">
              {carrinho.map((item) => (
                <li key={item.id} className="carrinho-item">
                  <span>{item.nome}</span>

                  <div className="quantidade-box">
                    <button onClick={() => diminuirQuantidade(item.id)}>-</button>
                    <span>{item.quantidade}</span>
                    <button onClick={() => adicionarAoCarrinho(item)}>+</button>
                  </div>

                  <span>{item.preco * item.quantidade} PO</span>

                  <button
                    className="btn-remover"
                    onClick={() => removerItem(item.id)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="carrinho-total">
            <strong>Total: {totalCarrinho} PO</strong>
          </div>

          <button
            className="btn-comprar"
            disabled={!podeComprar}
            onClick={finalizarCompra}
          >
            Confirmar Compra
          </button>
        </div>
      </div>
    </div>
  )
}
