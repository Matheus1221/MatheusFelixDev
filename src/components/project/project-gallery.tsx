import Image from "next/image";
import type { ProjectImage } from "@/types/portfolio";

export function ProjectGallery({ images = [] }: { images?: readonly ProjectImage[] }) {
  if (!images.length) {
    return null;
  }

  return (
    <div className="project-gallery">
      {images.map((image) => (
        <figure key={image.src}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 48rem) 100vw, 750px"
          />
          <figcaption>{image.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
