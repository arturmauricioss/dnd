import { createClient } from '@supabase/supabase-js'

// Substitua pelas suas credenciais do Supabase
// URL: Project Settings → API → Project URL
// Key: Project Settings → API → anon public
const supabaseUrl = 'SUA_URL_AQUI'
const supabaseAnonKey = 'SUA_CHAVE_AQUI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)