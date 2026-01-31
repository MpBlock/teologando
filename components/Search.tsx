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
    <div className="max-w-xl">
      <input
        type="text"
        placeholder="Buscar concílio, tema ou doutrina..."
        className="w-full border rounded-md p-3 mb-4"
        onChange={(e) => buscar(e.target.value)}
      />

      {loading && (
        <p className="text-sm text-gray-500">Buscando...</p>
      )}

      <ul className="space-y-3">
        {resultados.map((c) => (
          <li
            key={c.id}
            className="border rounded-md p-4 hover:bg-gray-50"
          >
            <Link href={`/concilios/${c.slug}`}>
              <strong>{c.nome}</strong> ({c.ano})
              <p className="text-sm text-gray-600">{c.resumo}</p>
              <span className="text-xs text-gray-500">
                Tema: {c.tema}
              </span>
            </Link>
          </li>
        ))}

        {query && resultados.length === 0 && !loading && (
          <li className="text-gray-500">
            Nenhum resultado encontrado.
          </li>
        )}
      </ul>
    </div>
  );
}
