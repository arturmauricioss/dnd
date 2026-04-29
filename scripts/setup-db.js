import pg from 'pg'
const { Pool } = pg
import fs from 'fs'

// Carregar config manualmente
const configPath = new URL('../lib/dbConfig.js', import.meta.url).pathname
const configContent = fs.readFileSync(configPath, 'utf-8')
const dbConfig = {}
const hostMatch = configContent.match(/host:\s*'([^']+)'/)
const portMatch = configContent.match(/port:\s*(\d+)/)
const dbMatch = configContent.match(/database:\s*'([^']+)'/)
const userMatch = configContent.match(/user:\s*'([^']+)'/)
const pwMatch = configContent.match(/password:\s*'([^']+)'/)

if (hostMatch) dbConfig.host = hostMatch[1]
if (portMatch) dbConfig.port = parseInt(portMatch[1])
if (dbMatch) dbConfig.database = dbMatch[1]
if (userMatch) dbConfig.user = userMatch[1]
if (pwMatch) dbConfig.password = pwMatch[1]

async function setup() {
  console.log('Config:', dbConfig)

  // Conectar sem banco específico primeiro
  const adminPool = new Pool({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: 'postgres'
  })

  try {
    // Criar banco se não existir
    const dbCheck = await adminPool.query(
      "SELECT 1 FROM pg_database WHERE datname = 'dnd'"
    )
    if (dbCheck.rows.length === 0) {
      await adminPool.query('CREATE DATABASE dnd')
      console.log('✅ Banco dnd criado!')
    } else {
      console.log('ℹ️ Banco dnd já existe')
    }

    // Conectar no banco dnd
    const pool = new Pool({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      database: 'dnd'
    })

    // Criar tabelas
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        nome VARCHAR(255) NOT NULL,
        campaign_id INTEGER,
        is_master BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Tabela users OK')

    await pool.query(`
      CREATE TABLE IF NOT EXISTS campaigns (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        master_email VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'open',
        config JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Tabela campaigns OK')

    await pool.query(`
      CREATE TABLE IF NOT EXISTS campaign_players (
        id SERIAL PRIMARY KEY,
        campaign_id INTEGER REFERENCES campaigns(id),
        player_email VARCHAR(255) NOT NULL,
        player_name VARCHAR(255),
        character_id INTEGER,
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Tabela campaign_players OK')

    await pool.query(`
      CREATE TABLE IF NOT EXISTS characters (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        campaign_id INTEGER REFERENCES campaigns(id),
        name VARCHAR(255),
        race VARCHAR(50),
        classe VARCHAR(50),
        level INTEGER DEFAULT 1,
        atributos JSONB DEFAULT '{}',
        inventory JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Tabela characters OK')

    console.log('\n🎉 Banco configurado!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Erro:', err.message)
    process.exit(1)
  }
}

setup()