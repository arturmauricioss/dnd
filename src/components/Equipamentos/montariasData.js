export const montarias = {
  alforje: { nome: "Alforje", custo: 400, peso: "4 kg", capacidade: { light: 0, medium: 0, heavy: 0 }, tipo: 'equipamento' },
  alimentacao: { nome: "Alimentação (por dia)", custo: 5, peso: "5 kg", capacidade: { light: 0, medium: 0, heavy: 0 }, tipo: 'consumo' },
  armadura_montaria_g: { nome: "Armadura de montaria (Grande)", custo: 0, peso: "0", capacidade: { light: 0, medium: 0, heavy: 0 }, tipo: 'equipamento' },
  armadura_montaria_m: { nome: "Armadura de montaria (Média)", custo: 0, peso: "0", capacidade: { light: 0, medium: 0, heavy: 0 }, tipo: 'equipamento' },
  cachorro_montaria: { nome: "Cachorro de montaria", custo: 15000, peso: "30 kg", capacidade: { light: 20, medium: 40, heavy: 60 }, tipo: 'montaria', forca: 6 },
  cao_guarda: { nome: "Cão de guarda", custo: 2500, peso: "25 kg", capacidade: { light: 15, medium: 30, heavy: 45 }, tipo: 'montaria', forca: 4 },
  cavalo_guerra_leve: { nome: "Cavalo de guerra leve", custo: 15000, peso: "450 kg", capacidade: { light: 65, medium: 130, heavy: 195 }, tipo: 'montaria', forca: 14 },
  cavalo_guerra_pesado: { nome: "Cavalo de guerra pesado", custo: 40000, peso: "550 kg", capacidade: { light: 87, medium: 175, heavy: 262 }, tipo: 'montaria', forca: 16 },
  cavalo_leve: { nome: "Cavalo leve", custo: 7500, peso: "400 kg", capacidade: { light: 43, medium: 86, heavy: 130 }, tipo: 'montaria', forca: 12 },
  cavalo_pesado: { nome: "Cavalo pesado", custo: 20000, peso: "500 kg", capacidade: { light: 58, medium: 116, heavy: 175 }, tipo: 'montaria', forca: 14 },
  pônei_guerra: { nome: "Pônei de guerra", custo: 10000, peso: "250 kg", capacidade: { light: 43, medium: 86, heavy: 130 }, tipo: 'montaria', forca: 12 },
  ponei: { nome: "Pônei", custo: 3000, peso: "200 kg", capacidade: { light: 25, medium: 50, heavy: 75 }, tipo: 'montaria', forca: 10 },
  estalagem: { nome: "Estábulo (por dia)", custo: 50, peso: "0", capacidade: { light: 0, medium: 0, heavy: 0 }, tipo: 'servico' },
  freio_redeas: { nome: "Freio e rédeas", custo: 200, peso: "0,5 kg", capacidade: { light: 0, medium: 0, heavy: 0 }, tipo: 'equipamento' },
  jumento: { nome: "Jumento ou mula", custo: 800, peso: "250 kg", capacidade: { light: 43, medium: 86, heavy: 130 }, tipo: 'montaria', forca: 12 },
  sela_carga: { nome: "Sela de carga", custo: 500, peso: "7,5 kg", capacidade: { light: 0, medium: 0, heavy: 0 }, tipo: 'equipamento' },
  sela_militar: { nome: "Sela militar", custo: 2000, peso: "15 kg", capacidade: { light: 0, medium: 0, heavy: 0 }, tipo: 'equipamento' },
  sela_montaria: { nome: "Sela de montaria", custo: 1000, peso: "12,5 kg", capacidade: { light: 0, medium: 0, heavy: 0 }, tipo: 'equipamento' },
  sela_exotica_carga: { nome: "Sela exótica de carga", custo: 1500, peso: "10 kg", capacidade: { light: 0, medium: 0, heavy: 0 }, tipo: 'equipamento' },
  sela_exotica_militar: { nome: "Sela exótica militar", custo: 6000, peso: "20 kg", capacidade: { light: 0, medium: 0, heavy: 0 }, tipo: 'equipamento' },
  sela_exotica_montaria: { nome: "Sela exótica de montaria", custo: 3000, peso: "15 kg", capacidade: { light: 0, medium: 0, heavy: 0 }, tipo: 'equipamento' }
};

export const transporte = {
  barco_remo: { nome: "Barco a remo", custo: 5000, peso: "50 kg", capacidade: { light: 200, medium: 400, heavy: 600 }, tipo: 'veiculo', forca: 10 },
  remo: { nome: "Remo", custo: 200, peso: "5 kg", capacidade: { light: 0, medium: 0, heavy: 0 }, tipo: 'equipamento' },
  barcaca: { nome: "Barcaça", custo: 300000, peso: "5000 kg", capacidade: { light: 25000, medium: 50000, heavy: 75000 }, tipo: 'veiculo', forca: 20 },
  carroca: { nome: "Carroça", custo: 3500, peso: "200 kg", capacidade: { light: 150, medium: 300, heavy: 450 }, tipo: 'veiculo', forca: 10 },
  carruagem: { nome: "Carruagem", custo: 10000, peso: "300 kg", capacidade: { light: 200, medium: 400, heavy: 600 }, tipo: 'veiculo', forca: 12 },
  charrete: { nome: "Charrete", custo: 1500, peso: "100 kg", capacidade: { light: 75, medium: 150, heavy: 225 }, tipo: 'veiculo', forca: 10 },
  galeao: { nome: "Galeão", custo: 3000000, peso: "100000 kg", capacidade: { light: 500000, medium: 1000000, heavy: 1500000 }, tipo: 'veiculo', forca: 26 },
  nav_guerra: { nome: "Navio de guerra", custo: 2500000, peso: "80000 kg", capacidade: { light: 400000, medium: 800000, heavy: 1200000 }, tipo: 'veiculo', forca: 24 },
  nav: { nome: "Navio", custo: 1000000, peso: "50000 kg", capacidade: { light: 250000, medium: 500000, heavy: 750000 }, tipo: 'veiculo', forca: 22 },
  treno: { nome: "Trenó", custo: 2000, peso: "150 kg", capacidade: { light: 150, medium: 300, heavy: 450 }, tipo: 'veiculo', forca: 10 },
  veleiro: { nome: "Veleiro", custo: 1000000, peso: "40000 kg", capacidade: { light: 200000, medium: 400000, heavy: 600000 }, tipo: 'veiculo', forca: 22 }
};