import { useState } from 'react'
import HeroCard from '../components/ui/HeroCard'
import NewHeroCard from '../components/ui/NewHeroCard'
import { Swords, Skull } from '../components/icons'

interface Heroi {
  id: string
  nome: string
  level: number
  imagem: string
  status: 'alive' | 'dead'
}

const heroisIniciais: Heroi[] = [
  { id: '1', nome: 'Aragorn', level: 5, imagem: '/perfil/aragorn.jpg', status: 'alive' },
  { id: '2', nome: 'Gandalf', level: 12, imagem: '/perfil/gandalf.jpeg', status: 'alive' },
  { id: '3', nome: 'Legolas', level: 8, imagem: '/perfil/legolas.jpg', status: 'alive' },
  { id: '4', nome: 'Boromir', level: 7, imagem: '/perfil/aragorn.jpg', status: 'dead' },
  { id: '5', nome: 'Gimli', level: 6, imagem: '/perfil/aragorn.jpg', status: 'dead' },
]

export default function HeroisPage() {
  const [herois] = useState<Heroi[]>(heroisIniciais)

  const heroisVivos = herois.filter(h => h.status === 'alive')
  const heroisMortos = herois.filter(h => h.status === 'dead')

  return (
    <div className="page container">
      <h1 className="mt-md">Salão de Heróis</h1>
      
      <h3 className="section-title active">
        <Swords className="section-icon" />
        Heróis Ativos
      </h3>
      
      <div className="herois-grid">
        <NewHeroCard />
        {heroisVivos.map(heroi => (
          <HeroCard 
            key={heroi.id}
            nome={heroi.nome}
            level={heroi.level}
            imagem={heroi.imagem}
          />
        ))}
      </div>

      {heroisMortos.length > 0 && (
        <>
          <h3 className="section-title dead mt-lg">
          <Skull className="section-icon" />
          Memorial dos Caídos
        </h3>
          <div className="herois-grid memorial">
            {heroisMortos.map(heroi => (
              <HeroCard 
                key={heroi.id}
                nome={heroi.nome}
                level={heroi.level}
                imagem={heroi.imagem}
                isDead
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}