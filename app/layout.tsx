import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://teologando.com"),
  title: {
    default: "Teologando - Enciclopédia de Teologia Cristã",
    template: "%s | Teologando",
  },
  description:
    "Explore concílios históricos, heresias condenadas e tópicos fundamentais da teologia cristã. Busca sofisticada em definições doutrinárias e conceitos teológicos.",
  keywords: [
    "teologia cristã",
    "concílios eclesiásticos",
    "heresias",
    "doutrina cristã",
    "teologia sistemática",
    "história da Igreja",
    "credo niceno",
    "cristologia",
    "trindade",
  ],
  authors: [{ name: "Teologando" }],
  creator: "Teologando",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://teologando.com",
    siteName: "Teologando",
    title: "Teologando - Enciclopédia de Teologia Cristã",
    description:
      "Explore concílios históricos, heresias condenadas e tópicos fundamentais da teologia cristã.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Teologando",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teologando - Enciclopédia de Teologia Cristã",
    description:
      "Explore concílios históricos, heresias condenadas e tópicos fundamentais da teologia cristã.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://teologando.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4f46e5" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Breadcrumbs />
          <Header />
          <main>{children}</main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
