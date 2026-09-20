import type { Project } from "@/types/portfolio";

export function ArchitectureBlock({ description }: { description?: Project["caseStudy"]["architecture"] }) {
  if (typeof description === "string") {
    return description.trim() ? <p className="architecture-description">{description}</p> : null;
  }

  return description?.map((block) => (
    <div className="case-detail" key={block.title}>
      <h3>{block.title}</h3>
      <p>{block.description}</p>
    </div>
  )) ?? null;
}
