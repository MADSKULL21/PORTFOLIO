'use client';

import { cloneElement, useEffect, useMemo, useState } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import type { ActivityDay } from '@/lib/github-activity';
import {
  describeGithubActivity,
  formatGithubActivityStatus,
  GITHUB_ACTIVITY_LEGEND_LEVELS,
  GITHUB_ACTIVITY_THEME,
  type GithubActivityThemeMode,
} from '@/lib/github-activity-presenter';

type GithubActivityCalendarProps = {
  data: ActivityDay[];
  year: number;
  totalActivities: number;
};

const readTheme = (): GithubActivityThemeMode => {
  if (typeof document === 'undefined') {
    return 'dark';
  }

  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
};

export default function GithubActivityCalendar({ data, year, totalActivities }: GithubActivityCalendarProps) {
  const [theme, setTheme] = useState<GithubActivityThemeMode>(readTheme);
  const [hoveredActivity, setHoveredActivity] = useState<ActivityDay | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(readTheme());
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const activityLabel = useMemo(() => {
    return formatGithubActivityStatus(hoveredActivity, totalActivities, year);
  }, [hoveredActivity, totalActivities, year]);

  return (
    <div
      className="github-calendar-wrap"
      onMouseLeave={() => setHoveredActivity(null)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setHoveredActivity(null);
        }
      }}
    >
      <div className="github-calendar-viewport">
        <ActivityCalendar
          data={data}
          colorScheme={theme}
          theme={GITHUB_ACTIVITY_THEME}
          maxLevel={5}
          blockSize={14}
          blockMargin={5}
          blockRadius={4}
          fontSize={12}
          showWeekdayLabels={['mon', 'wed', 'fri']}
          showTotalCount={false}
          showColorLegend={false}
          renderBlock={(block, activity) =>
            cloneElement(block, {
              onMouseEnter: () =>
                setHoveredActivity((current) =>
                  current?.date === activity.date && current?.count === activity.count ? current : (activity as ActivityDay),
                ),
              onFocus: () => setHoveredActivity(activity as ActivityDay),
              title: describeGithubActivity(activity as ActivityDay),
              'aria-label': describeGithubActivity(activity as ActivityDay),
            })
          }
          className="github-calendar"
        />
      </div>

      <div className="github-activity-footer" aria-live="polite">
        <p className="github-activity-status">{activityLabel}</p>

        <div className="github-activity-legend" aria-hidden="true">
          <span>Less</span>
          <div className="github-activity-legend-scale">
            {GITHUB_ACTIVITY_LEGEND_LEVELS.map((level) => (
              <span
                key={level}
                className="github-activity-legend-swatch"
                style={{ backgroundColor: GITHUB_ACTIVITY_THEME[theme][level] }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
