import { createContext, useContext, useState, useCallback } from 'react'
import { getBonusRacial } from '../data/bonusRaciais'

const CharacterContext = createContext(null)

const estadoInicial = {
  character_name: '',
  player: '',
  classe: 'selecione',
  level_class: 1,
  level_profession: 0,
  race: 'selecione',
  alignment: 'selecione',
  deity: 'selecione',
  profession: '',
  sex: 'selecione',
  idade: '',
  height: '',
  weight: '',
  usarKit: false,
  
  atributos: {
    forca: 15,
    destreza: 14,
    constituicao: 13,
    inteligencia: 12,
    sabedoria: 10,
    carisma: 8,
  },
  
  atributosRacial: {
    forca: 0,
    destreza: 0,
    constituicao: 0,
    inteligencia: 0,
    sabedoria: 0,
    carisma: 0,
  },
  
  pericias: {},
  pontosPericiaDisponiveis: 0,
  maxGraduacaoPorPericia: 0,
  
  combat: {
    bba: 0,
    hp: { atual: 0, max: 0 },
    deslocamento: 0,
    iniciativa: { total: 0, outros: 0 },
    ca: { total: 0, armor: 0, dex: 0, size: 0, natural: 0, deflection: 0, misc: 0 },
    fort: { total: 0, base: 0, magico: 0, outros: 0, temp: 0 },
    ref: { total: 0, base: 0, magico: 0, outros: 0, temp: 0 },
    von: { total: 0, base: 0, magico: 0, outros: 0, temp: 0 },
  },
  
  weapons: [],
  equipment: {
    armor: null,
    shield: null,
    money: { po: 0, pl: 0, pp: 0, pc: 0 },
  },
  
  talentos: [],
  habilidadesEspeciais: [],
}

export function CharacterProvider({ children }) {
  const [personagem, setPersonagem] = useState(estadoInicial)
  const [selectedRace, setSelectedRace] = useState('humano')
  const [selectedClass, setSelectedClass] = useState('selecione')
  const [selectedAlignment, setSelectedAlignment] = useState('selecione')

  const atualizarCampo = useCallback((campo, valor) => {
    setPersonagem(prev => ({
      ...prev,
      [campo]: valor
    }))
  }, [])

  const atualizarAtributo = useCallback((atributo, valor) => {
    setPersonagem(prev => ({
      ...prev,
      atributos: {
        ...prev.atributos,
        [atributo]: valor
      }
    }))
  }, [])

  const atualizarAtributoRacial = useCallback((atributo, valor) => {
    setPersonagem(prev => ({
      ...prev,
      atributosRacial: {
        ...prev.atributosRacial,
        [atributo]: valor
      }
    }))
  }, [])

  const atualizarPericia = useCallback((nomePericia, campo, valor) => {
    setPersonagem(prev => ({
      ...prev,
      pericias: {
        ...prev.pericias,
        [nomePericia]: {
          ...prev.pericias[nomePericia],
          [campo]: valor
        }
      }
    }))
  }, [])

  const atualizarCombat = useCallback((campo, valor) => {
    setPersonagem(prev => ({
      ...prev,
      combat: {
        ...prev.combat,
        [campo]: valor
      }
    }))
  }, [])

  const getAtributoTotal = useCallback((atributo) => {
    const base = personagem.atributos[atributo] || 10
    const racial = getBonusRacial(personagem.race)[atributo] || 0
    return base + racial
  }, [personagem.atributos, personagem.race])

  const getModificador = useCallback((atributo) => {
    const total = getAtributoTotal(atributo)
    return Math.floor((total - 10) / 2)
  }, [getAtributoTotal])

  const value = {
    personagem,
    setPersonagem,
    selectedRace,
    setSelectedRace,
    selectedClass,
    setSelectedClass,
    selectedAlignment,
    setSelectedAlignment,
    atualizarCampo,
    atualizarAtributo,
    atualizarAtributoRacial,
    atualizarPericia,
    atualizarCombat,
    getAtributoTotal,
    getModificador,
  }

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCharacter() {
  const context = useContext(CharacterContext)
  if (!context) {
    throw new Error('useCharacter must be used within a CharacterProvider')
  }
  return context
}