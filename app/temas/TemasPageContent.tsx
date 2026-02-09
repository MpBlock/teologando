"use client";

import { useState, useMemo } from "react";
import { temas } from "@/data/temas";
import { apologeticaDetalhada } from "@/data/apologeticaDetalhada";
import TemaModal from "@/components/TemaModal";
import Filters from "@/components/Filters";

type TemaSelecionado = (typeof temas)[0] & {
  descricao?: string;
  paisDaIgreja?: Array<{ nome: string; citacao: string; contexto: string }>;
  concilios?: Array<{ nome: string; decisao: string; consequencia: string }>;
  evidenciasBiblicas?: string[];
};

export default function TemasPageContent() {
  const [selecionado, setSelecionado] = useState<TemaSelecionado | null>(null);
  const [busca, setBusca] = useState("");

  const categoriasOpcoes = [
    { id: "doutrina-catolica", label: "Doutrina Católica", checked: false },
    { id: "protestante-perspectiva", label: "Perspectiva Protestante", checked: false },
    { id: "autoridade-escritura", label: "Autoridade da Escritura", checked: false },
    { id: "sacramento-graca", label: "Sacramento e Graça", checked: false },
    { id: "autoridade-papal", label: "Autoridade Papal", checked: false },
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
    const tDetalhado = apologeticaDetalhada.find(td => td.slug === slug);
    
    if (t) {
      const temaMerged = {
        ...t,
        descricao: tDetalhado?.descricao || t.temasAbordados.join(", "),
        paisDaIgreja: tDetalhado?.paisDaIgreja,
        concilios: tDetalhado?.concilios,
        evidenciasBiblicas: tDetalhado?.evidenciasBiblicas,
      };
      setSelecionado(temaMerged);
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">
      <header>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Apologética Protestante
        </h1>
        <p className="text-[var(--muted)] text-lg">
          Defesa da fé protestante contra doutrinas católicas
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
            title="Temas"
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
                      <span className="inline-block bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                        Apologética
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {t.temasAbordados.map((tema, idx) => (
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
                Nenhum tópico encontrado com os filtros aplicados
              </p>
            </div>
          )}

          <p className="text-sm text-[var(--muted)] mt-6">
            Mostrando {temasFiltrados.length} de {temas.length} tópicos
          </p>
        </div>
      </div>

      {selecionado && <TemaModal temaGroup={selecionado} onClose={() => setSelecionado(null)} />}
    </main>
  );
}
