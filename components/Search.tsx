"use client";

import { useState } from "react";
import Link from "next/link";

type Resultado = {
  id: number;
  slug: string;
  nome: string;
  categoria: "concilios" | "heresias" | "temas";
  temasAbordados: string[];
  descricao?: string;
  ano?: number;
  periodo?: string;
  link: string;
};

export default function Search() {
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("");
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [loading, setLoading] = useState(false);

  async function buscar(valor: string, cat: string = categoria) {
    setQuery(valor);

    if (!valor) {
      setResultados([]);
      return;
    }

    setLoading(true);
    const params = new URLSearchParams({ q: valor });
    if (cat) params.append("categoria", cat);
    
    const res = await fetch(`/api/search?${params}`);
    const data = await res.json();
    setResultados(data);
    setLoading(false);
  }

  function handleFiltro(novaCategoria: string) {
    setCategoria(novaCategoria);
    buscar(query, novaCategoria);
  }

  const categoriaLabels = {
    "": "Tudo",
    "concilios": "Concílios",
    "heresias": "Heresias",
    "temas": "Apologética",
  };

  const categoriaColors = {
    "concilios": "from-blue-500 to-blue-600",
    "heresias": "from-red-500 to-red-600",
    "temas": "from-purple-500 to-purple-600",
  };

  return (
    <div className="max-w-2xl w-full">
      {/* Input de Busca */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Buscar concílio, tema ou doutrina..."
          className="w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-5 py-4 text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all duration-200"
          onChange={(e) => buscar(e.target.value)}
        />
        <svg
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--muted)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Filtros de Categoria */}
      {query && (
        <div className="flex gap-2 mb-6 flex-wrap">
          {Object.entries(categoriaLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleFiltro(key)}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-all ${
                categoria === key
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--border)] text-[var(--foreground)] hover:bg-[var(--accent)]/20"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <p className="text-sm text-[var(--muted)] animate-pulse">Buscando...</p>
      )}

      <ul className="space-y-3">
        {resultados.map((item) => (
          <li
            key={`${item.categoria}-${item.id}`}
            className="group bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-5 hover:border-[var(--accent)] hover:shadow-md transition-all duration-200"
          >
            <Link href={item.link} className="block">
              <div className="flex items-start justify-between mb-2">
                <strong className="text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  {item.nome}
                </strong>
                <span className={`text-xs font-medium text-white bg-gradient-to-r ${categoriaColors[item.categoria]} px-3 py-1 rounded-full`}>
                  {categoriaLabels[item.categoria]}
                </span>
              </div>
              {item.descricao && (
                <p className="text-sm text-[var(--muted)] mb-2 leading-relaxed line-clamp-2">
                  {item.descricao}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {item.temasAbordados.slice(0, 3).map((tema, idx) => (
                  <span key={idx} className="text-xs text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-1 rounded">
                    {tema}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}

        {query && resultados.length === 0 && !loading && (
          <li className="text-center py-8 text-[var(--muted)]">
            Nenhum resultado encontrado.
          </li>
        )}
      </ul>
    </div>
  );
}
