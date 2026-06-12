import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://alejandroohernandez.com",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://alejandroohernandez.com/privacidad",
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
