import {
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  GraduationCap,
  Target,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { aboutCards } from "@/content/portfolio";

const aboutIcons: Record<string, LucideIcon> = {
  Education: GraduationCap,
  "Current Focus": BrainCircuit,
  "Career Direction": Target,
  Availability: BriefcaseBusiness,
};

export function AboutSection() {
  return (
    <section
      className="border-t border-line bg-background py-[4.5rem] sm:py-20"
      id="about"
      aria-labelledby="about-title"
    >
      <Container>
        <SectionHeading
          id="about-title"
          eyebrow="Profile"
          title="About"
          description="A concise view of my education, current focus, and career direction."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {aboutCards.map((card) => {
            const Icon = aboutIcons[card.title] ?? BriefcaseBusiness;

            return (
              <SurfaceCard
                as="article"
                className="flex h-full flex-col p-5"
                interactive
                key={card.title}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                      {card.eyebrow}
                    </p>
                    <h3 className="mt-3 font-heading text-xl font-semibold tracking-normal text-foreground">
                      {card.title}
                    </h3>
                  </div>
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-accent">
                    <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-muted">
                  {card.description}
                </p>

                <ul className="mt-5 space-y-2 text-sm text-foreground">
                  {card.items.map((item) => (
                    <li className="flex gap-2" key={item}>
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-accent"
                        size={15}
                        strokeWidth={1.8}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </SurfaceCard>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
