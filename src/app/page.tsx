
import { Suspense } from 'react';
import HeroSection from '@/components/sections/hero';
import ProjectsSection from '@/components/sections/projects';
import AboutSection from '@/components/sections/about';
import SkillsSection from '@/components/sections/skills';
import ContactSection from '@/components/sections/contact';
import ProjectCardSkeleton from '@/components/project-card-skeleton';

// Force reload to fetch new Sanity data
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default function Home() {
  const skeletonCount = 3;

  return (
    <div className="relative isolate overflow-x-hidden">
      <div className="absolute inset-0 -z-10 aurora-background" />
      
      <HeroSection />

      <Suspense
        fallback={
          <section id="projects" className="py-20 sm:py-32">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">
                My Projects
              </h2>
              <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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

      <AboutSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
