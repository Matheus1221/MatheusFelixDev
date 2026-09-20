import { profile } from "@/data/profile";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { projects } from "@/content/projects";
import { stack } from "@/content/stack";
import { ProjectCard } from "@/components/project/project-card";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ProfessionalLinks } from "@/components/professional-links";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  `${profile.name} — ${profile.role}`, profile.summary, "/",
);

export default function HomePage() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <Section className="intro" aria-labelledby="intro-title">
        <p className="eyebrow">{profile.name} / Portfólio</p>
        <Heading as="h1" id="intro-title">{profile.role}</Heading>
        <p className="intro-summary">{profile.summary}</p>
        <div className="hero-actions">
          <a className="button button--primary" href="#projetos">Ver projetos <span aria-hidden="true">↗</span></a>
          <Link className="button button--secondary" href="/curriculo">Ver currículo <span aria-hidden="true">↗</span></Link>
        </div>
        <p className="hero-footnote">Desenvolvimento profissional desde {profile.professionalSince}.</p>
        <ProfessionalLinks profile={profile} />
      </Section>

      <Section id="projetos" className="projects-section" aria-labelledby="projects-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / Projetos selecionados</p>
            <Heading id="projects-title">Código aplicado a problemas reais.</Heading>
          </div>
          <p className="section-description">Do registro de atendimentos ao controle de cobranças: duas experiências de desenvolvimento de ponta a ponta.</p>
        </div>
        <div className="project-list">
          {projects.filter((project) => project.featured).map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </Section>

      <Section id="sobre" aria-labelledby="about-title">
        <div className="section-grid">
          <div>
            <p className="eyebrow">02 / Sobre</p>
            <Heading id="about-title">Da necessidade à aplicação.</Heading>
          </div>
          <div className="prose">
            <p>Sou {profile.name}, {profile.role}, com experiência profissional em desenvolvimento desde {profile.professionalSince}. Minha atuação reúne frontend, backend, banco de dados e deploy, com participação em sistemas utilizados em contexto profissional real.</p>
            <p>No GET DOC, participei do desenvolvimento em diferentes camadas da solução. No Deixa na Conta, atuei na evolução da autenticação, das configurações de conta e do compartilhamento de cobranças, além de contribuir em entregas colaborativas.</p>
            <div className="education-note">
              <span className="muted">Formação em andamento</span>
              <strong>{profile.education.course}</strong>
              <span className="muted">Previsão de conclusão: {profile.education.expectedCompletion.toLowerCase()}.</span>
            </div>
            {profile.technicalEducation && (
              <div className="education-note">
                <strong>{profile.technicalEducation.course}</strong>
                <span className="muted">Início em {profile.technicalEducation.startYear}.</span>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section id="experiencia" className="bordered-section" aria-labelledby="experience-title">
        <div className="section-grid">
          <div>
            <p className="eyebrow">03 / Experiência</p>
            <Heading id="experience-title">Trajetória profissional.</Heading>
          </div>
          <ExperienceTimeline />
        </div>
      </Section>

      <Section id="stack" className="bordered-section" aria-labelledby="stack-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">04 / Stack</p>
            <Heading id="stack-title">Ferramentas de trabalho.</Heading>
          </div>
          <p className="section-description">Tecnologias que fazem parte da minha experiência em interfaces, serviços, dados e engenharia.</p>
        </div>
        <div className="stack-grid">
          {stack.map((group) => (
            <div key={group.category} className="stack-group">
              <h3>{group.category}</h3>
              <ul className="tech-list">
                {group.technologies.map((technology) => <li key={technology}><Badge>{technology}</Badge></li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="contato" className="contact-section" aria-labelledby="contact-title">
        <p className="eyebrow">05 / Contato</p>
        <Heading id="contact-title">Vamos conversar?</Heading>
        <p className="contact-description">Sobre desenvolvimento web, projetos e oportunidades profissionais.</p>
        <Link className="button button--primary" href="/contato">Ir para contato <span aria-hidden="true">↗</span></Link>
        <ProfessionalLinks profile={profile} />
      </Section>
    </main>
  );
}
