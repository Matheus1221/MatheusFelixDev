import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { profile } from "@/data/profile";
import Link from "next/link";


export function Header() {


    
  return (
    <header className="site-header">
      <Container className="header-inner">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true">mf<span>.</span></span>
          <span>{profile.name}</span>
        </Link>
        <nav className="main-nav" aria-label="Navegação principal">
          <Link href="/#projetos">Projetos</Link>
          <Link href="/#experiencia">Experiência</Link>
          <Link href="/curriculo">Currículo</Link>
          <Link href="/contato">Contato</Link>
        </nav>
        <ThemeToggle />
      </Container>
    </header>
  );
}
