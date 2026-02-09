"use client";

import { useState } from "react";

type CopiarCitacaoProps = {
  titulo: string;
  slug: string;
  categoria: "concilios" | "heresias" | "temas";
};

export default function CopiarCitacao({ titulo, slug, categoria }: CopiarCitacaoProps) {
  const [copiado, setCopiado] = useState(false);
  const [formato, setFormato] = useState<"apa" | "chicago">("apa");

  const url = `https://teologando.com/${categoria}/${slug}`;
  const dataAtual = new Date().toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const citacoes = {
    apa: `${titulo}. Teologando. Recuperado de ${url}. Acessado em ${dataAtual}`,
    chicago: `"${titulo}." Teologando. Acessado em ${dataAtual}. ${url}.`,
  };

  function copiar() {
    navigator.clipboard.writeText(citacoes[formato]);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <select
        value={formato}
        onChange={(e) => setFormato(e.target.value as "apa" | "chicago")}
        className="text-xs font-medium bg-transparent border border-blue-300 dark:border-blue-700 rounded px-2 py-1 text-blue-700 dark:text-blue-400"
      >
        <option value="apa">APA</option>
        <option value="chicago">Chicago</option>
      </select>

      <code className="text-xs text-blue-900 dark:text-blue-100 flex-1 overflow-x-auto">
        {citacoes[formato]}
      </code>

      <button
        onClick={copiar}
        className="flex-shrink-0 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors"
        title="Copiar citação"
      >
        {copiado ? "✓ Copiado!" : "Copiar"}
      </button>
    </div>
  );
}
