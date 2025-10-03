import { Card, CardContent } from '../ui/card';
import { ScrollReveal } from '../scroll-reveal';
import {
  PythonIcon,
  PandasIcon,
  NumpyIcon,
  SklearnIcon,
  GitIcon,
} from '../icons';

const skillsList = [
  { name: 'Python', icon: PythonIcon },
  { name: 'Pandas', icon: PandasIcon },
  { name: 'NumPy', icon: NumpyIcon },
  { name: 'Scikit-learn', icon: SklearnIcon },
  { name: 'Git', icon: GitIcon },
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
          {skillsList.map((skill, index) => (
            <ScrollReveal key={skill.name} delay={index * 100}>
              <Card className="bg-muted/30 border-white/10 text-center group transition-all duration-300 hover:bg-primary/20 hover:-translate-y-2">
                <CardContent className="p-6 flex flex-col items-center justify-center gap-4 h-full">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <skill.icon className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <p className="font-semibold text-sm mt-auto">{skill.name}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
