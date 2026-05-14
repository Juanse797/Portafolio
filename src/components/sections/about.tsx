'use client';

import { ScrollReveal } from "../scroll-reveal";
import { Brain, Code, Database, Lightbulb } from "lucide-react";
import { useLanguage } from '@/i18n/language-context';

export default function AboutSection() {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: Brain,
      title: t.about.highlights.mlEngineering.title,
      description: t.about.highlights.mlEngineering.description,
    },
    {
      icon: Code,
      title: t.about.highlights.cleanCode.title,
      description: t.about.highlights.cleanCode.description,
    },
    {
      icon: Database,
      title: t.about.highlights.dataPipeline.title,
      description: t.about.highlights.dataPipeline.description,
    },
    {
      icon: Lightbulb,
      title: t.about.highlights.problemSolver.title,
      description: t.about.highlights.problemSolver.description,
    },
  ];
  return (
    <section id="about" className="relative py-14 sm:py-20">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <ScrollReveal direction="down">
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary mb-6">
              {t.about.badge}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={150} direction="fade" duration={900}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance">
              {t.about.title}{' '}
              <span className="text-primary">{t.about.titleHighlight}</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={300} direction="up">
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t.about.description}
            </p>
          </ScrollReveal>
        </div>

        {/* Feature cards in Pointer AI bento style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {highlights.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 120} direction={index % 2 === 0 ? 'left' : 'right'} duration={800}>
              <div className="group relative p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-500">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
