import { concilios } from "@/data/concilios";
import { notFound } from "next/navigation";
import Link from "next/link";
import CommentsSection from "@/components/CommentsSection";

type Props = {
  params: { slug: string };
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function ConcilioPage({ params }: Props) {
  const { slug } = await params;
  const concilio = concilios.find(c => c.slug === slug);
  if (!concilio) notFound();

  return (
    <article className="max-w-3xl mx-auto p-8 space-y-6">
      <header>
        <h1 className="text-3xl font-bold">{concilio.nome}</h1>
        <p className="text-gray-600">{concilio.ano}</p>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          Temas abordados
        </h2>

        <ul className="space-y-2">
          {concilio.temasAbordados.map((tema) => {
            const temaSlug = slugify(tema);

            return (
              <li key={temaSlug}>
                <Link
                  href={`/concilios/${concilio.slug}/${temaSlug}`}
                  className="text-blue-600 hover:underline"
                >
                  {tema}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <CommentsSection
        contentId={concilio.slug}
        contentType="concilios"
        contentTitle={concilio.nome}
      />
    </article>
  );
}
