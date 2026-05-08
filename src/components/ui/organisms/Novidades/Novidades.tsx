import { useCommits } from '@hooks/useCommits'
import NovidadesContent from './NovidadesContent'

export default function Novidades() {
  const { commits, loading, erro } = useCommits()

  if (loading || commits.length === 0) {
    return null
  }

  return <NovidadesContent commits={commits} erro={erro} />
}