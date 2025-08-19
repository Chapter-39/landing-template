# Repository Guidelines

## Project Structure & Module Organization

- Root contains configuration: `.editorconfig`, `eslint.config.cjs`, `.prettierrc.json`, `.husky/`, and CI in `.github/`.
- No application code is included by default. Add source under `src/` and tests under `tests/` or colocated as `*.test.(js|ts)`.
- Keep generated artifacts out of version control (`dist/`, `node_modules/`). Static assets can live in `public/` or `assets/`.

## Build, Test, and Development Commands

- `npm ci`: Install exact lockfile dependencies (required for CI parity).
- `npm run prepare`: Set up Husky git hooks.
- `npm run lint`: Lint codebase via ESLint.
- `npm run lint:fix`: Auto-fix lint issues where possible.
- `npm run format`: Format the repo with Prettier.
- `npm run format:check`: Verify formatting without writing changes.

## Coding Style & Naming Conventions

- Indentation: 2 spaces; LF line endings; final newline enforced (`.editorconfig`).
- Prettier: width 100, double quotes, semicolons on, trailing commas where valid.
- ESLint: `@eslint/js` recommended rules + `eslint-plugin-import`; Prettier config disables conflicting rules.
- Names: files/folders kebab-case (`my-module.ts`), classes/types PascalCase, functions/vars camelCase, constants SCREAMING_SNAKE_CASE.
- Imports: prefer absolute within project root or clean relative paths; group and sort consistently.

## Testing Guidelines

- No test framework is bundled. Recommended: Vitest or Jest.
- Place tests in `tests/**` or alongside sources as `*.test.ts`/`*.spec.ts`.
- Aim for meaningful unit coverage on utilities and modules that contain logic. Add lightweight integration tests when applicable.
- Run linting and formatting in CI; extend the workflow when tests are added.

## Commit & Pull Request Guidelines

- PR titles must follow Conventional Commits (enforced by `pr-title-check.yml`): `feat: ...`, `fix: ...`, `docs: ...`, etc.
- Use the PR template: include a clear summary, change type, how to test, and checklist. Link issues (e.g., `Closes #123`).
- Keep commits focused and descriptive; prefer incremental, reviewable changes over large dumps.
- CODEOWNERS exists; ensure reviewers are requested as appropriate.

## Security & Configuration Tips

- Require Node 20+. Never commit secrets; `.env` is ignored. Use GitHub Actions secrets for CI.
- Dependabot is enabled; keep dependencies current. Review updates with CI green.
