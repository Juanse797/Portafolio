'use client';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export function ScrollReveal({ 
  children, 
  className, 
  delay = 0,
  threshold = 0.1,
  triggerOnce = true
}: ScrollRevealProps) {
  const { ref, inView } = useInView({
    triggerOnce,
    threshold,
    delay,
  });

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        className
      )}
    >
      {children}
    </div>
  );
}
