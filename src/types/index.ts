import type { Image } from 'sanity';

export interface Project {
  _id: string;
  title: string;
  image: Image;
  description: string;
  shortDescription: string;
  tags: string[];
  githubLink: string;
  demoLink?: string;
}
