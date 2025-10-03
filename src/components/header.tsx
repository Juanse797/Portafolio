'use client';
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', id: 'home' },
  { name: 'Projects', id: 'projects' },
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Contact', id: 'contact' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('home');

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    <header className="sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 my-4 rounded-xl bg-black/30 backdrop-blur-lg border border-white/20">
        <div className="flex items-center justify-center">
          <ul className="relative flex items-center space-x-2 sm:space-x-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleScroll(e, link.id)}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-md',
                    'hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    activeSection === link.id
                      ? 'text-foreground'
                      : 'text-foreground/80'
                  )}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
