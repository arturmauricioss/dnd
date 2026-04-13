// Esse é o seu "molde" de input para a ficha
export function AtributoInput({ label, idBase }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
      <label style={{ width: '50px', fontWeight: 'bold' }}>{label}</label>
      
      {/* Input de Valor Base */}
      <input 
        type="number" 
        id={`${idBase}_base`} 
        placeholder="Base"
        style={{ width: '60px' }}
      />
      
      {/* O Modificador (que o seu script vai calcular) */}
      <div id={`mod_${idBase}`} className="mod-display">
        +0
      </div>
    </div>
  );
}