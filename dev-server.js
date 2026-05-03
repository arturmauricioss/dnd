import express from 'express'
import cors from 'cors'
import { spawn } from 'child_process'

const app = express()
app.use(cors())

// Cache em memória
let cache = null
const CACHE_TIME = 15 * 60 * 1000

// Dados mock para fallback
const MOCK_DATA = [
  { mensagem: 'feat: adiciona feed de novidades', data: new Date().toISOString(), autor: 'Desenvolvedor' },
  { mensagem: 'feat: cria página de campanhas', data: new Date().toISOString(), autor: 'Desenvolvedor' },
  { mensagem: 'fix: corrige border do H1', data: new Date().toISOString(), autor: 'Desenvolvedor' }
]

// API route /api/commits
app.get('/api/commits', async (req, res) => {
  const now = Date.now()

  if (cache && now - cache.timestamp < CACHE_TIME) {
    return res.json(cache.data)
  }

  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return res.json(MOCK_DATA)
  }

  try {
    const response = await fetch(
      'https://api.github.com/repos/arturmauricioss/dnd/commits?per_page=5',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const commits = await response.json()

    const data = commits.map((c) => ({
      mensagem: c.commit.message.split('\n')[0],
      data: c.commit.author.date,
      autor: c.commit.author.name
    }))

    cache = { data, timestamp: now }
    res.json(data)
  } catch (error) {
    console.error('Erro ao buscar commits do GitHub:', error)
    return res.json(MOCK_DATA)
  }
})

const PORT = 3000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API rodando em http://localhost:${PORT}/api/commits`)
  console.log(`\nPara testar o frontend completo:`)
  console.log(`1. Execute 'npm run dev' em outro terminal`)
  console.log(`2. O frontend estará em http://localhost:5173`)
  console.log(`3. As chamadas /api/commits precisam ser proxyiadas ou usar ${PORT}\n`)
})