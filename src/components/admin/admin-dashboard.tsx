'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, LogOut, ArrowLeft, Pencil, Trash2, GripVertical, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ProjectForm from './project-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function AdminDashboard({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const handleDelete = async () => {
    if (!deletingProject) return;
    setIsDeleting(true);
    const supabase = createClient();
    
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', deletingProject.id);
    
    if (!error) {
      setProjects(prev => prev.filter(p => p.id !== deletingProject.id));
    }
    setDeletingProject(null);
    setIsDeleting(false);
  };

  const handleSave = (savedProject: Project) => {
    if (editingProject) {
      setProjects(prev => prev.map(p => p.id === savedProject.id ? savedProject : p));
      setEditingProject(null);
    } else {
      setProjects(prev => [...prev, savedProject]);
      setIsCreating(false);
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    const supabase = createClient();
    const newProjects = [...projects];
    [newProjects[index - 1], newProjects[index]] = [newProjects[index], newProjects[index - 1]];
    
    await Promise.all(
      newProjects.map((p, i) =>
        supabase.from('projects').update({ display_order: i }).eq('id', p.id)
      )
    );
    setProjects(newProjects);
  };

  const handleMoveDown = async (index: number) => {
    if (index === projects.length - 1) return;
    const supabase = createClient();
    const newProjects = [...projects];
    [newProjects[index], newProjects[index + 1]] = [newProjects[index + 1], newProjects[index]];
    
    await Promise.all(
      newProjects.map((p, i) =>
        supabase.from('projects').update({ display_order: i }).eq('id', p.id)
      )
    );
    setProjects(newProjects);
  };

  if (isCreating || editingProject) {
    return (
      <div className="min-h-screen bg-background">
        <div className="absolute inset-0 -z-10 aurora-background opacity-30" />
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Button
            variant="ghost"
            onClick={() => { setIsCreating(false); setEditingProject(null); }}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to dashboard
          </Button>
          <h1 className="text-2xl font-bold mb-8">
            {editingProject ? 'Edit Project' : 'New Project'}
          </h1>
          <ProjectForm
            project={editingProject || undefined}
            onSave={handleSave}
            onCancel={() => { setIsCreating(false); setEditingProject(null); }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 -z-10 aurora-background opacity-30" />
      
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage your portfolio projects</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setIsCreating(true)} className="btn-squishy shadow-glow-md hover:shadow-glow-lg">
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSignOut} className="text-muted-foreground hover:text-foreground">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Projects List */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        {projects.length === 0 ? (
          <Card className="bg-card/60 border-border/50 border-dashed">
            <CardContent className="py-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Plus className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-6">Add your first project to get started</p>
              <Button onClick={() => setIsCreating(true)} className="btn-squishy shadow-glow-md hover:shadow-glow-lg">
                <Plus className="mr-2 h-4 w-4" /> Add Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-4">
            {projects.map((project, index) => (
              <Card key={project.id} className="bg-card/60 border-border/50 hover:border-primary/20 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Reorder Buttons */}
                    <div className="flex flex-col gap-1 text-muted-foreground">
                      <button
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        className="p-1 hover:text-foreground disabled:opacity-30 transition-colors"
                        aria-label="Move up"
                      >
                        <GripVertical className="h-4 w-4 rotate-90 scale-x-[-1]" />
                      </button>
                      <button
                        onClick={() => handleMoveDown(index)}
                        disabled={index === projects.length - 1}
                        className="p-1 hover:text-foreground disabled:opacity-30 transition-colors"
                        aria-label="Move down"
                      >
                        <GripVertical className="h-4 w-4 rotate-90" />
                      </button>
                    </div>

                    {/* Image */}
                    <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                      {project.image_url ? (
                        <Image
                          src={project.image_url}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                          No image
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{project.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{project.short_description}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.tags?.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-1">
                      {project.github_link && (
                        <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {project.demo_link && (
                        <a href={project.demo_link} target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingProject(project)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeletingProject(project)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingProject} onOpenChange={() => setDeletingProject(null)}>
        <AlertDialogContent className="bg-card border-border/50">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deletingProject?.title}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border/50">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
