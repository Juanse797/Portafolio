import { Suspense } from 'react';
import HeroSection from '@/components/sections/hero';
import ProjectsSection from '@/components/sections/projects';
import AboutSection from '@/components/sections/about';
import SkillsSection from '@/components/sections/skills';
import ContactSection from '@/components/sections/contact';
import ProjectCardSkeleton from '@/components/project-card-skeleton';

export default function Home() {
  const skeletonCount = 3;

  return (
    <div className="relative isolate overflow-x-hidden">
      <HeroSection />

      <AboutSection />

      <Suspense
        fallback={
          <section id="projects" className="py-24 sm:py-32">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary mb-6">
                  Portfolio
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                  Featured <span className="text-primary">projects</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: skeletonCount }).map((_, index) => (
                  <ProjectCardSkeleton key={index} />
                ))}
              </div>
            </div>
          </section>
        }
      >
        <ProjectsSection />
      </Suspense>

      <SkillsSection />
      <ContactSection />
    </div>
  );
}
