import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import { profile } from "@/data/profile";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { themeInitializationScript } from "@/lib/theme";
import { canIndex, getSiteUrl } from "@/lib/site";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.summary,
  metadataBase: getSiteUrl(),
  robots: { index: canIndex(), follow: canIndex() },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="system" suppressHydrationWarning>
      <head>
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
      </head>
      <body className={geist.variable}>
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
