import { cache } from 'react';
import { redis } from './redis';

type RawContributionDay = {
  date: string;
  count: number;
  level?: number;
};

type RawContributionResponse = {
  total?: {
    lastYear?: number;
  };
  contributions?: RawContributionDay[];
};

export type ContributionDay = {
  date: string;
  count: number;
};

export type ActivityDay = ContributionDay & {
  level: 0 | 1 | 2 | 3 | 4;
};

export type ActivitySummary = {
  totalContributions: number;
  activeDays: number;
  activeWeeks: number;
  longestStreak: number;
  currentStreak: number;
  busiestDay: ActivityDay | null;
};

export type GithubActivity = {
  username: string;
  days: ActivityDay[];
  summary: ActivitySummary;
  totalLastYear: number;
  fetchedAt: string;
};

const GITHUB_ACTIVITY_TTL_SECONDS = 60 * 60 * 6;
const GITHUB_ACTIVITY_ENDPOINT = 'https://github-contributions-api.jogruber.de/v4';
const FALLBACK_WINDOW_DAYS = 365;

const clampLevel = (level: number): ActivityDay['level'] => {
  if (level <= 0) {
    return 0;
  }
  if (level >= 4) {
    return 4;
  }
  return Math.round(level) as ActivityDay['level'];
};

const deriveLevel = (count: number): ActivityDay['level'] => {
  if (count <= 0) {
    return 0;
  }
  if (count < 4) {
    return 1;
  }
  if (count < 10) {
    return 2;
  }
  if (count < 20) {
    return 3;
  }
  return 4;
};

const formatIsoDate = (value: Date) => value.toISOString().slice(0, 10);

const getWeekStartKey = (date: string) => {
  const value = new Date(`${date}T00:00:00Z`);
  value.setUTCDate(value.getUTCDate() - value.getUTCDay());
  return formatIsoDate(value);
};

const buildFallbackDays = () => {
  const end = new Date();
  const endUtc = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate()));

  return Array.from({ length: FALLBACK_WINDOW_DAYS }, (_, index) => {
    const value = new Date(endUtc);
    value.setUTCDate(endUtc.getUTCDate() - (FALLBACK_WINDOW_DAYS - 1 - index));

    return {
      date: formatIsoDate(value),
      count: 0,
      level: 0 as const,
    };
  });
};

export function normalizeContributionDays(days: Array<ContributionDay & { level?: number }>) {
  return days.map(({ date, count, level }) => {
    const normalizedCount = Number.isFinite(count) && count > 0 ? Math.floor(count) : 0;

    return {
      date,
      count: normalizedCount,
      level: typeof level === 'number' ? clampLevel(level) : deriveLevel(normalizedCount),
    };
  });
}

export function buildActivitySummary(days: ActivityDay[]): ActivitySummary {
  let totalContributions = 0;
  let activeDays = 0;
  let longestStreak = 0;
  let runningStreak = 0;
  let busiestDay: ActivityDay | null = null;
  const activeWeeks = new Set<string>();

  for (const day of days) {
    totalContributions += day.count;

    if (day.count > 0) {
      activeDays += 1;
      runningStreak += 1;
      activeWeeks.add(getWeekStartKey(day.date));

      if (!busiestDay || day.count > busiestDay.count) {
        busiestDay = day;
      }
    } else {
      runningStreak = 0;
    }

    if (runningStreak > longestStreak) {
      longestStreak = runningStreak;
    }
  }

  let currentStreak = 0;
  for (let index = days.length - 1; index >= 0; index -= 1) {
    if (days[index]?.count > 0) {
      currentStreak += 1;
      continue;
    }
    break;
  }

  return {
    totalContributions,
    activeDays,
    activeWeeks: activeWeeks.size,
    longestStreak,
    currentStreak,
    busiestDay,
  };
}

const buildPayload = (username: string, contributions: RawContributionDay[], totalLastYear?: number): GithubActivity => {
  const days = normalizeContributionDays(contributions);
  const summary = buildActivitySummary(days);

  return {
    username,
    days,
    summary,
    totalLastYear: totalLastYear ?? summary.totalContributions,
    fetchedAt: new Date().toISOString(),
  };
};

const cacheKeyForUser = (username: string) => `portfolio:github-activity:${username.toLowerCase()}`;

const readCachedActivity = async (key: string) => {
  if (!redis) {
    return null;
  }

  try {
    const cached = await redis.get<GithubActivity>(key);
    return cached && Array.isArray(cached.days) && cached.days.length > 0 ? cached : null;
  } catch {
    return null;
  }
};

const writeCachedActivity = async (key: string, payload: GithubActivity) => {
  if (!redis) {
    return;
  }

  try {
    await redis.set(key, payload, { ex: GITHUB_ACTIVITY_TTL_SECONDS });
  } catch {
    // Ignore cache write failures and keep the page render intact.
  }
};

const fetchGithubActivityLive = async (username: string) => {
  const response = await fetch(`${GITHUB_ACTIVITY_ENDPOINT}/${encodeURIComponent(username)}?y=last`, {
    headers: { accept: 'application/json' },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`GitHub activity upstream returned ${response.status}`);
  }

  const payload = (await response.json()) as RawContributionResponse;
  const contributions = Array.isArray(payload.contributions) ? payload.contributions : [];

  if (!contributions.length) {
    throw new Error('GitHub activity upstream returned no contribution days');
  }

  return buildPayload(username, contributions, payload.total?.lastYear);
};

export const getGithubActivity = cache(async (username: string): Promise<GithubActivity> => {
  const normalizedUsername = username.trim();
  const key = cacheKeyForUser(normalizedUsername);
  const cached = await readCachedActivity(key);

  if (cached) {
    return cached;
  }

  try {
    const fresh = await fetchGithubActivityLive(normalizedUsername);
    await writeCachedActivity(key, fresh);
    return fresh;
  } catch {
    const fallback = buildPayload(normalizedUsername, buildFallbackDays(), 0);
    return fallback;
  }
});
