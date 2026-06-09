# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # start dev server (localhost:3000)
npm run build     # production build
npm run lint      # ESLint
```

No test suite is configured yet.

## Architecture

This is a **Next.js 16** app (see AGENTS.md — breaking changes apply). It serves two distinct UIs under one project:

### Route groups

| Group | URL | Purpose |
|---|---|---|
| `(portfolio)` | `/` | Personal project showcase page |
| `(hub)` | `/hub`, `/tools/*` | GitHub repo analysis dashboard |

### Hub data flow

All GitHub API calls are proxied through `/api/github/[...path]/route.ts`, which forwards requests to `api.github.com` and injects `GITHUB_TOKEN` from `.env.local` when present. Client components call `/api/github/repos/{owner}/{repo}` etc. — never GitHub directly.

Repo state is stored in `RepoContext` (a React context + `localStorage` key `crh-repo`) and provided by `(hub)/layout.tsx`. `Sidebar` reads/writes this context; tool pages consume it via `useRepo()`.

### Adding a new tool page

1. Add an entry to the `NAV` array in `Sidebar.tsx` with `ready: true`.
2. Add the same entry to `TOOLS` in `(hub)/hub/page.tsx`.
3. Create `src/app/(hub)/tools/<slug>/page.tsx` as a `"use client"` component. Call `useRepo()` to get the current repo slug and fetch from `/api/github/…`.

### Theming

All colors are CSS custom properties defined in `globals.css` (e.g. `var(--accent)` is coral pink `#F88379`). Use these variables — do not hardcode colors except when a value needs to differ per-item (e.g. language color dots).

### Environment

`GITHUB_TOKEN` in `.env.local` raises the GitHub API rate limit from 60 to 5000 req/hr and enables access to private repos.
