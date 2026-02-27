'use client';

import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from '../scroll-reveal';
import { siteConfig } from '@/config/site';

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: siteConfig.links.linkedin,
    label: 'Connect on LinkedIn',
  },
  {
    name: 'GitHub',
    icon: Github,
    url: siteConfig.links.github,
    label: 'View my GitHub',
  },
  {
    name: 'Email',
    icon: Mail,
    url: siteConfig.links.email,
    label: 'Send me an email',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-14 sm:py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Section header */}
        <div className="text-center mb-10">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary mb-6">
              Get in Touch
            </span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance">
              {"Let's build something"}{' '}
              <span className="text-primary">together</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {"I'm always open to new challenges and opportunities. If you'd like to learn more about my work or discuss potential collaborations, feel free to reach out."}
            </p>
          </ScrollReveal>
        </div>

        {/* Contact cards */}
        <ScrollReveal delay={300}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-4 p-8 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/30 hover:bg-card/60 transition-all duration-500"
                aria-label={link.label}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <link.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">{link.name}</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
