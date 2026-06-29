import type { AnchorHTMLAttributes, ReactNode } from "react";

import {
  buttonBaseClasses,
  buttonVariantClasses,
  type ButtonVariant,
} from "@/components/ui/button-styles";
import { cn } from "@/lib/utils";

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export function ButtonLink({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        buttonBaseClasses,
        buttonVariantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
