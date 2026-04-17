export default function CategoryTag({ label, interactive = false, selected = false, onClick }) {
  if (!interactive) {
    return (
      <span className="self-start text-small text-neutral-600 bg-neutral-200 px-space-sm py-space-xs rounded-sm">
        {label}
      </span>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`text-small px-space-sm py-space-xs rounded-sm border transition-colors cursor-pointer ${
        selected
          ? 'bg-primary/10 text-primary border-primary font-semibold'
          : 'text-neutral-600 bg-neutral-200 border-neutral-200 hover:bg-neutral-100 hover:border-neutral-400'
      }`}
    >
      {label}
    </button>
  )
}
