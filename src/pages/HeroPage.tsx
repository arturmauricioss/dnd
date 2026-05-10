import Page from '@components/shell/Page/Page'
import Title from '@components/ui/basic/Title/Title'
import Button from '@components/ui/basic/Button/Button'
import RowHeader from '@components/ui/common/RowHeader/RowHeader'
import { ChessKnight, Group } from '@components/ui/icons'

export default function HeroPage() {
  return (
    <Page>
      <Title size="xl" className="mt-md">Salão dos Heróis</Title>
      <RowHeader icon={ChessKnight} active>Meus Heróis</RowHeader>
      <Button>Criar Herói</Button>
      <RowHeader icon={Group} variant="secondary">Memorial dos Caídos</RowHeader>
    </Page>
  )
}