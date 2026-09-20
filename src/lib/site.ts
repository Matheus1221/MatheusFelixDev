export function getSiteUrl(): URL | undefined {
  const value = process.env.SITE_URL?.trim();
  if (!value) return undefined;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("SITE_URL deve ser uma URL HTTPS absoluta válida.");
  }

  if (
    url.protocol !== "https:" || url.username || url.password ||
    url.pathname !== "/" || url.search || url.hash ||
    url.hostname === "localhost" || url.hostname.endsWith(".localhost") ||
    url.hostname === "127.0.0.1" || url.hostname === "[::1]"
  ) {
    throw new Error("SITE_URL deve ser a origem HTTPS pública, sem credenciais, caminho, query ou fragmento.");
  }

  return url;
}

export function canIndex(): boolean {
  return Boolean(getSiteUrl()) && process.env.NODE_ENV === "production" &&
    (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production");
}
