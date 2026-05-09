import type { Commit } from './types'

export { Commit }

function getApiBaseUrl(): string {
  if (typeof window === 'undefined') return '/api'
  
  const hostname = window.location.hostname
  
  // Desenvolvimento local - usa a mesma porta do server.js ou proxy
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.') || hostname.startsWith('10.')) {
    return '/api' // proxy via vite.config
  }
  
  // Produção (Vercel)
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