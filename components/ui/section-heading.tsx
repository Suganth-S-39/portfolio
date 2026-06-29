import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  className?: string;
  description?: string;
  eyebrow?: string;
  id: string;
  title: string;
}

export function SectionHeading({
  className,
  description,
  eyebrow,
  id,
  title,
}: SectionHeadingProps) {
  return (
    <header className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="mt-4 font-heading text-4xl font-semibold tracking-normal text-foreground sm:text-5xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
