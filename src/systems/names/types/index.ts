export type Name = string;

export type Genero = 'masculino' | 'feminino' | 'unissex';

export interface Nome {
  id: string;
  nome: string;
  culturas: string[];
  genero: Genero;
}
