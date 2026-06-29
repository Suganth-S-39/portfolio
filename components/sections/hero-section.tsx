import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";

import { TerminalPreview } from "@/components/sections/terminal-preview";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";

export function HeroSection() {
  return (
    <section
      className="relative isolate overflow-hidden border-b border-line bg-background"
      aria-labelledby="hero-title"
    >
      <div className="hero-ambient absolute inset-0 -z-30" aria-hidden="true" />
      <div
        className="hero-grid absolute inset-0 -z-20 opacity-70"
        aria-hidden="true"
      />

      <Container className="relative grid min-h-[calc(100svh-4rem)] items-center gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(360px,480px)] lg:gap-16 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            Hello, I am
          </p>
          <h1
            id="hero-title"
            className="mt-5 font-heading text-6xl font-semibold tracking-normal text-foreground sm:text-7xl lg:text-8xl"
          >
            {siteConfig.name}
          </h1>
          <p className="mt-6 font-heading text-2xl font-medium tracking-normal text-slate-200 sm:text-3xl">
            {siteConfig.headline}
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
            {siteConfig.tagline} Building production-ready Python software
            with machine learning, SQL, artificial intelligence, and modern
            engineering practices.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink
              href={siteConfig.links.resume}
              download
              aria-label="Download Suganth S resume"
            >
              <Download aria-hidden="true" size={17} strokeWidth={1.8} />
              Download Resume
            </ButtonLink>
            <ButtonLink
              href="#work"
              variant="secondary"
              aria-label="View Suganth S projects"
            >
              View Projects
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.8} />
            </ButtonLink>
          </div>

          <div className="mt-12 max-w-2xl">
            <TerminalPreview />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[420px] lg:mx-0">
          <div
            className="absolute -inset-4 rounded-card-lg border border-accent/15 bg-accent-soft blur-2xl"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-card-lg border border-line bg-surface shadow-card">
            <Image
              src={siteConfig.assets.profile}
              alt="Professional portrait of Suganth S"
              width={672}
              height={737}
              priority
              sizes="(min-width: 1024px) 420px, 88vw"
              className="aspect-[672/737] h-auto w-full object-cover grayscale-[18%]"
            />
          </div>
          <div className="absolute bottom-4 left-4 right-4 rounded-card border border-line bg-background/78 p-4 backdrop-blur-xl">
            <p className="text-sm font-semibold text-foreground">
              Open to Python & AI Internships
            </p>
            <p className="mt-1 text-sm leading-6 text-muted">
              Building production-ready software with Python, Machine Learning,
              SQL, and modern software engineering.
            </p>
          </div>
        </div>

        <a
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-muted transition duration-300 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:inline-flex"
          href="#work"
          aria-label="Scroll to projects"
        >
          Scroll
        </a>
      </Container>
    </section>
  );
}
