import { useMemo, useState, useRef } from 'react'
import { useCharacter } from '../../context/CharacterContext'
import { todosItens } from '../Equipamentos/equipamentosLogic'
import { converterParaCobre } from '../Inventario/dinheiroData'
import { getDinheiroInicial } from '../Classes/classesData'
import ItemCard from '../ItemCard/ItemCard'
import { Navigation, Page } from '../global'
import './Loja.css'

export default function Loja() {

  const { personagem, atualizarCampo } = useCharacter()
  const [carrinho, setCarrinho] = useState([])
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const carrinhoRef = useRef(null)

  const dinheiroInicial = useMemo(() => {
    return getDinheiroInicial(personagem.classe) || { po: 0, pl: 0, pp: 0, pc: 0 }
  }, [personagem.classe])

  const money = useMemo(() => {
    const moneyExistente = personagem.equipment?.money
    const temDinheiro = moneyExistente && Object.values(moneyExistente).some(v => v > 0)
    return temDinheiro ? moneyExistente : dinheiroInicial
  }, [personagem.equipment?.money, dinheiroInicial])

  const totalDisponivel = useMemo(() => {
    return converterParaCobre(money)
  }, [money])

  const totalCarrinho = useMemo(() => {
    return carrinho.reduce((acc, item) => {
      const matchPack = item.nome.match(/\((\d+)\)$/)
      const quantidadePack = matchPack ? parseInt(matchPack[1]) : 1
      
      const custoTotal = item.custo * (item.quantidade / quantidadePack)
      return acc + custoTotal
    }, 0)
  }, [carrinho])

  const restante = Math.max(0, totalDisponivel - totalCarrinho)

  const podeComprar = totalCarrinho > 0 && totalDisponivel >= totalCarrinho
  const statusMensagem = useMemo(() => {
    if (totalCarrinho === 0) return null
    if (podeComprar) return 'ok'
    return 'faltando'
  }, [podeComprar, totalCarrinho])

  const adicionarAoCarrinho = (item) => {
    const matchQuantidade = item.nome.match(/\((\d+)\)$/)
    const quantidadePack = matchQuantidade ? parseInt(matchQuantidade[1]) : 1
    
    setCarrinho((prev) => {
      const existente = prev.find((i) => i.id === item.id)

      if (existente) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantidade: i.quantidade + quantidadePack }
            : i
        )
      }

      return [...prev, { ...item, quantidade: quantidadePack }]
    })
  }

  const removerDoCarrinho = (id) => {
    setCarrinho((prev) => prev.filter((i) => i.id !== id))
  }

  const aumentarQuantidade = (id) => {
    setCarrinho((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantidade: i.quantidade + 1 } : i
      )
    )
  }

  const diminuirQuantidade = (id) => {
    setCarrinho((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, quantidade: Math.max(1, i.quantidade - 1) }
          : i
      )
    )
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
    const armasCarrinho = carrinho.filter(i => i.tipo === 'arma')
    const outrosCarrinho = carrinho.filter(i =>
      i.tipo !== 'arma' &&
      i.tipo !== 'armadura' &&
      i.tipo !== 'escudo'
    )

    const armasAnteriores = personagem.equipment?.weapons || []
    const itensAnteriores = personagem.equipment?.itens || []

    const armasCombinadas = [...armasAnteriores]
    armasCarrinho.forEach(arma => {
      const existente = armasCombinadas.find(a => a.id === arma.id)
      if (existente) {
        existente.quantidade = (existente.quantidade || 1) + (arma.quantidade || 1)
      } else {
        armasCombinadas.push({ id: arma.id, quantidade: arma.quantidade || 1 })
      }
    })

    const itensCombinados = [...itensAnteriores]
    outrosCarrinho.forEach(item => {
      const existente = itensCombinados.find(i => i.id === item.id)
      if (existente) {
        existente.quantidade = (existente.quantidade || 1) + (item.quantidade || 1)
      } else {
        itensCombinados.push({ id: item.id, quantidade: item.quantidade || 1 })
      }
    })

    atualizarCampo('equipment', {
      ...personagem.equipment,
      money: moedasRestantes,
      armor: armadura?.id || personagem.equipment?.armor || '',
      shield: escudo?.id || personagem.equipment?.shield || '',
      weapons: armasCombinadas,
      itens: itensCombinados
    })

    setCarrinho([])
  }

  return (
      <div className="loja-container">
        <div className="loja-layout">
          <div className="loja-items">
            <div className="carrinho-info">
              <span>Carrinho: {(totalCarrinho / 100).toFixed(2)} PO</span>
              <span>Disponível: {(totalDisponivel / 100).toFixed(2)} PO</span>
              <span>Restante: {(restante / 100).toFixed(2)} PO</span>
              <span className={statusMensagem}>
                {statusMensagem === 'ok' ? 'OK' : statusMensagem === 'faltando' ? 'Saldo insuficiente' : ''}
              </span>
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

          <div className="carrinho-floating" onClick={() => {
              setCarrinhoAberto(!carrinhoAberto)
              setTimeout(() => {
                carrinhoRef.current?.scrollIntoView({ behavior: 'smooth' })
              }, 100)
            }}>
            <span className="carrinho-icon">🛒</span>
            {carrinho.length > 0 && <span className="carrinho-badge">{carrinho.length}</span>}
          </div>

          {carrinhoAberto && (
            <div className="carrinho-panel" ref={carrinhoRef}>
              <div className="carrinho-header">
                <h4>Carrinho 🛒</h4>
                {carrinho.length > 0 && (
                  <button className="btn-limpar" onClick={() => setCarrinho([])}>
                    Limpar
                  </button>
                )}
              </div>

              {carrinho.length === 0 ? (
                <p>Vazio</p>
              ) : (
                <div className="carrinho-itens-grid">
                  {carrinho.map(item => (
                    <div key={item.id} className="carrinho-item">
                      <span className="carrinho-item-nome">{item.nome}</span>
                      <span className="carrinho-item-preco">
                        {(item.custo / 100).toFixed(2).replace('.', ',')} PO {item.quantidade > 1 && `× ${item.quantidade}`}
                      </span>
                      <div className="quantidade-box">
                        <button onClick={() => diminuirQuantidade(item.id)}>-</button>
                        <span>{item.quantidade}</span>
                        <button onClick={() => aumentarQuantidade(item.id)}>+</button>
                      </div>
                      <button className="btn-remover" onClick={() => removerDoCarrinho(item.id)}>×</button>
                    </div>
                  ))}
                  <div className="carrinho-totals">
                    <div className="carrinho-total-row">
                      <span>Conta:</span>
                      <span className="valor">{(totalDisponivel / 100).toFixed(2)} PO</span>
                    </div>
                    <div className="carrinho-total-row">
                      <span>Carrinho:</span>
                      <span className="valor">{(totalCarrinho / 100).toFixed(2)} PO</span>
                    </div>
                    <div className="carrinho-total-row">
                      <span>Restante:</span>
                      <span className={`valor ${podeComprar ? 'ok' : 'faltando'}`}>
                        {(restante / 100).toFixed(2)} PO
                      </span>
                    </div>
                    <button
                      className="btn-buy"
                      disabled={!podeComprar}
                      onClick={finalizarCompra}
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <Navigation prev="/idiomas" next="/inventario"/>
      </div>
  )
}