import { concilios } from "@/data/concilios";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function DataPascoaPage({ params }: Props) {
  const { slug } = await params;

  const concilio = concilios.find((c) => c.slug === slug);
  if (!concilio) notFound();

  return (
    <article className="max-w-3xl mx-auto p-8 space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Data da Páscoa</h1>
        <p className="text-gray-600">
          {concilio.nome} — {concilio.ano}
        </p>
      </header>

      <section>
        <p>
          O Concílio de Niceia estabeleceu critérios para a celebração
          da Páscoa cristã, visando unificar a prática entre as igrejas
          e evitar dependência do calendário judaico.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">
          Decisão conciliar
        </h2>
        <p>
          Ficou definido que a Páscoa deveria ser celebrada no primeiro
          domingo após a lua cheia que ocorre depois do equinócio da
          primavera.
        </p>
      </section>

      <section className="border-l-4 border-blue-500 bg-zinc-800 p-4 rounded-md">
        <strong className="text-blue-400">Nota histórica:</strong>
        <p className="text-sm mt-1 text-zinc-300 leading-relaxed">
            Embora Niceia não tenha promulgado um cânon formal sobre o
            cálculo da Páscoa, a decisão foi amplamente aceita e
            comunicada por meio de cartas sinodais.
        </p>
      </section>

    </article>
  );
}
