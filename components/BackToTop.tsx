"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [mostraBottao, setMostraBottao] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setMostraBottao(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!mostraBottao) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-3 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white rounded-full shadow-lg transition-all duration-300 z-40"
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}
