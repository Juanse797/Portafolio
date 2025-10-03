
import { createClient, type SanityClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Store the client and builder in a memoized structure
const sanity = {
  client: null as SanityClient | null,
  builder: null as ReturnType<typeof imageUrlBuilder> | null,
};

function getSanityClient() {
  // If the client is already initialized, return it
  if (sanity.client && sanity.builder) {
    return sanity;
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
  const token = process.env.SANITY_SECRET_TOKEN;

  // Only initialize if all required variables are present
  if (projectId && dataset && apiVersion) {
    sanity.client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
      token,
    });
    sanity.builder = imageUrlBuilder(sanity.client);
  }
  
  return sanity;
}

export function urlFor(source: SanityImageSource) {
  const { builder } = getSanityClient();
  if (!builder) {
    // Return a placeholder if Sanity is not configured
    return {
      url: () => 'https://placehold.co/600x400',
    };
  }
  return builder.image(source);
}

// Helper function for server-side fetching
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: Record<string, any>;
  tags?: string[];
}): Promise<T> {
  const { client } = getSanityClient();
  if (!client) {
    // Gracefully handle missing project ID by returning an empty array.
    console.warn('Sanity project ID/dataset is not configured. Skipping fetch. Returning empty array.');
    return [] as T;
  }

  return client.fetch<T>(query, params, {
    cache: 'force-cache',
    next: {
      revalidate: process.env.NODE_ENV === 'development' ? 30 : 3600,
      tags,
    },
  });
}
