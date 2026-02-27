import HeroSection from '@/components/sections/hero';
import ProjectsSection from '@/components/sections/projects';
import AboutSection from '@/components/sections/about';
import SkillsSection from '@/components/sections/skills';
import ContactSection from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="relative z-10 isolate overflow-x-hidden">
      {/* Cosmic gradient: soft light at hero fading into deep modern dark */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        {/* Top warm zone - subtle light source */}
        <div className="absolute top-0 left-0 right-0 h-[100vh] bg-gradient-to-b from-primary/[0.06] via-primary/[0.025] to-transparent" />
        {/* Gentle vignette on the sides for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,hsl(220_15%_8%/0.6)_100%)]" />
      </div>

      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
