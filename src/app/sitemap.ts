import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { canIndex, getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl || !canIndex()) return [];

  return ["/", "/curriculo", "/contato", ...projects.map(({ slug }) => `/projetos/${slug}`)]
    .map((pathname) => ({ url: new URL(pathname, siteUrl).href }));
}
