import Search from "@/components/Search";
import Card from "@/components/Card";

export default function Home() {
  return (
    <section className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">
        Busca Teológica Cristã
      </h1>

      <p className="text-gray-600 max-w-2xl mb-6">
        Pesquise concílios, heresias e definições doutrinárias.
      </p>

      <Search />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <Card
          titulo="Concílios"
          descricao="Definições doutrinárias da Igreja antiga"
          link="/concilios"
        />
        <Card
          titulo="Heresias"
          descricao="Doutrinas condenadas historicamente"
          link="/heresias"
        />
        <Card
          titulo="Temas"
          descricao="Trindade, Cristologia, Salvação"
          link="/temas"
        />
      </div>
    </section>
  );
}
