// src/lib/sanity.ts
import { unstable_noStore as noStore } from 'next/cache';
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
  noStore(); // Disables Next.js caching for this fetch

  return client.fetch<T>(query, params);
}
