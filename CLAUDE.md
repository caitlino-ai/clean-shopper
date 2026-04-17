# Clean Shopper — Claude Code Instructions

## Project
Clean Shopper is a personal product research assistant for ingredient-aware consumers. Users search for home and personal care products, get AI-generated clean/not-clean assessments based on ingredient safety data, save products to a personal library organized by category, and build shopping lists.

Single-user app. No authentication in V1. Local state plus Supabase for data persistence.

## Tech Stack
- React (Vite) — frontend UI
- Supabase — database and data layer (PostgreSQL)
- Claude API (claude-sonnet-4-20250514) — AI product research and ingredient analysis
- EWG Skin Deep API — ingredient safety data
- Vercel — deployment
- Tailwind CSS — styling

## Conventions
- Components: PascalCase filenames, one component per file, lives in /src/components/
- Components: Always check /docs/component-spec.md before building any UI element. If an existing component covers the use case, use it. Only create a new component if no spec covers the pattern, and add the new component to component-spec.md before moving on.
- File placement: Shared components that are reused across screens belong in src/components/. Files specific to one screen (components, hooks, helpers) belong in that screen's folder under src/features/. Do not mix the two.
- Utility functions: camelCase, lives in /src/lib/
- API calls: all external API calls through /src/lib/api/, never inline in components
- Styling: Tailwind only. No inline styles. No CSS modules.
- State: React useState and useContext only. No Redux, no Zustand.
- File naming: kebab-case for all non-component files

## Do Not
- Do not add user authentication or account features — V1 is single-user only
- Do not use CSS other than Tailwind
- Do not add features outside the current build phase without asking first
- Do not create new components when an existing component in the component library covers the use case
- Do not use any AI model other than claude-sonnet-4-20250514

## Component Library
See /docs/component-spec.md for defined components. Use existing components before creating new ones.
Defined components: ProductCard, SafetyBadge, SearchBar, CategoryTag, NavBar, Button, InputField, EmptyState.

## Build Plan
See /docs/build-plan.md for the current phase breakdown. We are building phase by phase — do not jump ahead.

## References
- Project context skill: /.claude/skills/project-context/SKILL.md — generates a structured project context document from any project input
- Prompt optimizer skill: /.claude/skills/prompt-optimizer/SKILL.md — Use /prompt-optimizer to evaluate and refine instructions before sending them
- Design system generator skill: /.claude/skills/design-system-generator/SKILL.md — Use /design-system-generator to run a brand interview and produce an HTML visual style guide and /docs/design-system.md spec
- Component spec: See /docs/component-spec.md — use existing components before creating new ones. Follow the spec for props, states, and visual structure.
