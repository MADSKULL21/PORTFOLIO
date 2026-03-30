import GithubActivityCalendar from '@/components/ui/GithubActivityCalendar';
import { getGithubActivity } from '@/lib/github-activity';
import Reveal from '@/components/ui/Reveal';

const githubUsername = 'MADSKULL21';

const formatBusyDay = (date: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));

export default async function GithubSection() {
  const activity = await getGithubActivity(githubUsername);
  const busiestDayLabel = activity.summary.busiestDay
    ? `${activity.summary.busiestDay.count} on ${formatBusyDay(activity.summary.busiestDay.date)}`
    : 'No public activity yet';

  return (
    <section id="github-graph" className="panel github-activity-panel" data-reveal>
      <div className="panel-head compact">
        <p className="label">github activity</p>
        <a className="panel-link" href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer">
          open github ↗
        </a>
      </div>
      <h2 className="sr-only">GitHub Activity</h2>

      <div className="github-activity-layout">
        <Reveal className="github-activity-copy">
          <p className="github-activity-sub">
            Public contribution history, rendered live and cached server-side for faster repeat loads.
          </p>

          <div className="github-activity-metrics">
            <div className="github-activity-stat">
              <span className="github-activity-stat-label">last 12 months</span>
              <strong className="github-activity-stat-value">{activity.summary.totalContributions}</strong>
              <span className="github-activity-stat-note">total contributions</span>
            </div>

            <div className="github-activity-stat">
              <span className="github-activity-stat-label">current streak</span>
              <strong className="github-activity-stat-value">{activity.summary.currentStreak}</strong>
              <span className="github-activity-stat-note">consecutive active days</span>
            </div>

            <div className="github-activity-stat">
              <span className="github-activity-stat-label">active weeks</span>
              <strong className="github-activity-stat-value">{activity.summary.activeWeeks}</strong>
              <span className="github-activity-stat-note">weeks with shipped work</span>
            </div>

            <div className="github-activity-stat">
              <span className="github-activity-stat-label">busiest day</span>
              <strong className="github-activity-stat-value">{busiestDayLabel}</strong>
              <span className="github-activity-stat-note">highest public output</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="github-activity-shell" delay={90}>
          <GithubActivityCalendar data={activity.days} />
        </Reveal>
      </div>
    </section>
  );
}
