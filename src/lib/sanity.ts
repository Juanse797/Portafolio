
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { unstable_noStore as noStore } from 'next/cache';

// Lee SIEMPRE del entorno "server"
const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || 'production';
const apiVersion = process.env.SANITY_API_VERSION || '2024-05-01';
const token = process.env.SANITY_SECRET_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false, // ¡IMPORTANTE! Desactiva el CDN para obtener datos frescos siempre
  perspective: 'raw', // Permite ver borradores y datos publicados
});

function getImageUrlBuilder() {
  return imageUrlBuilder(client);
}

export function urlFor(source: SanityImageSource) {
  return getImageUrlBuilder().image(source);
}

export async function sanityFetch<T>({
  query,
  params = {},
}: {
  query: string;
  params?: Record<string, any>;
}): Promise<T> {
  noStore(); // Desactiva la caché de Next.js para esta petición

  if (!projectId || !dataset || !token) {
    console.warn('Sanity client is not fully configured. Check environment variables in .env');
    // @ts-ignore
    return [] as T;
  }
  
  return client.fetch<T>(query, params);
}
