import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollReveal } from '../scroll-reveal';
import { PythonIcon } from '../icons/python';
import { TensorFlowIcon } from '../icons/tensorflow';
import { PyTorchIcon } from '../icons/pytorch';
import { ScikitLearnIcon } from '../icons/scikit-learn';
import { AWSIcon } from '../icons/aws';
import { DockerIcon } from '../icons/docker';

const skills = [
  { name: 'Python', icon: PythonIcon },
  { name: 'TensorFlow', icon: TensorFlowIcon },
  { name: 'PyTorch', icon: PyTorchIcon },
  { name: 'Scikit-learn', icon: ScikitLearnIcon },
  { name: 'AWS', icon: AWSIcon },
  { name: 'Docker', icon: DockerIcon },
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
          {skills.map((skill, index) => (
            <ScrollReveal key={skill.name} delay={index * 100}>
              <Card className="bg-muted/30 border-white/10 text-center group transition-all duration-300 hover:bg-primary/20 hover:-translate-y-2">
                <CardContent className="p-6 flex flex-col items-center justify-center gap-4">
                  <skill.icon className="w-12 h-12 text-primary transition-transform duration-300 group-hover:scale-110" />
                  <p className="font-semibold text-sm">{skill.name}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
