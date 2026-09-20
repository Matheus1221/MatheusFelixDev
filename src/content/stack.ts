import type { StackGroup } from "@/types/portfolio";

export const stack = [
  {
    category: "Frontend",
    technologies: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "SCSS"],
  },
  {
    category: "Backend",
    technologies: ["Node.js", "Java", "Spring Boot", "REST"],
  },
  {
    category: "Dados",
    technologies: ["PostgreSQL", "MySQL", "SQL"],
  },
  {
    category: "Engenharia",
    technologies: ["Docker", "Git", "Git Flow", "JWT", "MVC"],
  },
] satisfies readonly StackGroup[];
