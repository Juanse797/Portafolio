import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollReveal } from '../scroll-reveal';
import { siteConfig } from '@/config/site';

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: siteConfig.links.linkedin,
  },
  {
    name: 'GitHub',
    icon: Github,
    url: siteConfig.links.github,
  },
  {
    name: 'Email',
    icon: Mail,
    url: siteConfig.links.email,
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <ScrollReveal>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Contact Me
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            I'm actively seeking new opportunities to leverage my machine learning skills. If you have a challenging problem to solve, I'd love to connect and discuss how I can help.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <div className="flex justify-center items-center gap-4">
            {socialLinks.map((link) => (
              <Button
                key={link.name}
                asChild
                size="icon"
                className="btn-squishy rounded-full w-14 h-14 shadow-glow-md hover:shadow-glow-lg"
              >
                <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`Contact me on ${link.name}`}>
                  <link.icon className="w-6 h-6" />
                </a>
              </Button>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
