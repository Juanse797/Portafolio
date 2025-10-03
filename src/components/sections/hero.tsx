'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowDown, Download } from 'lucide-react';
import { ScrollReveal } from '../scroll-reveal';
import { siteConfig } from '@/config/site';

export default function HeroSection() {

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="h-screen w-full flex items-center justify-center text-center">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6">
            <Image
              src={siteConfig.avatar}
              alt={siteConfig.name}
              width={160}
              height={160}
              className="rounded-full object-cover border-2 border-primary/50 shadow-glow-md"
              priority
            />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            {siteConfig.name}
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold animated-text-shine">
            {siteConfig.title}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={500}>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            Crafting intelligent solutions from data, one model at a time. Welcome to my digital space where I showcase my work and passion for artificial intelligence.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={700}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="btn-squishy shadow-glow-md hover:shadow-glow-lg">
              <a href="#projects" onClick={handleScrollToProjects}>
                <ArrowDown className="mr-2 h-5 w-5" /> View Projects
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-squishy shadow-glow-md hover:shadow-glow-lg border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
              <a href="/cv.pdf" download={`${siteConfig.name.replace(' ', '_')}_CV.pdf`}>
                <Download className="mr-2 h-5 w-5" /> Download CV
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
