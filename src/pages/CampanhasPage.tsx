import { Add, Group, Master, ChessKnight, Graph } from '@components/icons'
import { useCampanhas } from '@hooks/useCampanhas'
import Page from '@components/ui/atoms/Page/Page'
import Title from '@components/ui/atoms/Title/Title'
import Grid from '@components/ui/atoms/Grid/Grid'
import ActionCard from '@components/ui/molecules/ActionCard/ActionCard'
import SectionHeader from '@components/ui/molecules/SectionHeader/SectionHeader'
import CampaignCard from '@components/ui/organisms/CampaignCard/CampaignCard'
import CampaignList from '@components/ui/molecules/CampaignList/CampaignList'

export default function CampanhasPage() {
  const { jogando, mestrando } = useCampanhas()

  return (
    <Page>
      <Title size="xl" className="mt-md">Campanhas</Title>

      <SectionHeader icon={Add} active>Iniciar</SectionHeader>

      <Grid cols={2} className="action-card-grid">
        <ActionCard
          icon={Group}
          label="Jogar"
          description="Entrar em uma aventura"
        />
        <ActionCard
          icon={Master}
          label="Mestrar"
          description="Criar eadirigir campanhas"
        />
      </Grid>

      {jogando.length > 0 && (
        <>
          <SectionHeader icon={ChessKnight} active>
            Jogando
          </SectionHeader>
          <CampaignList>
            {jogando.map(campanha => (
              <CampaignCard key={campanha.id} campanha={campanha} />
            ))}
          </CampaignList>
        </>
      )}

      {mestrando.length > 0 && (
        <>
          <SectionHeader icon={Graph} active>
            Mestrando
          </SectionHeader>
          <CampaignList>
            {mestrando.map(campanha => (
              <CampaignCard key={campanha.id} campanha={campanha} />
            ))}
          </CampaignList>
        </>
      )}
    </Page>
  )
}