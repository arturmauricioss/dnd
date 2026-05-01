import { Page } from '@layout'
import './Livros.css'

export default function Livros() {
  
  return (
    <Page title="Livros">
      <div className="livros-container">
        <h2>📚 Livros</h2>
        
        <div className="livros-section">
          <h3>Sistemas Disponíveis</h3>
          <div className="livros-grid">
            <div className="livro-card">
              <span className="livro-icon">📖</span>
              <span className="livro-title">D&D 3.5</span>
              <span className="livro-desc">Manual do Jogador</span>
            </div>
            <div className="livro-card disabled">
              <span className="livro-icon">📖</span>
              <span className="livro-title">D&D 5ª</span>
              <span className="livro-desc">Em breve</span>
            </div>
            <div className="livro-card disabled">
              <span className="livro-icon">📖</span>
              <span className="livro-title">D&D 2ª</span>
              <span className="livro-desc">Em breve</span>
            </div>
          </div>
        </div>

        <div className="livros-section">
          <h3>Regras do Mundo</h3>
          <p className="empty">Configure as regras da sua campanha aqui.</p>
        </div>
      </div>
    </Page>
  )
}