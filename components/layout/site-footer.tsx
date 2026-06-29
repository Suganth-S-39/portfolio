import { Github, Linkedin, Mail } from "lucide-react";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";

const footerLinks = [
  {
    label: "GitHub",
    href: siteConfig.links.github,
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedIn,
    icon: Linkedin,
  },
  {
    label: "Email",
    href: siteConfig.links.email,
    icon: Mail,
  },
];

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-line bg-surface">
      <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">
            {siteConfig.name}
          </p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            {siteConfig.headline}. {siteConfig.tagline}
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center gap-2">
            {footerLinks.map((link) => {
              const Icon = link.icon;

              return (
                <li key={link.href}>
                  <a
                    className="inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium text-muted transition duration-300 hover:bg-background hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    <Icon aria-hidden="true" size={16} strokeWidth={1.8} />
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
