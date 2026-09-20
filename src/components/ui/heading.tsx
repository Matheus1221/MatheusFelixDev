import type { ComponentPropsWithoutRef } from "react";

type HeadingProps = ComponentPropsWithoutRef<"h2"> & {
  as?: "h1" | "h2" | "h3";
};

export function Heading({ as: Tag = "h2", className = "", ...props }: HeadingProps) {
  return <Tag className={`heading heading--${Tag} ${className}`} {...props} />;
}
