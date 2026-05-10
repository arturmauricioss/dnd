import Page from '@components/shell/Page/Page'
import Title from '@components/ui/basic/Title/Title'
import Box from '@components/ui/basic/Box/Box'
import RowHeader from '@components/ui/common/RowHeader/RowHeader'
import { Git } from '@components/ui/icons'
import { useCommits } from '@features/updates/hooks/useCommits'
import { formatarData } from '@features/updates/utils/dateUtils'
import RowMessage from '@components/ui/common/RowMessage/RowMessage'
import '@components/ui/common/RowMessage/RowMessage.css'

export default function HomePage() {
  const { commits, loading } = useCommits()

  return (
    <Page>
      <Title size="xl" className="mt-md">Brasil RPG</Title>
      <RowHeader icon={Git} active>
        Atualizações
      </RowHeader>
      {!loading && commits.length > 0 && (
        <Box className="recent-updates">
          <Box className="recent-updates-list">
            {commits.slice(0, 10).map((commit, index) => (
              <RowMessage
                key={index}
                message={commit.mensagem}
                date={formatarData(commit.data)}
              />
            ))}
          </Box>
        </Box>
      )}
    </Page>
  )
}