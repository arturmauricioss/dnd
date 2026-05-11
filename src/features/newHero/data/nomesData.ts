// import type { Race } from '@systems/race/types'

type Race = {
  name: string
}

export type Genero = 'masculino' | 'feminino' | 'unissex'

export interface Nome {
  nome: string
  racas: Race['name'][]
  genero: Genero
}

export const nomes: Nome[] = [
  {
    "nome": "Artur",
    "racas": [
      "Orc"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Bilbo",
    "racas": [
      "Halfling",
      "Humano"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Frodo",
    "racas": [
      "Halfling"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Pippin",
    "racas": [
      "Halfling"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Merry",
    "racas": [
      "Humano",
      "Halfling"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Adalardo",
    "racas": [
      "Halfling"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Adalinda",
    "racas": [
      "Halfling"
    ],
    "genero": "feminino"
  },
  {
    "nome": "Adelard",
    "racas": [
      "Halfling"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Beren",
    "racas": [
      "Halfling"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Bingo",
    "racas": [
      "Halfling"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Bruno",
    "racas": [
      "Halfling"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Cora",
    "racas": [
      "Halfling"
    ],
    "genero": "feminino"
  },
  {
    "nome": "Dora",
    "racas": [
      "Halfling"
    ],
    "genero": "feminino"
  },
  {
    "nome": "Elanor",
    "racas": [
      "Halfling"
    ],
    "genero": "feminino"
  },
  {
    "nome": "Erak",
    "racas": [
      "Halfling"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Fosca",
    "racas": [
      "Halfling"
    ],
    "genero": "feminino"
  },
  {
    "nome": "Garret",
    "racas": [
      "Halfling"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Guilherme",
    "racas": [
      "Halfling"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Isembardo",
    "racas": [
      "Halfling"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Marilene",
    "racas": [
      "Halfling"
    ],
    "genero": "feminino"
  },
  {
    "nome": "Porto",
    "racas": [
      "Halfling"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Rosa",
    "racas": [
      "Halfling"
    ],
    "genero": "feminino"
  },
  {
    "nome": "Sam",
    "racas": [
      "Halfling"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Tansy",
    "racas": [
      "Halfling"
    ],
    "genero": "feminino"
  },
  {
    "nome": "Aragorn",
    "racas": [
      "Humano"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Arwen",
    "racas": [
      "Humano"
    ],
    "genero": "feminino"
  },
  {
    "nome": "Boromir",
    "racas": [
      "Humano"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Denethor",
    "racas": [
      "Humano"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Eowyn",
    "racas": [
      "Humano"
    ],
    "genero": "feminino"
  },
  {
    "nome": "Faramir",
    "racas": [
      "Humano"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Gandalf",
    "racas": [
      "Humano"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Hellen",
    "racas": [
      "Humano"
    ],
    "genero": "feminino"
  },
  {
    "nome": "Isildur",
    "racas": [
      "Humano"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Jorge",
    "racas": [
      "Humano"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Maria",
    "racas": [
      "Humano"
    ],
    "genero": "feminino"
  },
  {
    "nome": "Pedro",
    "racas": [
      "Humano"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Balin",
    "racas": [
      "Anão"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Bifur",
    "racas": [
      "Anão"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Bombur",
    "racas": [
      "Anão"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Borin",
    "racas": [
      "Anão"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Dain",
    "racas": [
      "Anão"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Dis",
    "racas": [
      "Anão"
    ],
    "genero": "feminino"
  },
  {
    "nome": "Dori",
    "racas": [
      "Anão"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Durin",
    "racas": [
      "Anão"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Farin",
    "racas": [
      "Anão"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Fimbril",
    "racas": [
      "Anão"
    ],
    "genero": "feminino"
  },
  {
    "nome": "Floi",
    "racas": [
      "Anão"
    ],
    "genero": "feminino"
  },
  {
    "nome": "Fundin",
    "racas": [
      "Anão"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Gimli",
    "racas": [
      "Anão"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Glorin",
    "racas": [
      "Anão"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Gror",
    "racas": [
      "Anão"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Gumna",
    "racas": [
      "Anão"
    ],
    "genero": "feminino"
  },
  {
    "nome": "Haldir",
    "racas": [
      "Anão"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Kili",
    "racas": [
      "Anão"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Mardin",
    "racas": [
      "Anão"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Nain",
    "racas": [
      "Anão"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Narvi",
    "racas": [
      "Anão"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Norin",
    "racas": [
      "Anão"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Oin",
    "racas": [
      "Anão"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Thorin",
    "racas": [
      "Anão"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Thrain",
    "racas": [
      "Anão"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Celebrian",
    "racas": [
      "Elfo"
    ],
    "genero": "feminino"
  },
  {
    "nome": "Elrond",
    "racas": [
      "Elfo"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Elros",
    "racas": [
      "Elfo"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Galadriel",
    "racas": [
      "Elfo"
    ],
    "genero": "feminino"
  },
  {
    "nome": "Glorfindel",
    "racas": [
      "Elfo"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Legolas",
    "racas": [
      "Elfo"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Luthien",
    "racas": [
      "Elfo"
    ],
    "genero": "feminino"
  },
  {
    "nome": "Thranduil",
    "racas": [
      "Elfo"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Bimpnottin",
    "racas": [
      "Gnomo"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Fizwick",
    "racas": [
      "Gnomo"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Gimble",
    "racas": [
      "Gnomo"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Glint",
    "racas": [
      "Gnomo"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Immer",
    "racas": [
      "Gnomo"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Nameless",
    "racas": [
      "Gnomo"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Optim",
    "racas": [
      "Gnomo"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Pock",
    "racas": [
      "Gnomo"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Zook",
    "racas": [
      "Gnomo"
    ],
    "genero": "masculino"
  },
  {
    "nome": "Alex",
    "racas": [],
    "genero": "unissex"
  },
  {
    "nome": "Ash",
    "racas": [],
    "genero": "unissex"
  },
  {
    "nome": "Blair",
    "racas": [],
    "genero": "unissex"
  },
  {
    "nome": "Cameron",
    "racas": [],
    "genero": "unissex"
  },
  {
    "nome": "Casey",
    "racas": [],
    "genero": "unissex"
  },
  {
    "nome": "Dana",
    "racas": [],
    "genero": "unissex"
  },
  {
    "nome": "Jessie",
    "racas": [],
    "genero": "unissex"
  },
  {
    "nome": "Jordan",
    "racas": [],
    "genero": "unissex"
  },
  {
    "nome": "Morgan",
    "racas": [],
    "genero": "unissex"
  },
  {
    "nome": "Riley",
    "racas": [],
    "genero": "unissex"
  },
  {
    "nome": "Robin",
    "racas": [],
    "genero": "unissex"
  },
  {
    "nome": "Sage",
    "racas": [],
    "genero": "unissex"
  },
  {
    "nome": "Skylar",
    "racas": [],
    "genero": "unissex"
  },
  {
    "nome": "Taylor",
    "racas": [],
    "genero": "unissex"
  }
]
