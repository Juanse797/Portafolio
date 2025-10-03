// src/lib/sanity-client.ts
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-01';
const token = process.env.SANITY_SECRET_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: token, // Use token for all requests if available
  useCdn: token ? false : true, // Use CDN only if not authenticated
  perspective: token ? 'raw' : 'published', // Use 'raw' for drafts with token
});

// Helper for generating image URLs with the configured client
export const urlFor = (source: SanityImageSource) => {
  return imageUrlBuilder(client).image(source);
}
