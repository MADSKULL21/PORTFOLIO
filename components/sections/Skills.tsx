import { skillGroups } from '@/content/portfolio';
import Reveal from '@/components/ui/Reveal';

export default function Skills() {
  return (
    <section id="skills" className="panel" data-reveal>
      <div className="panel-head">
        <p className="label">skills</p>
      </div>
      <h2 className="sr-only">Skills</h2>

      <div className="skill-columns">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} className="skill-group" delay={90 + index * 55}>
            <h3>{group.title}</h3>
            <div className="chip-cloud">
              {group.items.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
