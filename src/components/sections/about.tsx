'use client';

import { ScrollReveal } from "../scroll-reveal";
import { Brain, Code, Database, Lightbulb } from "lucide-react";

const highlights = [
  {
    icon: Brain,
    title: 'ML Engineering',
    description: 'Building intelligent systems that solve real-world problems with robust machine learning models.',
  },
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Writing maintainable, production-ready code following best practices and design patterns.',
  },
  {
    icon: Database,
    title: 'Data Pipeline',
    description: 'Designing efficient data pipelines from collection to preprocessing and model deployment.',
  },
  {
    icon: Lightbulb,
    title: 'Problem Solver',
    description: 'Combining technical rigor with a creative, product-focused mindset for practical solutions.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-14 sm:py-20">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary mb-6">
              About Me
            </span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance">
              Passionate about turning{' '}
              <span className="text-primary">data into intelligence</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              I am a dedicated Machine Learning Engineer with a fascination for data and its power to uncover hidden patterns. I specialize in developing, deploying, and maintaining robust ML models, from natural language processing to computer vision.
            </p>
          </ScrollReveal>
        </div>

        {/* Feature cards in Pointer AI bento style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {highlights.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 100}>
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
