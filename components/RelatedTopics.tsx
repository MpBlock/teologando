import Link from "next/link";

interface RelatedTopic {
  nome: string;
  slug: string;
  categoria: "concilios" | "heresias" | "temas";
}

interface RelatedTopicsProps {
  topics: RelatedTopic[];
  titulo?: string;
}

export default function RelatedTopics({ 
  topics, 
  titulo = "Tópicos Relacionados" 
}: RelatedTopicsProps) {
  if (!topics || topics.length === 0) return null;

  return (
    <div className="border-t border-[var(--border)] pt-6 mt-6">
      <h4 className="font-semibold text-[var(--foreground)] mb-4">{titulo}</h4>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <Link
            key={`${topic.categoria}-${topic.slug}`}
            href={`/${topic.categoria}/${topic.slug}`}
            className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 text-[var(--accent)] rounded-full text-sm font-medium transition-colors"
          >
            {topic.nome}
            <span className="text-xs opacity-60">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
