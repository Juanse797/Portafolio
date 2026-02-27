import HeroSection from '@/components/sections/hero';
import ProjectsSection from '@/components/sections/projects';
import AboutSection from '@/components/sections/about';
import SkillsSection from '@/components/sections/skills';
import ContactSection from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="relative z-10 isolate overflow-x-hidden">
      {/* Cosmic gradient: bright glow at hero fading into deep space */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        {/* Top bright zone - the "sun" */}
        <div className="absolute top-0 left-0 right-0 h-[100vh] bg-gradient-to-b from-primary/[0.04] via-primary/[0.02] to-transparent" />
        {/* Mid transition - fading to void */}
        <div className="absolute top-[80vh] left-0 right-0 h-[120vh] bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
