import { useCommits } from '@features/updates/hooks/useCommits'
import RecentUpdatesContent from './RecentUpdatesContent'

export default function RecentUpdates() {
  const { commits, loading, erro } = useCommits()

  if (loading || commits.length === 0) {
    return null
  }

  return <RecentUpdatesContent commits={commits} erro={erro} />
}