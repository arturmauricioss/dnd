import fs from 'fs'
import path from 'path'

const racasDir = './public/racas'

const racas = [
  { id: 'humano', nome: 'Humano', prefixo: 'humano' },
  { id: 'elfo', nome: 'Elfo', prefixo: 'elfo' },
  { id: 'anao', nome: 'Anão', prefixo: 'anao' },
  { id: 'gnomo', nome: 'Gnomo', prefixo: 'gnomo' },
  { id: 'meio-elfo', nome: 'Meio-Elfo', prefixo: 'meio-elfo' },
  { id: 'meio-orc', nome: 'Meio-Orc', prefixo: 'meio-orc' },
  { id: 'halfling', nome: 'Halfling', prefixo: 'halfling' }
]

const totalImagensPorRaca: Record<string, number> = {}

for (const raca of racas) {
  let count = 0
  let num = 1
  
  while (true) {
    const numeroStr = String(num).padStart(2, '0')
    const machoPath = path.join(racasDir, `${raca.prefixo}_m${numeroStr}.png`)
    const femeaPath = path.join(racasDir, `${raca.prefixo}_f${numeroStr}.png`)
    
    const machoExists = fs.existsSync(machoPath)
    const femeaExists = fs.existsSync(femeaPath)
    
    if (!machoExists && !femeaExists) break
    
    count++
    num++
  }
  
  totalImagensPorRaca[raca.id] = count || 1
}

const output = `export const racas = ${JSON.stringify(racas, null, 2)}

export const totalImagensPorRaca = ${JSON.stringify(totalImagensPorRaca, null, 2)}

export function getImagemPath(racaId: string, genero: 'm' | 'f', numero: number): string {
  const raca = racas.find(r => r.id === racaId)
  const prefixo = raca?.prefixo || racaId
  const generoStr = genero === 'm' ? 'm' : 'f'
  return \`/racas/\${prefixo}_\${generoStr}\${String(numero).padStart(2, '0')}.png\`
}
`

fs.writeFileSync('./src/data/racasData.ts', output)
console.log('Arquivo racasData.ts atualizado!')
console.log('Quantidade de imagens por raça:', totalImagensPorRaca)