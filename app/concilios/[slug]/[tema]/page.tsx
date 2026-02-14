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
    <article className="max-w-5xl mx-auto px-6 py-12">
      <header className="mb-8">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-3 h-10 rounded-md bg-gradient-to-b from-indigo-500 to-blue-400" />
          <div>
            <p className="text-sm uppercase tracking-wide text-zinc-500">{concilio.nome}</p>
            <div className="flex items-center gap-3 mt-1">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{conteudo?.titulo ?? temaTexto}</h1>
              <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium">{concilio.ano}</span>
            </div>
            
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Conteúdo principal */}
        <main className="lg:col-span-2">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-8 shadow-sm">
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
          </div>
        </main>

        {/* Painel lateral com referências e notas rápidas */}
        <aside className="lg:col-span-1 space-y-4">
          <div className="rounded-2xl bg-gradient-to-b from-white/60 to-[var(--card-bg)] border border-[var(--border)] p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-zinc-700 mb-2">Resumo rápido</h3>
            <p className="text-sm text-zinc-600">{conteudo ? (conteudo.texto?.[0] ?? 'Resumo não disponível — consulte o conteúdo completo ao lado.') : 'Resumo não disponível — consulte o conteúdo completo ao lado.'}</p>
          </div>

          {conteudo?.referencias && (
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-zinc-700 mb-3">Referências</h3>
              <ul className="text-sm text-zinc-600 space-y-2">
                {conteudo.referencias.map((ref) => (
                  <li key={ref} className="leading-snug">{ref}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] p-4 text-sm text-zinc-600">
            <h4 className="font-semibold text-zinc-700 mb-2">Contexto do concílio</h4>
            <p className="leading-relaxed">O {concilio.nome} ({concilio.ano}) foi um evento decisivo que tratou de questões centrais da cristologia e da ortodoxia da igreja.</p>
          </div>
        </aside>
      </div>
    </article>
  );

}
