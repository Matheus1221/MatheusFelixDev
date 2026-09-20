export function ArchitectureBlock({ description }: { description?: string }) {
  return description ? (
    <p className="architecture-description">{description}</p>
  ) : (
    <p className="content-pending">TODO: confirmar informação com Matheus. Arquitetura real e componentes que podem ser divulgados.</p>
  );
}
