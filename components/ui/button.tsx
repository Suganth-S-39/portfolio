import type { ButtonHTMLAttributes, ReactNode } from "react";

import {
  buttonBaseClasses,
  buttonVariantClasses,
  type ButtonVariant,
} from "@/components/ui/button-styles";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export function Button({
  children,
  className,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonBaseClasses, buttonVariantClasses[variant], className)}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
