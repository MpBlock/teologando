// Mapeamento de tópicos relacionados
// Cada chave é um slug único (categoria/slug) e o valor é um array de tópicos relacionados

export const topicosRelacionados: Record<string, Array<{
  nome: string;
  slug: string;
  categoria: "concilios" | "heresias" | "temas";
}>> = {
  // Concílios relacionados
  "concilios/niceia": [
    { nome: "Arianismo", slug: "arianismo", categoria: "heresias" },
    { nome: "Cristologia", slug: "cristologia", categoria: "temas" },
    { nome: "Trindade", slug: "trindade", categoria: "temas" },
  ],
  "concilios/constantinopla": [
    { nome: "Macedonianismo", slug: "macedonianismo", categoria: "heresias" },
    { nome: "Espírito Santo", slug: "espírito-santo", categoria: "temas" },
    { nome: "Trindade", slug: "trindade", categoria: "temas" },
  ],
  "concilios/efeso": [
    { nome: "Nestorianismo", slug: "nestorianismo", categoria: "heresias" },
    { nome: "Maternidade Divina (Theotokos)", slug: "maternidade-divina", categoria: "temas" },
    { nome: "Cristologia", slug: "cristologia", categoria: "temas" },
  ],
  "concilios/calcedonia": [
    { nome: "Monofisismo", slug: "monofisismo", categoria: "heresias" },
    { nome: "Nestorianismo", slug: "nestorianismo", categoria: "heresias" },
    { nome: "Cristologia", slug: "cristologia", categoria: "temas" },
  ],
  "concilios/constantinopla-2": [
    { nome: "Nestorianismo", slug: "nestorianismo", categoria: "heresias" },
    { nome: "Cristologia", slug: "cristologia", categoria: "temas" },
  ],
  "concilios/constantinopla-3": [
    { nome: "Monotelismo", slug: "monotelismo", categoria: "heresias" },
    { nome: "Cristologia", slug: "cristologia", categoria: "temas" },
  ],

  // Heresias relacionadas
  "heresias/arianismo": [
    { nome: "Concílio de Niceia", slug: "niceia", categoria: "concilios" },
    { nome: "Trindade", slug: "trindade", categoria: "temas" },
    { nome: "Cristologia", slug: "cristologia", categoria: "temas" },
  ],
  "heresias/pelagianismo": [
    { nome: "Livre-arbítrio", slug: "livre-arbítrio", categoria: "temas" },
    { nome: "Pecado Original", slug: "pecado-original", categoria: "temas" },
    { nome: "Graça (Teologia)", slug: "graça-teologia", categoria: "temas" },
  ],
  "heresias/nestorianismo": [
    { nome: "Concílio de Éfeso", slug: "efeso", categoria: "concilios" },
    { nome: "Maternidade Divina (Theotokos)", slug: "maternidade-divina", categoria: "temas" },
    { nome: "Cristologia", slug: "cristologia", categoria: "temas" },
  ],
  "heresias/monofisismo": [
    { nome: "Concílio de Calcedônia", slug: "calcedonia", categoria: "concilios" },
    { nome: "Cristologia", slug: "cristologia", categoria: "temas" },
    { nome: "Natureza de Cristo", slug: "natureza-de-cristo", categoria: "temas" },
  ],
  "heresias/donatismo": [
    { nome: "Graça (Teologia)", slug: "graça-teologia", categoria: "temas" },
    { nome: "Salvação", slug: "salvação", categoria: "temas" },
  ],

  // Temas Apologética relacionados
  "temas/assuncao-maria": [
    { nome: "Virgindade Perpétua de Maria", slug: "virgindade-perpetua", categoria: "temas" },
    { nome: "Imaculada Conceição", slug: "imaculada-conceicao", categoria: "temas" },
  ],
  "temas/imaculada-conceicao": [
    { nome: "Assunção de Maria", slug: "assuncao-maria", categoria: "temas" },
    { nome: "Pecado Original", slug: "pecado-original", categoria: "temas" },
  ],
  "temas/virgindade-perpetua": [
    { nome: "Assunção de Maria", slug: "assuncao-maria", categoria: "temas" },
    { nome: "Maternidade Divina (Theotokos)", slug: "maternidade-divina", categoria: "temas" },
  ],
  "temas/maternidade-divina": [
    { nome: "Concílio de Éfeso", slug: "efeso", categoria: "concilios" },
    { nome: "Cristologia", slug: "cristologia", categoria: "temas" },
    { nome: "Nestorianismo", slug: "nestorianismo", categoria: "heresias" },
  ],

  // Outros temas
  "temas/trindade": [
    { nome: "Concílio de Niceia", slug: "niceia", categoria: "concilios" },
    { nome: "Arianismo", slug: "arianismo", categoria: "heresias" },
    { nome: "Cristologia", slug: "cristologia", categoria: "temas" },
  ],
  "temas/cristologia": [
    { nome: "Concílio de Calcedônia", slug: "calcedonia", categoria: "concilios" },
    { nome: "Monofisismo", slug: "monofisismo", categoria: "heresias" },
    { nome: "Natureza de Cristo", slug: "natureza-de-cristo", categoria: "temas" },
  ],
  "temas/salvação": [
    { nome: "Pelagianismo", slug: "pelagianismo", categoria: "heresias" },
    { nome: "Graça (Teologia)", slug: "graça-teologia", categoria: "temas" },
  ],
  "temas/graça-teologia": [
    { nome: "Salvação", slug: "salvação", categoria: "temas" },
    { nome: "Livre-arbítrio", slug: "livre-arbítrio", categoria: "temas" },
  ],
};

export function obterTopicosRelacionados(
  categoria: "concilios" | "heresias" | "temas",
  slug: string
) {
  const chave = `${categoria}/${slug}`;
  return topicosRelacionados[chave] || [];
}
