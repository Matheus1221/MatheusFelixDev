import { profile } from "@/data/profile";
import Link from "next/link";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container className="footer-inner">
        <p><strong>{profile.name}</strong><span>{profile.role}</span></p>
        <nav className="footer-nav" aria-label="Navegação do rodapé">
          <Link className="text-link" href="/#sobre">Sobre</Link>
          <Link className="text-link" href="/#stack">Stack</Link>
          <Link className="text-link" href="/curriculo">Currículo</Link>
          <Link className="text-link" href="/contato">Contato</Link>
        </nav>
        <a className="text-link" href="#conteudo">Voltar ao início <span aria-hidden="true">↑</span></a>
      </Container>
    </footer>
  );
}
