import { describe, expect, it } from 'vitest';
import {
  buildYearActivityWindow,
  buildActivitySummary,
  normalizeContributionDays,
} from '../../lib/github-activity';
import {
  describeGithubActivity,
  formatGithubActivityStatus,
  GITHUB_ACTIVITY_THEME,
} from '../../lib/github-activity-presenter';

describe('buildYearActivityWindow', () => {
  it('returns a full Jan-Dec UTC activity window for the requested year', () => {
    const days = buildYearActivityWindow(2026);

    expect(days).toHaveLength(365);
    expect(days[0]).toEqual({ date: '2026-01-01', count: 0, level: 0 });
    expect(days[days.length - 1]).toEqual({ date: '2026-12-31', count: 0, level: 0 });
  });
});

describe('normalizeContributionDays', () => {
  it('preserves dates and normalizes contribution levels into the 0-4 range', () => {
    const normalized = normalizeContributionDays([
      { date: '2026-03-01', count: 0 },
      { date: '2026-03-02', count: 1 },
      { date: '2026-03-03', count: 3 },
      { date: '2026-03-04', count: 7 },
      { date: '2026-03-05', count: 15 },
      { date: '2026-03-06', count: 23 },
    ]);

    expect(normalized).toEqual([
      { date: '2026-03-01', count: 0, level: 0 },
      { date: '2026-03-02', count: 1, level: 1 },
      { date: '2026-03-03', count: 3, level: 2 },
      { date: '2026-03-04', count: 7, level: 3 },
      { date: '2026-03-05', count: 15, level: 4 },
      { date: '2026-03-06', count: 23, level: 5 },
    ]);
  });
});

describe('buildActivitySummary', () => {
  it('calculates totals, active weeks, and streaks from normalized activity days', () => {
    const summary = buildActivitySummary([
      { date: '2026-03-01', count: 0, level: 0 },
      { date: '2026-03-02', count: 3, level: 1 },
      { date: '2026-03-03', count: 5, level: 2 },
      { date: '2026-03-04', count: 0, level: 0 },
      { date: '2026-03-05', count: 7, level: 2 },
      { date: '2026-03-06', count: 1, level: 1 },
      { date: '2026-03-07', count: 2, level: 1 },
      { date: '2026-03-08', count: 4, level: 2 },
    ]);

    expect(summary.totalContributions).toBe(22);
    expect(summary.activeDays).toBe(6);
    expect(summary.activeWeeks).toBe(2);
    expect(summary.longestStreak).toBe(4);
    expect(summary.currentStreak).toBe(4);
    expect(summary.busiestDay).toEqual({ date: '2026-03-05', count: 7, level: 2 });
  });
});

describe('github activity presenter', () => {
  it('formats a hovered contribution label with the exact day', () => {
    expect(
      describeGithubActivity({
        date: '2026-02-26',
        count: 7,
        level: 2,
      }),
    ).toBe('7 contributions on Feb 26, 2026');
  });

  it('falls back to the annual total label when no activity is hovered', () => {
    expect(formatGithubActivityStatus(null, 210, 2026)).toBe('210 activities in 2026');
  });

  it('uses a consistent five-stop heatmap scale for both themes', () => {
    expect(GITHUB_ACTIVITY_THEME.dark).toEqual(['#1b1711', '#2f2718', '#4f3b1c', '#7c5720', '#b98428', '#f0d26b']);
    expect(GITHUB_ACTIVITY_THEME.light).toEqual(['#f5ecdc', '#ecdcb9', '#dbbe83', '#c69545', '#9b681b', '#71450f']);
  });
});
