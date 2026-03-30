import { projects } from '@/content/portfolio';
import Reveal from '@/components/ui/Reveal';

export default function Projects() {
  return (
    <section id="projects" className="panel projects-panel" data-reveal>
      <div className="panel-head">
        <p className="label">my projects</p>
        <a className="panel-link" href="https://github.com/MADSKULL21" target="_blank" rel="noopener noreferrer">
          view more projects ↗
        </a>
      </div>
      <h2 className="sr-only">Projects</h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <Reveal key={project.title} className="project-card" delay={70 + index * 45}>
            <div className="project-content">
              <div className="project-top">
                <a className="project-title" href={project.link} target="_blank" rel="noopener noreferrer">
                  {project.title} <span>↗</span>
                </a>
                <p className="project-date">{project.date}</p>
              </div>
              <div className="project-stack">
                {project.stack.map((item) => (
                  <span key={item} className="stack-chip">
                    {item}
                  </span>
                ))}
              </div>
              <p className="project-summary">{project.summary}</p>
              <ul className="project-points">
                {project.bullets.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
