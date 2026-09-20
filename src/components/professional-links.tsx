import type { Profile } from "@/types/portfolio";

export function ProfessionalLinks({ profile }: { profile: Profile }) {
  const links = [
    { label: "GitHub", href: profile.githubUrl },
    { label: "LinkedIn", href: profile.linkedinUrl },
    { label: "Email", href: profile.email ? `mailto:${profile.email}` : undefined },
  ].filter((link) => link.href);

  if (!links.length) return null;

  return (
    <ul className="professional-links" aria-label="Links profissionais">
      {links.map((link) => (
        <li key={link.label}><a className="text-link" href={link.href}>{link.label} <span aria-hidden="true">↗</span></a></li>
      ))}
    </ul>
  );
}
