import { Pool } from 'pg'
import { dbConfig } from './dbConfig.js'

const pool = new Pool({
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  user: dbConfig.user,
  password: dbConfig.password,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
})

pool.on('error', (err) => {
  console.error('Erro na conexão:', err.message)
})

export async function query(text, params = []) {
  const client = await pool.connect()
  try {
    const result = await client.query(text, params)
    return result
  } catch (err) {
    console.error('Query error:', err.message)
    throw err
  } finally {
    client.release()
  }
}

export async function getClient() {
  return pool.connect()
}

export default pool