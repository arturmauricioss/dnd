import type { PersonagemCardProps } from '@types'
import './PersonagemCard.css'

export default function PersonagemCard({
  nome,
  racaNome,
  genero,
  tamanho,
  deslocamento,
  classeNome,
  nivel,
  tendenciaNome,
  divindadeNome,
  atributos,
  imagem
}: PersonagemCardProps) {
  return (
    <div className="personagem-card">
      <div className="personagem-info">
        <span className="personagem-nome">{nome}</span>
        <div className="personagem-detalhes">
          <span>{racaNome} {genero === 'm' ? '♂' : '♀'}</span>
          <span>{tamanho} • {deslocamento}m</span>
          <span>{classeNome} {nivel}</span>
          <span>{tendenciaNome}</span>
          <span>{divindadeNome}</span>
        </div>
      </div>
      <div className="personagem-body">
        <img 
          src={imagem} 
          alt={nome}
          className="personagem-foto"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
        <div className="personagem-atributos">
          {Object.entries(atributos).map(([key, value]) => (
            <div key={key} className="personagem-atributo">
              <span className="atributo-label">{key.toUpperCase().slice(0,3)}</span>
              <span className="atributo-valor">{value}</span>
              <span className="atributo-mod">{Math.floor((value - 10) / 2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}