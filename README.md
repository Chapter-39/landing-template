# Landing Template

Status: Maintenance mode (stable; CI + Dependabot enabled)

Minimal landing template with ESLint, Prettier, Husky + lint-staged, TypeScript, and GitHub Actions CI/CD. Builds a single-file artifact (`dist/index.html`) for simple hosting or GitHub Pages.

## Requirements

- Node 20+
- npm 9+

## Setup

```bash
npm ci
npm run prepare # sets up Husky hooks
```

## Scripts

- `lint`: Lint codebase via ESLint
- `lint:fix`: Auto-fix lint issues
- `format`: Format with Prettier
- `format:check`: Verify formatting
- `build`: Produce `dist/index.html` (single file)
- `test`: Run tests once with Vitest
- `test:ci`: Run tests with coverage
- `deploy`: Deploy `dist/` to GitHub Pages (used by workflow)

## Usage

Build locally:

```bash
npm run build
open dist/index.html # or xdg-open on Linux
```

Run tests:

```bash
npm run test
# CI-style with coverage
npm run test:ci
```

## Deployment

Releases are deployed to GitHub Pages when pushing a version tag `v*.*.*`:

1. Bump version in `package.json` and create a tag, e.g. `v1.2.3`.
2. Push the tag to GitHub.
3. The `Deploy Landing to GitHub Pages` workflow builds and runs `npm run deploy` to publish `dist/`.

Environment: Uses the `GITHUB_TOKEN` provided by Actions; no secrets required. Custom domain handled by the deploy script via `CNAME` file.

## Maintenance

- Node: `"engines": { "node": ">=20" }` is enforced in CI.
- Dependencies: Dependabot is enabled to keep dev dependencies up to date.
- CI: `ci.yml` runs install, lint, format check, build, and tests (with coverage artifact).
- Code style: Prettier + ESLint. Run `npm run lint:fix` and `npm run format` before PRs.
- PRs: Conventional Commits enforced via PR title lint. See `.github/PULL_REQUEST_TEMPLATE.md`.

### Deploy configuration

The GitHub Pages deploy script supports an optional `CNAME` via the `CNAME_DOMAIN` environment variable. The workflow sets it to `chapter-39.vasa.me` by default. Change or remove this value in `.github/workflows/deploy.yml` if you fork this template.

## Project Layout

- `src/`: TypeScript entry (`main.ts`).
- `script/inline-build.mjs`: Builds and inlines JS into a single HTML file.
- `tests/`: Minimal smoke tests with Vitest.
