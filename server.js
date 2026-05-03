import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { spawn } from 'child_process'

const app = express()
app.use(cors())
app.use(express.json())

// Cache em memória
let cache = null
const CACHE_TIME = 15 * 60 * 1000

// API route /api/commits
app.get('/api/commits', async (req, res) => {
  const now = Date.now()

  if (cache && now - cache.timestamp < CACHE_TIME) {
    return res.json(cache.data)
  }

  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return res.status(500).json({ error: 'GITHUB_TOKEN não configurado' })
  }

  try {
    const response = await fetch(
      'https://api.github.com/repos/arturmauricioss/dnd/commits?per_page=10',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    )

    const commits = await response.json()

    const data = commits.map((c) => ({
      mensagem: c.commit.message.split('\n')[0],
      data: c.commit.author.date,
      autor: c.commit.author.name
    }))

    cache = { data, timestamp: now }
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar commits' })
  }
})

// Serve o frontend do Vite em modo proxy
const server = createServer((req, res) => {
  if (req.url?.startsWith('/api/')) {
    // Deixa o express tratar rotas de API
    return express.json()(req, res, () => app(req, res))
  }

  // Para outras rotas, usa o vite dev server
  // Isso faz um proxy para o servidor do Vite
  const viteProcess = spawn('npx', ['vite', '--port', '5173'], {
    stdio: 'pipe',
    shell: true
  })

  // Redirect para porta do Vite
  res.writeHead(302, { Location: 'http://localhost:5173' + req.url })
  res.end()
})

const PORT = 3000
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
  console.log(`API disponível em http://localhost:${PORT}/api/commits`)
})