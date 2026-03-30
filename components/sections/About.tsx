import { aboutPoints } from '@/content/portfolio';
import Reveal from '@/components/ui/Reveal';

export default function About() {
  return (
    <section id="about" className="panel" data-reveal>
      <div className="panel-head">
        <p className="label">about</p>
      </div>
      <h2 className="sr-only">About</h2>

      <div className="about-grid">
        <Reveal className="about-content" delay={120}>
          {aboutPoints.map((point) => (
            <p key={point}>{point}</p>
          ))}
          <div className="about-tags">
            <span>NLP</span>
            <span>LLM Assistants</span>
            <span>Automation</span>
            <span>Inference Optimization</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
