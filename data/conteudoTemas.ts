type ConteudoTema = {
  titulo: string;
  texto: string[];
  referencias?: string[];
};

export const conteudoTemas: Record<string, ConteudoTema> = {
  "divindade-de-cristo": {
    titulo: "Divindade de Cristo",
    texto: [
      "O Concílio de Niceia (325) afirmou de maneira definitiva que Jesus Cristo é verdadeiro Deus, consubstancial ao Pai.",
      "Essa declaração respondeu diretamente ao arianismo, que ensinava que o Filho era uma criatura exaltada, mas não eterno.",
      "A formulação do Credo Niceno tornou-se um marco fundamental da ortodoxia cristã."
    ],
    referencias: [
      "João 1:1",
      "João 10:30",
      "Colossenses 2:9",
      "Credo Niceno (325)"
    ]
  },

  "data-da-pascoa": {
    titulo: "Data da Páscoa",
    texto: [
      "O Concílio de Niceia também tratou da unificação da data da celebração da Páscoa, visando preservar a unidade da Igreja.",
      "Decidiu-se que a Páscoa deveria ser celebrada no primeiro domingo após a primeira lua cheia depois do equinócio da primavera.",
      "Essa decisão buscava evitar divergências litúrgicas entre as igrejas."
    ],
    referencias: [
      "Cânones do Concílio de Niceia",
      "Eusébio de Cesareia, Vida de Constantino"
    ]
  }
};
