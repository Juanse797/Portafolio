'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Project } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const ProjectModal = dynamic(() => import('./project-modal'));

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
        onKeyDown={(e) => e.key === 'Enter' && setIsModalOpen(true)}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${project.title}`}
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-[3/2]">
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          {/* Arrow indicator */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 group-hover:-translate-y-0 translate-x-2 -translate-y-2">
            <ArrowUpRight className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {project.shortDescription}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags?.slice(0, 4).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 text-xs font-medium"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--primary) / 0.06), transparent 40%)',
          }}
        />
      </div>
      {isModalOpen && (
        <ProjectModal
          project={project}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      )}
    </>
  );
}
