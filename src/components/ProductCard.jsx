import SafetyBadge from './SafetyBadge'
import CategoryTag from './CategoryTag'

export default function ProductCard({ name, brand, score, category, description, onSave, isSaved, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-secondary rounded-lg shadow-sm hover:shadow-md transition-shadow p-space-lg flex flex-col gap-space-md cursor-pointer"
    >
      <div className="flex items-start justify-between gap-space-md">
        <div>
          <h3 className="text-h3 text-neutral-900">{name}</h3>
          {brand && <p className="text-small text-neutral-600 mt-[2px]">{brand}</p>}
        </div>
        <SafetyBadge score={score} size="sm" />
      </div>

      <CategoryTag label={category} />

      <p className="text-body text-neutral-600">{description}</p>

      {onSave && (
        <button
          onClick={(e) => { e.stopPropagation(); onSave() }}
          className="self-start text-small font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
      )}
    </div>
  )
}
