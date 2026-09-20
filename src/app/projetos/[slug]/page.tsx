import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { profile } from "@/data/profile";
import { getProjectBySlug } from "@/lib/projects";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { ProjectGallery } from "@/components/project/project-gallery";
import { ArchitectureBlock } from "@/components/project/architecture-block";
import { createPageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();
  return createPageMetadata(
    `${project.title} — ${profile.name}`, project.shortDescription, `/projetos/${project.slug}`,
  );
}

export default async function ProjectPage({ params }: Props) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();
  const study = project.caseStudy;
  const hasArchitecture = typeof study.architecture === "string"
    ? Boolean(study.architecture.trim())
    : Boolean(study.architecture?.length);
  const hasTechnologies = project.technologies.length > 0;
  const hasImages = Boolean(project.images?.length);
  const canShowRepository = !project.proprietary && !project.repositoryPrivate;
  const hasCode = Boolean(project.confidentialityNotice || project.liveUrl || (canShowRepository && project.githubUrl));
  const nextProject = projects.find((item) => item.slug !== project.slug);
  const sections = [
    { id: "contexto", title: "Contexto", text: study.context },
    { id: "problema", title: "Problema", text: study.problem },
    { id: "solucao", title: "Solução", text: study.solution },
    { id: "participacao", title: "Minha atuação", text: study.participation },
  ].map((section) => ({ ...section, text: section.text.filter((paragraph) => paragraph.trim()) }))
    .filter((section) => section.text.length > 0 || (section.id === "participacao" && study.contributions?.length));

  return (
    <main id="conteudo" tabIndex={-1}>
      <article>
        <header className="case-hero">
          <Container>
            <Link className="text-link case-back" href="/#projetos">← Voltar aos projetos</Link>
            <p className="eyebrow">Projeto / Estudo de caso</p>
            <Heading as="h1">{project.title}</Heading>
            <p className="case-description">{project.shortDescription}</p>
            {(project.proprietary || project.repositoryPrivate || hasTechnologies) && <div className="project-labels">
              {project.proprietary && <Badge>Projeto proprietário</Badge>}
              {project.repositoryPrivate && <Badge>Código-fonte privado</Badge>}
              {project.technologies.map((technology) => <Badge key={technology}>{technology}</Badge>)}
            </div>}
            {project.confidentialityNotice && <p className="case-notice">{project.confidentialityNotice}</p>}
            {study.status?.trim() && <p className="case-status">Status: {study.status}</p>}
            {!!study.metrics?.length && (
              <dl className="case-metrics">
                {study.metrics.map((metric) => (
                  <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>
                ))}
              </dl>
            )}
          </Container>
        </header>

        <Container className="case-layout">
          <nav className="case-nav" aria-label="Neste projeto">
            <p className="eyebrow">Neste projeto</p>
            <ul>
              {sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}
              {hasArchitecture && <li><a href="#arquitetura">Arquitetura</a></li>}
              {hasTechnologies && <li><a href="#tecnologias">Tecnologias</a></li>}
              {study.technicalCase && <li><a href="#caso-tecnico">Caso técnico</a></li>}
              {hasImages && <li><a href="#imagens">Imagens</a></li>}
              {hasCode && <li><a href="#codigo">Código e links</a></li>}
            </ul>
          </nav>
          <div className="case-body">
            {sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
                <Heading id={`${section.id}-title`}>{section.title}</Heading>
                {section.text.map((paragraph, index) => <p key={`${section.id}-${index}`}>{paragraph}</p>)}
                {section.id === "participacao" && study.contributions?.map((contribution) => (
                  <div className="case-detail" key={contribution.title}>
                    <h3>{contribution.title}</h3>
                    <p>{contribution.description}</p>
                  </div>
                ))}
              </section>
            ))}
            {hasArchitecture && <section id="arquitetura" aria-labelledby="architecture-title">
              <Heading id="architecture-title">Arquitetura</Heading>
              <ArchitectureBlock description={study.architecture} />
            </section>}
            {hasTechnologies && <section id="tecnologias" aria-labelledby="tech-title">
              <Heading id="tech-title">Tecnologias</Heading>
              <ul className="tech-list">
                {project.technologies.map((technology) => <li key={technology}><Badge>{technology}</Badge></li>)}
              </ul>
            </section>}
            {study.technicalCase && (
              <section id="caso-tecnico" aria-labelledby="technical-case-title">
                <Heading id="technical-case-title">Caso técnico</Heading>
                <p className="case-callout">{study.technicalCase.title}</p>
                {([
                  ["Problema", study.technicalCase.problem],
                  ["Investigação", study.technicalCase.investigation],
                  ["Correção", study.technicalCase.correction],
                  ["Resultado", study.technicalCase.result],
                ] as const).filter(([, text]) => text?.trim()).map(([title, text]) => (
                  <div className="case-detail" key={title}><h3>{title}</h3><p>{text}</p></div>
                ))}
              </section>
            )}
            {hasImages && <section id="imagens" aria-labelledby="images-title">
              <Heading id="images-title">Imagens</Heading>
              <ProjectGallery images={project.images} />
            </section>}
            {hasCode && <section id="codigo" aria-labelledby="code-title">
              <Heading id="code-title">Código e links</Heading>
              {project.repositoryPrivate && <h3>Código-fonte privado</h3>}
              {project.confidentialityNotice && <p>{project.confidentialityNotice}</p>}
              {canShowRepository && project.githubUrl && <a className="text-link" href={project.githubUrl}>Ver repositório de {project.title} ↗</a>}
              {project.liveUrl && <a className="text-link" href={project.liveUrl}>Acessar {project.title} ↗</a>}
            </section>}
          </div>
        </Container>
      </article>
      <div className="case-end">
        <Container className="case-end-inner">
          {nextProject && <Link className="button button--secondary" href={`/projetos/${nextProject.slug}`}>Conhecer {nextProject.title} →</Link>}
          <Link className="text-link" href="/contato">Vamos conversar?</Link>
        </Container>
      </div>
    </main>
  );
}
