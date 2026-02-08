"use client";

import Link from "next/link";

type Props = {
  temaGroup: {
    slug: string;
    nome: string;
    descricao: string;
    temasAbordados: string[];
  };
  onClose: () => void;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function TemaModal({ temaGroup, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white text-zinc-900 shadow-xl dark:bg-zinc-900 dark:text-zinc-100">

        <div className="flex items-center justify-between border-b border-gray-200 dark:border-zinc-700 px-6 py-4">
          <h2 className="text-xl font-semibold">
            {temaGroup.nome}
            <span className="ml-2 text-sm text-gray-500 dark:text-zinc-400">{temaGroup.descricao}</span>
          </h2>

          <button onClick={onClose} className="text-gray-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition">✕</button>
        </div>

        <div className="p-6 space-y-2">
          {temaGroup.temasAbordados.map((t) => {
            const temaSlug = slugify(t);

            return (
              <Link
                key={temaSlug}
                href={`/temas/${temaGroup.slug}/${temaSlug}`}
                onClick={onClose}
                className="block rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm hover:bg-gray-100 transition dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
              >
                {t}
              </Link>
            );
          })}

          <Link href={`/temas/${temaGroup.slug}`} onClick={onClose} className="mt-4 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400">
            Ver tema completo →
          </Link>
        </div>

        <div className="border-t border-gray-200 dark:border-zinc-700 px-6 py-3 text-right">
          <button onClick={onClose} className="text-sm text-gray-600 hover:text-black dark:text-zinc-400 dark:hover:text-zinc-200 transition">Fechar</button>
        </div>
      </div>
    </div>
  );
}
