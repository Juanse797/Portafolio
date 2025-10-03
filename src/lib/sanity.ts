
import { createClient, type SanityClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { unstable_noStore as noStore } from 'next/cache';

// Lee SIEMPRE del entorno "server" (no NEXT_PUBLIC_ para cosas críticas)
const projectId = process.env.SANITY_PROJECT_ID;
const dataset   = process.env.SANITY_DATASET || 'production';
const apiVersion = process.env.SANITY_API_VERSION || '2024-05-01';
const token = process.env.SANITY_SECRET_TOKEN;

// Log para verificar presencia de variables de entorno en el servidor
console.log('Sanity Env Vars Check:', {
  projectId: !!process.env.SANITY_PROJECT_ID,
  dataset: !!process.env.SANITY_DATASET,
  apiVersion: !!process.env.SANITY_API_VERSION,
  token: !!process.env.SANITY_SECRET_TOKEN,
});

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: token,
  perspective: 'raw',
});

function getImageUrlBuilder() {
  return imageUrlBuilder(client);
}

export function urlFor(source: SanityImageSource) {
  return getImageUrlBuilder().image(source);
}

// Helper server-side con noStore() para evitar cualquier cacheo de Next
export async function sanityFetch<T>({
  query,
  params = {},
}: {
  query: string;
  params?: Record<string, any>;
  tags?: string[];
}): Promise<T> {
  noStore(); // Desactiva la caché de Next.js para esta petición

  if (!projectId || !dataset || !token) {
    console.warn('Sanity client is not fully configured. Check environment variables.');
    // @ts-ignore
    return [] as T;
  }
  
  return client.fetch<T>(query, params);
}
