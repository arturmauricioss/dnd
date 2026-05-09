import { useHeroes } from '@features/heroes/hooks/useHeroes'
import Page from '@components/shell/Page/Page'
import Title from '@components/ui/basic/Title/Title'
import HeroCard from '@features/heroes/components/Card/HeroCard/HeroCard'
import NewHeroCard from '@features/heroes/components/Card/NewHeroCard/NewHeroCard'
import SectionHeader from '@features/home/components/SectionHeader/SectionHeader'
import HeroesGrid from '@features/heroes/components/HeroesGrid/HeroesGrid'
import { Swords, Skull } from '@components/ui/icons'

export default function HeroesPage() {
  const { heroisVivos, heroisMortos } = useHeroes()

  return (
    <Page>
      <Title size="xl" className="mt-md">Salão de Heróis</Title>
      
      <SectionHeader icon={Swords} active>
        Heróis Ativos
      </SectionHeader>
      
      <HeroesGrid>
        <NewHeroCard />
        {heroisVivos.map(heroi => (
          <HeroCard 
            key={heroi.id}
            nome={heroi.nome}
            level={heroi.level}
            imagem={heroi.imagem}
          />
        ))}
      </HeroesGrid>

      {heroisMortos.length > 0 && (
        <>
          <SectionHeader icon={Skull} active className="mt-lg">
            Memorial dos Caídos
          </SectionHeader>
          <HeroesGrid className="memorial">
            {heroisMortos.map(heroi => (
              <HeroCard 
                key={heroi.id}
                nome={heroi.nome}
                level={heroi.level}
                imagem={heroi.imagem}
                isDead
              />
            ))}
          </HeroesGrid>
        </>
      )}
    </Page>
  )
}