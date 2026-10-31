import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  return [
    {
      url: base,
      lastModified: new Date("2026-10-30"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/menu`,
      lastModified: new Date("2026-10-30"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
