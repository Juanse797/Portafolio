'use client';

import { useLanguage } from '@/i18n/language-context';
import { cn } from '@/lib/utils';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-border/50 bg-background/80 backdrop-blur-sm p-0.5">
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          'flex items-center px-2 py-1 text-xs font-medium rounded-full transition-all duration-300',
          language === 'en'
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:text-foreground'
        )}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('es')}
        className={cn(
          'flex items-center px-2 py-1 text-xs font-medium rounded-full transition-all duration-300',
          language === 'es'
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:text-foreground'
        )}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  );
}
