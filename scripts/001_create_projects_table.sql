-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  short_description TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  github_link TEXT NOT NULL DEFAULT '',
  demo_link TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Public read policy: anyone can view projects
CREATE POLICY "projects_public_select" ON public.projects
  FOR SELECT USING (true);

-- Admin write policies: only authenticated users with is_admin metadata can modify
CREATE POLICY "projects_admin_insert" ON public.projects
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND
    (SELECT (raw_user_meta_data ->> 'is_admin')::boolean FROM auth.users WHERE id = auth.uid())
  );

CREATE POLICY "projects_admin_update" ON public.projects
  FOR UPDATE USING (
    auth.uid() IS NOT NULL AND
    (SELECT (raw_user_meta_data ->> 'is_admin')::boolean FROM auth.users WHERE id = auth.uid())
  );

CREATE POLICY "projects_admin_delete" ON public.projects
  FOR DELETE USING (
    auth.uid() IS NOT NULL AND
    (SELECT (raw_user_meta_data ->> 'is_admin')::boolean FROM auth.users WHERE id = auth.uid())
  );

-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for public read
CREATE POLICY "project_images_public_select" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-images');

-- Storage policies for admin upload
CREATE POLICY "project_images_admin_insert" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'project-images' AND
    auth.uid() IS NOT NULL AND
    (SELECT (raw_user_meta_data ->> 'is_admin')::boolean FROM auth.users WHERE id = auth.uid())
  );

CREATE POLICY "project_images_admin_delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'project-images' AND
    auth.uid() IS NOT NULL AND
    (SELECT (raw_user_meta_data ->> 'is_admin')::boolean FROM auth.users WHERE id = auth.uid())
  );
