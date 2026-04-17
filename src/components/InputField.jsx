export default function InputField({
  label,
  value,
  onChange,
  id,
  placeholder,
  error,
  hint,
  disabled = false,
  type = 'text',
}) {
  return (
    <div className="flex flex-col gap-space-xs">
      <label htmlFor={id} className="text-h4 text-neutral-900">
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`bg-neutral-100 border rounded-md px-space-md py-space-sm text-body text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-200 ${
          error
            ? 'border-error focus:ring-error'
            : 'border-neutral-200 focus:ring-accent focus:border-accent'
        }`}
      />

      {(error || hint) && (
        <p className={`text-small mt-space-xs ${error ? 'text-error' : 'text-neutral-600'}`}>
          {error || hint}
        </p>
      )}
    </div>
  )
}
