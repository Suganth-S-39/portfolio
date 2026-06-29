"use client";

import { useState } from "react";
import { Download, Github, Linkedin, Mail } from "lucide-react";

import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { ContactModal } from "@/components/layout/contact-modal";
import { Container } from "@/components/ui/container";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Credentials", href: "#credentials" },
];

export function SiteHeader() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line/80 bg-background/90 backdrop-blur-xl">
        <Container className="flex min-h-16 items-center justify-between gap-6 py-3">
          <a
            className="group inline-flex items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            href="#main-content"
            aria-label={`${siteConfig.name} home`}
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-foreground text-sm font-semibold text-background">
              SS
            </span>
            <span className="hidden text-sm font-semibold tracking-normal text-foreground sm:inline">
              {siteConfig.name}
            </span>
          </a>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                className="rounded-xl px-3 py-2 text-sm font-medium text-muted transition duration-300 hover:bg-surface hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
            <button
              className="rounded-xl px-3 py-2 text-sm font-medium text-muted transition duration-300 hover:bg-surface hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              type="button"
              onClick={() => setIsContactModalOpen(true)}
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <a
              className="hidden size-10 items-center justify-center rounded-xl text-muted transition duration-300 hover:bg-surface hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:inline-flex"
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Suganth S on GitHub"
            >
              <Github aria-hidden="true" size={18} strokeWidth={1.8} />
            </a>
            <a
              className="hidden size-10 items-center justify-center rounded-xl text-muted transition duration-300 hover:bg-surface hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring sm:inline-flex"
              href={siteConfig.links.linkedIn}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Suganth S on LinkedIn"
            >
              <Linkedin aria-hidden="true" size={18} strokeWidth={1.8} />
            </a>
            <Button
              onClick={() => setIsContactModalOpen(true)}
              variant="secondary"
            >
              <Mail aria-hidden="true" size={16} strokeWidth={1.8} />
              <span className="hidden sm:inline">Contact</span>
            </Button>
            <ButtonLink
              className="hidden lg:inline-flex"
              href={siteConfig.links.resume}
              variant="primary"
              download
            >
              <Download aria-hidden="true" size={16} strokeWidth={1.8} />
              Resume
            </ButtonLink>
          </div>
        </Container>
      </header>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
