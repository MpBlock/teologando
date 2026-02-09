"use client";

import Link from "next/link";
import ShareButtons from "./ShareButtons";
import RelatedTopics from "./RelatedTopics";
import CopiarCitacao from "./CopiarCitacao";
import { obterTopicosRelacionados } from "@/data/topicosRelacionados";

type Props = {
  concilio: {
    slug: string;
    nome: string;
    ano: number;
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

export default function ConcilioModal({ concilio, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white text-zinc-900 shadow-xl dark:bg-zinc-900 dark:text-zinc-100 max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-zinc-700 px-6 py-4 sticky top-0 bg-white dark:bg-zinc-900">
          <h2 className="text-xl font-semibold">
            {concilio.nome}
            <span className="ml-2 text-sm text-gray-500 dark:text-zinc-400">
              ({concilio.ano})
            </span>
          </h2>

          <button onClick={onClose} className="text-gray-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition">✕</button>
        </div>

        {/* Compartilhamento */}
        <div className="px-6 pt-6 space-y-3">
          <ShareButtons 
            titulo={concilio.nome}
            textoCustomizado={`Saiba mais sobre o ${concilio.nome} em Teologando`}
          />
          <CopiarCitacao 
            titulo={concilio.nome}
            slug={concilio.slug}
            categoria="concilios"
          />
        </div>

        {/* Conteúdo */}
        <div className="px-6 py-4 space-y-2">
          <p className="text-sm text-gray-600 dark:text-zinc-400 mb-4">Temas abordados:</p>
          {concilio.temasAbordados.map((tema) => {
            const temaSlug = slugify(tema);

            return (
              <Link
                key={temaSlug}
                href={`/concilios/${concilio.slug}/${temaSlug}`}
                onClick={onClose}
                className="block rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm hover:bg-gray-100 transition dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
              >
                {tema}
              </Link>
            );
          })}

          <Link href={`/concilios/${concilio.slug}`} onClick={onClose} className="mt-4 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400">
            Ver concílio completo →
          </Link>

          {/* Tópicos Relacionados */}
          <div className="mt-6">
            <RelatedTopics topics={obterTopicosRelacionados("concilios", concilio.slug)} />
          </div>
        </div>

        {/* Rodapé */}
        <div className="border-t border-gray-200 dark:border-zinc-700 px-6 py-3 text-right sticky bottom-0 bg-white dark:bg-zinc-900">
          <button onClick={onClose} className="text-sm text-gray-600 hover:text-black dark:text-zinc-400 dark:hover:text-zinc-200 transition">Fechar</button>
        </div>
      </div>
    </div>
  );
}
