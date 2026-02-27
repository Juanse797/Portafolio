'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Plus, Save, Loader2 } from 'lucide-react';
import Image from 'next/image';

type ProjectFormProps = {
  project?: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
};

export default function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title || '');
  const [shortDescription, setShortDescription] = useState(project?.short_description || '');
  const [description, setDescription] = useState(project?.description || '');
  const [imageUrl, setImageUrl] = useState(project?.image_url || '');
  const [tags, setTags] = useState<string[]>(project?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [githubLink, setGithubLink] = useState(project?.github_link || '');
  const [demoLink, setDemoLink] = useState(project?.demo_link || '');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    const supabase = createClient();

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(fileName, file);

    if (uploadError) {
      setError('Failed to upload image. Please try again.');
      setIsUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('project-images')
      .getPublicUrl(fileName);

    setImageUrl(publicUrl);
    setIsUploading(false);
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags(prev => [...prev, trimmed]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    setIsSaving(true);
    setError(null);
    const supabase = createClient();

    const projectData = {
      title: title.trim(),
      short_description: shortDescription.trim(),
      description: description.trim(),
      image_url: imageUrl,
      tags,
      github_link: githubLink.trim(),
      demo_link: demoLink.trim() || null,
    };

    if (project) {
      // Update
      const { data, error: updateError } = await supabase
        .from('projects')
        .update({ ...projectData, updated_at: new Date().toISOString() })
        .eq('id', project.id)
        .select()
        .single();

      if (updateError) {
        setError('Failed to update project. Please try again.');
        setIsSaving(false);
        return;
      }
      onSave(data as Project);
    } else {
      // Create
      const { data, error: insertError } = await supabase
        .from('projects')
        .insert({ ...projectData, display_order: Date.now() })
        .select()
        .single();

      if (insertError) {
        setError('Failed to create project. Please try again.');
        setIsSaving(false);
        return;
      }
      onSave(data as Project);
    }
    setIsSaving(false);
  };

  return (
    <Card className="bg-card/60 border-border/50">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6">
          {/* Title */}
          <div className="grid gap-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Awesome Project"
              className="bg-background/50"
            />
          </div>

          {/* Short Description */}
          <div className="grid gap-2">
            <Label htmlFor="shortDesc">Short Description</Label>
            <Input
              id="shortDesc"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="A brief one-liner about the project"
              className="bg-background/50"
            />
          </div>

          {/* Image Upload */}
          <div className="grid gap-2">
            <Label>Project Image</Label>
            <div className="flex flex-col gap-4">
              {imageUrl ? (
                <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-lg border border-border/50">
                  <Image src={imageUrl} alt="Project preview" fill className="object-cover" />
                  <button
                    onClick={() => setImageUrl('')}
                    className="absolute top-2 right-2 p-1 bg-background/80 rounded-full hover:bg-background transition-colors"
                    aria-label="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-video w-full max-w-md border-2 border-dashed border-border/50 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                  aria-label="Upload image"
                >
                  {isUploading ? (
                    <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload an image</p>
                    </>
                  )}
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">or paste a URL:</span>
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.png"
                  className="bg-background/50 text-sm flex-1"
                />
              </div>
            </div>
          </div>

          {/* Full Description (Markdown) */}
          <div className="grid gap-2">
            <Label htmlFor="description">Full Description (Markdown supported)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="## About this project&#10;&#10;Describe your project in detail using Markdown..."
              rows={10}
              className="bg-background/50 font-mono text-sm"
            />
          </div>

          {/* Tags */}
          <div className="grid gap-2">
            <Label>Tags</Label>
            <div className="flex items-center gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Type a tag and press Enter"
                className="bg-background/50"
              />
              <Button type="button" variant="outline" size="icon" onClick={handleAddTag} className="flex-shrink-0 border-border/50">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1">
                    {tag}
                    <button onClick={() => handleRemoveTag(tag)} className="hover:text-foreground" aria-label={`Remove ${tag} tag`}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="github">GitHub Link</Label>
              <Input
                id="github"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                placeholder="https://github.com/user/repo"
                className="bg-background/50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="demo">Demo Link (optional)</Label>
              <Input
                id="demo"
                value={demoLink}
                onChange={(e) => setDemoLink(e.target.value)}
                placeholder="https://my-project.vercel.app"
                className="bg-background/50"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">{error}</p>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/50">
            <Button variant="ghost" onClick={onCancel} className="text-muted-foreground">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="btn-squishy shadow-glow-md hover:shadow-glow-lg">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> {project ? 'Update Project' : 'Create Project'}
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
