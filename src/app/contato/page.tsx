import Link from "next/link";
import { profile } from "@/data/profile";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { createPageMetadata } from "@/lib/metadata";
import {contact, channels} from "./contact"

export const metadata = createPageMetadata(
  `Contato — ${profile.name}`,
  `Contato e links profissionais de ${profile.name}, ${profile.role}.`,
  "/contato",
);

export default function ContactPage() {

  return (
    <main id="conteudo" tabIndex={-1}>
      <Section className="contact-page" aria-labelledby="contact-page-title">
        <div className="section-grid">
          <div>
            <p className="eyebrow">Contato / {profile.name}</p>
            <Heading as="h1" id="contact-page-title">Vamos conversar?</Heading>
            <p className="contact-description">Sobre desenvolvimento web, projetos e oportunidades profissionais.</p>
            <Link className="text-link" href="/curriculo">Conheça minha trajetória <span aria-hidden="true">↗</span></Link>
          </div>
          <div>
            <dl className="contact-channels">
              {channels.map((channel) => (
                <div key={channel.label}>
                  <dt>{channel.label}</dt>
                  <dd>
                    {channel.href ? (
                      <a className="text-link" href={channel.href}>{channel.value} <span aria-hidden="true">↗</span></a>
                    ) : (
                      <p className="content-pending">TODO: confirmar informação com Matheus.</p>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            {contact.location && <p className="muted">Localização: {contact.location}</p>}
            {contact.availability && <p className="muted">{contact.availability}</p>}
          </div>
        </div>
      </Section>
    </main>
  );
}
