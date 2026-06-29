import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Award,
  CalendarDays,
  Code2,
  Github,
  ImageIcon,
  Star,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import {
  certificates,
  featuredProjects,
  githubProjectTargets,
  type FeaturedProject,
} from "@/content/portfolio";
import {
  fetchTargetRepositories,
  type RepositorySummary,
  type TargetRepositorySummary,
} from "@/lib/github";

const projectDateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function hasRepository(
  target: TargetRepositorySummary,
): target is TargetRepositorySummary & { repository: RepositorySummary } {
  return target.repository !== null;
}

async function getProjectRepositories() {
  try {
    return await fetchTargetRepositories();
  } catch {
    return githubProjectTargets.map((target) => ({
      target,
      repository: null,
    }));
  }
}

function formatUpdatedAt(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return projectDateFormatter.format(date);
}

function getGitHubOpenGraphImage(repository: RepositorySummary) {
  return `https://opengraph.githubassets.com/suganth-portfolio-${repository.id}/${repository.fullName}`;
}

export async function ProjectsSection() {
  const targetRepositories = await getProjectRepositories();
  const featuredProject = targetRepositories.find(
    (project) => project.target.title === "Temp Cleaner",
  );
  const featuredRepositoryProject =
    featuredProject && hasRepository(featuredProject) ? featuredProject : null;
  const secondarySoftwareProjects = targetRepositories
    .filter((project) => project.target.title !== "Temp Cleaner")
    .filter(hasRepository);
  const [rfidProject] = featuredProjects;

  return (
    <section
      className="bg-surface py-[4.5rem] sm:py-20"
      id="work"
      aria-labelledby="projects-title"
    >
      <Container>
        <SectionHeading
          id="projects-title"
          eyebrow="Work"
          title="Projects"
          description="A selection of projects spanning Python, Machine Learning, automation, and embedded systems."
        />

        <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
          {featuredRepositoryProject ? (
            <FeaturedRepositoryCard project={featuredRepositoryProject} />
          ) : null}

          <div className="grid gap-5">
            {secondarySoftwareProjects.map((project) => (
              <RepositoryProjectCard
                key={project.repository.id}
                project={project}
              />
            ))}
            <LocalProjectCard project={rfidProject} />
          </div>
        </div>

        <CertificationsPreview />
      </Container>
    </section>
  );
}

interface RepositoryProjectProps {
  project: TargetRepositorySummary & { repository: RepositorySummary };
}

function FeaturedRepositoryCard({ project }: RepositoryProjectProps) {
  const { repository, target } = project;
  const demoHref = repository.homepage?.trim();

  return (
    <SurfaceCard
      as="article"
      className="group h-full overflow-hidden"
      elevated
      interactive
    >
      <ProjectImage
        alt={`${repository.fullName} GitHub repository preview`}
        priority
        src={getGitHubOpenGraphImage(repository)}
      />

      <div className="flex flex-col justify-between p-5 sm:p-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            {target.category}
          </p>
          <h3 className="mt-3 font-heading text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
            {repository.name}
          </h3>
          <p className="mt-1 text-sm text-muted">{repository.fullName}</p>
          <p className="mt-4 text-base leading-7 text-muted">
            {repository.description ?? target.summary}
          </p>

          <dl className="mt-5 grid gap-3 sm:grid-cols-3">
            <ProjectMetric
              icon={Star}
              label="Stars"
              value={repository.stars.toLocaleString("en")}
            />
            <ProjectMetric
              icon={Code2}
              label="Language"
              value={repository.language ?? "Not specified"}
            />
            <ProjectMetric
              icon={CalendarDays}
              label="Updated"
              value={formatUpdatedAt(repository.updatedAt)}
            />
          </dl>

          <TechStack stack={target.stack} />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ProjectLink href={repository.url} label="GitHub">
            <Github aria-hidden="true" size={17} strokeWidth={1.8} />
          </ProjectLink>
          {demoHref ? (
            <ProjectLink href={demoHref} label="Demo" variant="secondary">
              <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
            </ProjectLink>
          ) : null}
        </div>
      </div>
    </SurfaceCard>
  );
}

function RepositoryProjectCard({ project }: RepositoryProjectProps) {
  const { repository, target } = project;
  const demoHref = repository.homepage?.trim();

  return (
    <SurfaceCard as="article" className="group overflow-hidden" interactive>
      <ProjectImage
        alt={`${repository.fullName} GitHub repository preview`}
        src={getGitHubOpenGraphImage(repository)}
        compact
      />

      <div className="p-5">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-accent">
          {target.category}
        </p>
        <h3 className="mt-3 font-heading text-2xl font-semibold tracking-normal text-foreground">
          {target.title}
        </h3>
        <p className="mt-1 text-sm text-muted">{repository.name}</p>
        <p className="mt-3 text-sm leading-6 text-muted">
          {repository.description ?? target.summary}
        </p>

        <ProjectFactList repository={repository} />

        <TechStack stack={target.stack} />

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <ProjectLink href={repository.url} label="GitHub">
            <Github aria-hidden="true" size={17} strokeWidth={1.8} />
          </ProjectLink>
          {demoHref ? (
            <ProjectLink href={demoHref} label="Demo" variant="secondary">
              <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
            </ProjectLink>
          ) : null}
        </div>
      </div>
    </SurfaceCard>
  );
}

interface LocalProjectCardProps {
  project: FeaturedProject;
}

function LocalProjectCard({ project }: LocalProjectCardProps) {
  return (
    <SurfaceCard as="article" className="group overflow-hidden" interactive>
      <div className="relative h-44 overflow-hidden bg-ink-900 sm:h-48">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="p-5">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-accent">
          Previous hardware project
        </p>
        <h3 className="mt-3 font-heading text-2xl font-semibold tracking-normal text-foreground">
          {project.title}
        </h3>
        {project.achievement ? (
          <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent">
            <Award aria-hidden="true" size={14} strokeWidth={1.8} />
            <span>{project.achievement.title}</span>
            <span className="font-medium text-muted">
              {project.achievement.description}
            </span>
          </div>
        ) : null}
        <p className="mt-3 text-sm leading-6 text-muted">
          {project.description}
        </p>

        <TechStack stack={project.tags} />

        <div className="mt-5">
          <ProjectLink
            href={project.image.src}
            label="View prototype"
            variant="secondary"
          >
            <ImageIcon aria-hidden="true" size={17} strokeWidth={1.8} />
          </ProjectLink>
        </div>
      </div>
    </SurfaceCard>
  );
}

interface ProjectImageProps {
  alt: string;
  compact?: boolean;
  priority?: boolean;
  src: string;
}

function ProjectImage({ alt, compact = false, priority = false, src }: ProjectImageProps) {
  return (
    <div
      className={`relative overflow-hidden bg-ink-900 ${
        compact ? "h-44 sm:h-48" : "h-56 sm:h-64"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={
          compact
            ? "(min-width: 1280px) 42vw, (min-width: 1024px) 50vw, 100vw"
            : "(min-width: 1280px) 58vw, 100vw"
        }
        className="object-cover transition duration-300 group-hover:scale-[1.025]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-background/42 via-transparent to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

interface ProjectMetricProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

function ProjectMetric({ icon: Icon, label, value }: ProjectMetricProps) {
  return (
    <div className="rounded-xl border border-line bg-surface/70 p-2.5">
      <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted">
        <Icon aria-hidden="true" size={14} strokeWidth={1.8} />
        {label}
      </dt>
      <dd className="mt-1.5 text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}

interface ProjectFactListProps {
  repository: RepositorySummary;
}

function ProjectFactList({ repository }: ProjectFactListProps) {
  const facts = [
    {
      icon: Star,
      label: `${repository.stars.toLocaleString("en")} stars`,
    },
    {
      icon: Code2,
      label: repository.language ?? "Language not specified",
    },
    {
      icon: CalendarDays,
      label: formatUpdatedAt(repository.updatedAt),
    },
  ];

  return (
    <ul className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-muted">
      {facts.map((fact) => {
        const Icon = fact.icon;

        return (
          <li
            className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface/70 px-2.5 py-1.5"
            key={fact.label}
          >
            <Icon aria-hidden="true" size={13} strokeWidth={1.8} />
            {fact.label}
          </li>
        );
      })}
    </ul>
  );
}

interface TechStackProps {
  stack: string[];
}

function TechStack({ stack }: TechStackProps) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technology stack">
      {stack.map((item) => (
        <li
          className="rounded-xl border border-line bg-surface/70 px-3 py-1.5 text-xs font-medium text-muted"
          key={item}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function CertificationsPreview() {
  return (
    <section
      className="mt-10 border-t border-line pt-8"
      id="credentials"
      aria-labelledby="certifications-title"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            Learning proof
          </p>
          <h3
            id="certifications-title"
            className="mt-3 font-heading text-2xl font-semibold tracking-normal text-foreground sm:text-3xl"
          >
            Certifications
          </h3>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-muted">
          Supporting credentials across Python, SQL, cloud computing, and IIoT.
        </p>
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {certificates.map((certificate) => (
          <li key={certificate.href}>
            <a
              className="group flex h-full min-h-36 flex-col justify-between rounded-card border border-line bg-background p-4 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-ink-900 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              href={certificate.href}
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <span className="inline-flex size-9 items-center justify-center rounded-xl border border-line bg-surface text-accent transition group-hover:border-accent/40">
                  <Award aria-hidden="true" size={17} strokeWidth={1.8} />
                </span>
                <span className="mt-4 block text-xs font-medium uppercase tracking-[0.14em] text-muted">
                  {certificate.issuer}
                </span>
                <span className="mt-2 block text-sm font-semibold leading-5 text-foreground">
                  {certificate.title}
                </span>
              </span>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent">
                Credential
                <ArrowUpRight
                  aria-hidden="true"
                  className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  size={15}
                  strokeWidth={1.8}
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

interface ProjectLinkProps {
  children: ReactNode;
  href: string;
  label: string;
  variant?: "primary" | "secondary";
}

function ProjectLink({
  children,
  href,
  label,
  variant = "primary",
}: ProjectLinkProps) {
  const classes =
    variant === "primary"
      ? "border-transparent bg-primary text-foreground hover:bg-blue-500"
      : "border-line bg-surface/70 text-foreground hover:border-accent/50 hover:bg-surface";

  return (
    <a
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${classes}`}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
      {label}
    </a>
  );
}
