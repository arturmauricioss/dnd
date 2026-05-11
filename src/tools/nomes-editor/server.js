const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.json())

const DATA_PATH = path.resolve(
  __dirname,
  '../../features/newHero/data/nomesData.ts'
)

app.get('/nomes', (_, res) => {
  try {
    const content = fs.readFileSync(DATA_PATH, 'utf-8')

    const match = content.match(
      /export const nomes: Nome\[\] = (\[[\s\S]*\])/
    )

    if (!match) {
      return res.status(500).json({
        error: 'Não foi possível encontrar array nomes'
      })
    }

    const nomes = eval(match[1])

    res.json(nomes)
  } catch (err) {
    res.status(500).json({
      error: String(err)
    })
  }
})

app.post('/nomes', (req, res) => {
  try {
    const nomes = req.body

    const content = `// import type { Race } from '@systems/race/types'

type Race = {
  name: string
}

export type Genero = 'masculino' | 'feminino' | 'unissex'

export interface Nome {
  nome: string
  racas: Race['name'][]
  genero: Genero
}

export const nomes: Nome[] = ${JSON.stringify(nomes, null, 2)}
`

    fs.writeFileSync(DATA_PATH, content)

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({
      error: String(err)
    })
  }
})

app.listen(3002, () => {
  console.log('Servidor rodando em http://localhost:3002')
})