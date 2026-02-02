import { concilios } from "@/data/concilios";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
    tema: string;
  };
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function TemaPage({ params }: Props) {
  const concilio = concilios.find(c => c.slug === params.slug);
  if (!concilio) notFound();

  const temaTexto = concilio.temasAbordados.find(
    (t) => slugify(t) === params.tema
  );

  if (!temaTexto) notFound();

  return (
    <article className="max-w-3xl mx-auto p-8 space-y-6">
      <header>
        <h1 className="text-3xl font-bold">{temaTexto}</h1>
        <p className="text-gray-600">
          {concilio.nome} — {concilio.ano}
        </p>
      </header>

      <section className="text-gray-800 leading-relaxed space-y-4">
        <p>
          Este tema foi tratado no {concilio.nome}, com implicações
          teológicas, históricas e doutrinárias importantes para a
          Igreja.
        </p>

        <p>
          (Aqui você pode depois substituir por um texto completo,
          citações patrísticas, cânones, etc.)
        </p>
      </section>
    </article>
  );
}
