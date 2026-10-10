# P1 / P2 Production Quality Implementation

## Implemented
- Homepage positioning focuses on AI engineering, software engineering, cybersecurity, and autonomous systems.
- ECHA is a featured project and the homepage links directly to its project page, architecture case study, and repository.
- ECHA case study distinguishes the Agent and Shell responsibilities, documents engineering decisions, and explicitly marks the project as in development.
- Removed the blocking startup overlay from the homepage so core content is visible immediately; removed the animated typewriter state loop and replaced it with stable content.
- Recruiter mode adds a global low-distraction document class, hides the command-bar trigger, suppresses decorative canvas/scanline elements and audio, disables CSS animation/transitions, and reduces the toolbar to an explicit exit control.
- Case-study and security-note index pages are Server Components; static listings no longer ship page-level client JS for animation/audio effects. ECHA has a dedicated architecture/decision section and clear in-development status.
- Replaced numeric self-rated skill percentages with category/project evidence cues.
- Added Person JSON-LD structured data and a raster Open Graph preview image.
- Added GitHub Actions CI for `npm ci`, lint, type-check, and production build. Added `PERFORMANCE.md` with Core Web Vitals targets and a privacy-first no-analytics default.
- Rewrote the README with the current Next.js app structure, environment variables, validation commands, and honest ECHA project status.
- Preserved canonical site/social data in `src/config/site.ts`, sitemap/robots routes, and CSP/HSTS plus COOP/CORP headers.
- Kept reduced-motion support and reduced global animation work.

## Dependency note
This project currently has Next.js 16.4 with React 18 in the supplied lockfile. Next.js warns that React 18 support is deprecated. A React 19 migration should be a separate, deliberate dependency update because the current execution environment could not reliably regenerate the lockfile from the npm registry. The package manifest and lockfile were kept consistent rather than shipping a lockfile that makes `npm ci` fail.

## Validation required on the project machine
```bash
npm ci
npm run lint
npm run type-check
npm run build
```
The full build should be rerun after these changes. No claim of a clean build is made until those commands complete successfully.


## UI refinement pass — 2026-10-09

- Rebalanced light-mode colors toward warm, lower-luminance surfaces and increased card/border separation to reduce glare and improve text visibility.
- Added a persistent App Router page-transition wrapper with a brief fade/vertical movement and reduced-motion/Low Power Mode fallback.
- Full dependency installation and production build were attempted but could not complete because `npm ci` stalled in this environment; run `npm ci`, `npm run lint`, `npm run type-check`, and `npm run build` on a network-enabled machine.
