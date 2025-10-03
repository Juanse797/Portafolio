import { sanityFetch } from '@/lib/sanity';
import { ScrollReveal } from "../scroll-reveal";
import type { About } from '@/types';

const ABOUT_QUERY = `*[_type == "about" && _id == "about"][0]`;

export default async function AboutSection() {
  const about = await sanityFetch<About>({ query: ABOUT_QUERY });

  const { heading, paragraph1, paragraph2 } = about || {
    heading: 'About Me',
    paragraph1: 'I am a passionate Machine Learning Engineer dedicated to building intelligent systems that solve real-world problems. My journey into the world of AI began with a fascination for data and its power to uncover hidden patterns. Today, I specialize in developing, deploying, and maintaining robust machine learning models, from natural language processing to computer vision.',
    paragraph2: "I thrive on challenges and am constantly exploring new algorithms and technologies to push the boundaries of what's possible. My philosophy is to combine technical rigor with a creative, product-focused mindset to deliver solutions that are not only powerful but also practical and user-friendly."
  };

  return (
    <section id="about" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <ScrollReveal>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            {heading}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {paragraph1}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={400}>
          <p className="text-lg text-muted-foreground leading-relaxed mt-4">
            {paragraph2}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
