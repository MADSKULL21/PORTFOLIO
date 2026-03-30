'use client';

import type { CSSProperties } from 'react';
import { startTransition, useEffect, useEffectEvent, useState } from 'react';

type HeroRoleTickerProps = {
  phrases: string[];
  className?: string;
};

export default function HeroRoleTicker({ phrases, className = '' }: HeroRoleTickerProps) {
  const [index, setIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const advancePhrase = useEffectEvent(() => {
    startTransition(() => {
      setIndex((currentIndex) => (currentIndex + 1) % phrases.length);
    });
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => {
      mediaQuery.removeEventListener('change', updatePreference);
    };
  }, []);

  useEffect(() => {
    if (phrases.length < 2 || prefersReducedMotion) {
      return;
    }

    const intervalId = window.setInterval(advancePhrase, 2800);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [phrases.length, prefersReducedMotion]);

  const currentPhrase = phrases[index] ?? '';

  return (
    <p className={`hero-about hero-role-ticker ${className}`.trim()} aria-live="polite">
      <span className="sr-only">{currentPhrase}</span>
      <span key={currentPhrase} className="hero-role-line" aria-hidden="true">
        {Array.from(currentPhrase).map((character, characterIndex) => (
          <span
            key={`${currentPhrase}-${characterIndex}-${character}`}
            className="hero-role-char"
            style={{ '--char-delay': `${characterIndex * 28}ms` } as CSSProperties}
          >
            {character === ' ' ? '\u00A0' : character}
          </span>
        ))}
      </span>
    </p>
  );
}
