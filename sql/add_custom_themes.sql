-- Adicionar coluna custom_themes na tabela users
ALTER TABLE users ADD COLUMN IF NOT EXISTS custom_themes JSONB DEFAULT '{}';