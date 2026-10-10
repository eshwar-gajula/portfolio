# Performance and Privacy Verification

## Performance budgets
Use these as release targets, not as claims about unmeasured results:

- LCP: <= 2.5 seconds at the 75th percentile
- INP: <= 200 milliseconds at the 75th percentile
- CLS: <= 0.1 at the 75th percentile
- No blocking startup overlay on initial navigation
- Core content remains readable when motion is reduced or JavaScript effects fail
- Avoid loading large external imagery; project images should be local and sized for their rendered dimensions

## Local verification
Build and serve production mode:

```bash
npm run build
npm run start
```

In Chrome DevTools, run Lighthouse separately for Mobile and Desktop. Also inspect the Performance panel with CPU throttling enabled and check:
- scripting and hydration time,
- long tasks during initial render,
- Matrix canvas activity while the tab is hidden,
- layout shifts around fonts/images,
- command-bar keyboard focus and restoration.

## Privacy posture
No third-party analytics is enabled by default. This avoids sending visitor behavior to an external analytics provider without a deliberate product decision. If analytics is added later, document the provider, data collected, retention, consent/legal basis, and opt-out mechanism before enabling it.

## Known measurement limitation
The ZIP-editing environment did not have dependencies cached and npm registry access timed out. No Lighthouse score or Core Web Vitals result is claimed until measured against the running production build.
