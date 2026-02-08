import { temas } from "@/data/temas";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

export default function TemaPage({ params }: Props) {
  const tema = temas.find(t => t.slug === params.slug);
  if (!tema) notFound();

  return (
    <article className="max-w-3xl mx-auto p-8 space-y-6">
      <header>
        <h1 className="text-3xl font-bold">{tema.nome}</h1>
        <p className="text-gray-600">{tema.descricao}</p>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-2">Tópicos</h2>
        <ul className="space-y-2">
          {tema.temasAbordados.map((t) => (
            <li key={t} className="text-blue-600 hover:underline">
              {/* link para página do tópico */}
              <a href={`/temas/${tema.slug}/${t.toLowerCase().replace(/[^a-z0-9]+/gi, "-")}`}>{t}</a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
