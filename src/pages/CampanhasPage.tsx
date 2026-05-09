import { Add, Group, Master, ChessKnight, Graph } from '@components/ui/icons'
import { useCampanhas } from '@features/campaigns/hooks/useCampanhas'
import Page from '@components/shell/Page/Page'
import Title from '@components/ui/basic/Title/Title'
import Grid from '@components/ui/basic/Grid/Grid'
import ActionCard from '@features/campaigns/components/ActionCard/ActionCard'
import SectionHeader from '@features/home/components/SectionHeader/SectionHeader'
import CampaignCard from '@features/campaigns/components/CampaignCard/CampaignCard'
import CampaignList from '@features/campaigns/components/CampaignList/CampaignList'

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
          description="Criar e dirigir campanhas"
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