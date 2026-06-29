export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface FocusArea {
  title: string;
  description: string;
}

export interface FeaturedProject {
  title: string;
  category: string;
  description: string;
  image: ImageAsset;
  tags: string[];
  achievement?: {
    title: string;
    description: string;
  };
  links?: {
    label: string;
    href: string;
  }[];
}

export interface Certificate {
  title: string;
  issuer: string;
  href: string;
  format: "image" | "pdf";
}

export interface AboutCard {
  title: string;
  eyebrow: string;
  description: string;
  items: string[];
}

export interface GitHubProjectTarget {
  title: string;
  category: string;
  summary: string;
  stack: string[];
  repositoryNameHints: string[];
}

export const focusAreas: FocusArea[] = [
  {
    title: "Machine learning foundations",
    description:
      "Developing the mathematical, programming, and product instincts required to build useful model-driven software.",
  },
  {
    title: "Data and cloud fundamentals",
    description:
      "Strengthening SQL, cloud computing, and applied data skills through structured coursework and independent practice.",
  },
  {
    title: "Hardware-integrated systems",
    description:
      "Exploring practical systems where embedded devices, automation, and software workflows meet.",
  },
];

export const featuredProjects: FeaturedProject[] = [
  {
    title: "ESP32 RFID Attendance System",
    category: "IoT hardware project",
    description:
      "An RFID-based attendance prototype using ESP32 hardware and a Google Sheets workflow.",
    achievement: {
      title: "2nd Prize",
      description: "Mini Project Contest · 140+ Teams",
    },
    image: {
      src: "/projects/RFID Hardware.png",
      alt: "ESP32 RFID attendance hardware prototype with LCD display and RFID reader",
      width: 892,
      height: 682,
    },
    tags: ["ESP32", "RFID", "Google Sheets", "IoT"],
  },
];

export const githubProjectTargets: GitHubProjectTarget[] = [
  {
    title: "Temp Cleaner",
    category: "Featured Python project",
    summary:
      "A Windows-focused Python utility for cleaning temporary files through simple, efficient automation.",
    stack: ["Python", "Automation", "File System", "CLI"],
    repositoryNameHints: [
      "Temp-Cleaner",
      "temp-cleaner",
      "temp cleaner",
      "tempcleaner",
    ],
  },
  {
    title: "Game Recommendation System",
    category: "Python Project",
    summary:
      "Discover games by genre with a lightweight Python application that integrates the RAWG API to deliver personalized recommendations.",
    stack: ["Python", "RAWG API", "API Integration", "Recommendation System"],
    repositoryNameHints: [
      "Game-Recommender",
      "game-recommender",
      "game recommender",
      "gamerecommender",
    ],
  },
];

export const certificates: Certificate[] = [
  {
    title: "CS50 Introduction to Programming with Python",
    issuer: "Harvard CS50",
    href: "/certificates/CS50P Certificate.png",
    format: "image",
  },
  {
    title: "CS50 Introduction to Databases with SQL",
    issuer: "Harvard CS50",
    href: "/certificates/CS50 SQL Certificate.png",
    format: "image",
  },
  {
    title: "Microsoft Python Development Professional Certificate",
    issuer: "Microsoft",
    href: "/certificates/Microsoft Python Development Professional Certificate.pdf",
    format: "pdf",
  },
  {
    title: "NPTEL Cloud Computing",
    issuer: "NPTEL",
    href: "/certificates/NPTEL Cloud Computing Certificate.pdf",
    format: "pdf",
  },
  {
    title: "NPTEL Industrial Internet of Things",
    issuer: "NPTEL",
    href: "/certificates/NPTEL IIoT Certificate.pdf",
    format: "pdf",
  },
];

export const aboutCards: AboutCard[] = [
  {
    title: "Education",
    eyebrow: "Foundation",
    description:
      "Building engineering depth through Electronics and Communication coursework while focusing professional effort on software and AI.",
    items: [
      "Saveetha Engineering College",
      "Electronics and Communication Engineering",
    ],
  },
  {
    title: "Current Focus",
    eyebrow: "Now",
    description:
      "Strengthening the core tools needed to build useful Python applications and AI-enabled software.",
    items: [
      "Python Development",
      "Machine Learning",
      "Artificial Intelligence",
      "SQL",
    ],
  },
  {
    title: "Career Direction",
    eyebrow: "Goal",
    description:
      "Pursuing roles where software quality, data fluency, and applied AI thinking matter.",
    items: ["Python Developer", "AI/ML Intern", "Software Engineer"],
  },
  {
    title: "Availability",
    eyebrow: "Status",
    description:
      "Open to internship opportunities with teams building practical, reliable software products.",
    items: ["Python & AI Internships", "Remote or On-site", "Project-focused"],
  },
];
