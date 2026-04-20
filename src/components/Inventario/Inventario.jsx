import { useMemo, useState } from 'react'
import { useCharacter } from '../../context/CharacterContext'
import { converterParaPO } from './dinheiroData'
import { getItemPorId, getPesoItem, getCapacidade, getLoad, tabelaCarga } from '../Equipamentos/equipamentosLogic'
import { getDinheiroInicial } from '../Classes/classesData'
import ItemCard from '../ItemCard/ItemCard'
import { Navigation, Page } from '../global'
import './Inventario.css'

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

  const capacidade = useMemo(() => getCapacidade(forca), [forca])
  
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

  const montaria = useMemo(() => {
    const montariaId = personagem.equipment?.montaria
    return montariaId ? getItemPorId(montariaId) : null
  }, [personagem.equipment?.montaria])

  const armas = useMemo(() => personagem.equipment?.weapons || [], [personagem.equipment?.weapons])
  const itens = useMemo(() => personagem.equipment?.itens || [], [personagem.equipment?.itens])

  const pesoArmadura = useMemo(() => getPesoItem(armadura) || 0, [armadura])
  const pesoEscudo = useMemo(() => getPesoItem(escudo) || 0, [escudo])
  const pesoMontaria = useMemo(() => getPesoItem(montaria) || 0, [montaria])

  const pesoArmasEquipped = useMemo(() => {
    return armas
      .filter(a => a.local === 'equipped')
      .reduce((total, a) => {
        const item = getItemPorId(a.id)
        return total + (getPesoItem(item) * (a.quantidade || 1))
      }, 0)
  }, [armas])

  const pesoItensEquipped = useMemo(() => {
    return itens
      .filter(i => i.local === 'equipped')
      .reduce((total, i) => {
        const item = getItemPorId(i.id)
        return total + (getPesoItem(item) * (i.quantidade || 1))
      }, 0)
  }, [itens])

  const pesoArmasCarregando = useMemo(() => {
    return armas
      .filter(a => a.local === 'carregando')
      .reduce((total, a) => {
        const item = getItemPorId(a.id)
        return total + (getPesoItem(item) * (a.quantidade || 1))
      }, 0)
  }, [armas])

  const pesoItensCarregando = useMemo(() => {
    return itens
      .filter(i => i.local === 'carregando')
      .reduce((total, i) => {
        const item = getItemPorId(i.id)
        return total + (getPesoItem(item) * (i.quantidade || 1))
      }, 0)
  }, [itens])

  const pesoTotalEquipamentos = pesoArmadura + pesoEscudo + pesoArmasEquipped + pesoItensEquipped + pesoArmasCarregando + pesoItensCarregando

  const pesoTotal = montando 
    ? pesoTotalEquipamentos 
    : pesoPersonagem + pesoTotalEquipamentos

  const cargaAtual = getLoad(pesoTotal, forca)
  const dadosCarga = tabelaCarga[cargaAtual]

  const pesoExcedente = pesoTotal - capacidade.medium

  const mudarLocal = (tipo, id, novoLocal) => {
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

    const campo = tipo === 'arma' ? 'weapons' : 'itens'
    const lista = [...(personagem.equipment?.[campo] || [])]
    const idx = lista.findIndex(i => i.id === id)
    if (idx >= 0) {
      lista[idx] = { ...lista[idx], local: novoLocal }
      atualizarCampo('equipment', {
        ...personagem.equipment,
        [campo]: lista
      })
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
    const peso = getPesoItem(itemData) * quantidade
    return (
      <ItemCard 
        key={`${tipo}-${item.id}`} 
        item={{ id: item.id, ...itemData, quantidade }} 
        peso={peso}
        local={item.local}
        onLocalChange={(novoLocal) => mudarLocal(tipo, item.id, novoLocal)}
      />
    )
  }

  const renderSecao = (titulo, itensLista, tipo) => {
    if (!itensLista || itensLista.length === 0) return null
    return (
      <div className="inventario-secao">
        <h4>{titulo}</h4>
        <div className="inventario-itens-grid">
          {itensLista.map((item, idx) => renderItem(item, tipo, item.quantidade || 1))}
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
            <span className="peso-label">Peso:</span>
            <span className="peso-value">{pesoTotal.toFixed(1)} kg</span>
            <span className="peso-capacidade">/ {capacidade.medium} kg (medium)</span>
          </div>
          <div className="carga-info">
            <span className={`carga-badge ${cargaAtual}`}>
              {cargaAtual === 'light' ? 'Leve' : cargaAtual === 'medium' ? 'Média' : 'Pesada'}
            </span>
            {cargaAtual !== 'light' && (
              <span className="carga-penalidade">
                Testes: {dadosCarga.checkPenalty} | Corrida: x{dadosCarga.corrida}
              </span>
            )}
          </div>
          {pesoExcedente > 0 && (
            <div className="peso-aviso">
              ⚠️ Excedendo {pesoExcedente.toFixed(1)} kg da carga média!
            </div>
          )}
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
            <span className="tab-count">{montaria ? 1 : 0}</span>
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
            {montaria && (
              <div className="montaria-card" onClick={equiparMontaria}>
                <span className="montaria-icon">🐴</span>
                <span className="montaria-nome">{montaria.nome}</span>
                <span className="montaria-peso">{pesoMontaria} kg</span>
                <span className={`montaria-status ${montando ? 'montando' : ''}`}>
                  {montando ? 'Montando' : 'A pé'}
                </span>
              </div>
            )}
            {montando && montaria && (
              <div className="montaria-info">
                Capacidade da montaria: {Math.floor(capacidade.light * 1.5)} kg (light), {' '}
                {Math.floor(capacidade.medium * 1.5)} kg (medium), {' '}
                {Math.floor(capacidade.heavy * 1.5)} kg (heavy)
              </div>
            )}
            {!montaria && <p>Nenhuma montaria disponível</p>}
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