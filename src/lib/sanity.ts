
import { createClient, type SanityClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { unstable_noStore as noStore } from 'next/cache';

// Lee SIEMPRE del entorno "server" (no NEXT_PUBLIC_ para cosas críticas)
const projectId = process.env.SANITY_PROJECT_ID;
const dataset   = process.env.SANITY_DATASET || 'production';
const apiVersion = process.env.SANITY_API_VERSION || '2024-05-01';
const token = process.env.SANITY_SECRET_TOKEN; // opcional para preview/datasets privados

let client: SanityClient | null = null;

function getSanityClient({ preview = false }: { preview?: boolean } = {}): SanityClient | null {
  // Nota: No reutilizamos el cliente singleton aquí porque la 'perspective' puede cambiar.
  // Se crea una nueva instancia cada vez para asegurar que la configuración es correcta.
  if (projectId && dataset && apiVersion) {
    const newClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      // Por defecto, ver SOLO contenido publicado (lo que esperas en prod)
      perspective: preview && token ? 'previewDrafts' : 'published',
      token: preview && token ? token : undefined, // usa token solo cuando lo necesitas
    });
    return newClient;
  }

  return null;
}

let builder: ReturnType<typeof imageUrlBuilder> | null = null;
function getImageUrlBuilder() {
  if (builder) return builder;
  const c = getSanityClient();
  if (c) {
    builder = imageUrlBuilder({ projectId: c.config().projectId!, dataset: c.config().dataset! });
    return builder;
  }
  return null;
}

export function urlFor(source: SanityImageSource) {
  const b = getImageUrlBuilder();
  if (b) return b.image(source);
  return { url: () => 'https://placehold.co/600x400' };
}

// Helper server-side con noStore() para evitar cualquier cacheo de Next
export async function sanityFetch<T>({
  query,
  params = {},
  preview = false,
}: {
  query: string;
  params?: Record<string, any>;
  tags?: string[]; // tags se mantiene por compatibilidad de tipo pero no se usa activamente aquí
  preview?: boolean;
}): Promise<T> {
  noStore(); // <- desactiva la caché de RSC/Next en esta ejecución

  const c = getSanityClient({ preview });
  if (!c) {
    console.warn('Sanity client is not configured. Skipping fetch.');
    return [] as T;
  }

  // OJO: las opciones {cache, next} no las usa Sanity client.fetch
  return c.fetch<T>(query, params);
}
