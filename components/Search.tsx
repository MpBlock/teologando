"use client";

import { useState } from "react";
import Link from "next/link";

type Resultado = {
  id: number;
  slug: string;
  nome: string;
  ano: number;
  tema: string;
  resumo: string;
};



export default function Search() {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [loading, setLoading] = useState(false);

  async function buscar(valor: string) {
    setQuery(valor);

    if (!valor) {
      setResultados([]);
      return;
    }

    setLoading(true);
    const res = await fetch(`/api/search?q=${valor}`);
    const data = await res.json();
    setResultados(data);
    setLoading(false);
  }

  return (
    <div className="max-w-2xl w-full">
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Buscar concílio, tema ou doutrina..."
          className="w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-5 py-4 text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all duraton-200"
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

      {loading && (
        <p className="text-sm text-[var(--muted)] animate-pulse">Buscando...</p>
      )}

      <ul className="space-y-3">
        {resultados.map((c) => (
          <li
            key={c.id}
            className="group bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-5 hover:border-[var(--accent)] hover:shadow-md transition-all duration-200"
          >
            <Link href={`/concilios/${c.slug}`} className="block">
              <div className="flex items-start justify-between mb-2">
                <strong className="text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">{c.nome}</strong>
                <span className="text-xs font-medium text-[var(--accent)] bg-[var(--accent)] bg-opacity-10 px-3 py-1 rounded-full">
                  {c.ano}
                </span>
              </div>
              <p className="text-sm text-[var(--muted)] mb-2 leading-relaxed">{c.resumo}</p>
              <span className="text-xs text-[var(--muted)] font-medium">
                Tema: <span className="text-[var(--accent)]">{c.tema}</span>
              </span>
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
