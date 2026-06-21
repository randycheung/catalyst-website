# Catalyst Funds Management

Premium dark-themed marketing site for Catalyst Funds Management, an institutional alternative investment firm. Built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com) v4, and [GSAP](https://gsap.com)/ScrollTrigger + [Lenis](https://lenis.darkroom.engineering) for scroll-driven animation.

## Stack

- **Astro** — static site generation
- **Tailwind CSS v4** — utility styling via `@tailwindcss/vite`, theme tokens in `src/styles/global.css`
- **GSAP + ScrollTrigger** — scroll-linked reveals, count-up stats, pinned horizontal scroll, SVG line draw
- **Lenis** — smooth scrolling, synced to ScrollTrigger
- **`.claude/skills/ui-ux-pro-max/`** — design intelligence skill used to inform the visual system

## Commands

| Command           | Action                                      |
| :----------------- | :------------------------------------------ |
| `npm install`       | Install dependencies                         |
| `npm run dev`       | Start local dev server at `localhost:4321`   |
| `npm run build`     | Build production site to `./dist/`           |
| `npm run preview`   | Preview the production build locally         |

## Deployment

Deploys automatically to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`. The site is configured for the custom domain `randycheung.com` (see `public/CNAME` and `astro.config.mjs`).

To enable: in the GitHub repo settings, set **Settings → Pages → Source** to "GitHub Actions", and point the domain's DNS at GitHub Pages per [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
