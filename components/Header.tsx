import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--card-bg)] sticky top-0 z-50 backdrop-blur-sm">
      <nav className="max-w-5xl mx-auto flex justify-between items-center px-6 py-5">
        <Link href="/" className="group">
          <span className="font-semibold text-xl tracking-tight bg-gradient-to-r from-[var(--foreground)] to-[var(--accent)] bg-clip-text text-transparent">
            Teologia & Concílios
          </span>
        </Link>

        <div className="flex gap-8">
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
            Temas
          </Link>
        </div>
      </nav>
    </header>
  );
}
