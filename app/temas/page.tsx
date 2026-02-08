"use client";

import { useState } from "react";
import { temas } from "@/data/temas";
import TemaModal from "@/components/TemaModal";

export default function TemasPage() {
  const [selecionado, setSelecionado] = useState<(typeof temas)[0] | null>(null);

  function abrir(slug: string) {
    const t = temas.find(x => x.slug === slug);
    if (t) setSelecionado(t);
  }

  return (
    <main className="max-w-4xl mx-auto p-8 space-y-12">
      <header>
        <h1 className="text-3xl font-bold">Temas Centrais da Teologia Cristã</h1>
        <p className="text-zinc-400 mt-2">Temas frequentemente tratados em teologia sistemática</p>
      </header>

      <section>
        <ul className="space-y-2">
          {temas.map(t => (
            <li key={t.slug}>
              <button onClick={() => abrir(t.slug)} className="w-full text-left rounded-md px-4 py-2 hover:bg-zinc-800 transition">
                <span className="font-medium">{t.nome}</span>
                <span className="text-zinc-400"> – {t.descricao}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {selecionado && <TemaModal temaGroup={selecionado} onClose={() => setSelecionado(null)} />}
    </main>
  );
}
