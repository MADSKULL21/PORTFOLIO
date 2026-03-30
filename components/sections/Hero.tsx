import Image from 'next/image';
import Link from 'next/link';
import { profile } from '@/content/portfolio';
import HeroRoleTicker from '@/components/ui/HeroRoleTicker';
import Reveal from '@/components/ui/Reveal';

export default function Hero() {
  return (
    <section id="top" className="panel hero-panel" data-reveal>
      <h2 className="sr-only">Hero</h2>

      <div className="hero-grid">
        <Reveal className="hero-copy">
          <p className="hero-kicker">
            <span>portfolio</span>
            <span>/</span>
            <span>{profile.portfolioYear}</span>
          </p>
          <h1 className="hero-name">{profile.name}</h1>
          <HeroRoleTicker phrases={profile.heroPhrases} />
          <p className="hero-subline">{profile.subline}</p>
          <p className="hero-summary">{profile.tagline}</p>

          <div className="hero-status" role="status" aria-live="polite">
            <span className="status-dot" aria-hidden="true" />
            <span>{profile.availability}</span>
          </div>

          <div className="hero-links">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              github ↗
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              linkedin ↗
            </a>
            <a href={profile.email}>email ↗</a>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
              resume ↗
            </a>
            <Link href="/#contact">contact</Link>
          </div>
        </Reveal>

        <Reveal className="ascii-frame" delay={120}>
          <div className="ascii-media">
            <Image
              src="/images/stonecold.png"
              alt="Stone Cold inspired monochrome hero visual"
              fill
              priority
              sizes="(max-width: 1280px) 44vw, 560px"
              className="ascii-image"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
