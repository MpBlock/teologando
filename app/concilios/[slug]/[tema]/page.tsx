import { concilios } from "@/data/concilios";
import { notFound } from "next/navigation";
import { conteudoTemas } from "@/data/conteudoTemas";


type Props = {
  params: Promise<{
    slug: string;
    tema: string;
  }>;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function TemaPage({ params }: Props) {
  // ✅ AGORA SIM
  const { slug, tema } = await params;

  const concilio = concilios.find(c => c.slug === slug);
  if (!concilio) notFound();

  const temaTexto = concilio.temasAbordados.find(
    (t) => slugify(t) === tema
  );

  if (!temaTexto) notFound();

  const conteudo = conteudoTemas[tema];


  return (
    <article className="max-w-4xl mx-auto px-6 py-12 space-y-12">

      <header className="space-y-3">
        <p className="text-sm uppercase tracking-wide text-zinc-500">
          {concilio.nome} • {concilio.ano}
        </p>

        <h1 className="text-4xl font-extrabold tracking-tight">
          {conteudo?.titulo ?? temaTexto}
        </h1>
      </header>

      <section className="prose prose-zinc dark:prose-invert max-w-none">
        {conteudo ? (
          conteudo.texto.map((paragrafo, i) => (
            <p key={i}>{paragrafo}</p>
          ))
        ) : (
          <p>
            Este tema foi abordado no {concilio.nome}, com importantes
            implicações teológicas e históricas.
          </p>
        )}
      </section>

      {conteudo?.referencias && (
        <section className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-3">
            Referências
          </h2>
          <ul className="list-disc pl-6 text-sm text-zinc-600">
            {conteudo.referencias.map((ref) => (
              <li key={ref}>{ref}</li>
            ))}
          </ul>
        </section>
      )}

    </article>
  );

}
