import { Card, CardContent } from '../ui/card';
import { ScrollReveal } from '../scroll-reveal';
import * as LucideIcons from 'lucide-react';

// A mapping of skill names to lucide-react icon names
// Find more icons at https://lucide.dev/
const skillsList: { name: string; icon: keyof typeof LucideIcons }[] = [
  { name: 'Python', icon: 'FileCode' },
  { name: 'TensorFlow', icon: 'BrainCircuit' },
  { name: 'PyTorch', icon: 'BrainCog' },
  { name: 'Scikit-learn', icon: 'Binary' },
  { name: 'AWS', icon: 'Cloud' },
  { name: 'Docker', icon: 'Container' },
  { name: 'Next.js', icon: 'Server' },
  { name: 'React', icon: 'Atom' },
  { name: 'Kubernetes', icon: 'Ship' },
  { name: 'Git', icon: 'GitMerge' },
  { name: 'SQL', icon: 'Database' },
  { name: 'GenAI', icon: 'Sparkles' },
];

// A fallback icon if a specific icon is not found
const FallbackIcon = LucideIcons['Code'];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 sm:py-32 bg-card/20">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl mb-12">
            Technical Skills
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-4xl mx-auto">
          {skillsList.map((skill, index) => {
            const IconComponent = LucideIcons[skill.icon] || FallbackIcon;
            return (
              <ScrollReveal key={skill.name} delay={index * 100}>
                <Card className="bg-muted/30 border-white/10 text-center group transition-all duration-300 hover:bg-primary/20 hover:-translate-y-2">
                  <CardContent className="p-6 flex flex-col items-center justify-center gap-4">
                    <IconComponent className="w-12 h-12 text-primary transition-transform duration-300 group-hover:scale-110" />
                    <p className="font-semibold text-sm">{skill.name}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
