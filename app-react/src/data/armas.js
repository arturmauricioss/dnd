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

export function getDanoPorTamanho(dano, tamanho) {
  if (!dano) return "";
  return tabelaDanoPorTamanho[dano]?.[tamanho] || dano;
}

export function getPesoPorTamanho(pesoNum, tamanho) {
  if (!pesoNum || tamanho === 'medio') return pesoNum;
  
  if (tamanho === 'pequeno') {
    return pesoNum / 2;
  } else if (tamanho === 'grande') {
    return pesoNum * 2;
  }
  
  return pesoNum;
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

function normalizarArma(id, arma) {
  const tipo = (arma.subcategoria === 'distancia' || arma.subcategoria === 'municao') ? 'distancia' : 'corpo';
  const icon = getIconArma(arma);
  return { id, ...arma, tipo, icon };
}

export const todasArmas = {
  // ARMAS SIMPLES - Ataque Desarmado
  "ataque-desarmado": { nome: "Ataque desarmado", categoria: "simples", subcategoria: "leve", custo: 0, dano: "1d3", critico: "x2", alcance: "-", peso: 0, tipo1: "concussao", tipo2: "" },
  "manopla": { nome: "Manopla", categoria: "simples", subcategoria: "leve", custo: 200, dano: "1d3", critico: "x2", alcance: "-", peso: 0.5, tipo1: "concussao", tipo2: "" },

  // ARMAS SIMPLES - Leves
  "adaga": { nome: "Adaga", categoria: "simples", subcategoria: "leve", custo: 200, dano: "1d4", critico: "19-20/x2", alcance: "3m", peso: 0.5, tipo1: "perfurante", tipo2: "cortante" },
  "adaga-soco": { nome: "Adaga de soco", categoria: "simples", subcategoria: "leve", custo: 200, dano: "1d4", critico: "x3", alcance: "-", peso: 0.5, tipo1: "perfurante", tipo2: "" },
  "foice-curta": { nome: "Foice curta", categoria: "simples", subcategoria: "leve", custo: 600, dano: "1d6", critico: "x2", alcance: "-", peso: 1, tipo1: "cortante", tipo2: "" },
  "maca-leve": { nome: "Maça leve", categoria: "simples", subcategoria: "leve", custo: 500, dano: "1d6", critico: "x2", alcance: "-", peso: 2, tipo1: "concussao", tipo2: "" },
  "manopla-cravos": { nome: "Manopla com cravos", categoria: "simples", subcategoria: "leve", custo: 500, dano: "1d4", critico: "x2", alcance: "-", peso: 0.5, tipo1: "perfurante", tipo2: "" },

  // ARMAS SIMPLES - Uma Mão
  "clava": { nome: "Clava", categoria: "simples", subcategoria: "uma_mao", custo: 0, dano: "1d6", critico: "x2", alcance: "3m", peso: 1.5, tipo1: "concussao", tipo2: "" },
  "lanca-curta": { nome: "Lança curta", categoria: "simples", subcategoria: "uma_mao", custo: 100, dano: "1d6", critico: "x2", alcance: "6m", peso: 1.5, tipo1: "perfurante", tipo2: "" },
  "maca-pesada": { nome: "Maça pesada", categoria: "simples", subcategoria: "uma_mao", custo: 1200, dano: "1d8", critico: "x2", alcance: "-", peso: 4, tipo1: "concussao", tipo2: "" },
  "maca-estrela": { nome: "Maça-estrela", categoria: "simples", subcategoria: "uma_mao", custo: 800, dano: "1d8", critico: "x2", alcance: "-", peso: 3, tipo1: "concussao", tipo2: "perfurante" },

  // ARMAS SIMPLES - Duas Mãos
  "bordao": { nome: "Bordão", categoria: "simples", subcategoria: "duas_maos", custo: 0, dano: "1d6/1d6", critico: "x2", alcance: "-", peso: 2, tipo1: "concussao", tipo2: "" },
  "lanca": { nome: "Lança", categoria: "simples", subcategoria: "duas_maos", custo: 200, dano: "1d8", critico: "x3", alcance: "6m", peso: 3, tipo1: "perfurante", tipo2: "" },
  "lanca-longa": { nome: "Lança longa", categoria: "simples", subcategoria: "duas_maos", custo: 500, dano: "1d8", critico: "x3", alcance: "-", peso: 4.5, tipo1: "perfurante", tipo2: "" },

  // ARMAS SIMPLES - Distância
  "azagaia": { nome: "Azagaia", categoria: "simples", subcategoria: "distancia", custo: 100, dano: "1d6", critico: "x2", alcance: "9m", peso: 1, tipo1: "perfurante", tipo2: "" },
  "besta-leve": { nome: "Besta leve", categoria: "simples", subcategoria: "distancia", custo: 3500, dano: "1d8", critico: "19-20/x2", alcance: "24m", peso: 2, tipo1: "perfurante", tipo2: "" },
  "virotes-besta-10": { nome: "Virotes de besta (10)", categoria: "simples", subcategoria: "municao", custo: 100, dano: "-", critico: "-", alcance: "-", peso: 0.5, tipo1: "-", tipo2: "" },
  "besta-pesada": { nome: "Besta pesada", categoria: "simples", subcategoria: "distancia", custo: 5000, dano: "1d10", critico: "19-20/x2", alcance: "36m", peso: 4, tipo1: "perfurante", tipo2: "" },
  "dardo": { nome: "Dardo", categoria: "simples", subcategoria: "distancia", custo: 50, dano: "1d4", critico: "x2", alcance: "6m", peso: 0.25, tipo1: "perfurante", tipo2: "" },
  "funda": { nome: "Funda", categoria: "simples", subcategoria: "distancia", custo: 0, dano: "1d4", critico: "x2", alcance: "15m", peso: 0, tipo1: "concussao", tipo2: "" },
  "balas-funda-10": { nome: "Balas de funda (10)", categoria: "simples", subcategoria: "municao", custo: 10, dano: "-", critico: "-", alcance: "-", peso: 0.25, tipo1: "-", tipo2: "" },

  // ARMAS COMUNS - Leves
  "armaduras-cravos": { nome: "Armaduras com cravos", categoria: "comum", subcategoria: "leve", custo: 0, dano: "1d6", critico: "x2", alcance: "-", peso: 0, tipo1: "perfurante", tipo2: "" },
  "escudo-pequeno": { nome: "Escudo pequeno", categoria: "comum", subcategoria: "leve", custo: 0, dano: "1d3", critico: "x2", alcance: "-", peso: 0, tipo1: "concussao", tipo2: "" },
  "escudo-pequeno-cravos": { nome: "Escudo pequeno com cravos", categoria: "comum", subcategoria: "leve", custo: 0, dano: "1d4", critico: "x2", alcance: "-", peso: 0, tipo1: "perfurante", tipo2: "" },
  "espada-curta": { nome: "Espada curta", categoria: "comum", subcategoria: "leve", custo: 1000, dano: "1d6", critico: "19-20/x2", alcance: "-", peso: 1, tipo1: "perfurante", tipo2: "" },
  "kukri": { nome: "Kukri", categoria: "comum", subcategoria: "leve", custo: 800, dano: "1d4", critico: "18-20/x2", alcance: "-", peso: 1, tipo1: "cortante", tipo2: "" },
  "machadinha": { nome: "Machadinha", categoria: "comum", subcategoria: "leve", custo: 600, dano: "1d6", critico: "x3", alcance: "-", peso: 1.5, tipo1: "cortante", tipo2: "" },
  "machado-arremesso": { nome: "Machado de Arremesso", categoria: "comum", subcategoria: "distancia", custo: 800, dano: "1d6", critico: "x2", alcance: "3m", peso: 1, tipo1: "cortante", tipo2: "" },
  "martelo-leve": { nome: "Martelo leve", categoria: "comum", subcategoria: "distancia", custo: 100, dano: "1d4", critico: "x2", alcance: "6m", peso: 1, tipo1: "concussao", tipo2: "" },
  "picareta-leve": { nome: "Picareta leve", categoria: "comum", subcategoria: "leve", custo: 400, dano: "1d4", critico: "x4", alcance: "-", peso: 1.5, tipo1: "perfurante", tipo2: "" },
  "porrete": { nome: "Porrete", categoria: "comum", subcategoria: "leve", custo: 100, dano: "1d6", critico: "x2", alcance: "-", peso: 1, tipo1: "concussao", tipo2: "" },

  // ARMAS COMUNS - Uma Mão
  "cimitarra": { nome: "Cimitarra", categoria: "comum", subcategoria: "uma_mao", custo: 1500, dano: "1d6", critico: "18-20/x2", alcance: "-", peso: 2, tipo1: "cortante", tipo2: "" },
  "escudo-grande": { nome: "Escudo grande", categoria: "comum", subcategoria: "uma_mao", custo: 0, dano: "1d4", critico: "x2", alcance: "-", peso: 0, tipo1: "concussao", tipo2: "" },
  "escudo-grande-cravos": { nome: "Escudo grande com cravos", categoria: "comum", subcategoria: "uma_mao", custo: 0, dano: "1d6", critico: "x2", alcance: "-", peso: 0, tipo1: "perfurante", tipo2: "" },
  "espada-longa": { nome: "Espada longa", categoria: "comum", subcategoria: "uma_mao", custo: 1500, dano: "1d8", critico: "19-20/x2", alcance: "-", peso: 2, tipo1: "cortante", tipo2: "" },
  "machado-batalha": { nome: "Machado de batalha", categoria: "comum", subcategoria: "uma_mao", custo: 1000, dano: "1d8", critico: "x3", alcance: "-", peso: 3, tipo1: "cortante", tipo2: "" },
  "mangual": { nome: "Mangual", categoria: "comum", subcategoria: "uma_mao", custo: 800, dano: "1d8", critico: "x2", alcance: "-", peso: 2.5, tipo1: "concussao", tipo2: "" },
  "martelo-guerra": { nome: "Martelo de guerra", categoria: "comum", subcategoria: "uma_mao", custo: 1200, dano: "1d8", critico: "x3", alcance: "-", peso: 2.5, tipo1: "concussao", tipo2: "" },
  "picareta-pesada": { nome: "Picareta pesada", categoria: "comum", subcategoria: "uma_mao", custo: 800, dano: "1d6", critico: "x4", alcance: "-", peso: 3, tipo1: "perfurante", tipo2: "" },
  "sabre": { nome: "Sabre", categoria: "comum", subcategoria: "uma_mao", custo: 2000, dano: "1d6", critico: "18-20/x2", alcance: "-", peso: 1, tipo1: "perfurante", tipo2: "" },
  "tridente": { nome: "Tridente", categoria: "comum", subcategoria: "uma_mao", custo: 1500, dano: "1d8", critico: "x2", alcance: "3m", peso: 2, tipo1: "perfurante", tipo2: "" },

  // ARMAS COMUNS - Duas Mãos
  "alabarda": { nome: "Alabarda", categoria: "comum", subcategoria: "duas_maos", custo: 1000, dano: "1d10", critico: "x3", alcance: "-", peso: 11, tipo1: "perfurante", tipo2: "cortante" },
  "clava-grande": { nome: "Clava grande", categoria: "comum", subcategoria: "duas_maos", custo: 500, dano: "1d10", critico: "x2", alcance: "-", peso: 4, tipo1: "concussao", tipo2: "" },
  "espada-larga": { nome: "Espada larga", categoria: "comum", subcategoria: "duas_maos", custo: 5000, dano: "2d6", critico: "19-20/x2", alcance: "-", peso: 4, tipo1: "cortante", tipo2: "" },
  "falcione": { nome: "Falcione", categoria: "comum", subcategoria: "duas_maos", custo: 7500, dano: "2d4", critico: "18-20/x2", alcance: "-", peso: 4, tipo1: "cortante", tipo2: "" },
  "foice-longa": { nome: "Foice longa", categoria: "comum", subcategoria: "duas_maos", custo: 1800, dano: "2d4", critico: "x4", alcance: "-", peso: 10, tipo1: "perfurante", tipo2: "cortante" },
  "glaive": { nome: "Glaive", categoria: "comum", subcategoria: "duas_maos", custo: 800, dano: "1d10", critico: "x3", alcance: "-", peso: 10, tipo1: "cortante", tipo2: "" },
  "guisarme": { nome: "Guisarme", categoria: "comum", subcategoria: "duas_maos", custo: 900, dano: "2d4", critico: "x3", alcance: "-", peso: 11, tipo1: "cortante", tipo2: "" },
  "machado-grande": { nome: "Machado grande", categoria: "comum", subcategoria: "duas_maos", custo: 2000, dano: "1d12", critico: "x3", alcance: "-", peso: 11, tipo1: "cortante", tipo2: "" },
  "mangual-pesado": { nome: "Mangual pesado", categoria: "comum", subcategoria: "duas_maos", custo: 1500, dano: "1d10", critico: "19-20/x2", alcance: "-", peso: 10, tipo1: "concussao", tipo2: "" },
  "ranseur": { nome: "Ranseur", categoria: "comum", subcategoria: "duas_maos", custo: 1000, dano: "2d4", critico: "x3", alcance: "-", peso: 11, tipo1: "perfurante", tipo2: "" },

  // ARMAS COMUNS - Distância
  "arco-curto": { nome: "Arco curto", categoria: "comum", subcategoria: "distancia", custo: 3000, dano: "1d6", critico: "x3", alcance: "18m", peso: 1, tipo1: "perfurante", tipo2: "" },
  "flechas-20": { nome: "Flechas (20)", categoria: "comum", subcategoria: "municao", custo: 100, dano: "-", critico: "-", alcance: "-", peso: 1.5, tipo1: "-", tipo2: "" },
  "arco-curto-composto": { nome: "Arco curto composto", categoria: "comum", subcategoria: "distancia", custo: 7500, dano: "1d6", critico: "x3", alcance: "21m", peso: 1, tipo1: "perfurante", tipo2: "" },
  "arco-longo": { nome: "Arco longo", categoria: "comum", subcategoria: "distancia", custo: 7500, dano: "1d8", critico: "x3", alcance: "30m", peso: 1.5, tipo1: "perfurante", tipo2: "" },
  "arco-longo-composto": { nome: "Arco longo composto", categoria: "comum", subcategoria: "distancia", custo: 10000, dano: "1d8", critico: "x3", alcance: "33m", peso: 1.5, tipo1: "perfurante", tipo2: "" },

  // ARMAS EXÓTICAS - Leves
  "kama": { nome: "Kama", categoria: "exotica", subcategoria: "leve", custo: 200, dano: "1d6", critico: "x2", alcance: "-", peso: 1, tipo1: "cortante", tipo2: "" },
  "nunchaku": { nome: "Nunchaku", categoria: "exotica", subcategoria: "leve", custo: 200, dano: "1d6", critico: "x2", alcance: "-", peso: 1, tipo1: "concussao", tipo2: "" },
  "sai": { nome: "Sai", categoria: "exotica", subcategoria: "distancia", custo: 100, dano: "1d4", critico: "x2", alcance: "3m", peso: 0.5, tipo1: "concussao", tipo2: "" },
  "siangham": { nome: "Siangham", categoria: "exotica", subcategoria: "leve", custo: 300, dano: "1d6", critico: "x2", alcance: "-", peso: 0.5, tipo1: "perfurante", tipo2: "" },

  // ARMAS EXÓTICAS - Uma Mão
  "chicote": { nome: "Chicote", categoria: "exotica", subcategoria: "uma_mao", custo: 100, dano: "1d3", critico: "x2", alcance: "-", peso: 1, tipo1: "cortante", tipo2: "" },
  "espada-bastarda": { nome: "Espada bastarda", categoria: "exotica", subcategoria: "uma_mao", custo: 3500, dano: "1d10", critico: "19-20/x2", alcance: "-", peso: 3, tipo1: "cortante", tipo2: "" },
  "machado-guerra-anano": { nome: "Machado de guerra anão", categoria: "exotica", subcategoria: "uma_mao", custo: 3000, dano: "1d10", critico: "x3", alcance: "-", peso: 4, tipo1: "cortante", tipo2: "" },

  // ARMAS EXÓTICAS - Duas Mãos
  "corrente-cravos": { nome: "Corrente com cravos", categoria: "exotica", subcategoria: "duas_maos", custo: 2500, dano: "2d4", critico: "x2", alcance: "-", peso: 10, tipo1: "perfurante", tipo2: "" },
  "espada-duas-laminas": { nome: "Espada de duas lâminas", categoria: "exotica", subcategoria: "duas_maos", custo: 10000, dano: "1d8/1d8", critico: "19-20/x2", alcance: "-", peso: 10, tipo1: "cortante", tipo2: "" },
  "machado-orc-duplo": { nome: "Machado orc duplo", categoria: "exotica", subcategoria: "duas_maos", custo: 6000, dano: "1d8/1d8", critico: "x3", alcance: "-", peso: 12.5, tipo1: "cortante", tipo2: "" },
  "mangual-atroz": { nome: "Mangual atroz", categoria: "exotica", subcategoria: "duas_maos", custo: 9000, dano: "1d8/1d8", critico: "x2", alcance: "-", peso: 10, tipo1: "concussao", tipo2: "" },
  "martelo-gnomo-gancho": { nome: "Martelo gnomo com gancho", categoria: "exotica", subcategoria: "duas_maos", custo: 2000, dano: "1d8/1d6", critico: "x3/x4", alcance: "-", peso: 3, tipo1: "concussao", tipo2: "perfurante" },
  "urgrosh-anao": { nome: "Urgrosh anão", categoria: "exotica", subcategoria: "duas_maos", custo: 5000, dano: "1d8/1d6", critico: "x3", alcance: "-", peso: 11, tipo1: "cortante", tipo2: "perfurante" },

  // ARMAS EXÓTICAS - Distância
  "besta-repeticao-leve": { nome: "Besta leve de repetição", categoria: "exotica", subcategoria: "distancia", custo: 25000, dano: "1d8", critico: "19-20/x2", alcance: "24m", peso: 3, tipo1: "perfurante", tipo2: "" },
  "besta-repeticao-pesada": { nome: "Besta pesada de repetição", categoria: "exotica", subcategoria: "distancia", custo: 40000, dano: "1d10", critico: "19-20/x2", alcance: "36m", peso: 11, tipo1: "perfurante", tipo2: "" },
  "besta-mao": { nome: "Besta de mão", categoria: "exotica", subcategoria: "distancia", custo: 10000, dano: "1d4", critico: "19-20/x2", alcance: "9m", peso: 1, tipo1: "perfurante", tipo2: "" },
  "boleadeira": { nome: "Boleadeira", categoria: "exotica", subcategoria: "distancia", custo: 500, dano: "1d3", critico: "x2", alcance: "3m", peso: 1, tipo1: "concussao", tipo2: "" },
  "rede": { nome: "Rede", categoria: "exotica", subcategoria: "distancia", custo: 2000, dano: "-", critico: "-", alcance: "3m", peso: 3, tipo1: "-", tipo2: "" },
  "shuriken-5": { nome: "Shuriken (5)", categoria: "exotica", subcategoria: "distancia", custo: 100, dano: "1d2", critico: "x2", alcance: "3m", peso: 0.25, tipo1: "perfurante", tipo2: "" }
};

export const armasNormalizadas = Object.fromEntries(
  Object.entries(todasArmas).map(([id, arma]) => [id, normalizarArma(id, arma)])
);