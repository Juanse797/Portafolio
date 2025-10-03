import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import { ScrollReveal } from '../scroll-reveal';

const skillsList = [
  { name: 'Python', iconUrl: 'https://profilinator.rishav.dev/skills-assets/python-original.svg' },
  { name: 'Pandas', iconUrl: 'https://profilinator.rishav.dev/skills-assets/pandas-original-wordmark.svg' },
  { name: 'NumPy', iconUrl: 'https://profilinator.rishav.dev/skills-assets/numpy-original-wordmark.svg' },
  { name: 'TensorFlow', iconUrl: 'https://profilinator.rishav.dev/skills-assets/tensorflow-original.svg' },
  { name: 'Scikit-learn', iconUrl: 'https://profilinator.rishav.dev/skills-assets/scikitlearn-original.svg' },
  { name: 'Docker', iconUrl: 'https://profilinator.rishav.dev/skills-assets/docker-original-wordmark.svg' },
  { name: 'Git', iconUrl: 'https://profilinator.rishav.dev/skills-assets/git-original-wordmark.svg' },
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 max-w-6xl mx-auto">
          {skillsList.map((skill, index) => (
            <ScrollReveal key={skill.name} delay={index * 100}>
              <Card className="bg-muted/30 border-white/10 text-center group transition-all duration-300 hover:bg-primary/20 hover:-translate-y-2">
                <CardContent className="p-6 flex flex-col items-center justify-center gap-4 h-full">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image 
                      src={skill.iconUrl}
                      alt={`${skill.name} logo`}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                    />
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
