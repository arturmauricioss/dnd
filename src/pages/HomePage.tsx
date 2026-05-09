import Page from '@components/shell/Page/Page'
import Title from '@components/ui/basic/Title/Title'
import Novidades from '@features/home/components/Novidades/Novidades'

export default function HomePage() {
  return (
    <Page>
      <Title size="xl" className="mt-md">Home</Title>
      <Novidades />
    </Page>
  )
}