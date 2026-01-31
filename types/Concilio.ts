export type Concilio = {
  id: number;
  slug: string;
  nome: string;
  ano: number;
  local: string;
  tema: string;

  resumo: string;
  contexto: string;

  definicoes: string[];

  canones: {
    numero: number;
    texto: string;
  }[];

  heresias: {
    nome: string;
    descricao: string;
  }[];

  referencias: string[];
};
