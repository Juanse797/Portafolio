'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

const ProjectModal = dynamic(() => import('./project-modal'));

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageUrl = project.image_url || 'https://placehold.co/600x400/0A0A0A/FF0033?text=Project';

  return (
    <>
      <Card
        className="group relative overflow-hidden rounded-xl border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-glow-lg hover:border-primary/30 focus-within:scale-[1.03] focus-within:shadow-glow-lg cursor-pointer"
        onClick={() => setIsModalOpen(true)}
        onKeyDown={(e) => e.key === 'Enter' && setIsModalOpen(true)}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${project.title}`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="relative z-10 p-4 pb-2">
          <CardTitle className="text-lg font-bold tracking-tight">{project.title}</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 p-4 pt-0">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4">
            <Image
              src={imageUrl}
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.short_description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags?.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                {tag}
              </Badge>
            ))}
            {project.tags?.length > 4 && (
              <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs">
                +{project.tags.length - 4}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
      {isModalOpen && <ProjectModal project={project} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />}
    </>
  );
}
