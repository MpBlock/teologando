"use client";

import { useState } from "react";

type Props = {
  titulo: string;
  url?: string;
  textoCustomizado?: string;
};

export default function ShareButtons({ titulo, url, textoCustomizado }: Props) {
  const [copiado, setCopiado] = useState(false);
  
  const urlAtual = url || (typeof window !== "undefined" ? window.location.href : "");
  const textoCompartilhamento = textoCustomizado || `Confira "${titulo}" em Teologando`;

  const compartilharWhatsApp = () => {
    const mensagem = encodeURIComponent(`${textoCompartilhamento}\n${urlAtual}`);
    window.open(`https://wa.me/?text=${mensagem}`, "_blank");
  };

  const compartilharEmail = () => {
    const assunto = encodeURIComponent(`Teologando: ${titulo}`);
    const corpo = encodeURIComponent(`${textoCompartilhamento}\n\n${urlAtual}`);
    window.open(`mailto:?subject=${assunto}&body=${corpo}`);
  };

  const copiarLink = () => {
    navigator.clipboard.writeText(urlAtual);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const compartilharTwitter = () => {
    const twitter = encodeURIComponent(`${textoCompartilhamento} ${urlAtual}`);
    window.open(`https://twitter.com/intent/tweet?text=${twitter}`, "_blank");
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4 pb-4 border-b border-[var(--border)]">
      <button
        onClick={compartilharWhatsApp}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg transition-colors"
        title="Compartilhar no WhatsApp"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-.355.228-.69.495-.988.793a9.9 9.9 0 1013.995 13.995c.298-.298.565-.633.793-.988a9.87 9.87 0 001.378-5.031c0-5.487-4.456-9.948-9.947-9.948Z"/>
        </svg>
        WhatsApp
      </button>

      <button
        onClick={compartilharEmail}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white rounded-lg transition-colors"
        title="Compartilhar por Email"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Email
      </button>

      <button
        onClick={compartilharTwitter}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-[#1DA1F2] hover:bg-[#1a91da] text-white rounded-lg transition-colors"
        title="Compartilhar noTwitter"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75.75 8.5-2.5 10-6.5z"/>
        </svg>
        Twitter
      </button>

      <button
        onClick={copiarLink}
        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
          copiado 
            ? "bg-green-500 text-white" 
            : "bg-[var(--border)] text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-white"
        }`}
        title="Copiar link"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        {copiado ? "Copiado!" : "Copiar"}
      </button>
    </div>
  );
}
