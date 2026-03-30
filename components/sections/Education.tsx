import { certifications, education } from '@/content/portfolio';
import Reveal from '@/components/ui/Reveal';

export default function Education() {
  return (
    <section id="education" className="panel" data-reveal>
      <div className="panel-head">
        <p className="label">education</p>
      </div>
      <h2 className="sr-only">Education</h2>

      <div className="education-grid">
        <Reveal className="edu-card" delay={80}>
          <h3>{education.college}</h3>
          <p className="edu-degree">{education.degree}</p>
          <p className="edu-meta">
            {education.duration} • {education.location}
          </p>
          <p className="edu-cgpa">CGPA: {education.cgpa}</p>
        </Reveal>

        <Reveal className="edu-card" delay={140}>
          <h3>Certifications</h3>
          <ul className="entry-bullets compact">
            {certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
