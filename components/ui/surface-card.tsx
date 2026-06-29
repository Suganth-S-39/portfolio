import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SurfaceCardElement = "article" | "div" | "section";

interface SurfaceCardProps extends HTMLAttributes<HTMLElement> {
  as?: SurfaceCardElement;
  children: ReactNode;
  elevated?: boolean;
  interactive?: boolean;
}

export function SurfaceCard({
  as: Component = "div",
  children,
  className,
  elevated = false,
  interactive = false,
  ...props
}: SurfaceCardProps) {
  return (
    <Component
      className={cn(
        "rounded-card border border-line bg-background",
        elevated && "shadow-card",
        interactive &&
          "transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card-hover",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
