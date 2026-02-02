

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase() || "";

  const resultados = concilios.filter((c) =>
    c.nome.toLowerCase().includes(q) ||
    c.temasAbordados.some((tema) =>
      tema.toLowerCase().includes(q)
    )
  );

  return Response.json(resultados);
}
