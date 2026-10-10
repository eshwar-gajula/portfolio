# Eshwar Gajula — Engineering Portfolio

**AI Engineering · Software Engineering · Cybersecurity · Autonomous Systems**

A Next.js portfolio presenting ECHA, AI/automation experiments, software projects, case studies, and educational security notes.

## Product principles

- **Fast by default:** core content is available immediately; decorative animation is optional.
- **Evidence over claims:** projects link to source repositories or clearly state when work is in progress.
- **Accessible:** keyboard navigation, visible focus, and reduced-motion support.
- **Security-conscious:** no client-side secrets; contact delivery is server-side and reports honest delivery status.

## Stack

- Next.js App Router and React
- TypeScript
- Tailwind CSS 4
- Framer Motion (interactive animation only)
- Lucide React
- Zod for contact payload validation
- Resend REST API for server-side contact delivery

## Local development

Requirements: Node.js 20.9+ and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Validation

```bash
npm run lint
npm run type-check
npm run build
# or run all three sequentially
npm run verify
```

## Environment variables

Copy `.env.example` to `.env.local` and set real values:

- `NEXT_PUBLIC_SITE_URL`: canonical production origin.
- `RESEND_API_KEY`: server-side Resend API key; never prefix with `NEXT_PUBLIC_`.
- `CONTACT_TO_EMAIL`: inbox that receives portfolio messages.
- `CONTACT_FROM_EMAIL`: verified sender identity from your email provider.

The contact form returns a configuration error if the email service isn't configured; it does not report a message as delivered unless the provider accepts it.

## Main routes

- `/` — portfolio homepage and ECHA feature
- `/projects` and `/projects/[slug]` — project catalogue and details
- `/case-studies` and `/case-studies/[slug]` — engineering decisions and implementation notes
- `/security-notes` and `/security-notes/[slug]` — educational security concepts
- `/about`, `/skills`, `/timeline`, `/resume`, `/contact`
- `/labs` — public educational lab index
- `/changelog`

## ECHA

ECHA (Echelon Cybernetic Heuristic Aegis) is an in-progress personal project. The portfolio describes intended architecture honestly and distinguishes planned capabilities from working implementations. The Shell uses Tauri/Rust and React/TypeScript; the Agent is being developed around local LLM orchestration, controlled tools, permissions, auditing, and verification.

The flagship repository currently linked in project data is [ECHA Shell](https://github.com/eshwar-gajula/ECHA-shell).

## Architecture notes

- Route metadata is declared close to route layouts.
- Site identity and profile links live in `src/config/site.ts`.
- Resume and project content lives in `src/data/`.
- Global interactive UI is mounted once in the root layout.
- Browser-only interactions belong in Client Components; static pages should remain Server Components where practical.

## Deployment

Deploy as a standard Next.js application (for example, on Vercel). Configure the environment variables in the hosting dashboard and verify contact delivery, CSP behavior, canonical URLs, and mobile accessibility after deployment.

## Security notes

Do not commit `.env.local`, API keys, email provider secrets, or other credentials. Public Labs content is educational and is not protected by a fake client-side password. Test security tooling only against systems you own or are explicitly authorized to assess.

## Author

**Eshwar Gajula**

- GitHub: https://github.com/eshwargajula31
- LinkedIn: https://linkedin.com/in/gajula-eshwar
- TryHackMe: https://tryhackme.com/p/eshwargajula31
- Email: eshwargajula31@gmail.com


## Navigation and accessibility

- Use **Ctrl/⌘ + K** to open the command palette. It starts with the primary destinations; enter `pages` or `hidden` to discover utility, non-header, and detail routes.
- The Skills page supports text search, category filtering, keyboard-operable skill cards, and project-evidence details. Evidence counts reflect projects actually mapped in the portfolio data.
- The Timeline uses responsive event cards with category icons and date labels; on narrow screens it collapses to a single readable column.
- Light and dark themes share the same component structure and preserve visible borders, focus indicators, and readable text.


## Contact form configuration

The contact form sends messages through the server-side `/api/contact` route using Resend. Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`. Never place the Resend API key in a `NEXT_PUBLIC_*` variable or client-side code. The example sender `onboarding@resend.dev` is intended for Resend's test setup; for production, verify a domain in Resend and use a sender address on that verified domain. Restart the dev server after changing environment variables.

## Mobile and animation checks

Check the site at 320px, 375px, 768px, and desktop widths. Verify the mobile menu closes after route changes, page transitions remain subtle, Matrix Rain stops when the tab is hidden, and Low Power / reduced-motion settings are respected.
