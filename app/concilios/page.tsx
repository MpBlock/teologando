import ConciliosPageContent from "./ConciliosPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concílios Ecumênicos | Teologando",
  description:
    "Explore os principais concílios ecumênicos que moldaram a teologia cristã ortodoxa. Conheça as decisões doutrinárias da Igreja Antiga.",
  keywords: [
    "concílios ecumênicos",
    "Concílio de Niceia",
    "Calcedônia",
    "história da Igreja",
    "doutrina cristã",
  ],
  openGraph: {
    title: "Concílios Ecumênicos | Teologando",
    description:
      "Explore os principais concílios que moldaram a teologia cristã.",
    url: "https://teologando.com/concilios",
    type: "website",
  },
};

export default function ConciliosPage() {
  return <ConciliosPageContent />;
}
