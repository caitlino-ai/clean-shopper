const SCORE_CONFIG = {
  clean: { label: 'Clean', className: 'bg-success/10 text-success' },
  caution: { label: 'Caution', className: 'bg-warning/10 text-warning' },
  avoid: { label: 'Avoid', className: 'bg-error/10 text-error' },
}

const SIZE_CONFIG = {
  md: 'text-small px-space-sm py-space-xs',
  sm: 'text-micro px-space-xs py-[2px]',
}

export default function SafetyBadge({ score, size = 'md' }) {
  const { label, className } = SCORE_CONFIG[score]
  const sizeClass = SIZE_CONFIG[size]

  return (
    <span className={`shrink-0 font-semibold rounded-full ${sizeClass} ${className}`}>
      {label}
    </span>
  )
}
