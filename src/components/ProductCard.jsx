const SCORE_CONFIG = {
  clean: {
    label: 'Clean',
    className: 'bg-success/10 text-success',
  },
  caution: {
    label: 'Caution',
    className: 'bg-warning/10 text-warning',
  },
  avoid: {
    label: 'Avoid',
    className: 'bg-error/10 text-error',
  },
}

export default function ProductCard({ name, score, category, description }) {
  const badge = SCORE_CONFIG[score]

  return (
    <div className="bg-secondary rounded-lg shadow-sm p-lg flex flex-col gap-md">
      <div className="flex items-start justify-between gap-md">
        <h3 className="text-h3 text-neutral-900 leading-snug">{name}</h3>
        <span
          className={`shrink-0 text-small font-semibold px-sm py-xs rounded-full ${badge.className}`}
        >
          {badge.label}
        </span>
      </div>

      <span className="self-start text-small text-neutral-600 bg-neutral-200 px-sm py-xs rounded-sm">
        {category}
      </span>

      <p className="text-body text-neutral-600">{description}</p>
    </div>
  )
}
