'use client';

import { ScrollReveal } from '../scroll-reveal';
import {
  PythonIcon,
  PandasIcon,
  NumpyIcon,
  SklearnIcon,
  GitIcon,
  MatplotlibIcon,
  DockerIcon,
} from '../icons';

const skillsList = [
  { name: 'Python', icon: PythonIcon },
  { name: 'Pandas', icon: PandasIcon },
  { name: 'NumPy', icon: NumpyIcon },
  { name: 'Matplotlib', icon: MatplotlibIcon },
  { name: 'Scikit-learn', icon: SklearnIcon },
  { name: 'Git', icon: GitIcon },
  { name: 'Docker', icon: DockerIcon },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary mb-6">
              Tech Stack
            </span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance">
              Tools & technologies I{' '}
              <span className="text-primary">work with</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {skillsList.map((skill, index) => (
            <ScrollReveal key={skill.name} delay={index * 80}>
              <div className="group relative flex flex-col items-center gap-4 p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/30 hover:bg-card/60 transition-all duration-500">
                <div className="relative w-12 h-12 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <skill.icon className="w-full h-full object-contain" />
                </div>
                <span className="text-sm font-semibold text-foreground">{skill.name}</span>
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
