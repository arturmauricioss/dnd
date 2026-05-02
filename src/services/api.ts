export interface Commit {
  mensagem: string
  data: string
  autor: string
}

export async function buscarCommits(): Promise<Commit[]> {
  try {
    const response = await fetch('/api/commits')
    if (!response.ok) {
      throw new Error('Erro ao buscar commits')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar commits:', error)
    return []
  }
}