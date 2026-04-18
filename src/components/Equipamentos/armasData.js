export const traducoes = {
  categoria: {
    simples: 'Simples',
    comum: 'Comum',
    exotica: 'Exótica'
  },
  subcategoria: {
    leve: 'Leve',
    uma_mao: 'Uma mão',
    duas_maos: 'Duas mãos',
    distancia: 'Distância',
    municao: 'Munição'
  }
}

export const tabelaDanoPorTamanho = {
  "1d2":   { pequeno: "0d2",   medio: "1d2",   grande: "1d3" },
  "1d3":   { pequeno: "1d2",   medio: "1d3",   grande: "1d4" },
  "1d4":   { pequeno: "1d3",   medio: "1d4",   grande: "1d6" },
  "1d6":   { pequeno: "1d4",   medio: "1d6",   grande: "1d8" },
  "1d8":   { pequeno: "1d6",   medio: "1d8",   grande: "2d6" },
  "1d10":  { pequeno: "1d6",   medio: "1d10",  grande: "2d8" },
  "1d12":  { pequeno: "1d8",   medio: "1d12",  grande: "3d6" },
  "2d4":   { pequeno: "1d10",  medio: "2d4",   grande: "2d6" },
  "2d6":   { pequeno: "1d12",  medio: "2d6",   grande: "3d6" },
  "2d8":   { pequeno: "2d4",   medio: "2d8",   grande: "3d8" },
  "2d10":  { pequeno: "2d6",   medio: "2d10",  grande: "4d8" }
};

export const todasArmas = {
  "manopla": { nome: "Manopla", categoria: "simples", subcategoria: "leve", custo: 200, dano: "1d3", critico: "x2", alcance: "-", peso: 0.5, tipo1: "concussao", tipo2: "", img:"/dnd/armas/manopla.png" },
  "adaga": { nome: "Adaga", categoria: "simples", subcategoria: "leve", custo: 200, dano: "1d4", critico: "19-20/x2", alcance: "3m", peso: 0.5, tipo1: "perfurante", tipo2: "cortante", img:"/dnd/armas/adaga.png" },
  "adaga-soco": { nome: "Adaga de soco", categoria: "simples", subcategoria: "leve", custo: 200, dano: "1d4", critico: "x3", alcance: "-", peso: 0.5, tipo1: "perfurante", tipo2: "", img:"/dnd/armas/adaga-soco.png" },
  "foice-curta": { nome: "Foice curta", categoria: "simples", subcategoria: "leve", custo: 600, dano: "1d6", critico: "x2", alcance: "-", peso: 1, tipo1: "cortante", tipo2: "", img:"/dnd/armas/foice-curta.png" },
  "foice-longa": { nome: "Foice longa", categoria: "comum", subcategoria: "duas_maos", custo: 1800, dano: "2d4", critico: "x4", alcance: "-", peso: 10, tipo1: "perfurante", tipo2: "cortante", img:"/dnd/armas/foice-longa.png" },
  "nunchaku": { nome: "Nunchaku", categoria: "exotica", subcategoria: "leve", custo: 200, dano: "1d6", critico: "x2", alcance: "-", peso: 1, tipo1: "concussao", tipo2: "", img:"/dnd/armas/nunchaku.png" },
  "machado-guerra-anao": { nome: "Machado de guerra anão", categoria: "exotica", subcategoria: "uma_mao", custo: 3000, dano: "1d10", critico: "x3", alcance: "-", peso: 4, tipo1: "cortante", tipo2: "", img:"/dnd/armas/machado-guerra-anao.png" },
  "shuriken-5": { nome: "Shuriken (5)", categoria: "exotica", subcategoria: "distancia", custo: 100, dano: "1d2", critico: "x2", alcance: "3m", peso: 0.25, tipo1: "perfurante", tipo2: "", img:"/dnd/armas/shuriken-5.png" }
};

export const armasNormalizadas = Object.fromEntries(
  Object.entries(todasArmas).map(([id, arma]) => [id, normalizarArma(id, arma)])
);

function normalizarArma(id, arma) {
  const tipo = (arma.subcategoria === 'distancia' || arma.subcategoria === 'municao') ? 'distancia' : 'corpo';
  const icon = getIconArma(arma);
  return { id, ...arma, tipo, icon, img: arma.img || null };
}

function getIconArma(arma) {
  const nome = arma.nome?.toLowerCase() || '';
  const tipo1 = arma.tipo1?.toLowerCase() || '';
  
  if (nome.includes('arco')) return '🏹';
  if (nome.includes('besta')) return '🎯';
  if (nome.includes('escudo')) return '🛡️';
  if (nome.includes('funda')) return '🪨';
  if (nome.includes('rede')) return '🕸️';
  if (nome.includes('shuriken') || nome.includes('boleadeira') || nome.includes('dardo') || nome.includes('azagaia')) return '🎯';
  if (nome.includes('lança') || nome.includes('tridente')) return '🔱';
  if (nome.includes('foice')) return '🌾';
  if (nome.includes('chicote')) return '🧶';
  if (nome.includes('corrente')) return '⛓️';
  if (nome.includes('bordão')) return '🥢';
  if (nome.includes('kama') || nome.includes('nunchaku') || nome.includes('sai') || nome.includes('siangham')) return '🥋';
  
  if (tipo1 === 'cortante') return '🪓';
  if (tipo1 === 'perfurante') return '🗡️';
  if (tipo1 === 'concussao') return '🔨';
  
  return '⚔️';
}