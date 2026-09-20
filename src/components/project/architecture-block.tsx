export function ArchitectureBlock({ description }: { description?: string }) {
  return description?.trim() ? (
    <p className="architecture-description">{description}</p>
  ) : null;
}
