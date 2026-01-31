"use client";

import Link from "next/link";

type Props = {
  concilio: {
    slug: string;
    nome: string;
    ano: number;
    temasAbordados: string[];
  };
  onClose: () => void;
};

export default function ConcilioModal({ concilio, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 text-zinc-100 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-700 px-6 py-4">
          <h2 className="text-xl font-semibold">
            {concilio.nome}
            <span className="ml-2 text-sm text-zinc-400">
              ({concilio.ano})
            </span>
          </h2>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 space-y-2">
          {concilio.temasAbordados.map((tema, index) => (
            <div
              key={index}
              className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm"
            >
              {tema}
            </div>
          ))}

          <Link
            href={`/concilios/${concilio.slug}`}
            onClick={onClose}
            className="mt-4 inline-block text-sm text-blue-400 hover:underline"
          >
            Ver concílio completo →
          </Link>
        </div>

        {/* Rodapé */}
        <div className="border-t border-zinc-700 px-6 py-3 text-right">
          <button
            onClick={onClose}
            className="text-sm text-zinc-400 hover:text-zinc-200 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
