import { profile } from "@/data/profile";
import type { Profile } from "@/types/portfolio";


export const contact: Profile = profile;


export const channels = [
    { label: "Email", value: contact.email, href: contact.email ? `mailto:${contact.email}` : undefined },
    { label: "LinkedIn", value: contact.linkedinUrl, href: contact.linkedinUrl },
    { label: "GitHub", value: contact.githubUrl, href: contact.githubUrl },
  ];