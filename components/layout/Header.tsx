'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { navItems } from '@/content/portfolio';

type ThemeMode = 'dark' | 'light';

const sectionIds = navItems.map((item) => item.href.replace('#', '')).filter(Boolean);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v2.8M12 18.2V21M3 12h2.8M18.2 12H21M5.65 5.65l1.96 1.96M16.39 16.39l1.96 1.96M18.35 5.65l-1.96 1.96M7.61 16.39l-1.96 1.96M12 16a4 4 0 100-8 4 4 0 000 8z" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 14.2A8.5 8.5 0 119.8 4a7 7 0 0010.2 10.2z" />
  </svg>
);

const readTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  const stored = window.localStorage.getItem('portfolio-theme');
  if (stored === 'dark' || stored === 'light') {
    return stored;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export default function Header() {
  const [active, setActive] = useState('#top');
  const [theme, setTheme] = useState<ThemeMode>(readTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      {
        threshold: [0.2, 0.35, 0.55],
        rootMargin: '-20% 0px -52% 0px',
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    void fetch('/api/stats', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ metric: 'themeToggles' }),
      keepalive: true,
    }).catch(() => null);

    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="site-nav">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <div className="nav-inner">
        <Link className="nav-brand" href="/#top" aria-label="Go to top">
          <span className="nav-logo" aria-hidden="true">
            SL
          </span>
          <span>{'shaunak lad'}</span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={`/${item.href}`}
                  className={active === item.href ? 'active' : ''}
                  aria-current={active === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="icon-button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>
      <div id="scroll-progress" className="scroll-progress" aria-hidden="true" />
    </header>
  );
}
