'use client';

import Image from 'next/image';
import { useState } from 'react';
import { urlFor } from '@/lib/sanity';
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
  const imageUrl = project.image ? urlFor(project.image).width(600).height(400).url() : 'https://placehold.co/600x400';


  return (
    <>
      <Card
        className="group relative overflow-hidden rounded-xl border-white/20 bg-card/80 transition-all duration-300 ease-out hover:scale-105 hover:shadow-glow-lg focus-within:scale-105 focus-within:shadow-glow-lg"
        onClick={() => setIsModalOpen(true)}
        onKeyDown={(e) => e.key === 'Enter' && setIsModalOpen(true)}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${project.title}`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div 
            className={cn(
              "absolute inset-0 rounded-xl transition-all duration-300",
              "shadow-[0_0_0px_rgba(255,0,51,0)] group-hover:shadow-[0_0_15px_rgba(255,0,51,0.5)] group-focus-within:shadow-[0_0_15px_rgba(255,0,51,0.5)]"
            )}
          />
        
        <CardHeader className="relative z-10 p-4">
          <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 p-4 pt-0">
          <Image
            src={imageUrl}
            alt={project.title}
            width={600}
            height={400}
            className="w-full h-auto rounded-lg mb-4 object-cover"
          />
          <p className="text-muted-foreground text-sm mb-4 h-10">{project.shortDescription}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags?.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-primary/20 text-primary-foreground/80 border-primary/30">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      {isModalOpen && <ProjectModal project={project} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />}
    </>
  );
}
