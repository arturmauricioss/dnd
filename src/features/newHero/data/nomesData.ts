// import type { Race } from '@systems/race/types'

export type Genero = 'masculino' | 'feminino' | 'unissex'

type Race = {
  name: string
}

export interface Nome {
  id: string
  nome: string
  racas: Race['name'][]
  genero: Genero
}

export const nomes: Nome[] = [
  {
    "nome": "Adalardo",
    "racas": [
      "Halfling",
      "Orc",
      "Humano"
    ],
    "genero": "masculino",
    "id": "c6671d59-d4d9-4fc9-85b4-e921c03187ee"
  },
  {
    "nome": "Adalinda",
    "racas": [
      "Orc"
    ],
    "genero": "feminino",
    "id": "5669fb6d-34a2-41d2-a721-c2dbbc507fb6"
  },
  {
    "nome": "Adelard",
    "racas": [],
    "genero": "masculino",
    "id": "cba70c48-240d-4f81-b6ac-2eafe27d64c4"
  },
  {
    "nome": "Alex",
    "racas": [],
    "genero": "unissex",
    "id": "cba0a379-8373-4668-aea3-3b8ac5890355"
  },
  {
    "nome": "Aragorn",
    "racas": [
      "Humano"
    ],
    "genero": "masculino",
    "id": "0c27a3dc-539b-41b6-953c-8e9eeb9b280b"
  },
  {
    "nome": "Artur",
    "racas": [
      "Gnomo",
      "Halfling",
      "Orc"
    ],
    "genero": "masculino",
    "id": "bea815d6-99cf-4d2a-800e-2fc60abf56fe"
  },
  {
    "nome": "Arwen",
    "racas": [
      "Humano",
      "Orc"
    ],
    "genero": "feminino",
    "id": "e2473a1a-67e4-480b-9a6c-52e641472db4"
  },
  {
    "nome": "Ash",
    "racas": [],
    "genero": "unissex",
    "id": "b3c4e3d1-c39c-43b4-b9b3-8dba5b467c03"
  },
  {
    "nome": "Balin",
    "racas": [
      "Anão"
    ],
    "genero": "masculino",
    "id": "5edc3897-ca16-4697-95a7-7c894dea4963"
  },
  {
    "nome": "Beren",
    "racas": [],
    "genero": "masculino",
    "id": "f5b2a1a8-0d11-46bb-847c-3ba57443bcf2"
  },
  {
    "nome": "Bifur",
    "racas": [
      "Anão"
    ],
    "genero": "masculino",
    "id": "e5e361c3-4e90-4bf4-82a3-b34934a463f4"
  },
  {
    "nome": "Bilbo",
    "racas": [
      "Humano",
      "Gnomo",
      "Orc"
    ],
    "genero": "masculino",
    "id": "ae1fe028-9205-4e82-be9e-6238a2e65288"
  },
  {
    "nome": "Bimpnottin",
    "racas": [
      "Gnomo"
    ],
    "genero": "masculino",
    "id": "c61042b8-9a89-48b8-87d7-0586bd3661ba"
  },
  {
    "nome": "Bingo",
    "racas": [],
    "genero": "masculino",
    "id": "514a61b2-fb25-48c3-98ed-89458b0b592e"
  },
  {
    "nome": "Blair",
    "racas": [],
    "genero": "unissex",
    "id": "f84e2ac8-0e10-46d2-ab57-c8659df30093"
  },
  {
    "nome": "Bombur",
    "racas": [
      "Anão"
    ],
    "genero": "masculino",
    "id": "557c59eb-1c6d-4a3d-952c-6237d248ced9"
  },
  {
    "nome": "Borin",
    "racas": [
      "Anão"
    ],
    "genero": "masculino",
    "id": "b3133a13-cd06-4ccc-bcc5-894705f5df91"
  },
  {
    "nome": "Boromir",
    "racas": [
      "Humano"
    ],
    "genero": "masculino",
    "id": "5c555f70-9c06-4216-9735-886f88ee8115"
  },
  {
    "nome": "Bruno",
    "racas": [],
    "genero": "masculino",
    "id": "1266cba5-f873-4481-9aa6-dbc8cff84729"
  },
  {
    "nome": "Cameron",
    "racas": [],
    "genero": "unissex",
    "id": "6a3da46a-85c4-4b4d-ab21-96260c6bdcc5"
  },
  {
    "nome": "Casey",
    "racas": [],
    "genero": "unissex",
    "id": "cbe6716d-61d0-4e8c-ac1a-e87fdb54790c"
  },
  {
    "nome": "Celebrian",
    "racas": [
      "Elfo"
    ],
    "genero": "feminino",
    "id": "fbd3b1ae-2221-4362-bf6f-1780940aa838"
  },
  {
    "nome": "Cora",
    "racas": [],
    "genero": "feminino",
    "id": "8f6354c3-795b-4cb7-a732-28c8de59cfcf"
  },
  {
    "nome": "Dain",
    "racas": [
      "Anão"
    ],
    "genero": "masculino",
    "id": "94e2dabd-7b78-4a09-919a-d2869fe01bd5"
  },
  {
    "nome": "Dana",
    "racas": [],
    "genero": "unissex",
    "id": "96d232eb-4313-44d1-ac45-caa1efe69108"
  },
  {
    "nome": "Denethor",
    "racas": [
      "Humano"
    ],
    "genero": "masculino",
    "id": "bfd6b95d-8f52-487f-9098-e43bad12050b"
  },
  {
    "nome": "Dis",
    "racas": [
      "Anão"
    ],
    "genero": "feminino",
    "id": "64f73fac-ecb8-4384-b2fe-c15548421def"
  },
  {
    "nome": "Dora",
    "racas": [],
    "genero": "feminino",
    "id": "49552ec3-dd2f-4040-ac2a-dc8eb4ef77eb"
  },
  {
    "nome": "Dori",
    "racas": [
      "Anão"
    ],
    "genero": "masculino",
    "id": "17824def-fed2-43bd-8250-e4f0bbfd5f91"
  },
  {
    "nome": "Durin",
    "racas": [
      "Anão"
    ],
    "genero": "masculino",
    "id": "715ff71b-1e9d-43f7-91e9-1c4c2686d3ef"
  },
  {
    "nome": "Elanor",
    "racas": [
      "Halfling"
    ],
    "genero": "feminino",
    "id": "60de1e35-a831-4691-9c7b-c5e6545a3418"
  },
  {
    "nome": "Elrond",
    "racas": [
      "Elfo"
    ],
    "genero": "masculino",
    "id": "671c8c8d-f71f-4d17-969c-86c9dc0b4d57"
  },
  {
    "nome": "Elros",
    "racas": [
      "Elfo"
    ],
    "genero": "masculino",
    "id": "c6d32218-23f3-4cda-94e0-443ab1761bdc"
  },
  {
    "nome": "Eowyn",
    "racas": [
      "Humano"
    ],
    "genero": "feminino",
    "id": "14784c04-b260-4f94-88f4-05037b5af618"
  },
  {
    "nome": "Erak",
    "racas": [
      "Halfling"
    ],
    "genero": "masculino",
    "id": "018e2849-8fe0-4970-8a66-4f8e62d5c4c9"
  },
  {
    "nome": "Faramir",
    "racas": [
      "Humano"
    ],
    "genero": "masculino",
    "id": "5d8136ff-a534-427b-ba26-3e62292805ff"
  },
  {
    "nome": "Farin",
    "racas": [
      "Anão"
    ],
    "genero": "masculino",
    "id": "6a65fbd4-9601-4273-90d4-3c02e116894c"
  },
  {
    "nome": "Fimbril",
    "racas": [
      "Anão"
    ],
    "genero": "feminino",
    "id": "78cd948a-51bc-4789-9cfd-01664784ca99"
  },
  {
    "nome": "Fizwick",
    "racas": [
      "Gnomo"
    ],
    "genero": "masculino",
    "id": "29c5348d-2c68-4c9d-bac4-921de2bebf0e"
  },
  {
    "nome": "Floi",
    "racas": [
      "Anão"
    ],
    "genero": "feminino",
    "id": "ec24bca2-caaf-4a75-88c6-04e2188ffea3"
  },
  {
    "nome": "Fosca",
    "racas": [
      "Halfling",
      "Gnomo"
    ],
    "genero": "feminino",
    "id": "cd9faf05-9040-4679-a5fd-4cb29df58fd5"
  },
  {
    "nome": "Frodo",
    "racas": [
      "Halfling",
      "Gnomo",
      "Orc"
    ],
    "genero": "masculino",
    "id": "b57cee90-b4a3-467a-a78a-127eb92f644b"
  },
  {
    "nome": "Fundin",
    "racas": [
      "Anão"
    ],
    "genero": "masculino",
    "id": "987f0bb3-993f-4771-9018-0306d053acf9"
  },
  {
    "nome": "Galadriel",
    "racas": [
      "Elfo"
    ],
    "genero": "feminino",
    "id": "b34a60db-8087-4940-a1da-e592426cad15"
  },
  {
    "nome": "Gandalf",
    "racas": [
      "Humano"
    ],
    "genero": "masculino",
    "id": "455dc845-356f-437c-a64a-b45213f48cb6"
  },
  {
    "nome": "Garret",
    "racas": [
      "Halfling",
      "Gnomo"
    ],
    "genero": "masculino",
    "id": "eee965b7-b421-4426-81df-16135ca1879b"
  },
  {
    "nome": "Gimble",
    "racas": [
      "Gnomo"
    ],
    "genero": "masculino",
    "id": "dae2ebd1-719b-41c0-88d8-84f61bd6ffd6"
  },
  {
    "nome": "Gimli",
    "racas": [
      "Anão"
    ],
    "genero": "masculino",
    "id": "a07940dd-2ec4-437e-a916-0a7f60d11ab1"
  },
  {
    "nome": "Glint",
    "racas": [
      "Gnomo"
    ],
    "genero": "masculino",
    "id": "b0b1d711-7a03-4a69-bb47-dfd09d90e893"
  },
  {
    "nome": "Glorfindel",
    "racas": [
      "Elfo"
    ],
    "genero": "masculino",
    "id": "44eac925-e790-4a6d-807b-464cff10a485"
  },
  {
    "nome": "Glorin",
    "racas": [
      "Anão"
    ],
    "genero": "masculino",
    "id": "150ef4d1-c287-4e60-8676-c9a84df47f52"
  },
  {
    "nome": "Gror",
    "racas": [
      "Anão"
    ],
    "genero": "masculino",
    "id": "cc76a9ee-962e-4702-809e-9b79cbd26ea8"
  },
  {
    "nome": "Guilherme",
    "racas": [
      "Halfling",
      "Gnomo"
    ],
    "genero": "masculino",
    "id": "e5fe9244-6f79-476e-9cfc-38120367f876"
  },
  {
    "nome": "Gumna",
    "racas": [
      "Anão"
    ],
    "genero": "feminino",
    "id": "89b2a9a5-19cf-4888-912c-6c24901fae85"
  },
  {
    "nome": "Haldir",
    "racas": [
      "Anão"
    ],
    "genero": "masculino",
    "id": "61c2329b-d2d0-4afb-916f-b11e2b62ccd3"
  },
  {
    "nome": "Hellen",
    "racas": [
      "Humano"
    ],
    "genero": "feminino",
    "id": "dc4c974b-5444-4544-b42c-f835461b4367"
  },
  {
    "nome": "Immer",
    "racas": [
      "Gnomo"
    ],
    "genero": "masculino",
    "id": "0ca7f840-36c8-4c11-915c-62213ab56bfe"
  },
  {
    "nome": "Isembardo",
    "racas": [
      "Halfling"
    ],
    "genero": "masculino",
    "id": "b1099963-65e5-4ba8-86dc-1119680d1301"
  },
  {
    "nome": "Isildur",
    "racas": [
      "Humano"
    ],
    "genero": "masculino",
    "id": "10944279-12f0-4945-ae93-87b3906c8b14"
  },
  {
    "nome": "Jessie",
    "racas": [],
    "genero": "unissex",
    "id": "c3638bc5-194d-4422-b0e7-f5366cd96d01"
  },
  {
    "nome": "Jordan",
    "racas": [],
    "genero": "unissex",
    "id": "c2de6239-311e-4cb2-90d4-3e0914014d93"
  },
  {
    "nome": "Jorge",
    "racas": [
      "Humano"
    ],
    "genero": "masculino",
    "id": "0580606e-7a24-4a02-88e7-ba8f436e0202"
  },
  {
    "nome": "Kili",
    "racas": [
      "Anão"
    ],
    "genero": "masculino",
    "id": "00f0a134-2ac5-475d-bb18-e14a2610bfdf"
  },
  {
    "nome": "Legolas",
    "racas": [
      "Elfo"
    ],
    "genero": "masculino",
    "id": "5bf38a37-e8ff-4b9f-bb22-fd78ab71127f"
  },
  {
    "nome": "Luthien",
    "racas": [
      "Elfo"
    ],
    "genero": "feminino",
    "id": "ff11776c-319d-49d9-9d11-ddcb22b4f349"
  },
  {
    "nome": "Mardin",
    "racas": [
      "Anão"
    ],
    "genero": "masculino",
    "id": "8a267777-6112-4e18-b538-790a3018a382"
  },
  {
    "nome": "Maria",
    "racas": [
      "Humano"
    ],
    "genero": "feminino",
    "id": "d9b937ef-556a-42f8-9905-7c886a2310b3"
  },
  {
    "nome": "Marilene",
    "racas": [
      "Halfling",
      "Gnomo"
    ],
    "genero": "feminino",
    "id": "ffb88633-7d76-4bc2-aa15-7ef05a300f2f"
  },
  {
    "nome": "Merry",
    "racas": [],
    "genero": "masculino",
    "id": "f3ff9af0-cbe2-4dd9-b631-bd215439f7b7"
  },
  {
    "nome": "Morgan",
    "racas": [],
    "genero": "unissex",
    "id": "71e97f06-c746-4786-bd00-e01212f05fb2"
  },
  {
    "nome": "Nain",
    "racas": [
      "Anão"
    ],
    "genero": "masculino",
    "id": "9d9ae2db-8947-4b56-90c2-db374edfee6a"
  },
  {
    "nome": "Nameless",
    "racas": [
      "Gnomo"
    ],
    "genero": "masculino",
    "id": "b9765b6c-c51d-48c8-b2eb-cb59485b3785"
  },
  {
    "nome": "Narvi",
    "racas": [
      "Anão"
    ],
    "genero": "masculino",
    "id": "99cff068-2b58-4c5f-b158-713febdc81ef"
  },
  {
    "nome": "Norin",
    "racas": [
      "Anão"
    ],
    "genero": "masculino",
    "id": "bb8fa6e9-5c51-4d87-b207-dcb6db8c5d04"
  },
  {
    "nome": "Oin",
    "racas": [
      "Anão"
    ],
    "genero": "masculino",
    "id": "1407bc8e-1a11-4e53-929d-72b3cd63430d"
  },
  {
    "nome": "Optim",
    "racas": [
      "Gnomo"
    ],
    "genero": "masculino",
    "id": "c346beb8-f22a-416d-b716-379e83830c70"
  },
  {
    "nome": "Pedro",
    "racas": [
      "Humano"
    ],
    "genero": "masculino",
    "id": "9704548c-ccc9-4a1b-b189-fa324a7dd1d3"
  },
  {
    "nome": "Pippin",
    "racas": [
      "Halfling",
      "Orc"
    ],
    "genero": "masculino",
    "id": "e8f78c77-518b-49f5-8f1c-8898790c876c"
  },
  {
    "nome": "Pock",
    "racas": [
      "Gnomo"
    ],
    "genero": "masculino",
    "id": "1eb99a69-b4b9-4ef3-a990-1a36323a940c"
  },
  {
    "nome": "Porto",
    "racas": [
      "Halfling"
    ],
    "genero": "masculino",
    "id": "a8816a44-5911-4db2-933c-b3f1fda016c0"
  },
  {
    "nome": "Riley",
    "racas": [],
    "genero": "unissex",
    "id": "cb33580b-e208-4bd4-904d-9c493016fbe7"
  },
  {
    "nome": "Robin",
    "racas": [],
    "genero": "unissex",
    "id": "7d51ead1-56fc-4208-8647-6f045696f473"
  },
  {
    "nome": "Rosa",
    "racas": [
      "Halfling"
    ],
    "genero": "feminino",
    "id": "a06b4761-2398-4146-9c49-77a6d42d4c0b"
  },
  {
    "nome": "Sage",
    "racas": [],
    "genero": "unissex",
    "id": "4fdecdf6-5924-4ca4-b2c6-6cdf836cd600"
  },
  {
    "nome": "Sam",
    "racas": [
      "Halfling"
    ],
    "genero": "masculino",
    "id": "b9263ded-a058-4829-ac83-8b094e6d5a3d"
  },
  {
    "nome": "Skylar",
    "racas": [],
    "genero": "unissex",
    "id": "170213ed-3ead-462f-ae66-59208c03a796"
  },
  {
    "nome": "Tansy",
    "racas": [
      "Halfling"
    ],
    "genero": "feminino",
    "id": "e6d277d4-e485-44d8-b02c-7b4eb14ac67d"
  },
  {
    "nome": "Taylor",
    "racas": [],
    "genero": "unissex",
    "id": "3203029d-9767-4f58-8ace-ea1b97a01792"
  },
  {
    "nome": "Thorin",
    "racas": [
      "Anão"
    ],
    "genero": "masculino",
    "id": "15d6913d-28ac-4d4e-b8d4-3dc140cd5000"
  },
  {
    "nome": "Thrain",
    "racas": [
      "Anão"
    ],
    "genero": "masculino",
    "id": "981d8712-d205-4eb6-859d-06e331ce830d"
  },
  {
    "nome": "Thranduil",
    "racas": [
      "Elfo"
    ],
    "genero": "masculino",
    "id": "f86a424c-252d-4e9d-8397-e780b0c94405"
  },
  {
    "nome": "Zook",
    "racas": [
      "Gnomo"
    ],
    "genero": "masculino",
    "id": "b8ceee63-deac-4b15-8bdd-ba5408adc24e"
  }
]
