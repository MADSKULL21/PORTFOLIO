import { profile } from '@/content/portfolio';
import Reveal from '@/components/ui/Reveal';

export default function Contact() {
  return (
    <footer id="contact" className="site-footer footer-pro" data-reveal>
      <h2 className="sr-only">Contact</h2>

      <Reveal className="footer-pro-left" delay={90}>
        <p className="footer-kicker">contact</p>
        <p className="footer-title">Open to internships, freelance work, and collaborations.</p>
        <p className="footer-meta">{profile.location}</p>
        <p className="footer-meta">© {profile.portfolioYear} {profile.name}</p>
      </Reveal>

      <Reveal className="footer-actions" delay={140}>
        <a href={profile.email}>email</a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          github
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          linkedin
        </a>
        <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
          resume
        </a>
      </Reveal>
    </footer>
  );
}
