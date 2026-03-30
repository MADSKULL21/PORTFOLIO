import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const numericKeys = ['views', 'themeToggles', 'clicks', 'travelPx', 'scrolls', 'keys'] as const;

type NumericKey = (typeof numericKeys)[number];

type StatsState = {
  views: number;
  themeToggles: number;
  clicks: number;
  travelPx: number;
  scrolls: number;
  keys: number;
  updatedAt: string;
};

const store: StatsState = {
  views: 0,
  themeToggles: 0,
  clicks: 0,
  travelPx: 0,
  scrolls: 0,
  keys: 0,
  updatedAt: new Date().toISOString(),
};

const isNumericKey = (value: string): value is NumericKey =>
  numericKeys.includes(value as NumericKey);

const sanitizeCount = (value: unknown): number => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return 0;
  }
  return Math.floor(numeric);
};

export async function GET() {
  return NextResponse.json(store);
}

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown> = {};

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    payload = {};
  }

  const metric = typeof payload.metric === 'string' && isNumericKey(payload.metric) ? payload.metric : null;

  if (metric) {
    const amount = sanitizeCount(payload.amount) || 1;
    store[metric] += amount;
  } else {
    for (const key of numericKeys) {
      const amount = sanitizeCount(payload[key]);
      if (amount > 0) {
        store[key] += amount;
      }
    }
  }

  store.updatedAt = new Date().toISOString();

  return NextResponse.json(store);
}
