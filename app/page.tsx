import Search from "@/components/Search";
import Card from "@/components/Card";

export default function Home() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[var(--foreground)]">
          Busca Teológica <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] bg-clip-text text-transparent">Cristã</span>
        </h1>

        <p className="text-lg text-[var(--muted)] max-w-2xl leading-relaxed">
          Explore concílios históricos, heresias e definições doutrinárias através de uma busca sofisticada e intuitiva.
        </p>
      </div>

      <div className="mb-16">
        <Search />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          titulo="Concílios"
          descricao="Definições doutrinárias da Igreja antiga e suas resoluções históricas"
          link="/concilios"
        />
        <Card
          titulo="Heresias"
          descricao="Doutrinas condenadas historicamente pela Igreja Cristã"
          link="/heresias"
        />
        <Card
          titulo="Temas"
          descricao="Trindade, Cristologia, Salvação e outros tópicos fundamentais"
          link="/temas"
        />
      </div>
    </section>
  );
}
