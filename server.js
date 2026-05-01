import express from 'express'
import cors from 'cors'
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
})

const app = express()
app.use(cors())
app.use(express.json())

// Users
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  const result = await pool.query(
    'SELECT id, email, nome, campaign_id, is_master, custom_themes FROM users WHERE email = $1 AND password = $2',
    [email, password]
  )
  if (result.rows.length === 0) {
    return res.status(401).json({ error: 'Usuário não encontrado ou senha incorreta' })
  }
  res.json(result.rows[0])
})

app.post('/api/auth/register', async (req, res) => {
  const { email, password, nome } = req.body
  const check = await pool.query('SELECT id FROM users WHERE email = $1', [email])
  if (check.rows.length > 0) {
    return res.status(400).json({ error: 'Email já cadastrado' })
  }
  const result = await pool.query(
    'INSERT INTO users (email, password, nome) VALUES ($1, $2, $3) RETURNING id, email, nome, campaign_id, is_master, custom_themes',
    [email, password, nome]
  )
  res.json(result.rows[0])
})

// Save custom themes
app.put('/api/users/:id/themes', async (req, res) => {
  const { id } = req.params
  const { custom_themes } = req.body
  await pool.query(
    'UPDATE users SET custom_themes = $1 WHERE id = $2',
    [JSON.stringify(custom_themes), id]
  )
  res.json({ success: true })
})

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params
  const { campaign_id, is_master, campaignName } = req.body
  
  if (campaign_id && campaignName) {
    // Create campaign first
    const camp = await pool.query(
      'INSERT INTO campaigns (name, master_email) VALUES ($1, $2) RETURNING id',
      [campaignName, req.body.email]
    )
    await pool.query(
      'UPDATE users SET campaign_id = $1, is_master = $2 WHERE id = $3',
      [camp.rows[0].id, true, id]
    )
    return res.json({ success: true, campaignId: camp.rows[0].id })
  }
  
  res.json({ success: true })
})

// Campaigns
app.get('/api/campaigns', async (req, res) => {
  const result = await pool.query('SELECT * FROM campaigns')
  res.json(result.rows)
})

app.get('/api/campaigns/:id', async (req, res) => {
  const { id } = req.params
  const result = await pool.query('SELECT * FROM campaigns WHERE id = $1', [id])
  res.json(result.rows[0] || null)
})

app.post('/api/campaigns', async (req, res) => {
  const { name, masterEmail } = req.body
  const result = await pool.query(
    'INSERT INTO campaigns (name, master_email) VALUES ($1, $2) RETURNING *',
    [name, masterEmail]
  )
  res.json(result.rows[0])
})

app.post('/api/campaigns/:id/join', async (req, res) => {
  const { id } = req.params
  const { playerEmail, playerName } = req.body
  
  const result = await pool.query(
    'INSERT INTO campaign_players (campaign_id, player_email, player_name) VALUES ($1, $2, $3) RETURNING *',
    [id, playerEmail, playerName]
  )
  res.json(result.rows[0])
})

app.get('/api/campaigns/:id/players', async (req, res) => {
  const { id } = req.params
  const result = await pool.query(
    'SELECT * FROM campaign_players WHERE campaign_id = $1',
    [id]
  )
  res.json(result.rows)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`)
})