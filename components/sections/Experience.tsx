import { experiences } from '@/content/portfolio';
import Reveal from '@/components/ui/Reveal';

export default function Experience() {
  return (
    <section id="experience" className="panel" data-reveal>
      <div className="panel-head">
        <p className="label">experience</p>
        <a className="panel-link" href="/Shaunak_ML_RESUME.pdf" target="_blank" rel="noopener noreferrer">
          view resume ↗
        </a>
      </div>
      <h2 className="sr-only">Experience</h2>

      <div className="experience-stack">
        {experiences.map((item, index) => (
          <Reveal key={item.title} className="entry" delay={80 + index * 60}>
            <div className="entry-top">
              <h3 className="entry-title">{item.title}</h3>
              <p className="entry-date">{item.period}</p>
            </div>
            <p className="entry-org">{item.organization}</p>
            <p className="entry-role">{item.role}</p>
            <ul className="entry-bullets">
              {item.bullets.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
