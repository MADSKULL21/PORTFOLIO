import { profile } from '@/content/portfolio';

export default function Contact() {
  return (
    <footer id="contact" className="site-footer footer-pro" data-reveal>
      <h2 className="sr-only">Contact</h2>

      <div className="footer-pro-body">
        <p className="footer-kicker">contact</p>
        <div className="footer-main-row">
          <p className="footer-title">Open to internships, freelance work, and collaborations.</p>
          <div className="footer-actions">
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
          </div>
        </div>
        <div className="footer-meta-stack">
          <p className="footer-meta">{profile.location}</p>
          <p className="footer-meta">© {profile.portfolioYear} {profile.name}</p>
        </div>
      </div>
    </footer>
  );
}
