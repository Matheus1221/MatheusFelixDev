import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Project } from "@/types/portfolio";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-card" aria-labelledby={`${project.slug}-title`}>
      <div className="project-cover" aria-hidden="true">
        <span className="project-index">Projeto / {String(index + 1).padStart(2, "0")}</span>
        <span className="project-wordmark">{project.title}</span>
        <span className="project-cover-rule" />
      </div>
      <div className="project-content">
        <div className="project-labels">
          {project.proprietary && <Badge>Projeto proprietário</Badge>}
          {project.repositoryPrivate && <Badge>Código-fonte privado</Badge>}
          {project.technologies.map((technology) => <Badge key={technology}>{technology}</Badge>)}
        </div>
        <h3 id={`${project.slug}-title`}>{project.title}</h3>
        <p className="project-description">{project.shortDescription}</p>
        <ul className="project-highlights">
          {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
        <details className="project-details">
          <summary>Minha participação <span aria-hidden="true">+</span></summary>
          <div className="project-details-content">
            <p>{project.role}</p>
            {project.confidentialityNotice && <p className="muted">{project.confidentialityNotice}</p>}
            {!project.proprietary && !project.repositoryPrivate && project.githubUrl && <a className="text-link" href={project.githubUrl}>Repositório de {project.title}</a>}
            {project.liveUrl && <a className="text-link" href={project.liveUrl}>Acessar {project.title}</a>}
          </div>
        </details>
        <Link className="text-link case-card-link" href={`/projetos/${project.slug}`}>
          Ver case de {project.title} <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
