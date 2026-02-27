'use client';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
  direction?: RevealDirection;
  duration?: number;
}

const directionStyles: Record<RevealDirection, { hidden: string; visible: string }> = {
  up: {
    hidden: 'opacity-0 translate-y-10',
    visible: 'opacity-100 translate-y-0',
  },
  down: {
    hidden: 'opacity-0 -translate-y-10',
    visible: 'opacity-100 translate-y-0',
  },
  left: {
    hidden: 'opacity-0 translate-x-10',
    visible: 'opacity-100 translate-x-0',
  },
  right: {
    hidden: 'opacity-0 -translate-x-10',
    visible: 'opacity-100 translate-x-0',
  },
  fade: {
    hidden: 'opacity-0',
    visible: 'opacity-100',
  },
  scale: {
    hidden: 'opacity-0 scale-95',
    visible: 'opacity-100 scale-100',
  },
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  direction = 'up',
  duration = 700,
}: ScrollRevealProps) {
  const { ref, inView } = useInView({
    triggerOnce,
    threshold,
  });

  const styles = directionStyles[direction];

  return (
    <div
      ref={ref}
      className={cn(
        'ease-out',
        inView ? styles.visible : styles.hidden,
        className
      )}
      style={{
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
