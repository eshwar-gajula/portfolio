# Eshwar Gajula - Portfolio

A modern, hacker-themed portfolio website built with Next.js 14, featuring a red team/offensive security aesthetic with multi-language matrix rain animations.

## Features

- Multi-language Matrix Rain background animation (Japanese, Chinese, Korean, Russian, Arabic, Greek, Hindi, Binary)
- Red team/offensive hacker theme with crimson colors
- Audio feedback system with typing sounds
- Theme switching (Dark/Light/High Contrast)
- Low Power mode for accessibility
- Recruiter Mode for simplified viewing
- Command Bar for keyboard navigation (Cmd/Ctrl + K)
- Responsive design (mobile-first)
- PWA support with offline fallback

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Vercel will auto-detect Next.js and configure the build
4. Click Deploy

Or use the Vercel CLI:
\`\`\`bash
npm i -g vercel
vercel
\`\`\`

### Environment Variables

Copy \`.env.example\` to \`.env.local\` and configure:
- \`NEXT_PUBLIC_SITE_URL\` - Your production URL for sitemap

## Project Structure

\`\`\`
├── app/                  # Next.js App Router pages
│   ├── about/           # About page
│   ├── contact/         # Contact page
│   ├── labs/            # Labs (hidden) page
│   ├── projects/        # Projects page
│   ├── resume/          # Resume page
│   ├── skills/          # Skills page
│   └── timeline/        # Timeline page
├── components/          # React components
│   ├── ui/              # shadcn/ui components
│   ├── backgrounds.tsx  # Matrix background animations
│   ├── audio-provider.tsx
│   ├── theme-provider.tsx
│   └── ...
├── src/data/            # Resume and project data
├── public/              # Static assets
└── ...config files
\`\`\`

## Customization

### Resume Data

Edit \`src/data/resume.json\` to update your personal information, skills, experience, and projects.

### Theme Colors

Modify the CSS variables in \`app/globals.css\` to customize the color scheme.

## License

MIT License - Feel free to use this template for your own portfolio.

## Author

**Eshwar Gajula** - Frontend Developer

- GitHub: [@eshwar-gajula](https://github.com/eshwar-gajula)
- LinkedIn: [Eshwar Gajula](https://linkedin.com/in/eshwar-gajula)
- Email: eshwargajula.in@gmail.com
\`\`\`

```json file="" isHidden
