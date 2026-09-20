import Link from "next/link";
import { existsSync } from "node:fs";
import path from "node:path";
import { profile } from "@/data/profile";
import { stack } from "@/content/stack";
import { projects } from "@/content/projects";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ProfessionalLinks } from "@/components/professional-links";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import type { Profile } from "@/types/portfolio";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  `Currículo — ${profile.name}`,
  `Experiência profissional, formação, tecnologias e projetos de ${profile.name}, ${profile.role}.`,
  "/curriculo",
);

export default function ResumePage() {
  const contact: Profile = profile;
  // Static page: adding or replacing the final PDF requires a new build.
  const hasPdf = existsSync(path.join(process.cwd(), "public", "documents", "cv.pdf"));

  return (
    <main id="conteudo" className="resume-page" tabIndex={-1}>
      <Container className="resume-container">
        <header className="resume-header">
          <p className="eyebrow">Currículo / Trajetória profissional</p>
          <Heading as="h1">{profile.name}</Heading>
          <p className="resume-role">{profile.role}</p>
          <ProfessionalLinks profile={profile} />
          <div className="resume-actions">
            {hasPdf ? (
              <a className="button button--primary" href="/documents/cv.pdf" download>Baixar currículo em PDF</a>
            ) : (
              <p className="content-pending">TODO: adicionar CV final.</p>
            )}
            <Link className="text-link" href="/contato">Ir para contato <span aria-hidden="true">↗</span></Link>
          </div>
        </header>

        <section className="resume-section" aria-labelledby="resume-summary">
          <Heading id="resume-summary">Resumo</Heading>
          <div>
            <p>{profile.summary}</p>
            <p>Experiência profissional em desenvolvimento desde {profile.professionalSince}, com atuação em frontend, backend, banco de dados e deploy.</p>
          </div>
        </section>

        <section className="resume-section" aria-labelledby="resume-experience">
          <Heading id="resume-experience">Experiência</Heading>
          <ExperienceTimeline />
        </section>

        <section className="resume-section" aria-labelledby="resume-education">
          <Heading id="resume-education">Formação</Heading>
          <div>
            <h3>{profile.education.course}</h3>
            <p>Em andamento. Previsão de conclusão: {profile.education.expectedCompletion.toLowerCase()}.</p>
            {profile.technicalEducation && (
              <>
                <h3>{profile.technicalEducation.course}</h3>
                <p>Início em {profile.technicalEducation.startYear}.</p>
              </>
            )}
          </div>
        </section>

        <section className="resume-section" aria-labelledby="resume-stack">
          <Heading id="resume-stack">Stack</Heading>
          <dl className="resume-stack">
            {stack.map((group) => (
              <div key={group.category}><dt>{group.category}</dt><dd>{group.technologies.join(" · ")}</dd></div>
            ))}
          </dl>
        </section>

        <section className="resume-section" aria-labelledby="resume-projects">
          <Heading id="resume-projects">Projetos</Heading>
          <div className="resume-projects">
            {projects.map((project) => (
              <article key={project.slug}>
                <h3>{project.title}</h3>
                <p>{project.shortDescription}</p>
                <p>{project.role}</p>
                <ul>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                {"confidentialityNotice" in project && <p className="muted">{project.confidentialityNotice}</p>}
                <Link className="text-link" href={`/projetos/${project.slug}`}>Ver case de {project.title} <span aria-hidden="true">↗</span></Link>
              </article>
            ))}
          </div>
        </section>

        {/* TODO: confirmar informação com Matheus. Certificações e idiomas, se existirem. */}
        <section className="resume-section" aria-labelledby="resume-links">
          <Heading id="resume-links">Links e contato</Heading>
          <div>
            <ProfessionalLinks profile={profile} />
            {!contact.email && !contact.githubUrl && !contact.linkedinUrl && (
              <p className="content-pending">TODO: confirmar informação com Matheus. Email, GitHub e LinkedIn.</p>
            )}
            <Link className="text-link" href="/contato">Página de contato</Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
