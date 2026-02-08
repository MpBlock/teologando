"use client";

import Link from "next/link";

type Props = {
  heresia: {
    slug: string;
    nome: string;
    periodo: string;
    temasAbordados: string[];
  };
  onClose: () => void;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[[\u0300-\u036f]]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function HeresiaModal({ heresia, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 text-zinc-100 shadow-xl">

        <div className="flex items-center justify-between border-b border-zinc-700 px-6 py-4">
          <h2 className="text-xl font-semibold">
            {heresia.nome}
            <span className="ml-2 text-sm text-zinc-400">({heresia.periodo})</span>
          </h2>

          <button onClick={onClose} className="text-zinc-400 hover:text-white transition">✕</button>
        </div>

        <div className="p-6 space-y-2">
          {heresia.temasAbordados.map((tema) => {
            const temaSlug = slugify(tema);

            return (
              <Link
                key={temaSlug}
                href={`/heresias/${heresia.slug}/${temaSlug}`}
                onClick={onClose}
                className="block rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm hover:bg-zinc-700 transition"
              >
                {tema}
              </Link>
            );
          })}

          <Link href={`/heresias/${heresia.slug}`} onClick={onClose} className="mt-4 inline-block text-sm text-blue-400 hover:underline">
            Ver heresia completa →
          </Link>
        </div>

        <div className="border-t border-zinc-700 px-6 py-3 text-right">
          <button onClick={onClose} className="text-sm text-zinc-400 hover:text-zinc-200 transition">Fechar</button>
        </div>
      </div>
    </div>
  );
}
