# Martin Launch

Cinematic internal launch surface for Martin. The site is intentionally narrow:
one hero-first page, one abstract positioning line, and one primary `Launch Martin`
handoff.

## Stack

- Next.js App Router
- TypeScript
- CSS token layer in `src/app/globals.css`
- Config surface in `src/lib/site-config.ts`

## Config

Copy `.env.example` to `.env.local` and adjust only if needed:

```bash
MARTIN_URL=https://chat.zoominfo.co/300/agents/8238
SITE_TITLE=Launch Martin
SITE_TAGLINE=Martin keeps the thread when the work gets noisy.
```

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run build
```

## Tracking

The primary CTA dispatches `agent_launch` in three ways:

- pushes to `window.dataLayer` when present
- calls `window.gtag("event", "agent_launch", ...)` when present
- emits a `martin:launch-click` browser event for local instrumentation

## Personal Lane

This repo is set up to support a personal lane without changing your machine-wide
work config.

- Local Git identity for this repo is already set to `day.zachc@gmail.com`
- Local `.npmrc` forces the public npm registry for this repo
- `npm run personal:shell` opens a PowerShell session that points Git and auth
  tooling at repo-local personal config paths

Important:

- The current `origin` still points at `https://github.com/dachzay/projects.git`
- Before pushing publicly, replace that remote with your personal repo
- The personal shell intentionally disables the inherited Git credential helper,
  so future GitHub auth in that shell will be explicit and personal
