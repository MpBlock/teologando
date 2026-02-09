"use client";

import { useState } from "react";
import ShareButtons from "./ShareButtons";
import RelatedTopics from "./RelatedTopics";
import { obterTopicosRelacionados } from "@/data/topicosRelacionados";

type Props = {
  heresia: {
    slug: string;
    nome: string;
    periodo: string;
    temasAbordados: string[];
    descricao?: string;
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

export default function HeresiaModal({ heresia, onClose }: Props) {
  const [abaAtiva, setAbaAtiva] = useState<"visao-geral" | "pais" | "concilios" | "biblicas">("visao-geral");

  const abas = [
    { id: "visao-geral", label: "Visão Geral" },
    ...(heresia.paisDaIgreja && heresia.paisDaIgreja.length > 0 ? [{ id: "pais", label: "Pais da Igreja" }] : []),
    ...(heresia.concilios && heresia.concilios.length > 0 ? [{ id: "concilios", label: "Concílios" }] : []),
    ...(heresia.evidenciasBiblicas && heresia.evidenciasBiblicas.length > 0 ? [{ id: "biblicas", label: "Evidências Bíblicas" }] : []),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-700 dark:to-red-800 px-6 py-6 border-b border-red-600/20">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{heresia.nome}</h2>
              <p className="text-red-100 text-sm">{heresia.periodo}</p>
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
            titulo={heresia.nome}
            textoCustomizado={`Entenda a heresia de ${heresia.nome} e sua condenação pela Igreja`}
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
                    ? "text-red-600 dark:text-red-400 border-b-2 border-red-600 dark:border-red-400"
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
              {heresia.descricao && (
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Descrição</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {heresia.descricao}
                  </p>
                </div>
              )}

              {heresia.temasAbordados && heresia.temasAbordados.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Características Principais</h3>
                  <div className="grid gap-2">
                    {heresia.temasAbordados.map((tema, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
                      >
                        <span className="text-red-600 dark:text-red-400 mt-1">✕</span>
                        <span className="text-gray-800 dark:text-gray-200">{tema}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Pais da Igreja */}
          {abaAtiva === "pais" && heresia.paisDaIgreja && (
            <div className="space-y-4">
              {heresia.paisDaIgreja.map((pai, idx) => (
                <div key={idx} className="border border-gray-200 dark:border-zinc-700 rounded-xl p-5 hover:shadow-md transition">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">†</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{pai.nome}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{pai.contexto}</p>
                    </div>
                  </div>
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 dark:text-gray-300 py-2">
                    "{pai.citacao}"
                  </blockquote>
                </div>
              ))}
            </div>
          )}

          {/* Concílios */}
          {abaAtiva === "concilios" && heresia.concilios && (
            <div className="space-y-4">
              {heresia.concilios.map((concilio, idx) => (
                <div key={idx} className="border border-amber-200 dark:border-amber-700/30 rounded-xl p-5 bg-amber-50 dark:bg-amber-900/10">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-200 dark:bg-amber-800/40 rounded-full flex items-center justify-center">
                      <span className="text-amber-700 dark:text-amber-400 font-bold">⚡</span>
                    </div>
                    <h4 className="font-bold text-amber-900 dark:text-amber-200">{concilio.nome}</h4>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">Decisão:</p>
                      <p className="text-amber-700 dark:text-amber-100">{concilio.decisao}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">Consequência:</p>
                      <p className="text-amber-700 dark:text-amber-100">{concilio.consequencia}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Evidências Bíblicas */}
          {abaAtiva === "biblicas" && heresia.evidenciasBiblicas && (
            <div className="space-y-3">
              {heresia.evidenciasBiblicas.map((biblia, idx) => (
                <div key={idx} className="border border-purple-200 dark:border-purple-700/30 rounded-lg p-4 bg-purple-50 dark:bg-purple-900/10">
                  <p className="text-sm text-purple-900 dark:text-purple-100 italic">
                    {biblia}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tópicos Relacionados */}
          <RelatedTopics topics={obterTopicosRelacionados("heresias", heresia.slug)} />
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-zinc-700 px-6 py-4 bg-gray-50 dark:bg-zinc-800/50">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
