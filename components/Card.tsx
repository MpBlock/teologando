import Link from "next/link";

type Props = {
  titulo: string;
  descricao: string;
  link: string;
};

export default function Card({ titulo, descricao, link }: Props) {
  return (
    <Link
      href={link}
      className="group bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-8 hover:border-[var(--accent)] hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <h2 className="font-semibold text-xl mb-3 text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
        {titulo}
      </h2>
      <p className="text-[var(--muted)] leading-relaxed group-hover:text-[var(--foreground)] transition-colors">
        {descricao}
      </p>
      <div className="mt-4 text-[var(--accent)] font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
        Explorar →
      </div>
    </Link>
  );
}
