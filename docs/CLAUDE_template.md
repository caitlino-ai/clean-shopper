# [Project Name] — Claude Code Instructions

## 1. Project
[Two to three sentences describing what the app does and who it's for. Be specific and functional, not aspirational. Example: "Clean Shopper is a personal product research assistant for ingredient-aware consumers. Users search for home and personal care products, get AI-generated clean/not-clean assessments, save products to a personal library organized by category, and build shopping lists."]

Single-user app or [describe user model]. [Any critical V1 scope statement, e.g. "No authentication in V1."]

## 2. Tech Stack
- [Framework] — [one-line role, e.g. "React (Vite) — frontend UI"]
- [Database] — [one-line role, e.g. "Supabase — database and data layer (PostgreSQL)"]
- [AI layer] — [one-line role, e.g. "Claude API — AI analysis and recommendations"]
- [Other integrations] — [one-line role]
- [Deployment] — [one-line role, e.g. "Vercel — deployment"]
- [Styling] — [one-line role, e.g. "Tailwind CSS — styling"]

## 3. Conventions
- Components: [naming convention, e.g. "PascalCase filenames, one component per file, lives in /src/components/"]
- Utility functions: [naming convention, e.g. "camelCase, lives in /src/lib/"]
- API calls: [pattern, e.g. "all external API calls through /src/lib/api/, never inline in components"]
- Styling: [rule, e.g. "Tailwind only. No inline styles. No CSS modules."]
- State: [rule, e.g. "React useState and useContext only. No Redux, no Zustand."]
- File naming: [rule, e.g. "kebab-case for all non-component files"]

## 4. Do Not
- Do not [scope constraint, e.g. "add user authentication — V1 is single-user only"]
- Do not [style constraint, e.g. "use CSS other than Tailwind"]
- Do not [scope constraint, e.g. "add features outside the current build phase without asking first"]
- Do not [component constraint, e.g. "create new components when an existing component in the component library covers the use case"]
- Do not [model constraint, e.g. "use any AI model other than claude-sonnet-4-20250514"]

## 5. References
- Component library: See /docs/component-spec.md — use existing components before creating new ones
- Build plan: See /docs/build-plan.md — we are building phase by phase, do not jump ahead
- Project context: See /docs/project-context.md — full project intake and design decisions
