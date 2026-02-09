"use client";

import Link from "next/link";
import ShareButtons from "./ShareButtons";

type Props = {
  apologetica: {
    slug: string;
    nome: string;
    descricao: string;
    argumentosCristos: string[];
    paisDaIgreja: Array<{
      nome: string;
      citacao: string;
      periodo: string;
    }>;
    cuneilios: Array<{
      nome: string;
      posicao: string;
      relevancia: string;
    }>;
    resposta: string;
    referencias: string[];
  };
  onClose: () => void;
};

export default function ApologeticaModal({ apologetica, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white text-zinc-900 shadow-xl dark:bg-zinc-900 dark:text-zinc-100 max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-zinc-700 px-6 py-4 sticky top-0 bg-white dark:bg-zinc-900">
          <h2 className="text-2xl font-semibold">{apologetica.nome}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition">✕</button>
        </div>

        {/* Compartilhamento */}
        <div className="px-6 pt-6">
          <ShareButtons 
            titulo={apologetica.nome}
            textoCustomizado={`Defenda a fé com argumentos teológicos sobre ${apologetica.nome} em Teologando`}
          />
        </div>

        {/* Conteúdo */}
        <div className="px-6 py-4 space-y-6">
          
          {/* Descrição */}
          <div>
            <p className="text-gray-700 dark:text-gray-300">{apologetica.descricao}</p>
          </div>

          {/* Argumentos Cristãos */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">📖 Argumentos Bíblicos</h3>
            <ul className="space-y-2">
              {apologetica.argumentosCristos.map((arg, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{arg}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pais da Igreja */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-purple-600 dark:text-purple-400">⛪ O que os Pais da Igreja Disseram</h3>
            <div className="space-y-3">
              {apologetica.paisDaIgreja.map((pai, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg border border-gray-200 dark:border-zinc-700">
                  <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                    {pai.nome} <span className="text-xs text-gray-500">({pai.periodo})</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">"{pai.citacao}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Concílios */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-green-600 dark:text-green-400">📜 O que os Concílios Declararam</h3>
            <div className="space-y-3">
              {apologetica.cuneilios.map((concilio, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg border border-gray-200 dark:border-zinc-700">
                  <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">{concilio.nome}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1"><strong>Posição:</strong> {concilio.posicao}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Relevância:</strong> {concilio.relevancia}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resposta */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-red-600 dark:text-red-400">✝️ A Verdade Bíblica</h3>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <p className="text-sm text-gray-700 dark:text-gray-300">{apologetica.resposta}</p>
            </div>
          </div>

          {/* Referências */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-orange-600 dark:text-orange-400">📚 Referências Bíblicas</h3>
            <div className="flex flex-wrap gap-2">
              {apologetica.referencias.map((ref, idx) => (
                <span key={idx} className="text-xs bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
                  {ref}
                </span>
              ))}
            </div>
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
