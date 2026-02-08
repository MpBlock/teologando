"use client";

import { useState } from "react";
import { heresias } from "@/data/heresias";
import HeresiaModal from "@/components/HeresiaModal";

export default function HeresiasPage() {
  const [heresiaSelecionada, setHeresiaSelecionada] = useState<(typeof heresias)[0] | null>(null);

  function abrirPopup(slug: string) {
    const h = heresias.find(h => h.slug === slug);
    if (h) setHeresiaSelecionada(h);
  }

  return (
    <main className="max-w-4xl mx-auto p-8 space-y-12">
      <header>
        <h1 className="text-3xl font-bold">Heresias na História da Igreja</h1>
        <p className="text-zinc-400 mt-2">Principais heresias e controvérsias organizadas por período histórico</p>
      </header>

      <section>
        <ul className="space-y-2">
          {heresias.map((h) => (
            <li key={h.slug}>
              <button onClick={() => abrirPopup(h.slug)} className="w-full text-left rounded-md px-4 py-2 hover:bg-zinc-800 transition">
                <span className="font-medium">{h.nome}</span>
                <span className="text-zinc-400"> – {h.periodo}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {heresiaSelecionada && (
        <HeresiaModal heresia={heresiaSelecionada} onClose={() => setHeresiaSelecionada(null)} />
      )}
    </main>
  );
}
