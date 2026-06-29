import { AboutSection } from "@/components/sections/about-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
    </main>
  );
}
