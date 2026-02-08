type ConteudoTema = {
  titulo: string;
  texto: string[];
  referencias?: string[];
};

export const conteudoTemas: Record<string, ConteudoTema> = {
  "divindade-de-cristo": {
    titulo: "Divindade de Cristo",
    texto: [
      "O Concílio de Niceia (325) afirmou explicitamente a plena divindade de Jesus Cristo no Símbolo Niceno. O Filho é confessado como “Deus de Deus, Luz da Luz, Deus verdadeiro de Deus verdadeiro”, “gerado, não criado” e “consubstancial ao Pai”, por meio de quem todas as coisas vieram a existir. Com essas formulações, o concílio definiu dogmaticamente que o Filho possui a mesma substância do Pai e é verdadeiro Deus.",
      "Esta definição dogmática foi formulada em resposta direta às teses arianas, que negavam a plena divindade e eternidade do Filho.",
      "E em um só Senhor Jesus Cristo,",
      "o Filho de Deus,",
      "gerado do Pai,",
      "unigênito,",
      "isto é, da substância do Pai,",
      "Deus de Deus,",
      "Luz da Luz,",
      "Deus verdadeiro de Deus verdadeiro,",
      "gerado, não criado,",
      "consubstancial ao Pai,",
      "por meio de quem todas as coisas vieram a existir."
    ],
    referencias: [
      "Concílio de Niceia I (325). Símbolo Niceno: afirmação da divindade do Filho.",
      "In: TANNER, Norman P., SJ (ed.). Decrees of the Ecumenical Councils. Vol. 1: Nicaea I to Lateran V."
    ]
  },

  "combate-ao-arianismo": {
    titulo: "Combate ao Arianismo",
    texto: [
      "O Concílio de Niceia (325) combateu o arianismo por meio da formulação do Credo Niceno e de seus anátemas finais. O concílio condenou explicitamente as proposições segundo as quais o Filho de Deus teria tido um início no tempo, teria sido criado a partir do nada, seria de substância diferente do Pai ou estaria sujeito a mudança. Tais posições foram formalmente rejeitadas e anatematizadas pela Igreja católica e apostólica, afirmando-se, em contraste, a plena divindade e eternidade do Filho.",
      "Os anátemas contra o arianismo fazem parte do Credo Niceno original de 325 e não aparecem na forma posterior do Credo Niceno-Constantinopolitano (381).",
      "Quanto àqueles que dizem:",
      "‘Houve um tempo em que ele não existia’,",
      "e: ‘Antes de ser gerado, ele não existia’,",
      "e que afirmam que ele veio à existência a partir do nada,",
      "ou que sustentam que o Filho de Deus é de outra hipóstase ou substância,",
      "ou que está sujeito a alteração ou mudança —",
      "a Igreja católica e apostólica os anatematiza."
    ],
    referencias: [
      "Concílio de Niceia I (325). Símbolo Niceno: Anátemas contra o arianismo.",
      "In: TANNER, Norman P., SJ (ed.). Decrees of the Ecumenical Councils. Vol. 1: Nicaea I to Lateran V."
    ]
  },

  "formulacao-do-credo-niceno": {
    titulo: "Formulação do Credo Niceno",
    texto: [
      "O Concílio de Niceia (325) afirmou de maneira definitiva que Jesus Cristo é verdadeiro Deus, consubstancial ao Pai.",
      "Essa declaração respondeu diretamente ao arianismo, que ensinava que o Filho era uma criatura exaltada, mas não eterno.",
      "A formulação do Credo Niceno tornou-se um marco fundamental da ortodoxia cristã."
    ],
    referencias: [
      "João 1:1",
      "In: TANNER, Norman P., SJ (ed.). Decrees of the Ecumenical Councils. Vol. 1: Nicaea I to Lateran V."
    ]
  },

  "regras-disciplinares-da-igreja": {
    titulo: "Regras disciplinares da Igreja",
    texto: [
      "Cânone 1 — Autocastração",
      "Se alguém, em razão de doença, foi submetido por médicos a uma operação cirúrgica, ou se foi castrado por bárbaros, que permaneça entre o clero. Mas, se alguém, estando em plena saúde, castrou a si mesmo, tal pessoa deve ser afastada do clero.",
      "Cânone 2 — Ordenação de neófitos",
      "Visto que muitas coisas chegaram ao conhecimento do santo e grande sínodo, tanto por necessidade urgente quanto pelo zelo de certas pessoas, de que homens recentemente convertidos da vida pagã, e após curto período de instrução, foram elevados ao episcopado, pareceu correto a todos que tal prática fosse proibida. Pois há necessidade de tempo e de uma prova mais prolongada para aquele que deve ser batizado, e após o batismo é exigido exame adicional. Pois a Escritura apostólica é clara ao dizer: “Não um neófito, para que, ensoberbecido, não caia na condenação do diabo.” Mas, se depois de algum tempo a alma for considerada digna e ele der prova de seu mérito por sua conduta, então que seja admitido à ordem clerical.",
      "Cânone 3 — Convivência com mulheres",
      "Nenhum bispo, presbítero ou diácono deve ter consigo qualquer mulher, exceto apenas mãe, irmã, tia ou pessoas que estejam fora de toda suspeita.",
      "Cânone 4 — Ordenação episcopal",
      "É de todo conveniente que um bispo seja ordenado por todos os bispos da província; mas, se isso for difícil por necessidade urgente ou longa distância, ao menos três devem reunir-se para a ordenação, com o consentimento por escrito dos ausentes. A confirmação do que foi feito pertence ao metropolita.",
      "Cânone 5 — Excomunhão e reconciliação",
      "Quanto aos que forem excomungados por um bispo, que a sentença seja observada por todos, conforme a regra de que ninguém seja recebido por outro enquanto estiver excomungado. Que, contudo, haja um exame adequado do caso, para verificar se a sentença foi aplicada por espírito de contenda ou outro motivo impróprio.",
      "Cânone 6 — Autoridade das sedes antigas",
      "Sejam preservados os costumes antigos segundo os quais o bispo de Alexandria tem autoridade sobre o Egito, a Líbia e a Pentápolis, pois o mesmo é costume do bispo de Roma. Do mesmo modo, em Antioquia e nas demais províncias, sejam mantidos os privilégios das igrejas.",
      "Cânone 7 — Honra a Jerusalém",
      "Uma vez que o costume e a antiga tradição indicam que o bispo de Jerusalém deve ser honrado, seja-lhe concedida precedência de honra, sem prejuízo da dignidade própria do metropolita.",
      "Cânone 8 — Recepção dos novacianos",
      "Aqueles que se chamam a si mesmos cátaros, se retornarem à Igreja Católica e Apostólica, devem professar por escrito que aceitarão e seguirão os dogmas da Igreja, e assim permanecerão no clero.",
      "Cânone 9 — Ordenações inválidas",
      "Se alguns presbíteros foram ordenados sem exame adequado, ou confessaram pecados graves, tal ordenação não é válida.",
      "Cânone 10 — Lapsos",
      "Aqueles que negaram a fé sem coerção devem ser afastados do clero, mesmo que depois tenham sido ordenados.",
      "Cânone 11 — Penitência",
      "Quanto aos que caíram, foi decidido que, após um período determinado de penitência, possam ser reconciliados.",
      "Cânone 12 — Serviço militar",
      "Aqueles que abandonaram o serviço militar por fé, mas depois retornaram por interesse, devem cumprir penitência antes da reconciliação.",
      "Cânone 13 — Comunhão aos moribundos",
      "Nenhum moribundo deve ser privado do último e mais necessário viático.",
      "Cânone 14 — Catecúmenos",
      "Catecúmenos que caíram devem permanecer três anos entre os ouvintes antes de serem readmitidos.",
      "Cânone 15 — Transferência de bispos",
      "Para evitar grandes desordens, bispos, presbíteros e diáconos não devem transferir-se de cidade em cidade.",
      "Cânone 16 — Clérigos fugitivos",
      "Clérigos que abandonam sua igreja não devem ser recebidos em outra.",
      "Cânone 17 — Usura",
      "Se algum clérigo for encontrado cobrando juros, deve ser deposto.",
      "Cânone 18 — Diáconos",
      "Os diáconos não devem administrar a Eucaristia aos presbíteros nem assumir prerrogativas que não lhes competem.",
      "Cânone 19 — Paulianistas",
      "Os seguidores de Paulo de Samósata devem ser rebatizados e, se ordenados, ordenados novamente.",
      "Cânone 20 — Postura litúrgica",
      "Visto que alguns se ajoelham aos domingos e durante o tempo pascal, foi decidido que as orações sejam feitas em pé, a fim de que a prática seja uniforme em toda a Igreja."
    ],
    referencias: [
      "Concílio de Niceia I (325). Cânones disciplinares.",
      "In: TANNER, Norman P., SJ (ed.). Decrees of the Ecumenical Councils. Vol. 1: Nicaea I to Lateran V."
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
      "In: TANNER, Norman P., SJ (ed.). Decrees of the Ecumenical Councils. Vol. 1: Nicaea I to Lateran V."
    ]
  }
};
