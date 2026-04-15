# Component Specification: Clean Shopper
**Version:** 1.0
**Last Updated:** 2026-04-15
**Source:** Generated from CLAUDE.md, design-system.md, and tailwind.config.js

---

## How to Use This Document

This file is referenced by CLAUDE.md. Before building any UI, check if a component here covers the use case. Do not create a new component when an existing one applies. All visual values reference token names from `tailwind.config.js` — never hardcode hex values, pixel sizes, or spacing.

---

## 1. ProductCard

**Purpose:** Displays a single product with its safety score, category, and description — the primary unit of information across search results, the saved library, and the comparison view.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | Full product name |
| `score` | `'clean' \| 'caution' \| 'avoid'` | Yes | Safety rating from AI analysis |
| `category` | `string` | Yes | Product category label (e.g. "Laundry") |
| `description` | `string` | Yes | Short AI-generated safety summary |
| `onSave` | `function` | No | Callback when the save action is triggered |
| `isSaved` | `boolean` | No | Whether the product is already saved to the library |
| `onClick` | `function` | No | Callback when the card is clicked to open detail view |

### Visual Structure

```
<div> bg-secondary rounded-lg shadow-sm p-space-lg flex flex-col gap-space-md cursor-pointer
  <div> flex items-start justify-between gap-space-md
    <h3> text-h3 text-neutral-900        ← product name
    <SafetyBadge score={score} />        ← clean / caution / avoid pill
  </div>
  <CategoryTag label={category} />       ← category pill
  <p> text-body text-neutral-600         ← description
  <button> (save icon, optional)         ← IconButton, shown on hover
</div>
```

### States

- **Default:** `bg-secondary shadow-sm` — resting card
- **Hover:** `shadow-md` transition — subtle lift to signal interactivity
- **Saved:** Save icon fills to indicate saved state via `isSaved` prop
- **Loading:** Replace content with skeleton bars at the same dimensions

### Usage Rules

- Use for every product displayed in search results, library, and comparison.
- Do not use for non-product content (ingredients, categories, settings).
- Always pass all four required props — never render a card with missing name, score, category, or description.
- One `ProductCard` per product. Do not nest cards.

---

## 2. SafetyBadge

**Purpose:** Renders the clean / caution / avoid rating as a color-coded pill — the primary visual signal of product safety throughout the app.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `score` | `'clean' \| 'caution' \| 'avoid'` | Yes | Safety rating to display |
| `size` | `'sm' \| 'md'` | No | Controls text size and padding. Defaults to `'md'` |

### Visual Structure

```
Both sizes share:
  rounded-full font-semibold

  score === 'clean'   → bg-success/10 text-success   label: "Clean"
  score === 'caution' → bg-warning/10 text-warning   label: "Caution"
  score === 'avoid'   → bg-error/10   text-error     label: "Avoid"

size === 'md' (default):
  text-small px-space-sm py-space-xs
  → Used on the product detail page header where the badge is the dominant safety signal

size === 'sm':
  text-micro px-space-xs py-[2px]
  → Used inside ProductCard where the badge sits inline with the product name and must not overpower it
```

### States

- **Default:** Color-coded background and text per score value.
- No hover, loading, or error states — this is a display-only element.

### Usage Rules

- Use `size="sm"` inside `ProductCard` — the smaller size keeps the badge subordinate to the product name.
- Use `size="md"` (default) on the product detail page header where the badge is the primary safety signal.
- Never use for any purpose other than displaying a safety score.
- Never change the color mapping — green means clean, amber means caution, red means avoid. These are semantic.
- Do not use `SafetyBadge` for general status indicators (use a different pattern for non-safety states).

---

## 3. SearchBar

**Purpose:** Accepts a user's product query and triggers a search — used as the primary entry point on the search page.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `value` | `string` | Yes | Controlled input value |
| `onChange` | `function` | Yes | Called on every keystroke with the new value |
| `onSubmit` | `function` | Yes | Called when the user submits (Enter or button click) |
| `placeholder` | `string` | No | Input placeholder text. Defaults to `"Search for a product…"` |
| `isLoading` | `boolean` | No | Shows loading state while a search is in progress |
| `disabled` | `boolean` | No | Disables the input and button |

### Visual Structure

```
<form> flex gap-space-sm
  <input>
    flex-1
    bg-neutral-100 border border-neutral-200 rounded-md
    px-space-md py-space-sm
    text-body text-neutral-900
    placeholder:text-neutral-400
    focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent

  <Button variant="primary" type="submit" isLoading={isLoading}>
    Search
  </Button>
</form>
```

### States

- **Default:** `bg-neutral-100 border-neutral-200`
- **Focus:** `ring-2 ring-accent border-accent`
- **Loading:** Button shows spinner; input remains active so user can edit the query
- **Disabled:** `opacity-50 cursor-not-allowed` on both input and button
- **Error:** Not handled in this component — display errors above or below the form in the parent

### Usage Rules

- Use only for the main product search interaction.
- Do not use `SearchBar` for filtering within a list — use `FilterChip` for that.
- Always control the value via `value` + `onChange` (controlled input). Do not use uncontrolled.
- The submit button must always be `variant="primary"`.

---

## 4. CategoryTag

**Purpose:** Displays a product's category as a small label — used inside `ProductCard` and as a filter element in the library.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | Yes | Category name to display |
| `interactive` | `boolean` | No | If true, renders as a clickable filter chip. Defaults to `false` |
| `selected` | `boolean` | No | Active state when used as a filter. Only applies when `interactive` is true |
| `onClick` | `function` | No | Click handler. Only applies when `interactive` is true |

### Visual Structure

```
Non-interactive (display only):
<span> text-small text-neutral-600 bg-neutral-200 px-space-sm py-space-xs rounded-sm

Interactive (filter chip):
<button>
  default:  text-small text-neutral-600 bg-neutral-200 border border-neutral-200 px-space-sm py-space-xs rounded-sm
  hover:    bg-neutral-100 border-neutral-400
  selected: bg-primary/10 text-primary border-primary rounded-sm font-semibold
```

### States

- **Default (display):** Neutral gray pill, no interaction
- **Default (interactive):** Neutral pill with hover affordance
- **Hover:** Slightly darker border
- **Selected:** Primary tint background with primary text and border

### Usage Rules

- Use the non-interactive form inside `ProductCard`.
- Use the interactive form in the library page's filter row.
- Do not use `CategoryTag` for safety scores — use `SafetyBadge` for that.
- Keep label text to one or two words maximum.

---

## 5. NavBar

**Purpose:** The persistent top navigation bar that provides access to the app's main sections — visible on every page.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `activePage` | `'search' \| 'library' \| 'list'` | Yes | Highlights the current section |

### Visual Structure

```
<nav> bg-neutral-50 border-b border-neutral-200 px-space-xl py-space-md flex items-center justify-between

  <span> text-h4 text-primary font-semibold   ← "Clean Shopper" wordmark

  <div> flex gap-space-xl                      ← nav links
    <NavLink> each link:
      default:  text-body text-neutral-600
      active:   text-primary font-semibold border-b-2 border-primary pb-[2px]
      hover:    text-neutral-900

    Links: Search | My Library | Shopping List
```

### States

- **Default:** Neutral text links
- **Active:** Primary color with bottom border indicator on the current page link
- **Hover:** `text-neutral-900`

### Usage Rules

- Render `NavBar` once at the root layout level — not inside individual pages.
- Always pass `activePage` to keep the active state accurate.
- Do not add icons to `NavBar` in V1 — text links only.
- Do not add user account or auth elements — V1 is single-user.

---

## 6. Button

**Purpose:** The standard interactive action element — used for every explicit user action throughout the app.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | No | Visual style. Defaults to `'primary'` |
| `size` | `'sm' \| 'md'` | No | Controls padding and text size. Defaults to `'md'` |
| `type` | `'button' \| 'submit'` | No | HTML button type. Defaults to `'button'` |
| `isLoading` | `boolean` | No | Replaces label with a spinner; disables interaction |
| `disabled` | `boolean` | No | Disables the button |
| `onClick` | `function` | No | Click handler |
| `children` | `node` | Yes | Button label content |

### Visual Structure

```
Base (all variants):
  rounded-md font-semibold transition-colors cursor-pointer
  focus:outline-none focus:ring-2 focus:ring-offset-2

Size md: text-body px-space-lg py-space-sm
Size sm: text-small px-space-md py-space-xs

Primary variant:
  bg-primary text-white
  hover: bg-primary-dark
  focus: ring-primary
  disabled/loading: opacity-50 cursor-not-allowed

Secondary variant:
  bg-transparent text-primary border border-primary
  hover: bg-primary/10
  focus: ring-primary
  disabled/loading: opacity-50 cursor-not-allowed

Ghost variant:
  bg-transparent text-neutral-600
  hover: text-neutral-900 bg-neutral-100
  focus: ring-neutral-400
  disabled/loading: opacity-50 cursor-not-allowed
```

### States

- **Default:** Per-variant styles above
- **Hover:** Darker or tinted background per variant
- **Focus:** `ring-2 ring-offset-2` with variant-appropriate ring color
- **Loading:** Spinner replaces label; button stays the same width; `disabled` behavior applies
- **Disabled:** `opacity-50 cursor-not-allowed`; no hover response

### Usage Rules

- Use `primary` for the single most important action per view (Search, Save, Add to List).
- Use `secondary` for supporting actions alongside a primary (e.g. Compare next to Save).
- Use `ghost` for low-emphasis actions (Cancel, Dismiss, Clear).
- Only one `primary` button should be visible per view.
- Never use `Button` for navigation — use links or `NavBar` instead.

---

## 7. InputField

**Purpose:** A labeled text input with validation feedback — used in any form context outside of the main search (e.g. preference settings, list naming).

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | Yes | Field label displayed above the input |
| `value` | `string` | Yes | Controlled input value |
| `onChange` | `function` | Yes | Called on each keystroke |
| `id` | `string` | Yes | Links `<label>` to `<input>` for accessibility |
| `placeholder` | `string` | No | Placeholder text shown when empty |
| `error` | `string` | No | Error message displayed below the field |
| `hint` | `string` | No | Helper text displayed below the field when no error |
| `disabled` | `boolean` | No | Disables the field |
| `type` | `string` | No | HTML input type. Defaults to `'text'` |

### Visual Structure

```
<div> flex flex-col gap-space-xs

  <label> text-h4 text-neutral-900        ← label
    htmlFor={id}

  <input>
    bg-neutral-100 border rounded-md px-space-md py-space-sm text-body text-neutral-900
    placeholder:text-neutral-400
    focus:outline-none focus:ring-2 focus:ring-offset-1

    default:  border-neutral-200 focus:ring-accent focus:border-accent
    error:    border-error focus:ring-error
    disabled: opacity-50 cursor-not-allowed bg-neutral-200

  <p> text-small mt-space-xs
    error present: text-error
    hint only:     text-neutral-600
```

### States

- **Default:** `border-neutral-200`, accent focus ring
- **Focus:** `ring-2 ring-accent border-accent`
- **Error:** `border-error`, error ring on focus, red message below
- **Disabled:** `opacity-50 cursor-not-allowed bg-neutral-200`

### Usage Rules

- Always pair with a visible `label` — never use placeholder text as a substitute for a label.
- Use `error` for validation messages. Use `hint` for supplementary guidance when there is no error.
- Do not use `InputField` for the main product search — use `SearchBar` for that.
- Always use as a controlled input with `value` + `onChange`.

---

## 8. EmptyState

**Purpose:** Communicates that a list or view has no content yet — used in search results (no matches), the saved library (nothing saved), and the shopping list (list is empty).

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `headline` | `string` | Yes | Primary message (e.g. "No results found") |
| `description` | `string` | No | Supporting text explaining what to do |
| `action` | `node` | No | Optional `Button` to provide a next step |
| `icon` | `node` | No | Optional icon displayed above the headline |

### Visual Structure

```
<div> flex flex-col items-center justify-center text-center gap-space-md py-space-2xl px-space-xl

  {icon && <div> text-neutral-400 mb-space-sm }  ← icon slot, muted color

  <h3> text-h3 text-neutral-900                  ← headline

  {description &&
    <p> text-body text-neutral-600 max-w-[380px]} ← supporting text

  {action && <div> mt-space-md }                  ← action slot (Button)
```

### States

- This component has a single state — it is shown only when there is nothing to display.
- The `action` slot allows a `Button` (primary or secondary) to give the user a path forward.

### Usage Rules

- Use whenever a list, grid, or page section has zero items to show.
- Always provide a `headline`. Always provide a `description` when the reason for emptiness may not be obvious.
- When the user can take an action to populate the empty state (e.g. "Search for a product"), include an `action`.
- Do not use `EmptyState` for error conditions — use an error message pattern instead.
- Center the empty state vertically within its container using `py-space-2xl`.
