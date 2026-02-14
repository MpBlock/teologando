import { temas } from "@/data/temas";
import { notFound } from "next/navigation";
import { conteudoTemas } from "@/data/conteudoTemas";
import CommentsSection from "@/components/CommentsSection";

type Props = { params: Promise<{ slug: string; tema: string }> };

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function TopicoPage({ params }: Props) {
  const { slug, tema } = await params;

  const temaGroup = temas.find(t => t.slug === slug);
  if (!temaGroup) notFound();

  const temaTexto = temaGroup.temasAbordados.find(t => slugify(t) === tema);
  if (!temaTexto) notFound();

  const conteudo = conteudoTemas[tema];

  return (
    <article className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-wide text-zinc-500">{temaGroup.nome}</p>
        <h1 className="text-4xl font-extrabold tracking-tight">{conteudo?.titulo ?? temaTexto}</h1>
      </header>

      <section className="prose prose-zinc dark:prose-invert max-w-none">
        {conteudo ? (
          conteudo.texto.map((paragrafo: string, i: number) => <p key={i}>{paragrafo}</p>)
        ) : (
          <p>Conteúdo em desenvolvimento para este tópico.</p>
        )}
      </section>

      <CommentsSection
        contentId={`${slug}-${tema}`}
        contentType="temas"
        contentTitle={`${temaGroup.nome} - ${temaTexto}`}
      />
    </article>
  );
}
