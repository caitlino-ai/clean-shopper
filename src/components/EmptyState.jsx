export default function EmptyState({ headline, description, action, icon }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-space-md py-space-2xl px-space-xl">
      {icon && (
        <div className="text-neutral-400 mb-space-sm">{icon}</div>
      )}
      <h3 className="text-h3 text-neutral-900">{headline}</h3>
      {description && (
        <p className="text-body text-neutral-600 max-w-[380px]">{description}</p>
      )}
      {action && <div className="mt-space-md">{action}</div>}
    </div>
  )
}
