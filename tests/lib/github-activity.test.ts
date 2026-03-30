import { describe, expect, it } from 'vitest';
import {
  buildActivitySummary,
  normalizeContributionDays,
} from '../../lib/github-activity';

describe('normalizeContributionDays', () => {
  it('preserves dates and normalizes contribution levels into the 0-4 range', () => {
    const normalized = normalizeContributionDays([
      { date: '2026-03-01', count: 0 },
      { date: '2026-03-02', count: 1 },
      { date: '2026-03-03', count: 5 },
      { date: '2026-03-04', count: 11 },
      { date: '2026-03-05', count: 23 },
    ]);

    expect(normalized).toEqual([
      { date: '2026-03-01', count: 0, level: 0 },
      { date: '2026-03-02', count: 1, level: 1 },
      { date: '2026-03-03', count: 5, level: 2 },
      { date: '2026-03-04', count: 11, level: 3 },
      { date: '2026-03-05', count: 23, level: 4 },
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
