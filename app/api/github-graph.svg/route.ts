import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const FALLBACK_COLOR = '#ffd54f';

const createFallbackSvg = (username: string) => {
  const cells: string[] = [];
  const palette = ['#1a1408', '#2d220f', '#6d4f12', '#aa7d1e', '#ffd54f'];

  for (let week = 0; week < 24; week += 1) {
    for (let day = 0; day < 7; day += 1) {
      const intensity = (week * 11 + day * 5) % palette.length;
      const x = 20 + week * 15;
      const y = 34 + day * 15;
      cells.push(`<rect x="${x}" y="${y}" width="11" height="11" rx="2" fill="${palette[intensity]}" />`);
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="170" role="img" aria-label="GitHub contribution fallback graph for ${username}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0d0905"/>
      <stop offset="100%" stop-color="#171008"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" rx="14" fill="url(#bg)"/>
  <text x="20" y="20" fill="#f6e5b4" font-size="12" font-family="IBM Plex Mono, Menlo, monospace">${username} · Contribution Activity</text>
  ${cells.join('')}
</svg>`;
};

export async function GET(request: NextRequest) {
  const user = request.nextUrl.searchParams.get('user') || 'MADSKULL21';
  const color = request.nextUrl.searchParams.get('color') || FALLBACK_COLOR.replace('#', '');

  try {
    const sourceUrl = `https://ghchart.rshah.org/${encodeURIComponent(color)}/${encodeURIComponent(user)}`;
    const response = await fetch(sourceUrl, {
      headers: { accept: 'image/svg+xml' },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Upstream returned ${response.status}`);
    }

    const svg = await response.text();
    if (!svg.includes('<svg')) {
      throw new Error('Invalid SVG response');
    }

    return new NextResponse(svg, {
      headers: {
        'content-type': 'image/svg+xml; charset=utf-8',
        'cache-control': 's-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    return new NextResponse(createFallbackSvg(user), {
      headers: {
        'content-type': 'image/svg+xml; charset=utf-8',
        'cache-control': 'no-store',
      },
    });
  }
}
