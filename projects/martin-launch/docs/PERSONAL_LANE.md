# Personal Lane

This repo keeps your machine-wide work settings intact while providing a
personal-safe lane for this project.

## What is isolated

- Git identity via `config/personal/.gitconfig`
- npm registry via local `.npmrc`
- GitHub CLI state via `.personal-auth/gh`
- Wrangler state via `.personal-auth/wrangler`

## How to enter the lane

From the repo root:

```powershell
npm run personal:shell
```

That opens a new PowerShell window with repo-scoped environment variables set.

## Current state

- Repo-local Git email: `day.zachc@gmail.com`
- Repo-local npm registry: `https://registry.npmjs.org/`
- Current `origin`: shared repo until you replace it

## Before any public push

Replace `origin` with your personal repository URL:

```powershell
git remote set-url origin https://github.com/<your-user>/<your-repo>.git
```

Then authenticate from inside the personal shell so credentials are established
in the personal lane rather than inherited from work tooling.
