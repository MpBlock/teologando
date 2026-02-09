"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type BreadcrumbItem = {
  label: string;
  href: string;
};

const breadcrumbMap: Record<string, BreadcrumbItem[]> = {
  "/concilios": [{ label: "Concílios", href: "/concilios" }],
  "/heresias": [{ label: "Heresias", href: "/heresias" }],
  "/temas": [{ label: "Temas", href: "/temas" }],
};

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  
  if (segments.length === 0) return [];
  
  // Para rotas como /concilios/[slug], mostre apenas Concílios
  const firstSegment = `/${segments[0]}`;
  const baseItems = breadcrumbMap[firstSegment] || [];
  
  if (segments.length > 1) {
    // Para rotas aninhadas, use o slug para criar label legível
    const slug = segments[segments.length - 1];
    const label = slug
      .replace(/-/g, " ")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    
    return [
      ...baseItems,
      {
        label: label,
        href: pathname,
      },
    ];
  }
  
  return baseItems;
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  if (pathname === "/") return null;
  
  const breadcrumbs = generateBreadcrumbs(pathname);
  
  if (breadcrumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="bg-[var(--card-bg)] border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-3">
        <ol className="flex flex-wrap gap-2 text-sm">
          <li>
            <Link href="/" className="text-[var(--accent)] hover:underline">
              Início
            </Link>
          </li>
          
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.href} className="flex items-center gap-2">
              <span className="text-[var(--muted)]">/</span>
              {index === breadcrumbs.length - 1 ? (
                <span className="text-[var(--foreground)] font-medium">
                  {breadcrumb.label}
                </span>
              ) : (
                <Link href={breadcrumb.href} className="text-[var(--accent)] hover:underline">
                  {breadcrumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
