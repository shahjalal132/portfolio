# Muhammad Shah Jalal - Portfolio

A data-first personal portfolio for presenting professional experience, selected projects, technical expertise, and measurable engineering outcomes to international companies and technical hiring teams.

The portfolio is designed as a clean, white, single-page experience. Content, visual design, and implementation decisions are maintained as structured JSON so they can be updated independently of the application interface.

## Current Repository Structure

```text
portfolio/
|-- data/
|   `-- portfolio-data.json
|-- themes/
|   |-- corporate-cobalt.json
|   `-- tech-stack.json
`-- README.md
```

### Portfolio data

`data/portfolio-data.json` is the primary content source. It contains:

- Personal profile and contact information
- Professional summary and focus areas
- Work experience and achievements
- Featured projects and technologies
- Technical and interpersonal skills
- Education, certifications, and languages
- Navigation order and portfolio display settings

### Visual theme

`themes/corporate-cobalt.json` defines the visual system, including:

- Corporate cobalt color palette
- Geist Sans and Geist Mono typography
- Responsive layout and spacing
- Component borders, radii, and shadows
- Animation timing and behavior
- Accessibility and reduced-motion requirements

### Technology specification

`themes/tech-stack.json` documents the planned application architecture:

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Zod build-time data validation
- Motion for React
- Lucide icons
- Static-first rendering with SPA-like interactions
- Next.js metadata, sitemap, robots, Open Graph, and JSON-LD
- Vercel deployment from the `main` branch

## Design Principles

- **Data first:** Portfolio content lives in JSON rather than React components.
- **SEO friendly:** Important content should be present in statically rendered HTML.
- **SPA-like experience:** Navigation and interactions should feel immediate without relying on client-only rendering.
- **Business focused:** Projects emphasize problems, contributions, solutions, and measurable outcomes.
- **Minimal JavaScript:** Server Components remain the default; client components are used only for interaction.
- **Accessible:** The interface should maintain readable contrast, visible keyboard focus, semantic structure, and reduced-motion support.
- **Easy to maintain:** Updating the content or theme should not require redesigning application components.

## Updating Portfolio Content

Edit `data/portfolio-data.json` when adding or changing experience, projects, skills, education, certifications, or contact details.

Date values use the `YYYY-MM` format:

```json
{
  "period": {
    "start": "2026-06",
    "end": null,
    "isCurrent": true,
    "display": "Jun 2026 - Present"
  }
}
```

For a completed role, provide an end date and set `isCurrent` to `false`. Stable IDs should not be changed after an entry is published because the application may use them for navigation, filtering, and structured data.

## Planned Application Flow

```text
Portfolio JSON + Theme JSON
            |
            v
  Build-time validation
            |
            v
 Next.js static rendering
            |
            v
 SEO-ready HTML + SPA interactions
            |
            v
     Vercel deployment
```

## Project Status

The structured portfolio data, visual theme, and technology specification are complete. The next phase is to scaffold the Next.js application and connect its components directly to these JSON sources.

## Author

**Muhammad Shah Jalal**

Full-Stack Software Developer

[GitHub](https://github.com/shahjalal132) | [Portfolio Repository](https://github.com/shahjalal132/portfolio)
