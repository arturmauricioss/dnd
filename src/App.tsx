import { CharacterProvider } from '@context/CharacterContext'

export default function App() {
  return (
    <CharacterProvider>
      <main style={{ padding: '1rem' }}>
        <h1>AVALLON D&D</h1>
        <p style={{ marginTop: '1rem', opacity: 0.5 }}>Em breve...</p>
      </main>
    </CharacterProvider>
  )
}