"use client";

import { useState } from "react";
import ShareButtons from "./ShareButtons";

type Props = {
  temaGroup: {
    slug: string;
    nome: string;
    descricao: string;
    temasAbordados: string[];
    paisDaIgreja?: Array<{
      nome: string;
      citacao: string;
      contexto: string;
    }>;
    concilios?: Array<{
      nome: string;
      decisao: string;
      consequencia: string;
    }>;
    evidenciasBiblicas?: string[];
  };
  onClose: () => void;
};

export default function TemaModal({ temaGroup, onClose }: Props) {
  const [abaAtiva, setAbaAtiva] = useState<"visao-geral" | "pais" | "concilios" | "biblicas">("visao-geral");

  const abas = [
    { id: "visao-geral", label: "Perspectiva Protestante" },
    ...(temaGroup.paisDaIgreja && temaGroup.paisDaIgreja.length > 0 ? [{ id: "pais", label: "Pais da Igreja" }] : []),
    ...(temaGroup.concilios && temaGroup.concilios.length > 0 ? [{ id: "concilios", label: "Concílios" }] : []),
    ...(temaGroup.evidenciasBiblicas && temaGroup.evidenciasBiblicas.length > 0 ? [{ id: "biblicas", label: "Evidências Bíblicas" }] : []),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800 px-6 py-6 border-b border-blue-600/20">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{temaGroup.nome}</h2>
              <p className="text-blue-100 text-sm">Defesa protestante</p>
            </div>
            <button 
              onClick={onClose} 
              className="flex-shrink-0 text-white hover:bg-white/20 p-2 rounded-lg transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Compartilhamento */}
        <div className="px-6 pt-6">
          <ShareButtons 
            titulo={temaGroup.nome}
            textoCustomizado={`Defesa protestante contra ${temaGroup.nome}`}
          />
        </div>

        {/* Abas */}
        <div className="border-b border-gray-200 dark:border-zinc-700 px-6 mt-6">
          <div className="flex gap-2 overflow-x-auto">
            {abas.map((aba: any) => (
              <button
                key={aba.id}
                onClick={() => setAbaAtiva(aba.id)}
                className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                  abaAtiva === aba.id
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                }`}
              >
                {aba.label}
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="px-6 py-6 space-y-6">
          {/* Visão Geral */}
          {abaAtiva === "visao-geral" && (
            <div className="space-y-6">
              {temaGroup.descricao && (
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Perspectiva Protestante</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {temaGroup.descricao}
                  </p>
                </div>
              )}

              {temaGroup.temasAbordados && temaGroup.temasAbordados.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Pontos Principais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {temaGroup.temasAbordados.map((tema, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 dark:bg-blue-400 flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{tema}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Pais da Igreja */}
          {abaAtiva === "pais" && temaGroup.paisDaIgreja && (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Respaldo dos Pais da Igreja</h3>
              {temaGroup.paisDaIgreja.map((pai, i) => (
                <div key={i} className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {pai.nome}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 italic mb-2 border-b border-gray-200 dark:border-gray-700 pb-2">
                    "{pai.citacao}"
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Contexto:</span> {pai.contexto}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Concílios */}
          {abaAtiva === "concilios" && temaGroup.concilios && (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Concílios Relevantes</h3>
              {temaGroup.concilios.map((concilio, i) => (
                <div key={i} className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-900 dark:text-amber-200 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                      <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" clipRule="evenodd" />
                    </svg>
                    {concilio.nome}
                  </h4>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">Decisão:</span> {concilio.decisao}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">Consequência:</span> {concilio.consequencia}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Evidências Bíblicas */}
          {abaAtiva === "biblicas" && temaGroup.evidenciasBiblicas && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Evidências Bíblicas</h3>
              {temaGroup.evidenciasBiblicas.map((evidencia, i) => (
                <div key={i} className="flex gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 dark:bg-purple-400 flex items-center justify-center mt-0.5 text-white text-xs font-bold">
                    ✦
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{evidencia}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-gray-200 dark:border-zinc-700 px-6 py-4 bg-gray-50 dark:bg-zinc-800/50 flex justify-end">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-lg transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
