import { projects } from "@/content/projects";
import type { Project } from "@/types/portfolio";

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
