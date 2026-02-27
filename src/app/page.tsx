import HeroSection from '@/components/sections/hero';
import ProjectsSection from '@/components/sections/projects';
import AboutSection from '@/components/sections/about';
import SkillsSection from '@/components/sections/skills';
import ContactSection from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="relative isolate overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
