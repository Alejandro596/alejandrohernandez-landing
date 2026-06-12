import type { MetadataRoute } from "next";

// Meta exige poder leer robots.txt para scrapear/verificar el dominio:
// allowlist explícito de sus crawlers + todo abierto para el resto.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "facebookexternalhit", allow: "/" },
      { userAgent: "meta-externalagent", allow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: "https://alejandroohernandez.com/sitemap.xml",
  };
}
