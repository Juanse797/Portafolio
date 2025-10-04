'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Github, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types';
import { urlFor } from '@/lib/sanity';
import { ScrollArea } from '@/components/ui/scroll-area';

type ProjectModalProps = {
  project: Project;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function ProjectModal({ project, isOpen, setIsOpen }: ProjectModalProps) {
  const imageUrl = project.image ? urlFor(project.image).url() : 'https://placehold.co/800x600';

  const memoizedMarkdown = useMemo(() => (
    <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown-content">
      {project.description}
    </ReactMarkdown>
  ), [project.description]);
  
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
          <DialogDescription>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-primary/20 text-primary-foreground/80 border-primary/30">
                  {tag}
                </Badge>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6 px-6 flex-1 min-h-0">
          <div className="flex flex-col space-y-4">
            <div className="relative aspect-video w-full">
              <Image
                src={imageUrl}
                alt={project.title}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex items-center gap-4">
              <Button asChild className="btn-squishy shadow-glow-md hover:shadow-glow-lg flex-1">
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
              </Button>
              {project.demoLink && (
                <Button asChild variant="outline" className="btn-squishy shadow-glow-md hover:shadow-glow-lg flex-1 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>

          <ScrollArea className="flex-1 mt-2 pr-4">
            <div className="markdown-content">
                {memoizedMarkdown}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
