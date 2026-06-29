"use client";

import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";
import {
  Download,
  Github,
  Linkedin,
  Mail,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useId,
  useRef,
} from "react";

import { siteConfig } from "@/content/site";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

interface ContactAction {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  download?: boolean;
}

const contactActions: ContactAction[] = [
  {
    label: "GitHub",
    description: "View repositories and recent work.",
    href: siteConfig.links.github,
    icon: Github,
  },
  {
    label: "LinkedIn",
    description: "Connect professionally.",
    href: siteConfig.links.linkedIn,
    icon: Linkedin,
  },
  {
    label: "Email",
    description: siteConfig.email,
    href: siteConfig.links.email,
    icon: Mail,
  },
  {
    label: "Resume Download",
    description: "Download the latest resume PDF.",
    href: siteConfig.links.resume,
    icon: Download,
    download: true,
  },
];

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previouslyFocusedElement = document.activeElement;
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const timeout = window.setTimeout(() => {
      const firstFocusable = getFocusableElements(dialogRef.current)[0];
      firstFocusable?.focus();
    }, 0);

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;

      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus();
      }
    };
  }, [isOpen, onClose]);

  function handleBackdropMouseDown(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function handleDialogKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = getFocusableElements(dialogRef.current);

    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isOpen ? (
          <m.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/70 p-4 backdrop-blur-xl"
            aria-hidden={false}
            onMouseDown={handleBackdropMouseDown}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <m.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              className="w-full max-w-lg rounded-card-lg border border-line bg-surface p-5 shadow-card-hover outline-none sm:p-6"
              tabIndex={-1}
              onKeyDown={handleDialogKeyDown}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? undefined
                  : { opacity: 0, y: 10, scale: 0.98 }
              }
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
                    Contact
                  </p>
                  <h2
                    id={titleId}
                    className="mt-3 font-heading text-2xl font-semibold tracking-normal text-foreground"
                  >
                    Let&apos;s connect
                  </h2>
                  <p
                    id={descriptionId}
                    className="mt-2 text-sm leading-6 text-muted"
                  >
                    Choose the fastest way to reach Suganth S or download the
                    resume.
                  </p>
                </div>
                <button
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl text-muted transition duration-300 hover:bg-background hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  type="button"
                  onClick={onClose}
                  aria-label="Close contact modal"
                >
                  <X aria-hidden="true" size={18} strokeWidth={1.8} />
                </button>
              </div>

              <ul className="mt-6 grid gap-3">
                {contactActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <li key={action.href}>
                      <a
                        className="group flex min-h-20 items-center justify-between gap-4 rounded-card border border-line bg-background p-4 transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        href={action.href}
                        target={action.href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          action.href.startsWith("http") ? "noreferrer" : undefined
                        }
                        download={action.download ? true : undefined}
                      >
                        <span className="flex items-center gap-4">
                          <span className="inline-flex size-11 items-center justify-center rounded-xl border border-line bg-surface text-accent transition duration-300 group-hover:border-accent/40">
                            <Icon aria-hidden="true" size={19} strokeWidth={1.8} />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-foreground">
                              {action.label}
                            </span>
                            <span className="mt-1 block text-sm leading-5 text-muted">
                              {action.description}
                            </span>
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
}

function getFocusableElements(container: HTMLElement | null) {
  if (!container) {
    return [];
  }

  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) => !element.hasAttribute("disabled") && element.tabIndex !== -1,
  );
}
