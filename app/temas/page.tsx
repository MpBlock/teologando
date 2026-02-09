import TemasPageContent from "./TemasPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apologética Protestante | Teologando",
  description:
    "Defesa protestante contra doutrinas católicas. Argumento bíblico e patrístico sobre: Sola Scriptura, Papado, Sacramentos, Transubstanciação, Tradição, Purgatório e mais.",
  keywords: [
    "apologética protestante",
    "sola scriptura",
    "papado",
    "sacramentos",
    "transubstanciação",
    "tradição",
    "defesa protestante",
    "anti-catolicismo",
    "reforma protestante",
  ],
  openGraph: {
    title: "Apologética Protestante | Teologando",
    description:
      "Defesa protestante contra doutrinas católicas com base bíblica e nos Pais da Igreja.",
    url: "https://teologando.com/temas",
    type: "website",
  },
};

export default function TemasPage() {
  return <TemasPageContent />;
}
