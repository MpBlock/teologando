"use client";

import { useState, useMemo } from "react";
import { heresias } from "@/data/heresias";
import HeresiaModal from "@/components/HeresiaModal";
import Filters from "@/components/Filters";

export default function HeresiasPage() {
  const [heresiaSelecionada, setHeresiaSelecionada] = useState<(typeof heresias)[0] | null>(null);
  const [filtrosPeriodo, setFiltrosPeriodo] = useState<string[]>([]);
  const [busca, setBusca] = useState("");

  const periodosOpcoes = [
    { id: "primitiva", label: "Igreja Primitiva (séc. I-IV)", checked: false },
    { id: "antigua", label: "Igreja Antiga (séc. V-VIII)", checked: false },
    { id: "medieval", label: "Igreja Medieval (séc. IX-XV)", checked: false },
    { id: "moderna", label: "Igreja Moderna (séc. XVI+)", checked: false },
  ];

  const getPeriodo = (period: string): string => {
    if (period.includes("I") || period.includes("II") || period.includes("III") || period.includes("IV") && !period.includes("V")) {
      if (period.includes("IV") && period.includes("V")) return "medieval";
      return "primitiva";
    }
    if (period.includes("V") || period.includes("VI") || period.includes("VII") || period.includes("VIII")) return "antigua";
    if (period.includes("IX") || period.includes("X") || period.includes("XI") || period.includes("XII") || period.includes("XIII") || period.includes("XIV") || period.includes("XV")) return "medieval";
    return "moderna";
  };

  const heresiasFiltrads = useMemo(() => {
    return heresias.filter(heresia => {
      const buscaLower = busca.toLowerCase();
      const temBusca = !busca || 
        heresia.nome.toLowerCase().includes(buscaLower) ||
        heresia.temasAbordados.some(t => t.toLowerCase().includes(buscaLower));

      const periodoHeresia = getPeriodo(heresia.periodo);
      const temPeriodo = filtrosPeriodo.length === 0 || 
        filtrosPeriodo.includes(periodoHeresia);

      return temBusca && temPeriodo;
    });
  }, [busca, filtrosPeriodo]);

  function abrirPopup(slug: string) {
    const h = heresias.find(h => h.slug === slug);
    if (h) setHeresiaSelecionada(h);
  }

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">
      <header>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Heresias Históricas
        </h1>
        <p className="text-[var(--muted)] text-lg">
          Principais heresias e controvérsias que moldaram a teologia cristã
        </p>
      </header>

      {/* Busca */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar por nome ou tema..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-5 py-4 text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filtros */}
        <aside className="lg:col-span-1">
          <Filters
            title="Período"
            options={periodosOpcoes}
            onChange={setFiltrosPeriodo}
          />
        </aside>

        {/* Lista de Heresias */}
        <div className="lg:col-span-3">
          {heresiasFiltrads.length > 0 ? (
            <div className="space-y-3">
              {heresiasFiltrads.map(heresia => (
                <button
                  key={heresia.slug}
                  onClick={() => abrirPopup(heresia.slug)}
                  className="w-full text-left bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--accent)] hover:shadow-lg transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-lg text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                        {heresia.nome}
                      </h3>
                      <p className="text-sm text-[var(--muted)] mt-1">
                        {heresia.periodo}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-xs font-medium">
                        Condenada
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {heresia.temasAbordados.map((tema, idx) => (
                      <span key={idx} className="text-xs bg-[var(--border)] text-[var(--muted)] px-2 py-1 rounded">
                        {tema}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[var(--card-bg)] rounded-xl border border-[var(--border)]">
              <p className="text-[var(--muted)] text-lg">
                Nenhuma heresia encontrada com os filtros aplicados
              </p>
            </div>
          )}

          <p className="text-sm text-[var(--muted)] mt-6">
            Mostrando {heresiasFiltrads.length} de {heresias.length} heresias
          </p>
        </div>
      </div>

      {heresiaSelecionada && (
        <HeresiaModal heresia={heresiaSelecionada} onClose={() => setHeresiaSelecionada(null)} />
      )}
    </main>
  );
}
