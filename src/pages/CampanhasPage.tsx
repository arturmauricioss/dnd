import { useState } from 'react'
import { Add, Group, Master, ChessKnight, Graph } from '../components/icons'

interface Campanha {
  id: string
  nome: string
  descricao: string
  jogadores: number
  imagem: string
}

const campanhasComoJogador: Campanha[] = [
  { id: '1', nome: 'A Taverna do Dragão', descricao: 'Aventureiros em uma taverna magical', jogadores: 4, imagem: '/campanhas/campanha1.png' },
  { id: '2', nome: 'Shadows of Vallakia', descricao: 'Missões sombrias em Vallakia', jogadores: 3, imagem: '/campanhas/campanha2.png' },
]

const campanhasComoMestre: Campanha[] = [
  { id: '3', nome: 'Reino de Aethoria', descricao: 'Guerra entre reinos', jogadores: 6, imagem: '/campanhas/campanha1.png' },
]

export default function CampanhasPage() {
  const [jogando] = useState<Campanha[]>(campanhasComoJogador)
  const [mestrando] = useState<Campanha[]>(campanhasComoMestre)

  return (
    <div className="page">
      <h1 className="mt-md">Campanhas</h1>

      <h3 className="section-title active">
        <Add className="section-icon" />
        Iniciar
      </h3>

      <div className="campanhas-grid">
        <button className="new-campanha-card">
          <Group className="new-campanha-icon" />
          <span className="new-campanha-label">Jogar</span>
          <span className="new-campanha-desc">Entrar em uma aventura</span>
        </button>

        <button className="new-campanha-card">
          <Master className="new-campanha-icon" />
          <span className="new-campanha-label">Mestrar</span>
          <span className="new-campanha-desc">Criar eadirigir campanhas</span>
        </button>
      </div>

      {jogando.length > 0 && (
        <>
          <h3 className="section-title active mt-lg">
            <ChessKnight className="section-icon" />
            Jogando
          </h3>
          <div className="campanhas-list">
            {jogando.map(campanha => (
              <div key={campanha.id} className="campanha-card">
                <img src={campanha.imagem} alt={campanha.nome} className="campanha-img" />
                <div className="campanha-info">
                  <div className="campanha-header">
                    <span className="campanha-nome">{campanha.nome}</span>
                    <span className="campanha-jogadores">{campanha.jogadores} jogadores</span>
                  </div>
                  <span className="campanha-desc">{campanha.descricao}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {mestrando.length > 0 && (
        <>
          <h3 className="section-title active mt-lg">
            <Graph className="section-icon" />
            Mestrando
          </h3>
          <div className="campanhas-list">
            {mestrando.map(campanha => (
              <div key={campanha.id} className="campanha-card">
                <img src={campanha.imagem} alt={campanha.nome} className="campanha-img" />
                <div className="campanha-info">
                  <div className="campanha-header">
                    <span className="campanha-nome">{campanha.nome}</span>
                    <span className="campanha-jogadores">{campanha.jogadores} jogadores</span>
                  </div>
                  <span className="campanha-desc">{campanha.descricao}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}