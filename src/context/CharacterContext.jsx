import { createContext, useContext, useState, useCallback } from 'react'
import { getBonusRacial } from '../components/Racas/racasLogic'

const CharacterContext = createContext(null)

const prioridadeAtributosPorClasse = {
  barbaro: ['forca', 'constituicao', 'destreza', 'sabedoria', 'carisma', 'inteligencia'],
  guerreiro: ['forca', 'constituicao', 'destreza', 'sabedoria', 'carisma', 'inteligencia'],
  paladino: ['forca', 'carisma', 'constituicao', 'sabedoria', 'destreza', 'inteligencia'],
  ranger: ['destreza', 'forca', 'sabedoria', 'constituicao', 'inteligencia', 'carisma'],
  ladino: ['destreza', 'inteligencia', 'constituicao', 'carisma', 'sabedoria', 'forca'],
  monge: ['sabedoria', 'destreza', 'constituicao', 'forca', 'inteligencia', 'carisma'],
  clerigo: ['sabedoria', 'constituicao', 'forca', 'carisma', 'destreza', 'inteligencia'],
  druida: ['sabedoria', 'constituicao', 'destreza', 'inteligencia', 'forca', 'carisma'],
  mago: ['inteligencia', 'destreza', 'constituicao', 'sabedoria', 'carisma', 'forca'],
  feiticeiro: ['carisma', 'constituicao', 'destreza', 'inteligencia', 'sabedoria', 'forca'],
  bardo: ['carisma', 'destreza', 'inteligencia', 'constituicao', 'sabedoria', 'forca'],
}

const distribuirAtributosPorClasse = (classe) => {
  const valores = [15, 14, 13, 12, 10, 8]
  const prioridade = prioridadeAtributosPorClasse[classe]

  if (!prioridade) {
    return {
      forca: 15,
      destreza: 14,
      constituicao: 13,
      inteligencia: 12,
      sabedoria: 10,
      carisma: 8,
    }
  }

  const atributos = {}

  prioridade.forEach((atributo, index) => {
    atributos[atributo] = valores[index]
  })

  return atributos
}

const estadoInicial = {
  character_name: '',
  player: '',
  classe: 'guerreiro',
  level_class: 1,
  race: 'humano',
  alignment: 'selecione',
  deity: 'selecione',
  sex: 'selecione',
  idade: '',
  height: '',
  peso: 75,

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
    ca: {
      total: 0,
      armor: 0,
      dex: 0,
      size: 0,
      natural: 0,
      deflection: 0,
      misc: 0,
    },
    fort: { total: 0, base: 0, magico: 0, outros: 0, temp: 0 },
    ref: { total: 0, base: 0, magico: 0, outros: 0, temp: 0 },
    von: { total: 0, base: 0, magico: 0, outros: 0, temp: 0 },
  },

  weapons: [],
  equipment: {
    armor: null,
    shield: null,
    money: { po: 0, pl: 0, pp: 0, pc: 0 },
    weapons: [],
    itens: [],
    montaria: null,
  },

  idiomas: [],

  talentos: [],
  habilidadesEspeciais: [],
}

export function CharacterProvider({ children }) {
  const [personagem, setPersonagem] = useState(estadoInicial)
  const [selectedRace, setSelectedRace] = useState('humano')
  const [selectedClass, setSelectedClass] = useState('guerreiro')
  const [selectedAlignment, setSelectedAlignment] = useState('selecione')

  const atualizarCampo = useCallback((campo, valor) => {
    setPersonagem(prev => {
      const novoEstado = {
        ...prev,
        [campo]: valor,
      }

      if (campo === 'classe' && valor !== 'selecione') {
        novoEstado.atributos = distribuirAtributosPorClasse(valor)
        novoEstado.equipment = {
          armor: null,
          shield: null,
          money: { po: 0, pl: 0, pp: 0, pc: 0 },
          weapons: [],
          itens: [],
          montaria: null,
          montando: false
        }
        novoEstado.talentos = []
      }

      if (campo === 'race') {
        novoEstado.equipment = {
          armor: null,
          shield: null,
          money: { po: 0, pl: 0, pp: 0, pc: 0 },
          weapons: [],
          itens: [],
          montaria: null,
          montando: false
        }
        novoEstado.talentos = []
      }

      return novoEstado
    })
  }, [])

  const atualizarAtributo = useCallback((atributo, valor) => {
    setPersonagem(prev => ({
      ...prev,
      atributos: {
        ...prev.atributos,
        [atributo]: valor,
      },
    }))
  }, [])

  const atualizarAtributoRacial = useCallback((atributo, valor) => {
    setPersonagem(prev => ({
      ...prev,
      atributosRacial: {
        ...prev.atributosRacial,
        [atributo]: valor,
      },
    }))
  }, [])

  const atualizarPericia = useCallback((nomePericia, campo, valor) => {
    setPersonagem(prev => ({
      ...prev,
      pericias: {
        ...prev.pericias,
        [nomePericia]: {
          ...prev.pericias[nomePericia],
          [campo]: valor,
        },
      },
    }))
  }, [])

  const atualizarCombat = useCallback((campo, valor) => {
    setPersonagem(prev => ({
      ...prev,
      combat: {
        ...(prev.combat || {}),
        [campo]: valor,
      },
    }))
  }, [])

  const aplicarAtributosSugeridos = useCallback((classe) => {
    setPersonagem(prev => ({
      ...prev,
      atributos: distribuirAtributosPorClasse(classe),
    }))
  }, [])

  const getAtributoTotal = useCallback((atributo) => {
    const base = personagem.atributos[atributo] || 10
    const racial = getBonusRacial(personagem.race)?.[atributo] || 0
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
    aplicarAtributosSugeridos,
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