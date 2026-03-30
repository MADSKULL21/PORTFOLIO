import GithubActivityCalendar from '@/components/ui/GithubActivityCalendar';
import { getGithubActivity } from '@/lib/github-activity';
import Reveal from '@/components/ui/Reveal';

const githubUsername = 'MADSKULL21';
const activityYear = 2026;

export default async function GithubSection() {
  const activity = await getGithubActivity(githubUsername, activityYear);

  return (
    <section id="github-graph" className="panel github-activity-panel" data-reveal>
      <div className="github-activity-head">
        <h2 className="github-activity-title">GitHub Activity</h2>
        <a className="panel-link" href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer">
          open github ↗
        </a>
      </div>

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
