export interface Project {
  id: string;
  title: string;
  short_description: string;
  description: string;
  image_url: string;
  tags: string[];
  github_link: string;
  demo_link?: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}
