# Shaunak Lad Portfolio

Next.js 16 portfolio project for Shaunak Lad, built with the App Router, TypeScript, a single global CSS system, and a server-rendered GitHub activity card.

## Stack

- Next.js 16.1.6
- React 19
- TypeScript
- Global CSS
- `react-activity-calendar`
- Upstash Redis cache fallback support
- Route Handlers at `/api/stats`

## Structure

```text
app/
  api/
  globals.css
  layout.tsx
  page.tsx
components/
  layout/
  sections/
  system/
  ui/
content/
  portfolio.ts
public/
  images/
  Shaunak_ML_RESUME.pdf
lib/
  github-activity.ts
  redis.ts
```

## Development

```bash
npm install
npm run dev
```

To enable Redis-backed caching for the GitHub activity card on Vercel, set:

```bash
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

## Verification

```bash
npm run lint
npm run build
```
