
import { createClient, type SanityClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// These are read from .env.local or the environment
const projectId = process.env.SANITY_PROJECT_ID || 'so9wm90k';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-01';
const token = process.env.SANITY_SECRET_TOKEN;

// A singleton instance of the Sanity client
let client: SanityClient | null = null;

// A function to get the initialized Sanity client
function getSanityClient(): SanityClient | null {
  if (client) {
    return client;
  }

  // Only initialize if all required variables are present and valid
  if (projectId && dataset && apiVersion) {
    client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
      //token,
    });
    return client;
  }

  // If credentials are not set, return null
  return null;
}


// A singleton instance of the image URL builder
let builder: ReturnType<typeof imageUrlBuilder> | null = null;

function getImageUrlBuilder() {
    if (builder) {
        return builder;
    }
    const currentClient = getSanityClient();
    if (currentClient) {
        builder = imageUrlBuilder(currentClient);
        return builder;
    }
    return null;
}

export function urlFor(source: SanityImageSource) {
  const currentBuilder = getImageUrlBuilder();
  if (currentBuilder) {
    return currentBuilder.image(source);
  }
  // Return a placeholder or empty string if builder is not available
  return { url: () => 'https://placehold.co/600x400' };
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
  const currentClient = getSanityClient();
  
  if (!currentClient) {
    console.warn('Sanity client is not configured. Skipping fetch.');
    // Return an empty array or object to prevent crashes
    return [] as T;
  }
  
  return currentClient.fetch<T>(query, params, {
    cache: 'force-cache',
    next: {
      revalidate: process.env.NODE_ENV === 'development' ? 30 : 3600,
      tags,
    },
  });
}
