'use client';

import { projects } from '@/data/projects';
import ProjectCard from '../project-card';
import { ScrollReveal } from '../scroll-reveal';

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-14 sm:py-20">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary mb-6">
              Portfolio
            </span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance">
              Featured{' '}
              <span className="text-primary">projects</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="mt-4 text-lg text-muted-foreground">
              A selection of my most impactful work in machine learning and data science.
            </p>
          </ScrollReveal>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 150}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
