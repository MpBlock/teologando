import ApologeticaPageContent from "./ApologeticaPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apologética Cristã | Teologando",
  description:
    "Defenda a fé protestante contra erros católicos romanos. Argumentos bíblicos, Pais da Igreja e Concílios ecuménicos contra doutrinas não-bíblicas como a Assunção de Maria e Imaculada Conceição.",
  keywords: [
    "apologética cristã",
    "defesa da fé",
    "assunção de maria",
    "imaculada conceição",
    "purgatório",
    "mediação de maria",
    "veneração de santos",
    "católicos romanos",
    "teologia protestante",
  ],
  openGraph: {
    title: "Apologética Cristã | Teologando",
    description:
      "Defenda a fé protestante com argumentos bíblicos e patrísticos sólidos.",
    url: "https://teologando.com/apologetica",
    type: "website",
  },
};

export default function ApologeticaPage() {
  return <ApologeticaPageContent />;
}
