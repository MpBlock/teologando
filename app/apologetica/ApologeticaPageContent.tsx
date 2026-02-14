"use client";

import { useState, useMemo } from "react";
import { apologetica } from "@/data/apologetica";
import ApologeticaModal from "@/components/ApologeticaModal";
import Filters from "@/components/Filters";
import CommentsSection from "@/components/CommentsSection";

export default function ApologeticaPageContent() {
  const [selecionado, setSelecionado] = useState<(typeof apologetica)[0] | null>(null);
  const [busca, setBusca] = useState("");

  const topicosOpcoes = [
    { id: "maria", label: "Tema: Maria", checked: false },
    { id: "salvacao", label: "Tema: Salvação", checked: false },
    { id: "mediacao", label: "Tema: Mediação", checked: false },
    { id: "adoracao", label: "Tema: Adoração", checked: false },
    { id: "santos", label: "Tema: Santos", checked: false },
  ];

  const apologeticaFiltrada = useMemo(() => {
    const buscaLower = busca.toLowerCase();
    return apologetica.filter(item => 
      !busca || 
      item.nome.toLowerCase().includes(buscaLower) ||
      item.descricao.toLowerCase().includes(buscaLower) ||
      item.argumentosCristos.some(arg => arg.toLowerCase().includes(buscaLower))
    );
  }, [busca]);

  function abrir(slug: string) {
    const item = apologetica.find(x => x.slug === slug);
    if (item) setSelecionado(item);
  }

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">
      <header>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          🛡️ Apologética Cristã
        </h1>
        <p className="text-[var(--muted)] text-lg max-w-3xl">
          Defenda a fé protestante contra erros católicos romanos. Aqui você encontrará argumentos bíblicos sólidos,
          testemunhos dos Pais da Igreja primitiva, e decisões dos concílios ecuménicos que refutam doutrinas não-bíblicas.
        </p>
      </header>

      {/* Busca */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar tópico de apologética..."
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
            options={topicosOpcoes}
            onChange={() => {}}
          />
        </aside>

        {/* Lista de Tópicos */}
        <div className="lg:col-span-3">
          {apologeticaFiltrada.length > 0 ? (
            <div className="space-y-3">
              {apologeticaFiltrada.map(item => (
                <button
                  key={item.slug}
                  onClick={() => abrir(item.slug)}
                  className="w-full text-left bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--accent)] hover:shadow-lg transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                        {item.nome}
                      </h3>
                      <p className="text-sm text-[var(--muted)] mt-2">
                        {item.descricao}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                        {item.argumentosCristos.length} argumentos
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2 py-1 rounded">
                      {item.paisDaIgreja.length} Pais da Igreja
                    </span>
                    <span className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-1 rounded">
                      {item.cuneilios.length} Concílios
                    </span>
                    <span className="text-xs bg-orange-500/10 text-orange-600 dark:text-orange-400 px-2 py-1 rounded">
                      {item.referencias.length} Refs.
                    </span>
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
            Mostrando {apologeticaFiltrada.length} de {apologetica.length} tópicos de apologética
          </p>
        </div>
      </div>

      {selecionado && <ApologeticaModal apologetica={selecionado} onClose={() => setSelecionado(null)} />}

      <CommentsSection
        contentId="apologetica-main"
        contentType="heresias"
        contentTitle="Apologética Cristã"
      />
    </main>
  );
}
