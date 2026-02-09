import Link from "next/link";
import type { Metadata } from "next";
import { concilios } from "@/data/concilios";
import { heresias } from "@/data/heresias";
import { temas } from "@/data/temas";

export const metadata: Metadata = {
  title: "Índice | Teologando",
  description: "Índice completo de concílios, heresias e tópicos de apologética. Navegue todos os tópicos em ordem alfabética.",
  openGraph: {
    title: "Índice | Teologando",
    description: "Índice completo de concílios, heresias e tópicos de apologética.",
  },
};

type Item = {
  nome: string;
  slug: string;
  categoria: "concilios" | "heresias" | "temas";
};

function agruparPorLetra(items: Item[]): Record<string, Item[]> {
  const agrupado: Record<string, Item[]> = {};

  items
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .forEach((item) => {
      const letra = item.nome.charAt(0).toUpperCase();
      if (!agrupado[letra]) agrupado[letra] = [];
      agrupado[letra].push(item);
    });

  return agrupado;
}

function obterLinkCategoria(categoria: string, slug: string): string {
  return `/${categoria}/${slug}`;
}

export default function IndicePage() {
  const todasAsLetras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Preparar itens
  const itensIndice: Item[] = [
    ...concilios.map((c) => ({ ...c, categoria: "concilios" as const })),
    ...heresias.map((h) => ({ ...h, categoria: "heresias" as const })),
    ...temas.map((t) => ({ ...t, categoria: "temas" as const })),
  ];

  const itensPorLetra = agruparPorLetra(itensIndice);
  const letrasPresentes = Object.keys(itensPorLetra).sort();

  const coresBgCategoria = {
    concilios: "bg-blue-100 dark:bg-blue-900/30",
    heresias: "bg-red-100 dark:bg-red-900/30",
    temas: "bg-purple-100 dark:bg-purple-900/30",
  };

  const coresTextCategoria = {
    concilios: "text-blue-700 dark:text-blue-400",
    heresias: "text-red-700 dark:text-red-400",
    temas: "text-purple-700 dark:text-purple-400",
  };

  const labelCategoria = {
    concilios: "Concílio",
    heresias: "Heresia",
    temas: "Apologética",
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-2 text-[var(--foreground)]">Índice Completo</h1>
      <p className="text-lg text-[var(--muted)] mb-8">
        Navegue todos os tópicos de concílios, heresias e apologética em ordem alfabética.
      </p>

      {/* Navegação por Letra */}
      <nav className="mb-8 p-4 bg-[var(--card-bg)] rounded-lg border border-[var(--border)]">
        <p className="text-xs text-[var(--muted)] mb-3 font-semibold uppercase">Ir para:</p>
        <div className="flex flex-wrap gap-2">
          {todasAsLetras.map((letra) => (
            <Link
              key={letra}
              href={`#letra-${letra}`}
              className={`w-8 h-8 flex items-center justify-center rounded font-semibold text-sm transition-all ${
                letrasPresentes.includes(letra)
                  ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-dark)]"
                  : "bg-[var(--border)] text-[var(--muted)] cursor-not-allowed opacity-50"
              }`}
            >
              {letra}
            </Link>
          ))}
        </div>
      </nav>

      {/* Itens Agrupados por Letra */}
      <div className="space-y-6">
        {letrasPresentes.map((letra) => (
          <div key={letra} id={`letra-${letra}`} className="scroll-mt-20">
            <h2 className="text-2xl font-bold text-[var(--accent)] mb-4 sticky top-20 bg-[var(--background)] py-2 z-10">
              {letra}
            </h2>

            <div className="grid gap-3">
              {itensPorLetra[letra].map((item) => (
                <Link
                  key={`${item.categoria}-${item.slug}`}
                  href={obterLinkCategoria(item.categoria, item.slug)}
                  className={`block p-4 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition-all group ${
                    coresBgCategoria[item.categoria]
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                        {item.nome}
                      </h3>
                    </div>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ml-2 ${
                        coresTextCategoria[item.categoria]
                      } ${coresBgCategoria[item.categoria]}`}
                    >
                      {labelCategoria[item.categoria]}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Estatísticas */}
      <div className="mt-12 p-6 bg-[var(--card-bg)] rounded-lg border border-[var(--border)]">
        <h3 className="font-semibold text-[var(--foreground)] mb-3">Estatísticas</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-[var(--muted)]">Concílios</span>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{concilios.length}</p>
          </div>
          <div>
            <span className="text-[var(--muted)]">Heresias</span>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{heresias.length}</p>
          </div>
          <div>
            <span className="text-[var(--muted)]">Tópicos de Apologética</span>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{temas.length}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
