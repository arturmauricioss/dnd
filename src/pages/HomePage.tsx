import Page from '@components/shell/Page/Page'
import Title from '@components/ui/basic/Title/Title'
import RecentUpdates from '@features/updates/components/RecentUpdates/RecentUpdates'

export default function HomePage() {
  return (
    <Page>
      <Title size="xl" className="mt-md">Brasil RPG</Title>
      <RecentUpdates />
    </Page>
  )
}