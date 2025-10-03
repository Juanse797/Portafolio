'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Github, ExternalLink, Bot, FileText, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types';
import { urlFor } from '@/lib/sanity';
import { getReadmeSummary } from '@/app/actions';
import { ScrollArea } from '@/components/ui/scroll-area';

type ProjectModalProps = {
  project: Project;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function ProjectModal({ project, isOpen, setIsOpen }: ProjectModalProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.pointerEvents = 'auto';

      const fetchSummary = async () => {
        setIsSummaryLoading(true);
        const result = await getReadmeSummary(project.description);
        setSummary(result);
        setIsSummaryLoading(false);
      };

      fetchSummary();
    }
  }, [isOpen, project.description]);

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
                src={urlFor(project.image).url()}
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

          <Tabs defaultValue="summary" className="w-full flex flex-col min-h-0">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50">
              <TabsTrigger value="summary"><Bot className="mr-2 h-4 w-4"/> AI Summary</TabsTrigger>
              <TabsTrigger value="readme"><FileText className="mr-2 h-4 w-4"/> README</TabsTrigger>
            </TabsList>
            <ScrollArea className="flex-1 mt-2 pr-4">
              <TabsContent value="summary" className="mt-0">
                {isSummaryLoading ? (
                  <div className="flex items-center justify-center h-48">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <p className="text-sm text-foreground/90 whitespace-pre-wrap">{summary}</p>
                )}
              </TabsContent>
              <TabsContent value="readme" className="mt-0">
                {memoizedMarkdown}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
