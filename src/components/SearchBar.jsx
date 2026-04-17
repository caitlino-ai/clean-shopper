import Button from './Button'

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search for a product…',
  isLoading = false,
  disabled = false,
}) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(value)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-space-sm">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled || isLoading}
        className="flex-1 bg-neutral-100 border border-neutral-200 rounded-md px-space-md py-space-sm text-body text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      />
      <Button type="submit" variant="primary" isLoading={isLoading} disabled={disabled}>
        Search
      </Button>
    </form>
  )
}
