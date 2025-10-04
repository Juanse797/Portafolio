import { client, urlFor } from '@/lib/sanity';
import type { Project } from '@/types';
import ProjectCard from '../project-card';
import { ScrollReveal } from '../scroll-reveal';

const PROJECTS_QUERY = `*[_type == "project"]|order(order asc){
  _id,
  title,
  image,
  description,
  shortDescription,
  tags,
  githubLink,
  demoLink
}`;

export default async function ProjectsSection() {
  const projects = await client.fetch<Project[]>(PROJECTS_QUERY);

  return (
    <section id="projects" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl mb-12">
            My Projects
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ScrollReveal key={project._id} delay={index * 150}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
