import fetch from 'node-fetch'

const API_URL = 'http://localhost:3001'

async function test() {
  try {
    console.log('1. Testing campaigns...')
    const camps = await fetch(`${API_URL}/api/campaigns`).then(r => r.json())
    console.log('Campaigns:', camps)
    
    console.log('2. Testing login...')
    const login = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'teste@teste.com', password: '123' })
    }).then(r => r.json())
    console.log('Login:', login)
  } catch (e) {
    console.error('Error:', e.message)
  }
}

test()