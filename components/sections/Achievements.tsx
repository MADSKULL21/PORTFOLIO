import { achievements } from '@/content/portfolio';
import Reveal from '@/components/ui/Reveal';

export default function Achievements() {
  return (
    <section id="achievements" className="panel" data-reveal>
      <div className="panel-head">
        <p className="label">Impact Delivered</p>
      </div>
      <h2 className="sr-only">Impact Delivered</h2>

      <div className="activity-grid">
        {achievements.map((item, index) => (
          <Reveal key={item.label} className="silly-stat" delay={130 + index * 55}>
            <span className="silly-stat-label">{item.label}</span>
            <span className="silly-stat-value">{item.value}</span>
            <span className="silly-stat-sub">{item.note}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
