import { siteConfig } from "@/config/site";
import { Github, Linkedin, Mail } from "lucide-react";

const footerLinks = [
  { name: 'LinkedIn', icon: Linkedin, url: siteConfig.links.linkedin },
  { name: 'GitHub', icon: Github, url: siteConfig.links.github },
  { name: 'Email', icon: Mail, url: siteConfig.links.email },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-lg font-bold text-foreground tracking-tight">
            {siteConfig.name.split(' ')[0]}
            <span className="text-primary">.</span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
                aria-label={`Visit ${link.name}`}
              >
                <link.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
