import Input from '@components/ui/basic/Input/Input'
import type { NomeFormProps } from '@features/character-creation/types'
import './NomeForm.css'

export default function NomeForm({ nome, genero, onNomeChange, onGeneroChange }: NomeFormProps) {
  return (
    <div className="nome-form">
      <div className="nome-input">
        <label className="form-label">Nome</label>
        <Input
          type="text"
          value={nome}
          onChange={(e) => onNomeChange(e.target.value)}
          placeholder="Nome do herói"
        />
      </div>
      <div className="genero-selector">
        <label className="form-label">Gênero</label>
        <div className="genero-buttons">
          <button 
            type="button" 
            className={`genero-btn ${genero === 'm' ? 'active' : ''}`}
            onClick={() => onGeneroChange('m')}
          >
            ♂
          </button>
          <button 
            type="button" 
            className={`genero-btn ${genero === 'f' ? 'active' : ''}`}
            onClick={() => onGeneroChange('f')}
          >
            ♀
          </button>
        </div>
      </div>
    </div>
  )
}