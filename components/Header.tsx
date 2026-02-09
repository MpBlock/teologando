"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => setMenuAberto(!menuAberto);
  const fecharMenu = () => setMenuAberto(false);

  return (
    <header className="border-b border-[var(--border)] bg-[var(--card-bg)] sticky top-0 z-50 backdrop-blur-sm">
      <nav className="max-w-5xl mx-auto flex justify-between items-center px-6 py-5">
        <Link href="/" className="group" onClick={fecharMenu}>
          <span className="font-semibold text-xl tracking-tight bg-gradient-to-r from-[var(--foreground)] to-[var(--accent)] bg-clip-text text-transparent">
            Teologia & Concílios
          </span>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex gap-8">
          <Link 
            href="/" 
            className="text-[var(--foreground)] hover:text-[var(--accent)] font-medium transition-colors"
          >
            Início
          </Link>
          <Link 
            href="/concilios" 
            className="text-[var(--foreground)] hover:text-[var(--accent)] font-medium transition-colors"
          >
            Concílios
          </Link>
          <Link 
            href="/temas" 
            className="text-[var(--foreground)] hover:text-[var(--accent)] font-medium transition-colors"
          >
            Apologética
          </Link>
          <Link 
            href="/heresias" 
            className="text-[var(--foreground)] hover:text-[var(--accent)] font-medium transition-colors"
          >
            Heresias
          </Link>
        </div>

        {/* Botão Menu Mobile */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 hover:bg-[var(--border)] rounded-lg transition-colors"
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Menu Mobile */}
      {menuAberto && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--card-bg)] px-6 py-4 space-y-3">
          <Link 
            href="/" 
            onClick={fecharMenu}
            className="block text-[var(--foreground)] hover:text-[var(--accent)] font-medium py-2 transition-colors"
          >
            Início
          </Link>
          <Link 
            href="/concilios" 
            onClick={fecharMenu}
            className="block text-[var(--foreground)] hover:text-[var(--accent)] font-medium py-2 transition-colors"
          >
            Concílios
          </Link>
          <Link 
            href="/temas" 
            onClick={fecharMenu}
            className="block text-[var(--foreground)] hover:text-[var(--accent)] font-medium py-2 transition-colors"
          >
            Apologética
          </Link>
          <Link 
            href="/heresias" 
            onClick={fecharMenu}
            className="block text-[var(--foreground)] hover:text-[var(--accent)] font-medium py-2 transition-colors"
          >
            Heresias
          </Link>
        </div>
      )}
    </header>
  );
}
