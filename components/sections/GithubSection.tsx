import GithubActivityCalendar from '@/components/ui/GithubActivityCalendar';
import { getGithubActivity } from '@/lib/github-activity';
import Reveal from '@/components/ui/Reveal';

const githubUsername = 'MADSKULL21';
const activityYear = 2026;

export default async function GithubSection() {
  const activity = await getGithubActivity(githubUsername, activityYear);

  return (
    <section id="github-graph" className="panel github-activity-panel" data-reveal>
      <div className="panel-head github-activity-head">
        <p className="label">GitHub Activity</p>
        <a className="panel-link" href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer">
          open github ↗
        </a>
      </div>
      <h2 className="sr-only">GitHub Activity</h2>

      <Reveal className="github-activity-shell" delay={90}>
        <GithubActivityCalendar
          data={activity.days}
          year={activity.year}
          totalActivities={activity.totalForYear}
        />
      </Reveal>
    </section>
  );
}
