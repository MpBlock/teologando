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
                  className="w-full text-left bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--accent)] hover:shadow-lg transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-lg text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                        {concilio.nome}
                      </h3>
                      <p className="text-sm text-[var(--muted)] mt-1">
                        {getPeriodo(concilio.ano).charAt(0).toUpperCase() + getPeriodo(concilio.ano).slice(1)} • {concilio.ano}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1 rounded-full text-xs font-medium">
                        {concilio.temasAbordados.length} temas
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {concilio.temasAbordados.slice(0, 3).map((tema, idx) => (
                      <span key={idx} className="text-xs bg-[var(--border)] text-[var(--muted)] px-2 py-1 rounded">
                        {tema}
                      </span>
                    ))}
                    {concilio.temasAbordados.length > 3 && (
                      <span className="text-xs text-[var(--muted)]">
                        +{concilio.temasAbordados.length - 3} mais
                      </span>
                    )}
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
