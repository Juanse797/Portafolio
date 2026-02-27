'use client';
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'projects' },
  { name: 'Skills', id: 'skills' },
  { name: 'Contact', id: 'contact' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav
          className={cn(
            'flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500',
            scrolled
              ? 'bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg shadow-background/20'
              : 'bg-transparent'
          )}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleScroll(e, 'home')}
            className="text-lg font-bold text-foreground tracking-tight hover:text-primary transition-colors"
          >
            {siteConfig.name.split(' ')[0]}
            <span className="text-primary">.</span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleScroll(e, link.id)}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg',
                    'hover:text-foreground',
                    activeSection === link.id
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:bg-muted/50'
                  )}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.links.email}
              className="hidden md:inline-flex px-5 py-2 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Contact
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 mt-2',
            mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl p-4">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleScroll(e, link.id)}
                    className={cn(
                      'block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                      activeSection === link.id
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    )}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
