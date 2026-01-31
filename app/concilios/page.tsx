"use client";

import { useState } from "react";
import { concilios } from "@/data/concilios";
import ConcilioModal from "@/components/ConcilioModal";

export default function ConciliosPage() {
  const [concilioSelecionado, setConcilioSelecionado] =
    useState<(typeof concilios)[0] | null>(null);

  function abrirPopup(slug: string) {
    const concilio = concilios.find(c => c.slug === slug);
    if (concilio) setConcilioSelecionado(concilio);
  }

  return (
    <main className="max-w-4xl mx-auto p-8 space-y-12">
      <header>
        <h1 className="text-3xl font-bold">Concílios da Igreja</h1>
        <p className="text-zinc-400 mt-2">
          Principais concílios ecumênicos organizados por período histórico
        </p>
      </header>

      {/* Igreja Antiga */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Concílios da Igreja Antiga
        </h2>

        <ul className="space-y-2">
          {[
            ["I Concílio de Niceia", "325", "niceia-325"],
            ["I Concílio de Constantinopla", "381", "constantinopla-381"],
            ["Concílio de Éfeso", "431", "efeso-431"],
            ["Concílio de Calcedônia", "451", "calcedonia-451"],
            ["II Concílio de Constantinopla", "553", "constantinopla-553"],
            ["III Concílio de Constantinopla", "680–681", "constantinopla-680"],
            ["II Concílio de Niceia", "787", "niceia-787"],
          ].map(([nome, ano, slug]) => (
            <li key={slug}>
              <button
                onClick={() => abrirPopup(slug)}
                className="w-full text-left rounded-md px-4 py-2 hover:bg-zinc-800 transition"
              >
                <span className="font-medium">{nome}</span>{" "}
                <span className="text-zinc-400">– {ano}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {concilioSelecionado && (
        <ConcilioModal
          concilio={concilioSelecionado}
          onClose={() => setConcilioSelecionado(null)}
        />
      )}
    </main>
  );
}
