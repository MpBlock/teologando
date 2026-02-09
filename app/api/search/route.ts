import { concilios } from "@/data/concilios";
import { heresias } from "@/data/heresias";
import { temas } from "@/data/temas";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase() || "";
  const categoria = searchParams.get("categoria") || "";

  const resultadosConcilios = categoria === "" || categoria === "concilios"
    ? concilios.filter((c) =>
        c.nome.toLowerCase().includes(q) ||
        c.temasAbordados.some((tema) =>
          tema.toLowerCase().includes(q)
        )
      ).map(c => ({ ...c, categoria: "concilios", link: `/concilios/${c.slug}` }))
    : [];

  const resultadosHeresias = categoria === "" || categoria === "heresias"
    ? heresias.filter((h) =>
        h.nome.toLowerCase().includes(q) ||
        h.temasAbordados.some((tema) =>
          tema.toLowerCase().includes(q)
        )
      ).map(h => ({ ...h, categoria: "heresias", link: `/heresias/${h.slug}` }))
    : [];

  const resultadosTemas = categoria === "" || categoria === "temas"
    ? temas.filter((t) =>
        t.nome.toLowerCase().includes(q) ||
        t.temasAbordados.some((tema) =>
          tema.toLowerCase().includes(q)
        )
      ).map(t => ({ ...t, categoria: "temas", link: `/temas/${t.slug}` }))
    : [];

  const resultados = [...resultadosConcilios, ...resultadosHeresias, ...resultadosTemas];

  return Response.json(resultados);
}

