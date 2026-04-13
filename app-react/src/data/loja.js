export const itensLoja = [
  // Itens básicos
  { id: 'mochila', nome: 'Mochila', preco: 15 },
  { id: 'cantil', nome: 'Cantil', preco: 3 },
  { id: 'racao', nome: 'Ração (1 dia)', preco: 5 },
  { id: 'saco_dormir', nome: 'Saco de Dormir', preco: 5 },
  { id: 'saco', nome: 'Saco', preco: 2 },
  { id: 'pederneira', nome: 'Pederneira', preco: 3 },
  { id: 'isqueiro', nome: 'Isqueiro', preco: 3 },
  { id: 'tochas', nome: '3 Tochas', preco: 1 },
  { id: 'lanterna', nome: 'Lanterna Coberta', preco: 12 },
  { id: 'oleo300', nome: 'Óleo (300ml)', preco: 2 },
  { id: 'oleo500', nome: 'Óleo (500ml)', preco: 3 },
  
  // Itens especiais
  { id: 'grimorio', nome: 'Grimório', preco: 30 },
  { id: 'ferramentas_ladrao', nome: 'Ferramentas de Ladrão', preco: 50 },
  { id: 'simbolo_sagrado', nome: 'Símbolo Sagrado', preco: 25 },
  { id: 'alaude', nome: 'Alaúde', preco: 30 },
  { id: 'bolsa_componentes', nome: 'Bolsa de Componentes', preco: 20 },
  { id: 'azevinho', nome: 'Azevinho e Visco', preco: 10 },
  
  // Armaduras
  { id: 'couro', nome: 'Couro', preco: 35, tipo: 'armadura', bonus: 2, penalidade: 5, maxDex: 6 },
  { id: 'couro_batido', nome: 'Couro Batido', preco: 50, tipo: 'armadura', bonus: 3, penalidade: 4, maxDex: 4 },
  { id: 'brunea', nome: 'Brunea', preco: 100, tipo: 'armadura', bonus: 4, penalidade: 6, maxDex: 2 },
  { id: 'malha', nome: 'Malha', preco: 150, tipo: 'armadura', bonus: 5, penalidade: 5, maxDex: 3 },
  { id: 'cota_malha', nome: 'Cota de Malha', preco: 200, tipo: 'armadura', bonus: 6, penalidade: 5, maxDex: 2 },
  { id: 'peitoral', nome: 'Peitoral', preco: 200, tipo: 'armadura', bonus: 5, penalidade: 4, maxDex: 4 },
  { id: 'meia_armadura', nome: 'Meia-Armadura', preco: 350, tipo: 'armadura', bonus: 6, penalidade: 7, maxDex: 0 },
  { id: 'armadura_placas', nome: 'Armadura de Placas', preco: 750, tipo: 'armadura', bonus: 8, penalidade: 6, maxDex: 1 },
  
  // Escudos
  { id: 'escudo_leve', nome: 'Escudo Leve', preco: 9, tipo: 'escudo', bonus: 1, penalidade: 1 },
  { id: 'escudo_pesado', nome: 'Escudo Pesado', preco: 15, tipo: 'escudo', bonus: 2, penalidade: 2 },
  { id: 'escudo_torre', nome: 'Escudo Torre', preco: 30, tipo: 'escudo', bonus: 4, penalidade: 5 },
  
  // Armas corpo a corpo
  { id: 'adaga', nome: 'Adaga', preco: 4, tipo: 'arma', dano: '1d4', critico: '19-20/x2', alcance: '3m', peso: '0.5kg' },
  { id: 'espada_curta', nome: 'Espada Curta', preco: 10, tipo: 'arma', dano: '1d6', critico: '19-20/x2', alcance: '-', peso: '1kg' },
  { id: 'espada_longa', nome: 'Espada Longa', preco: 15, tipo: 'arma', dano: '1d8', critico: '19-20/x2', alcance: '-', peso: '1.5kg' },
  { id: 'machado_guerra', nome: 'Machado de Guerra', preco: 15, tipo: 'arma', dano: '1d10', critico: 'x3', alcance: '-', peso: '3kg' },
  { id: 'maca', nome: 'Maça', preco: 12, tipo: 'arma', dano: '1d8', critico: 'x2', alcance: '-', peso: '3kg' },
  { id: 'clava', nome: 'Clava', preco: 5, tipo: 'arma', dano: '1d6', critico: 'x2', alcance: '-', peso: '2kg' },
  { id: 'lanco', nome: 'Lança', preco: 10, tipo: 'arma', dano: '1d8', critico: 'x3', alcance: '-', peso: '3kg' },
  { id: 'cimitarra', nome: 'Cimitarra', preco: 15, tipo: 'arma', dano: '1d6', critico: '18-20/x2', alcance: '-', peso: '2kg' },
  { id: 'besta', nome: 'Besta', preco: 35, tipo: 'arma', dano: '1d8', critico: '19-20/x2', alcance: '24m', peso: '3kg' },
  
  // Armas de ataque à distância
  { id: 'arco_curto', nome: 'Arco Curto', preco: 30, tipo: 'arma', dano: '1d6', critico: 'x3', alcance: '18m', peso: '1kg' },
  { id: 'arco_longo', nome: 'Arco Longo', preco: 75, tipo: 'arma', dano: '1d8', critico: 'x3', alcance: '30m', peso: '1kg' },
  { id: 'funda', nome: 'Funda', preco: 5, tipo: 'arma', dano: '1d4', critico: 'x2', alcance: '15m', peso: '0.5kg' },
]

export function getItemById(id) {
  return itensLoja.find(item => item.id === id)
}

export function getPrecoItem(id) {
  const item = getItemById(id)
  return item?.preco || 0
}

export function calcularTotal(carrinho) {
  return carrinho.reduce((total, item) => {
    const preco = getPrecoItem(item.id)
    return total + (preco * item.quantidade)
  }, 0)
}