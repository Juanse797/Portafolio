// src/lib/sanity.ts
import { client } from './sanity-client';
export { urlFor } from './sanity-client';

/**
 * Main function for fetching data on the SERVER.
 * It uses the configured client.
 */
export async function sanityFetch<T>({
  query,
  params = {},
}: {
  query: string;
  params?: Record<string, any>;
}): Promise<T> {
  // noStore(); // Disables Next.js caching for this fetch - REMOVED TO ALLOW STATIC EXPORT

  return client.fetch<T>(query, params, {
    // We add a `next.revalidate` tag to bust the cache when new content is published
    // You will need to configure a webhook in Sanity to trigger this revalidation
    next: {
      tags: ['sanity-content'],
    },
  });
}
