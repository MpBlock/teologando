import { concilios } from "@/data/concilios";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
  searchParams: { secao?: string };
};

export default function ConcilioPage({
  params,
  searchParams,
}: Props) {
  const { slug } = params;

  const concilio = concilios.find((c) => c.slug === slug);
  if (!concilio) notFound();

  const secoes: Record<string, { titulo: string; conteudo: string }> = {
    natureza: {
      titulo: "Natureza de Cristo",
      conteudo:
        "O Concílio de Niceia afirmou que Cristo é verdadeiramente Deus, consubstancial ao Pai (homoousios).",
    },
    arianismo: {
      titulo: "Condenação do Arianismo",
      conteudo:
        "O arianismo foi condenado por negar a plena divindade do Filho, afirmando que Ele era criado.",
    },
    credo: {
      titulo: "Criação do Credo Niceno",
      conteudo:
        "O Credo Niceno foi formulado para proteger a fé apostólica contra heresias cristológicas.",
    },
    data: {
      titulo: "Data da Páscoa",
      conteudo:
        "O concílio definiu que a Páscoa não deveria coincidir com a Páscoa judaica, buscando unidade litúrgica.",
    },
    regras: {
      titulo: "Regras disciplinares da Igreja",
      conteudo:
        "Foram estabelecidas normas sobre clero, disciplina e organização eclesiástica.",
    },
  };

  const secaoAtiva = searchParams.secao
    ? secoes[searchParams.secao]
    : null;

  return (
    <article className="max-w-3xl mx-auto p-8 space-y-8">
      {/* Cabeçalho */}
      <header>
        <h1 className="text-3xl font-bold">{concilio.nome}</h1>
        <p className="text-gray-600">
          {concilio.ano} — {concilio.local}
        </p>
      </header>

      {/* Seção dinâmica */}
      {secaoAtiva ? (
        <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">
            {secaoAtiva.titulo}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {secaoAtiva.conteudo}
          </p>
        </section>
      ) : (
        <>
          <section>
            <p>{concilio.resumo}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">
              Contexto histórico
            </h2>
            <p>{concilio.contexto}</p>
          </section>
        </>
      )}
    </article>
  );
}
