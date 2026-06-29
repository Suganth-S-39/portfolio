export type ButtonVariant = "primary" | "secondary" | "ghost";

export const buttonBaseClasses =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-primary text-foreground shadow-card hover:bg-blue-500",
  secondary:
    "border-line bg-surface/70 text-foreground hover:border-accent/50 hover:bg-surface",
  ghost: "border-transparent text-muted hover:bg-surface/70 hover:text-foreground",
};
