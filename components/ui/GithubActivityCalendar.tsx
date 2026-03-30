'use client';

import { useEffect, useState } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import type { ActivityDay } from '@/lib/github-activity';

type ThemeMode = 'dark' | 'light';

type GithubActivityCalendarProps = {
  data: ActivityDay[];
};

const calendarTheme = {
  dark: ['#16110b', '#3f2a0c', '#7f5412', '#be8521', '#ffd54f'],
  light: ['#efe5d1', '#d9bb85', '#c58c34', '#a96617', '#7f4b0a'],
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

export default function GithubActivityCalendar({ data }: GithubActivityCalendarProps) {
  const [theme, setTheme] = useState<ThemeMode>(readTheme);

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

  return (
    <ActivityCalendar
      data={data}
      colorScheme={theme}
      theme={calendarTheme}
      blockSize={14}
      blockMargin={5}
      blockRadius={4}
      fontSize={12}
      showWeekdayLabels={['mon', 'wed', 'fri']}
      labels={{
        totalCount: '{{count}} contributions tracked across the last year',
        legend: {
          less: 'low',
          more: 'high',
        },
      }}
      tooltips={{
        activity: {
          text: (activity) =>
            `${activity.count} contribution${activity.count === 1 ? '' : 's'} on ${formatTooltipDate(activity.date)}`,
          withArrow: false,
          offset: 10,
          hoverRestMs: 20,
        },
        colorLegend: {
          text: (level) => `Intensity level ${level}`,
          withArrow: false,
          offset: 10,
        },
      }}
      className="github-calendar"
    />
  );
}

