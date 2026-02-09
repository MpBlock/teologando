import { temas } from "@/data/temas";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = { params: { slug: string } };

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function TemaPage({ params }: Props) {
  const { slug } = await params;
  const tema = temas.find(t => t.slug === slug);
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
          {tema.temasAbordados.map((t) => {
            const temaSlug = slugify(t);
            return (
              <li key={temaSlug}>
                <Link href={`/temas/${tema.slug}/${temaSlug}`} className="text-blue-600 hover:underline">
                  {t}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </article>
  );
}
