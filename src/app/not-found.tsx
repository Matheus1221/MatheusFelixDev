import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";

export const metadata = { title: "Página não encontrada — Matheus Felix", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <Section aria-labelledby="not-found-title">
        <p className="eyebrow">404 / Página não encontrada</p>
        <Heading as="h1" id="not-found-title">Este endereço não existe.</Heading>
        <p className="intro-summary">Volte ao portfólio para conhecer os projetos e a trajetória de Matheus Felix.</p>
        <Link className="button button--primary" href="/">Voltar ao início</Link>
      </Section>
    </main>
  );
}
