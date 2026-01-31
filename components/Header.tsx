import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <nav className="max-w-5xl mx-auto flex justify-between p-4">
        <span className="font-bold text-lg">
          Teologia & Concílios
        </span>

        <div className="space-x-4">
          <Link href="/">Início</Link>
          <Link href="/concilios">Concílios</Link>
          <Link href="/temas">Temas</Link>
        </div>
      </nav>
    </header>
  );
}
