import Page from '@components/ui/atoms/Page/Page'
import Title from '@components/ui/atoms/Title/Title'
import Novidades from '@components/ui/organisms/Novidades/Novidades'

export default function HomePage() {
  return (
    <Page>
      <Title size="xl" className="mt-md">Home</Title>
      <Novidades />
    </Page>
  )
}