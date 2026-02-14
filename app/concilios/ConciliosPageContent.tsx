"use client";

import { useState, useMemo } from "react";
import { concilios } from "@/data/concilios";
import ConcilioModal from "@/components/ConcilioModal";
import Filters from "@/components/Filters";

export default function ConciliosPageContent() {
  const [concilioSelecionado, setConcilioSelecionado] =
    useState<(typeof concilios)[0] | null>(null);
  const [filtrosTemas, setFiltrosTemas] = useState<string[]>([]);
  const [filtrosPeriodo, setFiltrosPeriodo] = useState<string[]>([]);
  const [busca, setBusca] = useState("");

  // Extrair temas únicos
  const temasUnicos = Array.from(
    new Set(concilios.flatMap(c => c.temasAbordados))
  ).sort();

  const periodosOpcoes = [
    { id: "antiga", label: "Igreja Antiga (séc. I-VIII)", checked: false },
    { id: "medieval", label: "Igreja Medieval (séc. IX-XV)", checked: false },
    { id: "moderna", label: "Igreja Moderna (séc. XVI+)", checked: false },
  ];

  // Determinar período baseado no ano
  const getPeriodo = (ano: number): string => {
    if (ano <= 800) return "antiga";
    if (ano <= 1500) return "medieval";
    return "moderna";
  };

  // Filtrar concílios
  const conciliosFiltrados = useMemo(() => {
    return concilios.filter(concilio => {
      const buscaLower = busca.toLowerCase();
      const temBusca = !busca || 
        concilio.nome.toLowerCase().includes(buscaLower) ||
        concilio.temasAbordados.some(t => t.toLowerCase().includes(buscaLower));

      const periodoConcilio = getPeriodo(concilio.ano);
      const temPeriodo = filtrosPeriodo.length === 0 || 
        filtrosPeriodo.includes(periodoConcilio);

      const temTema = filtrosTemas.length === 0 ||
        concilio.temasAbordados.some(t => 
          filtrosTemas.some(f => t.toLowerCase().includes(f.toLowerCase()))
        );

      return temBusca && temPeriodo && temTema;
    });
  }, [busca, filtrosPeriodo, filtrosTemas]);

  function abrirPopup(slug: string) {
    const concilio = concilios.find(c => c.slug === slug);
    if (concilio) setConcilioSelecionado(concilio);
  }

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">
      <header>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Concílios Ecumênicos
        </h1>
        <p className="text-[var(--muted)] text-lg">
          Explore os principais concílios que moldaram a teologia cristã ortodoxa
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

          <Filters
            title="Temas"
            options={temasUnicos.slice(0, 8).map(tema => ({
              id: tema,
              label: tema,
              checked: false,
            }))}
            onChange={setFiltrosTemas}
          />
        </aside>

        {/* Lista de Concílios */}
        <div className="lg:col-span-3">
          {conciliosFiltrados.length > 0 ? (
            <div className="space-y-3">
              {conciliosFiltrados.map(concilio => (
                <button
                  key={concilio.slug}
                  onClick={() => abrirPopup(concilio.slug)}
                  className="w-full text-left relative bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent)] hover:shadow-2xl transition-all transform-gpu hover:-translate-y-0.5 group overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 to-blue-400 rounded-l-xl" />

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 2l3 6 6 .5-4.5 3 1.5 6L12 15l-6 3 1.5-6L3 8.5 9 8z" />
                        </svg>
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-[var(--foreground)] truncate group-hover:text-[var(--accent)] transition-colors">
                        {concilio.nome}
                      </h3>
                      <p className="text-sm text-[var(--muted)] mt-1">
                        {getPeriodo(concilio.ano).charAt(0).toUpperCase() + getPeriodo(concilio.ano).slice(1)} • {concilio.ano}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {concilio.temasAbordados.slice(0, 3).map((tema, idx) => (
                          <span key={idx} className="text-xs bg-[var(--border)]/60 text-[var(--muted)] px-2 py-1 rounded-full">
                            {tema}
                          </span>
                        ))}
                        {concilio.temasAbordados.length > 3 && (
                          <span className="text-xs text-[var(--muted)] flex items-center gap-1">
                            +{concilio.temasAbordados.length - 3} mais
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="ml-4 flex flex-col items-end justify-between">
                      <div className="text-xs text-[var(--muted)]">Temas</div>
                      <div className="mt-1 inline-flex items-center gap-2">
                        <span className="inline-block bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1 rounded-full text-sm font-semibold">
                          {concilio.temasAbordados.length}
                        </span>
                      </div>
                      <div className="mt-3">
                        <div className="px-3 py-1 bg-[var(--card-bg)] border border-[var(--border)] rounded-full text-xs text-[var(--muted)]">
                          {concilio.ano}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[var(--card-bg)] rounded-xl border border-[var(--border)]">
              <p className="text-[var(--muted)] text-lg">
                Nenhum concílio encontrado com os filtros aplicados
              </p>
            </div>
          )}

          <p className="text-sm text-[var(--muted)] mt-6">
            Mostrando {conciliosFiltrados.length} de {concilios.length} concílios
          </p>
        </div>
      </div>

      {concilioSelecionado && (
        <ConcilioModal
          concilio={concilioSelecionado}
          onClose={() => setConcilioSelecionado(null)}
        />
      )}
    </main>
  );
}
