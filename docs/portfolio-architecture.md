# Portfolio Architecture

## Routes

- `/`: main portfolio home page.
- `/projets`: all project previews grouped by expertise.
- `/experiences/[category]`: list of experiences for one expertise.
- `/experiences/[category]/[slug]`: detail page for a single experience.

Current category slugs:
- `marketing-digital`
- `site-web`
- `design`

## Data Modules

- `lib/portfolio/portfolio-data.ts` contains temporary portfolio data used by the pages.
- Replace this module progressively with Strapi-backed data access as content types become available.
- Keep route and UI components separate from data access.

## App Configuration

The frontend reads Strapi single type `app-configuration` through:
- `lib/app-configuration/get-app-configuration.ts`
- `lib/app-configuration/app-configuration-types.ts`
- `lib/app-configuration/theme-style.ts`

Expected Strapi fields:
- `couleur_principale`
- `couleur_secondaire`
- `description`

The colors are validated as hex colors before being applied to portfolio CSS variables.

The frontend must keep rendering if Strapi is unavailable. Strapi-backed modules should catch expected API/network/configuration failures and return neutral content such as `null`, an empty list, or no app color override instead of throwing during render.

## UI Components

Portfolio UI components live in `components/portfolio/`.

Keep components focused and directly imported from their real file. Do not introduce barrel exports or `index` files.

Current home section order:
- hero
- about
- formations
- professional experiences
- scroll stack projects
- contact

About section background:
- `components/ui/background-gradient-animation.tsx` is used as an animated full-width background behind the about cards.

Project card images must stay inside cards with internal padding, not flush to the card edge.

Hero background:
- `public/images/hero-chrome-background.png` is used as the first-screen background image.
- The hero must stay limited to the first viewport area below the header and must not continue as a background after scrolling.
