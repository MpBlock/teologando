import TemasPageContent from "./TemasPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Temas da Teologia Cristã | Teologando",
  description:
    "Explore os tópicos fundamentais da teologia cristã sistemática: Trindade, Cristologia, Salvação, Escatologia e muito mais.",
  keywords: [
    "teologia sistemática",
    "trindade",
    "cristologia",
    "salvação",
    "soteriologia",
    "escatologia",
  ],
  openGraph: {
    title: "Temas da Teologia Cristã | Teologando",
    description:
      "Explore os tópicos fundamentais da teologia cristã sistemática.",
    url: "https://teologando.com/temas",
    type: "website",
  },
};

export default function TemasPage() {
  return <TemasPageContent />;
}
