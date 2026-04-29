-- Criar banco de dados (rode isso primeiro)
CREATE DATABASE dnd;

-- Conectar no banco dnd, depois rode:

-- Tabela de usuários
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  campaign_id INTEGER,
  is_master BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de campanhas
CREATE TABLE campaigns (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  master_email VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'open',
  config JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de jogadores na campanha
CREATE TABLE campaign_players (
  id SERIAL PRIMARY KEY,
  campaign_id INTEGER REFERENCES campaigns(id),
  player_email VARCHAR(255) NOT NULL,
  player_name VARCHAR(255),
  character_id INTEGER,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de personagens
CREATE TABLE characters (
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
);