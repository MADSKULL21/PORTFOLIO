# GitHub Activity Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the image-based GitHub graph with a server-rendered activity calendar backed by cached contribution data, while tightening the panel system and motion language around the section.

**Architecture:** Add a server-only GitHub activity utility that fetches contribution data from a public API, normalizes it for `react-activity-calendar`, and caches it in Redis when Upstash credentials are available. Render the calendar in the existing App Router section as a server component, and refresh the surrounding panel styling in the global stylesheet so the section matches the site’s dark industrial visual system.

**Tech Stack:** Next.js 16.1.6 App Router, React 19, TypeScript, `react-activity-calendar`, `@upstash/redis`, global CSS, Route Handlers.

---

### Task 1: Add activity data dependencies and test harness

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `tests/lib/github-activity.test.ts`

- [ ] **Step 1: Add the new dependencies**

```json
{
  "scripts": {
    "test": "vitest run"
  },
  "dependencies": {
    "@upstash/redis": "^1.35.3",
    "react-activity-calendar": "^2.9.3"
  },
  "devDependencies": {
    "vitest": "^3.2.4"
  }
}
```

- [ ] **Step 2: Write the failing tests for normalization and summaries**

```ts
import { describe, expect, it } from 'vitest';
import {
  buildActivitySummary,
  normalizeContributionDays,
} from '@/lib/github-activity';

describe('normalizeContributionDays', () => {
  it('maps raw contribution days into calendar entries with GitHub-style levels', () => {
    const normalized = normalizeContributionDays([
      { date: '2026-03-01', count: 0 },
      { date: '2026-03-02', count: 2 },
      { date: '2026-03-03', count: 7 },
      { date: '2026-03-04', count: 14 },
      { date: '2026-03-05', count: 21 },
    ]);

    expect(normalized).toEqual([
      { date: '2026-03-01', count: 0, level: 0 },
      { date: '2026-03-02', count: 2, level: 1 },
      { date: '2026-03-03', count: 7, level: 2 },
      { date: '2026-03-04', count: 14, level: 3 },
      { date: '2026-03-05', count: 21, level: 4 },
    ]);
  });
});

describe('buildActivitySummary', () => {
  it('computes totals, streak, and active weeks from normalized data', () => {
    const summary = buildActivitySummary([
      { date: '2026-03-01', count: 1, level: 1 },
      { date: '2026-03-02', count: 3, level: 1 },
      { date: '2026-03-03', count: 0, level: 0 },
      { date: '2026-03-04', count: 4, level: 2 },
      { date: '2026-03-05', count: 5, level: 2 },
      { date: '2026-03-06', count: 1, level: 1 },
      { date: '2026-03-07', count: 2, level: 1 },
    ]);

    expect(summary.totalContributions).toBe(16);
    expect(summary.longestStreak).toBe(4);
    expect(summary.currentStreak).toBe(4);
    expect(summary.activeWeeks).toBe(2);
  });
});
```

- [ ] **Step 3: Run the test command and confirm it fails because the module does not exist**

Run: `npm test -- tests/lib/github-activity.test.ts`
Expected: FAIL with module resolution errors for `@/lib/github-activity`

### Task 2: Implement server-side GitHub activity utilities

**Files:**
- Create: `lib/redis.ts`
- Create: `lib/github-activity.ts`
- Modify: `tsconfig.json`
- Test: `tests/lib/github-activity.test.ts`

- [ ] **Step 1: Implement a guarded Redis client**

```ts
import 'server-only';
import { Redis } from '@upstash/redis';

const hasRedisEnv = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

export const redis = hasRedisEnv ? Redis.fromEnv() : null;
```

- [ ] **Step 2: Implement fetching, normalization, summary building, and cache helpers**

```ts
import 'server-only';

export type ContributionDay = { date: string; count: number };
export type ActivityDay = ContributionDay & { level: 0 | 1 | 2 | 3 | 4 };

export function normalizeContributionDays(days: ContributionDay[]): ActivityDay[] {
  return days.map(({ date, count }) => ({
    date,
    count,
    level: count === 0 ? 0 : count < 4 ? 1 : count < 9 ? 2 : count < 15 ? 3 : 4,
  }));
}
```

- [ ] **Step 3: Run the focused tests and confirm they pass**

Run: `npm test -- tests/lib/github-activity.test.ts`
Expected: PASS

### Task 3: Replace the GitHub image graph with the calendar card

**Files:**
- Modify: `components/sections/GithubSection.tsx`
- Delete: `components/ui/GithubGraph.tsx`
- Delete: `app/api/github-graph.svg/route.ts`

- [ ] **Step 1: Convert the section into an async server component that loads cached activity data**

```tsx
import ActivityCalendar from 'react-activity-calendar';
import { getGithubActivity } from '@/lib/github-activity';

export default async function GithubSection() {
  const activity = await getGithubActivity('MADSKULL21');
  return <ActivityCalendar data={activity.days} />;
}
```

- [ ] **Step 2: Add summary cards and a custom tooltip label format around the calendar**

```tsx
labels={{
  totalCount: '{{count}} contributions in the last year',
}}
renderBlock={(block, activity) => (
  <div title={`${activity.count} contributions on ${activity.date}`}>{block}</div>
)}
```

- [ ] **Step 3: Run the focused tests and then the full project checks**

Run: `npm test -- tests/lib/github-activity.test.ts && npm run lint && npm run build`
Expected: PASS

### Task 4: Upgrade panel framing and activity-specific styling

**Files:**
- Modify: `app/globals.css`
- Modify: `README.md`

- [ ] **Step 1: Strengthen panel separators and add activity-card-specific tokens**

```css
:root {
  --panel-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

.panel::before {
  content: '';
  position: absolute;
}
```

- [ ] **Step 2: Style the calendar, summary blocks, tooltips, and panel accents to match the site**

```css
.github-activity-card {
  position: relative;
}

.github-calendar [data-level='4'] {
  fill: #ffd54f;
}
```

- [ ] **Step 3: Re-run lint and build after the CSS changes**

Run: `npm run lint && npm run build`
Expected: PASS
