import type { ComponentPropsWithoutRef } from "react";
import { Container } from "./container";

export function Section({ children, className = "", ...props }: ComponentPropsWithoutRef<"section">) {
  return (
    <section className={`section ${className}`} {...props}>
      <Container>{children}</Container>
    </section>
  );
}
