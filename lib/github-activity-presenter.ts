import type { ActivityDay } from './github-activity';

export type GithubActivityThemeMode = 'dark' | 'light';

export const GITHUB_ACTIVITY_THEME: Record<
  GithubActivityThemeMode,
  [string, string, string, string, string, string]
> = {
  dark: ['#1b1711', '#2f2718', '#4f3b1c', '#7c5720', '#b98428', '#f0d26b'],
  light: ['#f5ecdc', '#ecdcb9', '#dbbe83', '#c69545', '#9b681b', '#71450f'],
};

export const GITHUB_ACTIVITY_LEGEND_LEVELS = [0, 1, 2, 3, 4, 5] as const;

export const formatGithubActivityDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));

export const describeGithubActivity = (activity: ActivityDay) =>
  `${activity.count} contribution${activity.count === 1 ? '' : 's'} on ${formatGithubActivityDate(activity.date)}`;

export const formatGithubActivityStatus = (activity: ActivityDay | null, totalActivities: number, year: number) =>
  activity ? describeGithubActivity(activity) : `${totalActivities} activities in ${year}`;
