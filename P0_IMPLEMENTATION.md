# P0 Production Hardening

## Implemented
- Removed the fake Labs authentication, client-side passphrase, unlock function, and localStorage gate. Labs are intentionally public educational content.
- Removed the Labs passphrase from application/data files.
- Implemented a server-side contact endpoint using Resend, with Zod validation, same-origin checking, a honeypot, rate limiting, HTML escaping, and explicit delivery errors.
- Contact UI only reports success after the API accepts the message.
- Centralized canonical identity, social URLs, email, and production site URL in `src/config/site.ts`.
- Runtime resume data derives identity URLs from the canonical site configuration.
- Added generated `robots.txt` and `sitemap.xml` routes, plus a `verify` script.
- Kept build/type/lint failures visible rather than suppressing them.

## Dependency alignment limitation
The supplied lockfile currently pins Next.js 16.4.0, React 18, and `eslint-config-next` 14.2.35. React 18 produces a deprecation warning in Next.js 16, and the ESLint config major is not aligned. I attempted to regenerate the lockfile for the Next.js 16 ESLint config, but npm registry access was unavailable in this environment. I kept `package.json` and `package-lock.json` consistent so `npm ci` is not knowingly broken. Once registry access is available, complete the alignment with:

```bash
npm install --save-dev eslint-config-next@^16
npm install react@^19 react-dom@^19
npm run lint
npm run type-check
npm run build
```

Review any React 19 compatibility changes before deploying; don't commit secrets.

## Required deployment configuration

Set these environment variables in the hosting provider:

```text
NEXT_PUBLIC_SITE_URL=https://eshwar-gajula-portfolio.vercel.app
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=your-inbox@example.com
CONTACT_FROM_EMAIL=Portfolio <noreply@your-verified-domain.com>
```

If you attach a custom domain, change `NEXT_PUBLIC_SITE_URL`; canonical metadata, sitemap, robots, and resume website value follow it automatically.

## Validation
Run on a machine with network access and dependencies installed:

```bash
npm ci
npm run lint
npm run type-check
npm run build
```

The full dependency-based build is not claimed as verified by this source-editing environment.
