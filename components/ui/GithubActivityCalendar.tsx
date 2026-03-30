'use client';

import { cloneElement, useEffect, useMemo, useState } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import type { ActivityDay } from '@/lib/github-activity';

type ThemeMode = 'dark' | 'light';

type GithubActivityCalendarProps = {
  data: ActivityDay[];
  year: number;
  totalActivities: number;
};

const calendarTheme = {
  dark: ['#2a2a2a', '#4c4c4c', '#767676', '#a7a7a7', '#dfdfdf'],
  light: ['#e7e0d4', '#cec5b6', '#aca191', '#847968', '#5d5344'],
};

const readTheme = (): ThemeMode => {
  if (typeof document === 'undefined') {
    return 'dark';
  }

  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
};

const formatTooltipDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));

const describeActivity = (activity: ActivityDay) =>
  `${activity.count} contribution${activity.count === 1 ? '' : 's'} on ${formatTooltipDate(activity.date)}`;

const legendLevels = [0, 1, 2, 3, 4];

export default function GithubActivityCalendar({ data, year, totalActivities }: GithubActivityCalendarProps) {
  const [theme, setTheme] = useState<ThemeMode>(readTheme);
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
    if (hoveredActivity) {
      return describeActivity(hoveredActivity);
    }

    return `${totalActivities} activities in ${year}`;
  }, [hoveredActivity, totalActivities, year]);

  return (
    <div className="github-calendar-wrap">
      <ActivityCalendar
        data={data}
        colorScheme={theme}
        theme={calendarTheme}
        blockSize={14}
        blockMargin={5}
        blockRadius={4}
        fontSize={12}
        showWeekdayLabels={['mon', 'wed', 'fri']}
        showTotalCount={false}
        showColorLegend={false}
        renderBlock={(block, activity) =>
          cloneElement(block, {
            onMouseEnter: () => setHoveredActivity(activity as ActivityDay),
            onMouseLeave: () => setHoveredActivity(null),
            onFocus: () => setHoveredActivity(activity as ActivityDay),
            onBlur: () => setHoveredActivity(null),
            'aria-label': describeActivity(activity as ActivityDay),
          })
        }
        className="github-calendar"
      />

      <div className="github-activity-footer" aria-live="polite">
        <p className="github-activity-status">{activityLabel}</p>

        <div className="github-activity-legend" aria-hidden="true">
          <span>Less</span>
          <div className="github-activity-legend-scale">
            {legendLevels.map((level) => (
              <span
                key={level}
                className="github-activity-legend-swatch"
                style={{ backgroundColor: calendarTheme[theme][level] }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
