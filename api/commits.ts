interface Commit {
  mensagem: string
  data: string
  autor: string
}

let cache: { data: Commit[]; timestamp: number } | null = null
const CACHE_TIME = 15 * 60 * 1000

export default async function handler(req: any, res: any) {
  const now = Date.now()

  if (cache && now - cache.timestamp < CACHE_TIME) {
    return res.status(200).json(cache.data)
  }

  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return res.status(500).json({ error: 'GITHUB_TOKEN não configurado' })
  }

  try {
    const response = await fetch(
      'https://api.github.com/repos/arturmauricioss/dnd/commits?per_page=5',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const commits = await response.json()

    const data: Commit[] = commits.map((c: any) => ({
      mensagem: c.commit.message.split('\n')[0],
      data: c.commit.author.date,
      autor: c.commit.author.name
    }))

    cache = { data, timestamp: now }

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar commits' })
  }
}