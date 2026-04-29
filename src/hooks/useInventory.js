import { useReducer, useMemo } from 'react'
import { useCharacter } from '../context/CharacterContext'
import { getItemPorId, getItemAjustadoPorTamanho } from '../components/Equipamentos/equipamentosLogic'
import { getCapacidade, getCapacidadeMontaria, tabelaCarga, getPesoTotalEquipamentos } from '../components/Carga/cargaLogic'
import { getTamanhoPorRaca, getBonusRacial } from '../components/Racas/racasLogic'

const inventoryReducer = (state, action) => {
  switch (action.type) {
    case 'MOVE_ITEM':
      return { ...state, items: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

export function useInventory() {
  const { personagem, atualizarCampo } = useCharacter()
  
  const [state, dispatch] = useReducer(inventoryReducer, {
    items: [],
    loading: false,
    error: null
  })

  const forca = useMemo(() => {
    return (personagem.atributos?.forca || 10) + (getBonusRacial(personagem.race)?.forca || 0)
  }, [personagem.atributos?.forca, personagem.race])

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

  const pesoTotalEquipamentos = useMemo(() => 
    getPesoTotalEquipamentos(personagem.equipment, personagem.race, personagem.classe), 
    [personagem.equipment, personagem.race, personagem.classe]
  )

  const capacidadeMontaria = useMemo(() => {
    const montariasItens = itens.filter(i => i.local === 'montaria')
    if (montariasItens.length === 0) return { leve: 0, media: 0, pesada: 0 }
    const primeiroItem = getItemPorId(montariasItens[0].id)
    if (!primeiroItem) return { leve: 0, media: 0, pesada: 0 }
    return getCapacidadeMontaria(primeiroItem)
  }, [itens])

  const getCargoStatus = (peso, capacidade) => {
    if (peso <= capacidade.leve) return 'leve'
    if (peso <= capacidade.media) return 'media'
    if (peso <= capacidade.pesada) return 'pesada'
    return 'excessiva'
  }

  return {
    personagem,
    atualizarCampo,
    dispatch,
    state,
    forca,
    pesoPersonagem,
    capacidadePersonagem,
    armadura,
    escudo,
    armas,
    itens,
    pesoTotalEquipamentos,
    capacidadeMontaria,
    getCargoStatus,
    tabelaCarga
  }
}