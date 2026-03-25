# Project Rules

## Language

- Use English for code identifiers, code comments, Markdown documentation, and commit messages.
- Keep the user-facing classroom copy in Spanish unless there is a product decision to change the UI language.

## Encoding and Formatting

- Save source files as UTF-8.
- Respect `.editorconfig` defaults.
- Keep HTML, CSS, and JavaScript formatted consistently with 2-space indentation.

## Documentation Sync

- Update `README.md`, `ARCHITECTURE.md`, or `RULES.md` whenever code changes affect setup, structure, behavior, or conventions.
- Do not let documentation drift away from the actual implementation.

## Dependency Management

- Prefer stable releases unless there is a clear reason to adopt prereleases.
- Keep the project aligned with the official npm registry for reproducible installs and working audits.
- After dependency changes, run `npm install`, `npm audit`, and `npm run build`.

## Frontend Behavior

- Preserve keyboard accessibility for interactive controls.
- Keep motion optional and respect reduced-motion preferences.
- Ensure the layout remains usable on both desktop and mobile breakpoints.
- Keep all supported locales in sync when adding or changing user-facing copy.
- Do not add hardcoded UI strings in `main.js` when they belong in `src/i18n.js`.

## Persistence

- Treat `localStorage` keys as part of the public client contract.
- Preserve backward compatibility for stored thresholds and streak data unless a migration strategy is added.
- Preserve backward compatibility for the saved language key unless a migration is introduced.

## Git Workflow

- Initialize Git before ongoing maintenance work when the repository is missing `.git`.
- Create descriptive commits after successful tasks.
- Push only when a remote is configured and available.
