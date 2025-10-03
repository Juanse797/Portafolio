'use client';
import React, { useState, useEffect, useRef } from 'react';
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
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement | null>>(new Map());

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

  useEffect(() => {
    const activeLink = linkRefs.current.get(activeSection);
    const navElement = navRef.current;

    if (activeLink && navElement) {
      const navRect = navElement.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 1,
      });
    }
  }, [activeSection]);

  return (
    <header className="sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 my-4 rounded-xl bg-black/30 backdrop-blur-lg border border-white/20">
        <div className="flex items-center justify-center">
          <ul ref={navRef} className="relative flex items-center space-x-2 sm:space-x-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  ref={(el) => linkRefs.current.set(link.id, el)}
                  onClick={(e) => handleScroll(e, link.id)}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium transition-colors hover:text-foreground',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md',
                    activeSection === link.id ? 'text-foreground' : 'text-foreground/80'
                  )}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <span
              className="absolute bottom-0 h-0.5 bg-primary rounded-full transition-all duration-300 ease-in-out"
              style={indicatorStyle}
            />
          </ul>
        </div>
      </nav>
    </header>
  );
}
