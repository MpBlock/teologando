import { MetadataRoute } from "next";
import { concilios } from "@/data/concilios";
import { heresias } from "@/data/heresias";
import { temas } from "@/data/temas";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://teologando.com";

  // Páginas principais
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/concilios`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/heresias`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/temas`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // Páginas de concílios
  const conciliosPages: MetadataRoute.Sitemap = concilios.map((concilio) => ({
    url: `${baseUrl}/concilios/${concilio.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  // Páginas de heresias
  const heresiasPages: MetadataRoute.Sitemap = heresias.map((heresia) => ({
    url: `${baseUrl}/heresias/${heresia.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  // Páginas de temas
  const temasPages: MetadataRoute.Sitemap = temas.map((tema) => ({
    url: `${baseUrl}/temas/${tema.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...mainPages, ...conciliosPages, ...heresiasPages, ...temasPages];
}
