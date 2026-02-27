'use client';

import { Button } from '@/components/ui/button';
import { ArrowDown, Download, Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

function AnimatedGridBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[100px]" />
    </div>
  );
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30 animate-float"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${3 + i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <AnimatedGridBackground />
      <FloatingParticles />

      <div className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated badge */}
          <div
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-8 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {siteConfig.title}
            </span>
          </div>

          {/* Main headline */}
          <h1
            className={cn(
              'text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.9] transition-all duration-700 delay-150',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <span className="text-foreground">{'Hi, I\'m'}</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-400 to-primary">
              {siteConfig.name.split(' ')[0]}
            </span>
            <span className="text-foreground">
              {' '}{siteConfig.name.split(' ').slice(1).join(' ')}
            </span>
          </h1>

          {/* Description */}
          <p
            className={cn(
              'mt-8 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed transition-all duration-700 delay-300',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            Crafting intelligent solutions from data, one model at a time.
            Building robust ML systems that transform raw data into actionable insights.
          </p>

          {/* CTA buttons */}
          <div
            className={cn(
              'mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden px-8 py-6 text-base font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            >
              <a href="#projects" onClick={handleScrollToProjects}>
                <span className="relative z-10 flex items-center gap-2">
                  <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
                  View Projects
                </span>
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group px-8 py-6 text-base font-semibold rounded-full border-border/50 text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              <a href="/cv.pdf" download={`${siteConfig.name.replace(' ', '_')}_CV.pdf`}>
                <Download className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                Download CV
              </a>
            </Button>
          </div>

          {/* Stats row */}
          <div
            className={cn(
              'mt-16 flex items-center justify-center gap-8 md:gap-16 transition-all duration-700 delay-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            {[
              { value: 'ML', label: 'Engineer' },
              { value: 'AI', label: 'Solutions' },
              { value: 'Data', label: 'Driven' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
