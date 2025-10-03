import { Card, CardContent } from '../ui/card';
import { ScrollReveal } from '../scroll-reveal';
import { Aws, Docker, Nextjs, Python, Scikitlearn, Tensorflow } from '@/components/icons';

const skillsList = [
  { name: 'Python', icon: Python },
  { name: 'TensorFlow', icon: Tensorflow },
  { name: 'Scikit-learn', icon: Scikitlearn },
  { name: 'AWS', icon: Aws },
  { name: 'Docker', icon: Docker },
  { name: 'Next.js', icon: Nextjs },
];

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
            const IconComponent = skill.icon;
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
