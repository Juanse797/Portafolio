import { createClient } from '@/lib/supabase/server';
import type { Project } from '@/types';
import ProjectCard from '../project-card';
import { ScrollReveal } from '../scroll-reveal';

export default async function ProjectsSection() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true });

  return (
    <section id="projects" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl mb-4">
            My Projects
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            A selection of projects showcasing my work in machine learning, data science, and software engineering.
          </p>
        </ScrollReveal>
        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {(projects as Project[]).map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 150}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Projects coming soon...</p>
          </div>
        )}
      </div>
    </section>
  );
}
