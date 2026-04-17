const VARIANT_CLASSES = {
  primary:
    'bg-primary text-white hover:bg-primary-dark focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed',
  secondary:
    'bg-transparent text-primary border border-primary hover:bg-primary/10 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed',
  ghost:
    'bg-transparent text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 focus:ring-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed',
}

const SIZE_CLASSES = {
  md: 'text-body px-space-lg py-space-sm',
  sm: 'text-small px-space-md py-space-xs',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  isLoading = false,
  disabled = false,
  onClick,
  children,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`rounded-md font-semibold transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]}`}
    >
      {isLoading ? (
        <span className="flex items-center gap-space-xs">
          <svg className="animate-spin h-[1em] w-[1em]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
          </svg>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  )
}
