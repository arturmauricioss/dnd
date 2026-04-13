import { useState } from 'react'
import { useCharacter } from '../context/CharacterContext'
import { itensLoja, calcularTotal } from '../data/loja'
import { getItensClasse } from '../data/itens'

function calcularTotalPO(pl, po, pp, pc) {
  const total = (parseInt(pl) || 0) * 10 + 
               (parseInt(po) || 0) + 
               (parseInt(pp) || 0) * 0.1 + 
               (parseInt(pc) || 0) * 0.01
  return total.toFixed(2).replace(/\.?0+$/, '').replace(/\.$/, '')
}

export default function Loja() {
  const { personagem, atualizarCampo } = useCharacter()
  const [carrinho, setCarrinho] = useState([])
  const [modoLoja, setModoLoja] = useState(true)
  
  const classe = personagem.classe
  const itensClasse = getItensClasse(classe)
  
  const money = personagem.equipment?.money || {}
  const pl = money.pl || '0'
  const po = money.po || '0'
  const pp = money.pp || '0'
  const pc = money.pc || '0'
  
  const totalPO = calcularTotalPO(pl, po, pp, pc)
  const totalCarrinho = calcularTotal(carrinho)
  const podeComprar = parseFloat(totalPO) >= totalCarrinho
  
  const adicionarAoCarrinho = (item) => {
    const existente = carrinho.find(i => i.id === item.id)
    if (existente) {
      setCarrinho(carrinho.map(i => 
        i.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i
      ))
    } else {
      setCarrinho([...carrinho, { ...item, quantidade: 1 }])
    }
  }
  
  const removerDoCarrinho = (itemId) => {
    setCarrinho(carrinho.filter(i => i.id !== itemId))
  }
  
  const comprarKitBasico = () => {
    if (!itensClasse) return
    
    const novosItens = []
    
    // Adicionar armadura
    if (itensClasse.armadura) {
      const itemArmadura = itensLoja.find(i => 
        i.nome.toLowerCase().includes(itensClasse.armadura.nome.toLowerCase().split(' ')[0])
      )
      if (itemArmadura) novosItens.push({ ...itemArmadura, quantidade: 1 })
    }
    
    // Adicionar escudo
    if (itensClasse.escudo) {
      const itemEscudo = itensLoja.find(i => 
        i.nome.toLowerCase().includes(itensClasse.escudo.nome.toLowerCase().split(' ')[0])
      )
      if (itemEscudo) novosItens.push({ ...itemEscudo, quantidade: 1 })
    }
    
    // Adicionar armas
    if (itensClasse.armas) {
      itensClasse.armas.forEach(arma => {
        const itemArma = itensLoja.find(i => 
          arma.nome.toLowerCase().includes(i.nome.toLowerCase().split(' ')[1] || '')
        )
        if (itemArma && !novosItens.find(i => i.id === itemArma.id)) {
          novosItens.push({ ...itemArma, quantidade: 1 })
        }
      })
    }
    
    // Adicionar itens extras
    if (itensClasse.itens) {
      itensClasse.itens.forEach(item => {
        const itemLoja = itensLoja.find(i => 
          item.nome.toLowerCase().includes(i.nome.toLowerCase())
        )
        if (itemLoja && !novosItens.find(i => i.id === itemLoja.id)) {
          novosItens.push({ ...itemLoja, quantidade: 1 })
        }
      })
    }
    
    setCarrinho(novosItens)
  }
  
  const finalizarCompra = () => {
    if (!podeComprar) return
    
    // Calcular quanto resta após a compra
    const totalEmPO = parseFloat(totalPO)
    const resto = Math.max(0, totalEmPO - totalCarrinho)
    
    // Converter: 1 PL = 10 PO, 1 PO = 10 PP, 1 PP = 10 PC
    const novaPl = Math.floor(resto / 10)
    const restoPO = resto - (novaPl * 10)
    const novoPO = Math.floor(restoPO)
    const restoPP = restoPO - novoPO
    const novaPp = Math.floor(restoPP * 10)
    const novaPc = Math.floor((restoPP * 10 - novaPp) * 100)
    
    atualizarCampo('equipment', {
      ...personagem.equipment,
      money: {
        po: novoPO.toString(),
        pl: novaPl.toString(),
        pp: novaPp.toString(),
        pc: novaPc.toString()
      }
    })
    
    // Equipar armadura e escudo
    const armadura = carrinho.find(i => i.tipo === 'armadura')
    const escudo = carrinho.find(i => i.tipo === 'escudo')
    const armas = carrinho.filter(i => i.tipo === 'arma')
    const outrosItens = carrinho.filter(i => !i.tipo)
    
    // Salvar no personagem (será usado pelos outros componentes)
    atualizarCampo('equipment', {
      ...personagem.equipment,
      armor: armadura?.nome || '',
      shield: escudo?.nome || '',
      weapons: armas.map(a => ({ nome: a.nome, tipo: 'corpo', dano: a.dano, critico: a.critico, alcance: a.alcance, peso: a.peso })),
      itens: outrosItens.map(i => i.nome).join(', ')
    })
    
    setCarrinho([])
    setModoLoja(false)
  }
  
  const sairDaLoja = () => {
    setModoLoja(false)
  }
  
  const entrarNaLoja = () => {
    setModoLoja(true)
  }
  
  if (!modoLoja) {
    return (
      <div className="loja-container">
        <h3>Equipamentos</h3>
        <button onClick={entrarNaLoja}>Ir à Loja</button>
        <p>Você tem seus equipamentos configurados.</p>
      </div>
    )
  }
  
  return (
    <div className="loja-container">
      <h3>Loja</h3>
      
      <div className="carrinho-info">
        <span>Carrinho: {totalCarrinho} PO</span>
        {podeComprar ? <span className="OK">OK!</span> : <span className="FALTANDO">Falta!</span>}
      </div>
      
      {itensClasse && (
        <button className="btn-kit" onClick={comprarKitBasico}>
          Comprar Kit Básico
        </button>
      )}
      
      <div className="loja-items">
        <h4>Itens Disponíveis</h4>
        <div className="itens-grid">
          {itensLoja.map(item => (
            <button 
              key={item.id} 
              className="item-loja"
              onClick={() => adicionarAoCarrinho(item)}
            >
              <span>{item.nome}</span>
              <span>{item.preco} PO</span>
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
            {carrinho.map(item => (
              <li key={item.id} className="carrinho-item">
                <span>{item.quantidade}x {item.nome}</span>
                <span>{item.preco * item.quantidade} PO</span>
                <button onClick={() => removerDoCarrinho(item.id)}>X</button>
              </li>
            ))}
          </ul>
        )}
        
        <div className="carrinho-total">
          <strong>Total: {totalCarrinho} PO</strong>
        </div>
        
        <button 
          className="btn-comprar"
          disabled={!podeComprar || carrinho.length === 0}
          onClick={finalizarCompra}
        >
          Finalizar Compra
        </button>
        
        <button className="btn-sair" onClick={sairDaLoja}>
          Sair sem comprar
        </button>
      </div>
    </div>
  )
}