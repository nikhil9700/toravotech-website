import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/about/",
    "/services/",
    "/portfolio/",
    "/technologies/",
    "/contact/",
    "/privacy/",
    "/terms/",
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route === "/" ? "/" : route}`,
    lastModified: new Date("2026-11-01"),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
