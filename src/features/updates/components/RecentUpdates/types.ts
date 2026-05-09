export interface Commit {
  mensagem: string
  data: string
  autor: string
}

export interface NovidadesContentProps {
  commits: Commit[]
  erro: boolean
}