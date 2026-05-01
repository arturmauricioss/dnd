// ============================================
// DOMAIN TYPES - Entidades e Value Objects
// ============================================

// --- Atributos ---
export interface Atributos {
  forca: number
  constituicao: number
  destreza: number
  inteligencia: number
  sabedoria: number
  carisma: number
}

// --- Equipamento ---
export interface Equipment {
  armor?: string
  shield?: string
  weapons: Weapon[]
  itens: Item[]
  money: Money
}

export interface Weapon {
  id: string
  local: ItemLocation
  quantidade: number
}

export interface Item {
  id: string
  local: ItemLocation
  quantidade: number
}

export type ItemLocation = 'equipped' | 'carregando' | 'mochila' | 'tesoureiro' | 'montaria'

export interface Money {
  po: number
  pp: number
  pl: number
  pc: number
}

// --- Personagem ---
export interface Personagem {
  id: string
  nome: string
  classe: ClasseId
  race: RacaId
  level: number
  alignment: AlignmentId
  divindade?: string
  
  atributos: Atributos
  pericias: Record<string, PericiaGraduacao>
  habilidades: string[]
  talentos: string[]
  idiomas: string[]
  equipment: Equipment
  
  // metadados
  campaignId?: string
  userId?: string
  createdAt: number
  updatedAt: number
}

export interface PericiaGraduacao {
  graduacao: number
  outros: number
}

// --- Classes ---
export type ClasseId = 
  | 'barbaro' | 'guerreiro' | 'paladino' | 'ranger'
  | 'monge' | 'clerigo' | 'druida' | 'ladino'
  | 'bardo' | 'mago' | 'feiticeiro'

export interface Classe {
  id: ClasseId
  nome: string
  dadoVida: number
  fort: number
  ref: number
  von: number
}

// --- Raças ---
export type RacaId = 'anao' | 'elfo' | 'gnomo' | 'halfling' | 'humano' | 'meio-orc' | 'meio-elfo' | 'draconato' | 'tiefling'

export interface Raca {
  id: RacaId
  nome: string
  tamanho: 'pequena' | 'media'
  deslocamento: number
}

// --- Alignment ---
export type AlignmentId = 
  | 'lawful_good' | 'neutral_good' | 'chaotic_good'
  | 'lawful_neutral' | 'true_neutral' | 'chaotic_neutral'
  | 'lawful_evil' | 'neutral_evil' | 'chaotic_evil'

// --- Combat Stats ---
export interface CombatStats {
  bba: number
  hpMax: number
  caNormal: number
  caToque: number
  caSurpresa: number
  deslocamento: number
  fort: number
  ref: number
  von: number
  agarrar: number
}

// --- Pericias ---
export interface Pericia {
  nome: string
  habilidade: AtributoId | 'nenhuma'
  penalidade: number // usa armadura
}

export type AtributoId = keyof Atributos

// --- Carga ---
export type CargaStatus = 'leve' | 'media' | 'pesada' | 'excessiva'

export interface CapacidadeCarga {
  leve: number
  media: number
  pesada: number
}

// --- Itens ---
export interface ItemRPG {
  id: string
  nome: string
  tipo: ItemTipo
  peso: number
  preco: number // em cobre
  categoria?: string
  dano?: string
  critico?: string
}

export type ItemTipo = 'arma' | 'armadura' | 'escudo' | 'item' | 'montaria' | 'instrumento'