const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "Suganth S",
  headline: "Python Developer | AI & Machine Learning",
  tagline: "Learning. Building. Improving.",
  description:
    "Suganth S is a Python developer focused on practical AI, machine learning, SQL, and production-ready software engineering.",
  email: "suganth4239@gmail.com",
  githubUsername: "Suganth-S-39",
  url: rawSiteUrl.replace(/\/$/, ""),
  assets: {
    profile: "/profile.png",
    resume: "/Resume.pdf",
  },
  links: {
    github: "https://github.com/Suganth-S-39",
    linkedIn: "https://www.linkedin.com/in/suganth--s/",
    email: "mailto:suganth4239@gmail.com",
    resume: "/Resume.pdf",
  },
} as const;

export type SiteConfig = typeof siteConfig;
