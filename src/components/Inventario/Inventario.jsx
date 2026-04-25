import { useMemo, useState } from 'react'
import { useCharacter } from '../../context/CharacterContext'
import { converterParaPO } from './dinheiroData'
import { getItemPorId } from '../Equipamentos/equipamentosLogic'
import { getPesoItem, getCapacidade, getCapacidadeMontaria, tabelaCarga, getItemAjustadoPorTamanho } from '../Carga/cargaLogic'
import { getTamanhoPorRaca } from '../Racas/racasLogic'
import { getDinheiroInicial } from '../Classes/classesData'
import { montarias, transporte } from '../Equipamentos/montariasData'
import ItemCard from '../ItemCard/ItemCard'
import { Navigation, Page } from '../global'
import './Inventario.css'

const TODAS_MONTARIAS = { ...montarias, ...transporte }

export default function Inventario() {
  const { personagem, atualizarCampo } = useCharacter()
  const [abaSelecionada, setAbaSelecionada] = useState('equipado')
  const [montando, setMontando] = useState(personagem.equipment?.montando || false)

  const forca = useMemo(() => {
    return (personagem.atributos?.forca || 10) + (personagem.atributosRacial?.forca || 0)
  }, [personagem.atributos?.forca, personagem.atributosRacial?.forca])

  const pesoPersonagem = useMemo(() => {
    return parseFloat(personagem.peso) || 0
  }, [personagem.peso])

  const capacidadePersonagem = useMemo(() => {
    const tamanho = getTamanhoPorRaca(personagem.race)
    const cap = getCapacidade(forca, tamanho)
    return {
      leve: cap.leve || 0,
      media: cap.media || 0,
      pesada: cap.pesada || 0
    }
  }, [forca, personagem.race])
  
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
    return armorId ? getItemAjustadoPorTamanho(getItemPorId(armorId), personagem.race) : null
  }, [personagem.equipment?.armor, personagem.race])

  const escudo = useMemo(() => {
    const shieldId = personagem.equipment?.shield
    return shieldId ? getItemAjustadoPorTamanho(getItemPorId(shieldId), personagem.race) : null
  }, [personagem.equipment?.shield, personagem.race])

  const armas = useMemo(() => personagem.equipment?.weapons || [], [personagem.equipment?.weapons])
  const itens = useMemo(() => personagem.equipment?.itens || [], [personagem.equipment?.itens])
  const montariasItens = useMemo(() => itens.filter(i => i.local === 'montaria'), [itens])

  const capacidadeMontaria = useMemo(() => {
    if (montariasItens.length === 0) return { leve: 0, media: 0, pesada: 0 }
    const primeiroItem = getItemPorId(montariasItens[0].id)
    if (!primeiroItem) return { leve: 0, media: 0, pesada: 0 }
    return getCapacidadeMontaria(primeiroItem)
  }, [montariasItens])

  const capacidadeTotal = useMemo(() => {
    if (montando) return capacidadeMontaria
    return {
      leve: capacidadePersonagem.leve + capacidadeMontaria.leve,
      media: capacidadePersonagem.media + capacidadeMontaria.media,
      pesada: capacidadePersonagem.pesada + capacidadeMontaria.pesada
    }
  }, [montando, capacidadePersonagem, capacidadeMontaria])

  const pesoArmadura = useMemo(() => getPesoItem(armadura) || 0, [armadura])
  const pesoEscudo = useMemo(() => getPesoItem(escudo) || 0, [escudo])

  const pesoArmasEquipped = useMemo(() => {
    return armas
      .filter(a => a.local === 'equipped')
      .reduce((total, a) => {
        const itemOriginal = getItemPorId(a.id)
        const itemAjustado = getItemAjustadoPorTamanho(itemOriginal, personagem.race)
        return total + (getPesoItem(itemAjustado) * (a.quantidade || 1))
      }, 0)
  }, [armas, personagem.race])

  const pesoItensEquipped = useMemo(() => {
    return itens
      .filter(i => i.local === 'equipped')
      .reduce((total, i) => {
        const itemOriginal = getItemPorId(i.id)
        const itemAjustado = getItemAjustadoPorTamanho(itemOriginal, personagem.race)
        return total + (getPesoItem(itemAjustado) * (i.quantidade || 1))
      }, 0)
  }, [itens, personagem.race])

  const pesoArmasCarregando = useMemo(() => {
    return armas
      .filter(a => a.local === 'carregando')
      .reduce((total, a) => {
        const itemOriginal = getItemPorId(a.id)
        const itemAjustado = getItemAjustadoPorTamanho(itemOriginal, personagem.race)
        return total + (getPesoItem(itemAjustado) * (a.quantidade || 1))
      }, 0)
  }, [armas, personagem.race])

  const pesoItensCarregando = useMemo(() => {
    return itens
      .filter(i => i.local === 'carregando')
      .reduce((total, i) => {
        const itemOriginal = getItemPorId(i.id)
        const itemAjustado = getItemAjustadoPorTamanho(itemOriginal, personagem.race)
        return total + (getPesoItem(itemAjustado) * (i.quantidade || 1))
      }, 0)
  }, [itens, personagem.race])

  const pesoTotalEquipamentos = pesoArmadura + pesoEscudo + pesoArmasEquipped + pesoItensEquipped + pesoArmasCarregando + pesoItensCarregando

  const pesoTotal = montando 
    ? pesoPersonagem + pesoTotalEquipamentos 
    : pesoTotalEquipamentos

  const cargaAtual = montando && montariasItens.length > 0
    ? (pesoTotal <= capacidadeMontaria.leve ? 'leve' : pesoTotal <= capacidadeMontaria.media ? 'media' : pesoTotal <= capacidadeMontaria.pesada ? 'pesada' : 'excessiva')
    : (pesoTotal <= capacidadeTotal.leve ? 'leve' : pesoTotal <= capacidadeTotal.media ? 'media' : pesoTotal <= capacidadeTotal.pesada ? 'pesada' : 'excessiva')
  const dadosCarga = tabelaCarga()[cargaAtual]

  const mudarLocal = (tipo, id, novoLocal, qtdMover = null, localOrigem = null) => {
    if (tipo === 'armadura') {
      if (novoLocal === 'equipped') {
        atualizarCampo('equipment', { ...personagem.equipment, armor: id })
      } else if (novoLocal === 'carregando') {
        if (personagem.equipment?.armor === id) {
          atualizarCampo('equipment', { ...personagem.equipment, armor: null })
        }
      }
      return
    }
    
    if (tipo === 'escudo') {
      if (novoLocal === 'equipped') {
        atualizarCampo('equipment', { ...personagem.equipment, shield: id })
      } else if (novoLocal === 'carregando') {
        if (personagem.equipment?.shield === id) {
          atualizarCampo('equipment', { ...personagem.equipment, shield: null })
        }
      }
      return
    }

    const isItemMontaria = !!TODAS_MONTARIAS[id]
    if (isItemMontaria && (novoLocal === 'montaria' || novoLocal === 'tesoureiro' || novoLocal === 'carregando')) {
      const listaItens = [...(personagem.equipment?.itens || [])]
      const idxItens = listaItens.findIndex(i => i.id === id && i.local === localOrigem)
      if (idxItens < 0) return

      const item = listaItens[idxItens]
      const qtd = parseInt(qtdMover) || item.quantidade || 1
      
      if (novoLocal === 'montaria') {
        if (qtd >= item.quantidade) {
          listaItens[idxItens] = { ...item, local: 'montaria' }
        } else {
          listaItens[idxItens] = { ...item, quantidade: item.quantidade - qtd }
          listaItens.push({ id: id, quantidade: qtd, local: 'montaria' })
        }
        atualizarCampo('equipment', { ...personagem.equipment, itens: listaItens })
      } else if (novoLocal === 'tesoureiro') {
        if (qtd >= item.quantidade) {
          listaItens[idxItens] = { ...item, local: 'tesoureiro' }
        } else {
          listaItens[idxItens] = { ...item, quantidade: item.quantidade - qtd }
          listaItens.push({ id: id, quantidade: qtd, local: 'tesoureiro' })
        }
        atualizarCampo('equipment', { ...personagem.equipment, itens: listaItens })
      } else if (novoLocal === 'carregando') {
        if (qtd >= item.quantidade) {
          listaItens[idxItens] = { ...item, local: 'carregando' }
        } else {
          listaItens[idxItens] = { ...item, quantidade: item.quantidade - qtd }
          listaItens.push({ id: id, quantidade: qtd, local: 'carregando' })
        }
        atualizarCampo('equipment', { ...personagem.equipment, itens: listaItens })
      }
      return
    }

    const campo = tipo === 'arma' ? 'weapons' : 'itens'
    const lista = [...(personagem.equipment?.[campo] || [])]
    const idxOrigem = lista.findIndex(i => i.id === id && i.local === localOrigem)
    
    if (idxOrigem >= 0) {
      const itemOrigem = lista[idxOrigem]
      const qtd = parseInt(qtdMover) || itemOrigem.quantidade || 1
      const idxDestino = lista.findIndex(i => i.id === id && i.local === novoLocal)
      
      if (qtd >= itemOrigem.quantidade) {
        if (idxDestino >= 0) {
          lista[idxDestino] = { ...lista[idxDestino], quantidade: lista[idxDestino].quantidade + itemOrigem.quantidade }
          lista.splice(idxOrigem, 1)
        } else {
          lista[idxOrigem] = { ...itemOrigem, local: novoLocal }
        }
      } else {
        lista[idxOrigem] = { ...itemOrigem, quantidade: itemOrigem.quantidade - qtd }
        if (idxDestino >= 0) {
          lista[idxDestino] = { ...lista[idxDestino], quantidade: lista[idxDestino].quantidade + qtd }
        } else {
          lista.push({ id: id, quantidade: qtd, local: novoLocal })
        }
      }
    } else {
      lista.push({ id: id, quantidade: parseInt(qtdMover) || 1, local: novoLocal })
    }
    
    atualizarCampo('equipment', {
      ...personagem.equipment,
      [campo]: lista
    })
  }

  const venderItem = (tipo, id, qtdVender) => {
    const itemData = getItemPorId(id)
    if (!itemData) return
    
    if (tipo === 'montaria') {
      const valorTotal = itemData.custo || 0
      const listaItens = personagem.equipment?.itens || []
      const novaListaItens = listaItens.filter(i => i.id !== id)
      atualizarCampo('equipment', {
        ...personagem.equipment,
        montaria: null,
        itens: novaListaItens,
        money: {
          po: (personagem.equipment?.money?.po || 0) + Math.floor(valorTotal / 100),
          pl: (personagem.equipment?.money?.pl || 0) + Math.floor((valorTotal % 100) / 10),
          pp: (personagem.equipment?.money?.pp || 0) + Math.floor((valorTotal % 100 % 10) / 1),
          pc: personagem.equipment?.money?.pc || 0
        }
      })
      return
    }
    
    const campo = tipo === 'arma' ? 'weapons' : 'itens'
    const lista = [...(personagem.equipment?.[campo] || [])]
    const idx = lista.findIndex(i => i.id === id)
    if (idx >= 0) {
      const item = lista[idx]
      const qtd = qtdVender || item.quantidade || 1
      const valorTotal = (itemData.custo || 0) * qtd
      
      if (qtd >= item.quantidade) {
        const listaDinheiro = {
          po: (personagem.equipment?.money?.po || 0) + Math.floor(valorTotal / 100),
          pl: (personagem.equipment?.money?.pl || 0) + Math.floor((valorTotal % 100) / 10),
          pp: (personagem.equipment?.money?.pp || 0) + Math.floor((valorTotal % 100 % 10) / 1),
          pc: personagem.equipment?.money?.pc || 0
        }
        const novaLista = lista.filter(i => i.id !== id)
        atualizarCampo('equipment', {
          ...personagem.equipment,
          [campo]: novaLista,
          money: listaDinheiro
        })
      } else {
        lista[idx] = { ...item, quantidade: item.quantidade - qtd }
        const listaDinheiro = {
          po: (personagem.equipment?.money?.po || 0) + Math.floor(valorTotal / 100),
          pl: (personagem.equipment?.money?.pl || 0) + Math.floor((valorTotal % 100) / 10),
          pp: (personagem.equipment?.money?.pp || 0) + Math.floor((valorTotal % 100 % 10) / 1),
          pc: personagem.equipment?.money?.pc || 0
        }
        atualizarCampo('equipment', {
          ...personagem.equipment,
          [campo]: lista,
          money: listaDinheiro
        })
      }
    }
  }

  const equiparMontaria = () => {
    const novoEstado = !montando
    setMontando(novoEstado)
    atualizarCampo('equipment', { ...personagem.equipment, montando: novoEstado })
  }

  const armasEquipado = armas.filter(a => (a.local || 'carregando') === 'equipped')
  const armasCarregando = armas.filter(a => (a.local || 'carregando') === 'carregando')
  const armasTesoureiro = armas.filter(a => (a.local || 'carregando') === 'tesoureiro')

  const itensEquipado = itens.filter(i => (i.local || 'carregando') === 'equipped')
  const itensCarregando = itens.filter(i => (i.local || 'carregando') === 'carregando')
  const itensTesoureiro = itens.filter(i => (i.local || 'carregando') === 'tesoureiro')

  const renderItem = (item, tipo, quantidade = 1) => {
    const itemData = getItemPorId(item.id)
    if (!itemData) return null
    const itemAjustado = getItemAjustadoPorTamanho(itemData, personagem.race)
    const peso = getPesoItem(itemAjustado) * quantidade
    const tipoItem = item.tipo || tipo
    const isMontariaItem = !!TODAS_MONTARIAS[item.id]
    const tipoItemCard = isMontariaItem ? 'montaria' : tipoItem
    return (
      <ItemCard 
        key={`${tipo}-${item.id}-${item.local}`} 
        item={{ id: item.id, ...itemAjustado, quantidade }} 
        peso={peso}
        local={item.local}
        onLocalChange={(novoLocal, qtd) => mudarLocal(tipo, item.id, novoLocal, qtd, item.local)}
        onSell={(qtd) => venderItem(tipo, item.id, qtd)}
        tipoItem={tipoItemCard}
      />
    )
  }

const renderSecao = (titulo, itensLista, tipo) => {
    if (!itensLista || itensLista.length === 0) return null
    return (
      <div className="inventario-secao">
        <h4>{titulo}</h4>
        <div className="inventario-itens-grid">
          {itensLista.map((item) => {
            const isMontariaItem = !!TODAS_MONTARIAS[item.id]
            const tipoItemCard = isMontariaItem ? 'montaria' : tipo
            const itemOriginal = getItemPorId(item.id)
              const itemAjustado = getItemAjustadoPorTamanho(itemOriginal, personagem.race)
              return (
                <ItemCard 
                  key={`${tipo}-${item.id}-${item.local}`}
                  item={{ id: item.id, ...itemAjustado, quantidade: item.quantidade || 1 }}
                  peso={(getPesoItem(itemAjustado) || 0) * (item.quantidade || 1)}
                  local={item.local}
                  onLocalChange={(novoLocal, qtd) => mudarLocal(tipo, item.id, novoLocal, qtd, item.local)}
                  onSell={(qtd) => venderItem(tipo, item.id, qtd)}
                  tipoItem={tipoItemCard}
                />
            )
          })}
        </div>
      </div>
    )
  }

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

        <div className="peso-display">
          <div className="peso-info">
            <span className="peso-label">Carga:</span>
            <span className="peso-value">{pesoTotal.toFixed(1)} kg</span>
            <span className="peso-capacidade">/ {capacidadeTotal[cargaAtual]?.toFixed(1) || '∞'} kg</span>
          </div>
          <div className="carga-info">
            <span className={`carga-badge ${cargaAtual}`}>
              {cargaAtual === 'leve' ? 'Leve' : cargaAtual === 'media' ? 'Média' : cargaAtual === 'pesada' ? 'Pesada' : 'Excessiva'}
            </span>
            {cargaAtual !== 'leve' && (
              <span className="carga-penalidade">
                Testes: {dadosCarga.checkPenalty} | Corrida: x{dadosCarga.corrida}
              </span>
            )}
          </div>
          
        </div>

        <div className="inventario-tabs">
          <button 
            className={`tab-btn ${abaSelecionada === 'equipado' ? 'active' : ''}`}
            onClick={() => setAbaSelecionada('equipado')}
          >
            🧤 Equipado
            <span className="tab-count">{armasEquipado.length + itensEquipado.length + (armadura ? 1 : 0) + (escudo ? 1 : 0)}</span>
          </button>
          <button 
            className={`tab-btn ${abaSelecionada === 'carregando' ? 'active' : ''}`}
            onClick={() => setAbaSelecionada('carregando')}
          >
            🎒 Carregando
            <span className="tab-count">{armasCarregando.length + itensCarregando.length}</span>
          </button>
          <button 
            className={`tab-btn ${abaSelecionada === 'montaria' ? 'active' : ''}`}
            onClick={() => setAbaSelecionada('montaria')}
          >
            🐴 Montaria
            <span className="tab-count">{montariasItens.length}</span>
          </button>
          <button 
            className={`tab-btn ${abaSelecionada === 'tesoureiro' ? 'active' : ''}`}
            onClick={() => setAbaSelecionada('tesoureiro')}
          >
            🏠 Tesoureiro
            <span className="tab-count">{armasTesoureiro.length + itensTesoureiro.length}</span>
          </button>
        </div>

        {abaSelecionada === 'equipado' && (
          <div className="inventario-aba">
            {armadura && renderItem({ id: armadura.id, local: 'equipped' }, 'armadura', 1)}
            {escudo && renderItem({ id: escudo.id, local: 'equipped' }, 'escudo', 1)}
            {renderSecao('Armas', armasEquipado, 'arma')}
            {renderSecao('Itens', itensEquipado, 'item')}
          </div>
        )}

        {abaSelecionada === 'carregando' && (
          <div className="inventario-aba">
            {renderSecao('Armas', armasCarregando, 'arma')}
            {renderSecao('Itens', itensCarregando, 'item')}
          </div>
        )}

        {abaSelecionada === 'montaria' && (
          <div className="inventario-aba">
            {montariasItens.length > 0 && (
              <div className="inventario-itens-grid">
                {montariasItens.map((item) => {
                  const itemOriginal = getItemPorId(item.id)
                  const itemAjustado = getItemAjustadoPorTamanho(itemOriginal, personagem.race)
                  return (
                    <ItemCard 
                      key={item.id}
                      item={{ id: item.id, ...itemAjustado, quantidade: item.quantidade || 1 }} 
                      peso={(getPesoItem(itemAjustado) || 0) * (item.quantidade || 1)}
                      local={item.local}
                      onLocalChange={(novoLocal, qtd) => mudarLocal('montaria', item.id, novoLocal, qtd, item.local)}
                      onSell={(qtd) => venderItem('montaria', item.id, qtd)}
                      tipoItem="montaria"
                      extraBtn={
                        <button className="extra-montar-btn" onClick={(e) => { e.stopPropagation(); equiparMontaria() }}>
                          {montando ? '🚶' : '🐴'}
                        </button>
                      }
                    />
                  )
                })}
              </div>
            )}
            {montando && montariasItens.length > 0 && (
              <div className="montaria-info">
                Capacidade: {Math.floor(capacidadeMontaria.leve)}kg leve, {' '}
                {Math.floor(capacidadeMontaria.media)}kg média, {' '}
                {Math.floor(capacidadeMontaria.maxima)}kg máxima
              </div>
            )}
            {montariasItens.length === 0 && <p>Nenhuma montaria disponível</p>}
          </div>
        )}

        {abaSelecionada === 'tesoureiro' && (
          <div className="inventario-aba">
            {renderSecao('Armas', armasTesoureiro, 'arma')}
            {renderSecao('Itens', itensTesoureiro, 'item')}
          </div>
        )}
      </div>
      <Navigation prev="/loja"/>
    </div>
  )
}