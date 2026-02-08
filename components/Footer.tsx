export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card-bg)] mt-16">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-[var(--muted)]">
            © {new Date().getFullYear()} Teologia & Concílios — Apologética Cristã
          </div>
          <div className="flex gap-6 text-sm text-[var(--muted)]">
            <a href="#" className="hover:text-[var(--accent)] transition-colors">Privacidade</a>
            <a href="#" className="hover:text-[var(--accent)] transition-colors">Termos</a>
            <a href="#" className="hover:text-[var(--accent)] transition-colors">Contato</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
