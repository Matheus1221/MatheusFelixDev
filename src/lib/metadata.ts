import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { canIndex, getSiteUrl } from "@/lib/site";

export function createPageMetadata(title: string, description: string, pathname: string): Metadata {
  const siteUrl = getSiteUrl();
  const url = siteUrl ? new URL(pathname, siteUrl) : undefined;
  const image = siteUrl ? {
    url: new URL("/og", siteUrl).href,
    width: 1200, height: 630,
    alt: `${profile.name} — ${profile.role}`,
  } : undefined;

  return {
    title,
    description,
    metadataBase: siteUrl,
    alternates: url ? { canonical: url } : undefined,
    robots: { index: canIndex(), follow: canIndex() },
    openGraph: {
      title, description, url,
      siteName: profile.name, locale: "pt_BR", type: "website",
      images: image ? [image] : [],
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title, description, images: image ? [image] : [],
    },
  };
}
