import { useHeroes } from '@hooks/useHeroes'
import Page from '@components/ui/atoms/Page/Page'
import Title from '@components/ui/atoms/Title/Title'
import HeroCard from '@components/ui/organisms/Card/HeroCard/HeroCard'
import NewHeroCard from '@components/ui/organisms/Card/NewHeroCard/NewHeroCard'
import SectionHeader from '@components/ui/molecules/SectionHeader/SectionHeader'
import HeroesGrid from '@components/ui/molecules/HeroesGrid/HeroesGrid'
import { Swords, Skull } from '@components/icons'

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