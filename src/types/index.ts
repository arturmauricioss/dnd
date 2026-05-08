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

// --- Método de Atributos ---
export type MetodoAtributos = 'livre' | '4d6-baixo' | 'definido' | 'compra'

// --- UI Components ---
export type Theme = 'dark' | 'light'

export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

export interface IconProps {
  className?: string
}

export interface BottomNavItemProps {
  to: string
  label: string
}

export interface BottomNavItem {
  to: string
  label: string
}

export interface HeroCardProps {
  nome: string
  level: number
  imagem?: string
  isDead?: boolean
}

export interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export interface Commit {
  mensagem: string
  data: string
  autor: string
}

export interface NovidadesContentProps {
  commits: Commit[]
  erro: boolean
}

export interface Campanha {
  id: string
  nome: string
  descricao: string
  jogadores: number
  imagem: string
}

export interface TitleProps {
  children: React.ReactNode
  size?: 'xl' | 'lg' | 'md'
  className?: string
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[]
}

export interface GridProps {
  children: React.ReactNode
  cols?: 2 | 3 | 4
  className?: string
}

export interface OptionCardProps {
  children: React.ReactNode
  className?: string
  active?: boolean
  disabled?: boolean
  onClick?: () => void
}

export interface ActionCardProps {
  icon: (props: IconProps) => React.ReactNode
  label: string
  description?: string
  onClick?: () => void
  className?: string
}

export interface SectionHeaderProps {
  icon: (props: IconProps) => React.ReactNode
  children: React.ReactNode
  active?: boolean
  className?: string
}

export interface CampaignCardProps {
  campanha: Campanha
}

export interface CampaignListProps {
  children: React.ReactNode
}

export interface ConfigSectionProps {
  children: React.ReactNode
}

export interface ConfigRowProps {
  children: React.ReactNode
}

export interface ConfigLabelProps {
  emoji?: string
  title: string
  description?: string
}

export interface ToggleProps {
  active: boolean
  onClick: () => void
  label?: string
}

export interface Heroi {
  id: string
  nome: string
  level: number
  imagem: string
  status: 'alive' | 'dead'
}

export interface PageProps {
  children: React.ReactNode
  className?: string
}

export interface HeroesGridProps {
  children: React.ReactNode
  className?: string
}

// --- D&D Domain Types ---

export interface Classe {
  id: string
  nome: string
}

export interface Alinhamento {
  id: string
  nome: string
  eixo: 'bom' | 'neutro' | 'mal' | 'ordem' | 'caos'
}

export interface Divindade {
  id: string
  nome: string
  alinhamento: string
}

export interface Raca {
  id: string
  nome: string
}

export type AtributoNome = 'forca' | 'destreza' | 'constituicao' | 'inteligencia' | 'sabedoria' | 'carisma'

export type Tamanho = 'pequeno' | 'medio'

export type CharacterStep = 
  | 'nome' 
  | 'atributos' 
  | 'raca' 
  | 'aparencia' 
  | 'classe' 
  | 'tendencias' 
  | 'resumo'

// --- Regras System Types ---
export interface Regra {
  nome: string
  tipo: 'validacao' | 'acao' | 'calculo'
  descricao: string
  executar: (contexto: RegraContexto) => ResultadoRegra
}

export interface RegraContexto {
  atributos: Atributos
  metodo: MetodoAtributos | null
  raca?: string | null
}

export interface ResultadoRegra {
  sucesso: boolean
  mensagem?: string
  dados?: unknown
}

// --- NovoHeroiPage Components ---
export interface NomeFormProps {
  nome: string
  genero: 'm' | 'f'
  onNomeChange: (nome: string) => void
  onGeneroChange: (genero: 'm' | 'f') => void
}

export interface MetodoSelectorProps {
  metodo: MetodoAtributos | null
  onMetodoChange: (metodo: MetodoAtributos) => void
  onConfirmar: () => void
  nome: string
  gerarNome: () => string
  onNomeChange: (nome: string) => void
}

export interface AtributosGridProps {
  atributos: Atributos
  metodo: string | null
  valoresConfirmados: boolean
  podeReroll: boolean
  somaModificadores: number
  pontosUsados?: number
  atributoSelecionado: string | null
  onAtributoClick: (campo: string) => void
  onMouseDownPontos: (campo: string) => void
  onMouseUpPontos: (campo: string, e: React.MouseEvent) => void
  onAtualizarAtributo: (campo: string, valor: string | number) => void
  onValidarAtributo: (campo: string, valor: number) => void
  onConfirmarReroll: () => void
  onConfirmarValores: () => void
}

export interface RacaSelectionProps {
  racas: Raca[]
  racaSelecionada: string | null
  onSelect: (raca: string) => void
  onConfirm: () => void
}

export interface AparenciaSelectionProps {
  raca: string
  genero: 'm' | 'f'
  variacao: number
  totalImagens: number
  onVariacaoChange: (variacao: number) => void
  onConfirm: () => void
  getImagemPath: (raca: string, genero: 'm' | 'f', numero: number) => string
}

export interface ClasseSelectionProps {
  classes: Classe[]
  classeSelecionada: string | null
  nivel: number
  onSelect: (classe: string) => void
  onNivelChange: (nivel: number) => void
  onConfirm: () => void
}

export interface TendenciaSelectionProps {
  alinhamentos: Alinhamento[]
  divindadesOrdenadas: Divindade[]
  classeId: string | null
  tendenciaSelecionada: string | null
  divindadeSelecionada: string | null
  raca: string | null
  onTendenciaSelect: (tendencia: string) => void
  onDivindadeSelect: (divindade: string) => void
  onConfirm: () => void
  tendenciaPermitida: (classeId: string, tendenciaId: string) => boolean
  getPontuacaoDeus: (deusId: string, racaId: string | null, tendenciaId: string | null, classeId: string | null) => number
}

export interface PersonagemCardProps {
  nome: string
  racaNome: string
  genero: 'm' | 'f'
  tamanho: string
  deslocamento: number
  classeNome: string
  nivel: number
  tendenciaNome: string
  divindadeNome: string
  atributos: Atributos
  imagem: string
}