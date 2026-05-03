export interface Commit {
  mensagem: string
  data: string
  autor: string
}

function getApiBaseUrl(): string {
  if (typeof window === 'undefined') return '/api'
  
  const hostname = window.location.hostname
  
  // Desenvolvimento local (localhost ou IP da rede local)
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.') || hostname.startsWith('10.')) {
    return 'http://192.168.3.12:3000/api'
  }
  
  // Produção (Vercel) - usa caminho relativo
  return '/api'
}

export async function buscarCommits(): Promise<Commit[]> {
  try {
    const baseUrl = getApiBaseUrl()
    const response = await fetch(`${baseUrl}/commits`)
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