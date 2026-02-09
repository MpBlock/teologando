import HeresiasPageContent from "./HeresiasPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heresias Históricas | Teologando",
  description:
    "Conheça as principais heresias condenadas pela Igreja Cristã ao longo da história. Entenda as controvérsias teológicas que formaram a ortodoxia.",
  keywords: [
    "heresias",
    "arianismo",
    "nestorianismo",
    "monofisismo",
    "história da Igreja",
    "doutrina cristã",
  ],
  openGraph: {
    title: "Heresias Históricas | Teologando",
    description:
      "Conheça as principais heresias que moldaram a história da Igreja.",
    url: "https://teologando.com/heresias",
    type: "website",
  },
};

export default function HeresiasPage() {
  return <HeresiasPageContent />;
}
