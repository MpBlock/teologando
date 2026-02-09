"use client";

import { useState, useMemo } from "react";
import { temas } from "@/data/temas";
import TemaModal from "@/components/TemaModal";
import Filters from "@/components/Filters";

export default function TemasPageContent() {
  const [selecionado, setSelecionado] = useState<(typeof temas)[0] | null>(null);
  const [busca, setBusca] = useState("");

  const categoriasOpcoes = [
    { id: "cristologia", label: "Cristologia", checked: false },
    { id: "trindade", label: "Trindade", checked: false },
    { id: "salvacao", label: "Salvação", checked: false },
    { id: "escatologia", label: "Escatologia", checked: false },
    { id: "ecclesiologia", label: "Eclesiologia", checked: false },
  ];

  const temasFiltrados = useMemo(() => {
    const buscaLower = busca.toLowerCase();
    return temas.filter(t => 
      !busca || 
      t.nome.toLowerCase().includes(buscaLower) ||
      t.descricao.toLowerCase().includes(buscaLower) ||
      t.temasAbordados.some(tema => tema.toLowerCase().includes(buscaLower))
    );
  }, [busca]);

  function abrir(slug: string) {
    const t = temas.find(x => x.slug === slug);
    if (t) setSelecionado(t);
  }

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">
      <header>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Temas da Teologia Cristã
        </h1>
        <p className="text-[var(--muted)] text-lg">
          Explore os principais tópicos da teologia sistemática cristã
        </p>
      </header>

      {/* Busca */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar por tema ou conceito..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-5 py-4 text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filtros */}
        <aside className="lg:col-span-1">
          <Filters
            title="Categorias"
            options={categoriasOpcoes}
            onChange={() => {}}
          />
        </aside>

        {/* Lista de Temas */}
        <div className="lg:col-span-3">
          {temasFiltrados.length > 0 ? (
            <div className="space-y-3">
              {temasFiltrados.map(t => (
                <button
                  key={t.slug}
                  onClick={() => abrir(t.slug)}
                  className="w-full text-left bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--accent)] hover:shadow-lg transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                        {t.nome}
                      </h3>
                      <p className="text-sm text-[var(--muted)] mt-2">
                        {t.descricao}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                        {t.temasAbordados.length} subtemas
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {t.temasAbordados.slice(0, 3).map((tema, idx) => (
                      <span key={idx} className="text-xs bg-[var(--border)] text-[var(--muted)] px-2 py-1 rounded">
                        {tema}
                      </span>
                    ))}
                    {t.temasAbordados.length > 3 && (
                      <span className="text-xs text-[var(--muted)]">
                        +{t.temasAbordados.length - 3} mais
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[var(--card-bg)] rounded-xl border border-[var(--border)]">
              <p className="text-[var(--muted)] text-lg">
                Nenhum tema encontrado com os filtros aplicados
              </p>
            </div>
          )}

          <p className="text-sm text-[var(--muted)] mt-6">
            Mostrando {temasFiltrados.length} de {temas.length} temas
          </p>
        </div>
      </div>

      {selecionado && <TemaModal temaGroup={selecionado} onClose={() => setSelecionado(null)} />}
    </main>
  );
}
