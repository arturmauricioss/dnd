export interface Classe {
  id: string
  nome: string
  dadoVida: number
  fort: number
  ref: number
  von: number
  bba: number
  alfabetizacao?: boolean
}

export const classes: Classe[] = [
  { id: 'barbaro', nome: 'BÁRBARO', dadoVida: 12, fort: 2, ref: 0, von: 0, bba: 1, alfabetizacao: true },
  { id: 'bardo', nome: 'BARDO', dadoVida: 6, fort: 0, ref: 2, von: 2, bba: 0.75 },
  { id: 'clerigo', nome: 'CLÉRIGO', dadoVida: 8, fort: 2, ref: 0, von: 2, bba: 0.75 },
  { id: 'druida', nome: 'DRUIDA', dadoVida: 8, fort: 2, ref: 0, von: 2, bba: 0.75 },
  { id: 'feiticeiro', nome: 'FEITICEIRO', dadoVida: 4, fort: 0, ref: 0, von: 2, bba: 0.5 },
  { id: 'guerreiro', nome: 'GUERREIRO', dadoVida: 10, fort: 2, ref: 0, von: 0, bba: 1 },
  { id: 'ladino', nome: 'LADINO', dadoVida: 6, fort: 0, ref: 2, von: 0, bba: 0.75 },
  { id: 'mago', nome: 'MAGO', dadoVida: 4, fort: 0, ref: 0, von: 2, bba: 0.5 },
  { id: 'monge', nome: 'MONGE', dadoVida: 8, fort: 2, ref: 2, von: 2, bba: 0.75 },
  { id: 'paladino', nome: 'PALADINO', dadoVida: 10, fort: 2, ref: 0, von: 2, bba: 1 },
  { id: 'ranger', nome: 'RANGER', dadoVida: 8, fort: 2, ref: 2, von: 0, bba: 0.75 }
]