# Convert.io Agent Guidelines

> **Project**: Convert.io — A modern, minimal universal unit & currency converter.
> **Version**: 0.1.0 · **License**: Private · **Node**: ≥ 20

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
- [Design Language](#design-language)
- [Conversion Engine](#conversion-engine)
- [Component Reference](#component-reference)
- [State Management](#state-management)
- [Testing](#testing)
- [Scripts & Commands](#scripts--commands)
- [CI/CD & GitHub Actions](#cicd--github-actions)
- [Development Workflow](#development-workflow)
- [Code Conventions](#code-conventions)
- [Adding New Unit Categories](#adding-new-unit-categories)
- [Known Limitations & Future Work](#known-limitations--future-work)

---

## Tech Stack

| Layer          | Technology                     | Version  |
|----------------|--------------------------------|----------|
| Framework      | Next.js (App Router)           | 16.x     |
| Language       | TypeScript (strict mode)       | 5.x      |
| UI Library     | NextUI                         | 2.x      |
| Styling        | Tailwind CSS                   | 3.x      |
| Theme          | next-themes                    | 0.4.x    |
| Icons          | Lucide React                   | 1.x      |
| Animation      | Framer Motion                  | 13.x     |
| Font           | Inter (Google Fonts via next/font) | —     |
| Testing        | Vitest + Testing Library       | 4.x      |
| CI/CD          | GitHub Actions                 | —        |

---

## Project Structure

```
convert.io/
├── .github/
│   └── workflows/
│       ├── ci.yml                 # CI pipeline: lint → typecheck → test → build
│       ├── deploy.yml             # GitHub Pages deployment: verify → export → deploy
│       └── deploy-preview.yml     # PR preview build + artifact upload
├── __tests__/
│   ├── setup.ts                   # Vitest setup (jest-dom matchers)
│   └── lib/
│       ├── conversions.test.ts    # Conversion engine tests
│       └── units.test.ts          # Unit definition integrity tests
├── app/
│   ├── layout.tsx                 # Root layout (Inter font, Providers)
│   ├── page.tsx                   # Home page (hero + ConversionCard)
│   ├── providers.tsx              # Client provider (NextUI + next-themes)
│   ├── globals.css                # Tailwind directives + CSS variables
│   └── favicon.ico
├── components/
│   ├── CategorySelector.tsx       # Horizontal tab bar for category switching
│   ├── ConversionCard.tsx         # Main converter card (orchestrates state)
│   ├── ThemeSwitcher.tsx          # Light/dark mode toggle
│   └── UnitInput.tsx              # Numeric input + unit dropdown
├── lib/
│   ├── conversions.ts             # Conversion engine & category registry
│   └── units/
│       ├── types.ts               # TypeScript interfaces
│       ├── length.ts              # Length units (base: meter)
│       ├── weight.ts              # Weight units (base: kilogram)
│       ├── temperature.ts         # Temperature units (base: Celsius, custom fns)
│       ├── area.ts                # Area units (base: square meter)
│       ├── volume.ts              # Volume units (base: liter)
│       └── currency.ts            # Currency units (base: USD, mocked rates)
├── AGENTS.md                      # ← You are here
├── tailwind.config.js             # Tailwind v3 config with NextUI plugin
├── postcss.config.js              # PostCSS (tailwindcss + autoprefixer)
├── vitest.config.ts               # Vitest configuration
├── tsconfig.json                  # TypeScript config (strict, path aliases)
├── next.config.ts                 # Next.js configuration
├── eslint.config.mjs              # ESLint flat config (core-web-vitals + TS)
└── package.json                   # Dependencies and scripts
```

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│  app/layout.tsx                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Providers (NextUI + next-themes)                          │  │
│  │  ┌──────────────────────────────────────────────────────┐  │  │
│  │  │  app/page.tsx                                        │  │  │
│  │  │  ┌─────────────┐  ┌──────────────────────────────┐   │  │  │
│  │  │  │ThemeSwitcher│  │       ConversionCard         │   │  │  │
│  │  │  └─────────────┘  │  ┌────────────────────────┐  │   │  │  │
│  │  │                   │  │   CategorySelector      │  │   │  │  │
│  │  │                   │  ├────────────────────────┤  │   │  │  │
│  │  │                   │  │   UnitInput (From)      │  │   │  │  │
│  │  │                   │  │   [Swap Button]         │  │   │  │  │
│  │  │                   │  │   UnitInput (To)        │  │   │  │  │
│  │  │                   │  └────────────────────────┘  │   │  │  │
│  │  │                   └──────────────────────────────┘   │  │  │
│  │  └──────────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
                          ↕ calls
              ┌─────────────────────────┐
              │   lib/conversions.ts    │
              │   convert(val, from,    │
              │          to, category)  │
              └──────────┬──────────────┘
                         │ imports
        ┌────────────────┼────────────────┐
        ↓                ↓                ↓
  lib/units/        lib/units/       lib/units/
  length.ts         temperature.ts   currency.ts  ...
```

---

## Design Language

This project follows **Google Material Design 3 (Material You)** principles — modern, minimal, and functional.

### Shapes
- **Main cards**: `rounded-[2.5rem]` or `rounded-3xl` — large, soft, prominent radii.
- **Inner containers**: `rounded-3xl` — nested surfaces with visible curvature.
- **Inputs & buttons**: `rounded-2xl` — slightly smaller but still distinctly rounded.
- **Pill elements (tabs, chips)**: `rounded-full`.

### Colors
- Use NextUI's semantic color tokens (`bg-content1`, `bg-content2`, `bg-content3`, `text-foreground`, `text-default-500`, `bg-primary`, `text-primary-foreground`).
- Avoid hardcoded hex colors in components. Define CSS variables in `globals.css` and use Tailwind/NextUI tokens everywhere else.
- Surfaces should layer: `background` → `content1` → `content2` → `content3` (increasing elevation).

### Typography
- **Font**: Inter, loaded via `next/font/google` in `app/layout.tsx`.
- **Headings**: `font-bold tracking-tight` (4xl–5xl for hero, 2xl–3xl for section headings).
- **Body**: Default weight, `text-default-500` for secondary text.
- **Numeric inputs**: `text-4xl font-semibold` for high readability.

### Interactions
- Inputs have clear `focus-within` states.
- Hover transitions on interactive containers: `hover:bg-content2/60 transition-colors`.
- Swap button: `hover:scale-105 transition-transform` for tactile feedback.
- Category switching must feel instantaneous — no loading states for local conversions.

### Dark Mode
- Fully supported via `next-themes` with `attribute="class"` and `defaultTheme="system"`.
- All components use NextUI's semantic tokens, which automatically adapt to the active theme.
- Never use `dark:` Tailwind modifiers directly — rely on NextUI's built-in dark mode support.

---

## Conversion Engine

### Algorithm

1. **Input** → Convert to base unit using `toBase(value)` or `value × multiplier`.
2. **Base** → Convert to target unit using `fromBase(baseValue)` or `baseValue / multiplier`.
3. **Output** → Format with `Number(result.toPrecision(15))` to mitigate floating-point drift.

### Linear Units (Length, Weight, Area, Volume, Currency)
Each unit defines a `multiplier` relative to the category's `baseUnit`:
- `value_in_base = input × multiplier`
- `output = value_in_base / target_multiplier`

### Non-Linear Units (Temperature)
Temperature uses `toBase()` / `fromBase()` functions instead of multipliers because conversions involve offsets (e.g., °F = °C × 9/5 + 32).

### Adding a New Unit to an Existing Category
1. Open the relevant file in `lib/units/` (e.g., `length.ts`).
2. Add a new entry to the `units` record with a unique `id`, `name`, `symbol`, and `multiplier` (or `toBase`/`fromBase` functions).
3. The UI picks up new units automatically — no component changes required.

---

## Component Reference

| Component | File | Type | Purpose |
|-----------|------|------|---------|
| `ConversionCard` | `components/ConversionCard.tsx` | Client | Main orchestrator — manages category, units, values, bidirectional conversion, and swap. |
| `CategorySelector` | `components/CategorySelector.tsx` | Client | Horizontal pill-style tabs for switching between unit categories. |
| `UnitInput` | `components/UnitInput.tsx` | Client | Composite input: large numeric field + unit dropdown select. |
| `ThemeSwitcher` | `components/ThemeSwitcher.tsx` | Client | Icon button toggling dark/light theme via `next-themes`. |
| `Providers` | `app/providers.tsx` | Client | Wraps the app in `NextUIProvider` + `ThemeProvider`. |

---

## State Management

- **All state is local** — React `useState` inside `ConversionCard`.
- No global state library (no Redux, Zustand, Jotai, etc.).
- No URL-based state (no query params or hash routing for conversions).
- State flows **down** via props from `ConversionCard` → `CategorySelector`, `UnitInput`.
- Bidirectional input: typing in "From" recalculates "To" via `useEffect`; typing in "To" does reverse conversion inline.

---

## Testing

### Framework
- **Vitest** for unit and integration tests.
- **Testing Library** (React + jest-dom) for component tests.
- **jsdom** environment for DOM simulation.
- Config: `vitest.config.ts` with `@/` path alias support.

### Test Structure
```
__tests__/
├── setup.ts                    # jest-dom matcher extensions
└── lib/
    ├── conversions.test.ts     # 37 tests: all categories, edge cases, identity, reversibility
    └── units.test.ts           # 29 tests: structural integrity of every unit definition
```

### What is Tested
- **Conversion accuracy**: Every category has explicit value-pair assertions (e.g., 0°C = 32°F, 1 mi = 5280 ft).
- **Identity**: Converting a unit to itself always returns the original value.
- **Reversibility**: Converting A→B→A yields the original value (within floating-point tolerance).
- **Edge cases**: Zero, negative values, very large/small numbers, invalid categories, invalid unit IDs.
- **Definition integrity**: Every unit has a valid id, name, symbol, and either a multiplier or toBase/fromBase pair. Keys match IDs. Base units exist. Multipliers are positive.

### Writing New Tests
- Place test files in `__tests__/` mirroring the source structure (e.g., `__tests__/lib/foo.test.ts` for `lib/foo.ts`).
- Use `describe` blocks grouped by feature area.
- Use `toBeCloseTo()` for floating-point comparisons, never strict `toBe()`.

---

## Scripts & Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start local development server (Turbopack). |
| `npm run build` | Production build. |
| `npm run start` | Serve production build locally. |
| `npm run lint` | Run ESLint (flat config, core-web-vitals + TypeScript). |
| `npm run typecheck` | Run `tsc --noEmit` for type checking without emitting. |
| `npm run test` | Run Vitest in watch mode (interactive development). |
| `npm run test:ci` | Run Vitest once (CI mode, no watch). |
| `npm run test:coverage` | Run Vitest with v8 coverage report. |

---

## CI/CD & GitHub Actions

### Workflows

#### `.github/workflows/ci.yml` — Main CI Pipeline
Triggers on **push to `main`** and **pull requests to `main`**.

```
┌──────┐   ┌───────────┐   ┌──────┐
│ Lint │   │ Typecheck  │   │ Test │    ← run in parallel
└──┬───┘   └─────┬─────┘   └──┬───┘
   │             │             │
   └─────────────┼─────────────┘
                 ↓
            ┌─────────┐
            │  Build  │               ← runs only if all 3 pass
            └─────────┘
```

**Jobs:**
1. **Lint** — `npm run lint`
2. **Typecheck** — `npm run typecheck`
3. **Test** — `npm run test:ci` (Vitest, single run)
4. **Build** — `npm run build` (depends on lint + typecheck + test passing)

Concurrency: Cancels in-progress runs on the same branch to save CI minutes.

#### `.github/workflows/deploy-preview.yml` — PR Preview
Triggers on **pull requests to `main`**.
- Runs `npm run build`.
- Uploads `.next/` as a GitHub artifact (7-day retention).
- Can be extended with Vercel/Netlify preview deployment steps.

#### `.github/workflows/deploy.yml` — GitHub Pages Deployment
Triggers on **push to `main`** and **manual workflow dispatch**.
- Runs verification (`npm run lint`, `npm run typecheck`, `npm run test:ci`).
- Builds static export (`npm run build` generates `./out`).
- Uploads `./out` via `actions/upload-pages-artifact@v3`.
- Deploys live to GitHub Pages via `actions/deploy-pages@v4`.
- **Requirement**: In GitHub repo settings, set **Settings** → **Pages** → **Source** to **GitHub Actions**.

### Static Export & BasePath (`next.config.ts`)
- Configured with `output: 'export'` for full static HTML/CSS/JS generation into `out/`.
- `basePath` is dynamically set:
  - In production (`process.env.NODE_ENV === 'production'`): `/convert.io` (matches GitHub repository subpath).
  - In development: `""` (runs directly at root `http://localhost:3000`).
- `images: { unoptimized: true }` and `trailingSlash: true` ensure clean routing and asset delivery on static hosts.

### Branch Protection (Recommended)
Configure the following on GitHub → Settings → Branches → `main`:
- Require status checks to pass: `Lint`, `Type Check`, `Unit Tests`, `Build`.
- Require pull request reviews before merging.
- Require branches to be up to date before merging.

---

## Development Workflow

### Feature Development
1. Create a feature branch from `main`: `git checkout -b feat/new-category`.
2. Make changes. Run `npm run test` (watch mode) while developing.
3. Before committing, verify:
   - `npm run lint` — no ESLint errors.
   - `npm run typecheck` — no TypeScript errors.
   - `npm run test:ci` — all tests pass.
   - `npm run build` — production build succeeds.
4. Push and open a PR to `main`. CI runs automatically.
5. After review and CI passes, merge.

### Bug Fixes
1. Create a branch: `git checkout -b fix/temperature-rounding`.
2. Write a **failing test first** that reproduces the bug.
3. Fix the code until the test passes.
4. Verify all other tests still pass.
5. Push and open a PR.

---

## Git Workflow (Agent Responsibilities)

After every **successful** run (i.e., lint, typecheck, tests, and/or build all pass), agents **must** stage and commit the changed files with an appropriate conventional commit message. **Agents must never push** — pushing is the user's responsibility.

### Commit Message Schema

All commit messages **must** follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>: <short description>
```

| Type       | When to Use                                                    | Example                                          |
|------------|----------------------------------------------------------------|--------------------------------------------------|
| `feat`     | New feature, new component, new unit category                  | `feat: add speed unit category`                  |
| `fix`      | Bug fix, correcting broken logic or rendering                  | `fix: temperature rounding precision`             |
| `refactor` | Code restructuring with no behavior change                     | `refactor: derive toValue via useMemo`            |
| `style`    | Formatting, whitespace, missing semicolons (no logic change)   | `style: fix indentation in UnitInput`             |
| `docs`     | Documentation changes (AGENTS.md, README, comments)            | `docs: add git workflow to AGENTS.md`             |
| `test`     | Adding or updating tests                                       | `test: add edge case tests for currency`          |
| `ci`       | CI/CD workflow changes (GitHub Actions, scripts)               | `ci: add lint and typecheck to CI pipeline`       |
| `chore`    | Tooling, config, dependencies (no production code)             | `chore: install vitest and testing-library`       |
| `perf`     | Performance improvement                                        | `perf: memoize unit list derivation`              |
| `build`    | Build system or dependency changes                             | `build: downgrade tailwind to v3 for NextUI`      |

### Rules

1. **Always verify before committing.** Run the appropriate checks (`npm run lint`, `npm run typecheck`, `npm run test:ci`, `npm run build`) and confirm they pass before staging.
2. **Stage only relevant files.** Use `git add <file1> <file2> ...` for targeted staging. Avoid `git add .` unless every changed file is part of the same logical change.
3. **One logical change per commit.** If a task involves multiple distinct changes (e.g., adding tests AND updating CI), make separate commits:
   ```bash
   git add __tests__/ vitest.config.ts __tests__/setup.ts
   git commit -m "test: add conversion engine and unit definition tests"

   git add .github/
   git commit -m "ci: add lint, typecheck, test, and build pipeline"
   ```
4. **Never push.** The user handles `git push` manually.
5. **Keep messages concise.** The description should be lowercase, imperative mood, no period at the end, and under 72 characters.
6. **Use scope (optional) for precision** when helpful:
   ```
   feat(units): add speed category
   fix(temperature): correct Kelvin to Fahrenheit formula
   test(conversions): add reversibility assertions
   ```

### Post-Task Checklist

After completing any task, the agent should:

```
1. ✅ Verify: npm run lint && npm run typecheck && npm run test:ci && npm run build
2. ✅ Stage:  git add <relevant files>
3. ✅ Commit: git commit -m "<type>: <description>"
4. ⏸️ Stop:   Do NOT push — user will push when ready
```

---

## Code Conventions

### TypeScript
- Strict mode is enabled (`"strict": true` in `tsconfig.json`).
- Use explicit return types on exported functions.
- Prefer `interface` over `type` for object shapes.
- Path alias: use `@/` imports (e.g., `import {convert} from '@/lib/conversions'`).

### React / Next.js
- All interactive components must be marked `"use client"`.
- Server Components are the default — only add `"use client"` when necessary.
- Props interfaces should be defined in the same file as the component, directly above it.
- Use named exports, not default exports, for components.
- Use `useMemo` for derived state (e.g., filtering unit lists).

### Tailwind CSS
- Use NextUI semantic tokens (`bg-content1`, `text-foreground`, etc.) over raw colors.
- Use `classNames` prop (NextUI slot system) for deep component styling.
- Avoid inline `style` attributes.
- Responsive breakpoints: mobile-first (`sm:`, `md:`, `lg:`).

### File Naming
- Components: `PascalCase.tsx` (e.g., `ConversionCard.tsx`).
- Utilities/data: `camelCase.ts` (e.g., `conversions.ts`).
- Tests: `<source-name>.test.ts` or `<source-name>.test.tsx`.
- GitHub workflows: `kebab-case.yml`.

---

## Adding New Unit Categories

To add a new category (e.g., "Speed"):

1. **Define units** — Create `lib/units/speed.ts`:
   ```typescript
   import { UnitCategoryDefinition } from './types';

   export const speed: UnitCategoryDefinition = {
     id: 'Speed',
     name: 'Speed',
     baseUnit: 'mps',
     units: {
       mps: { id: 'mps', name: 'Meters/second', symbol: 'm/s', multiplier: 1 },
       kph: { id: 'kph', name: 'Kilometers/hour', symbol: 'km/h', multiplier: 0.277778 },
       mph: { id: 'mph', name: 'Miles/hour', symbol: 'mph', multiplier: 0.44704 },
     },
   };
   ```

2. **Update the type** — Add `'Speed'` to the `UnitCategory` union in `lib/units/types.ts`.

3. **Register it** — Import and add to the `categories` record in `lib/conversions.ts`.

4. **Write tests** — Add test cases in `__tests__/lib/conversions.test.ts`.

5. **Done** — The UI automatically picks up the new category via `categoryList`. No component changes needed.

---

## Known Limitations & Future Work

| Item | Status | Notes |
|------|--------|-------|
| Currency rates | Mocked | Static multipliers in `currency.ts`. Replace with API (Frankfurter, etc.) when needed. |
| PWA / Offline | Not supported | Standard web app. Can add service worker later. |
| URL sharing | Not supported | Conversions are local state only. |
| Component tests | Not yet | Unit logic is tested; React component rendering tests should be added. |
| E2E tests | Not yet | Consider Playwright for full user-flow testing. |
| Accessibility | Partial | Aria labels present on key controls. Full a11y audit recommended. |

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
