import { useState } from 'react'
import ProductCard from '../../components/ProductCard'
import CategoryTag from '../../components/CategoryTag'
import EmptyState from '../../components/EmptyState'

const PRODUCTS = [
  {
    id: 1,
    name: "Dr. Bronner's Pure Castile Soap",
    score: 'clean',
    category: 'Personal Care',
    description: 'Organic, fair trade certified. Free from synthetic preservatives, detergents, and fragrances.',
  },
  {
    id: 2,
    name: 'Aveeno Daily Moisturizing Lotion',
    score: 'caution',
    category: 'Personal Care',
    description: 'Contains dimethicone and fragrance flagged for moderate skin concern by EWG.',
  },
  {
    id: 3,
    name: 'Method All-Purpose Cleaner',
    score: 'clean',
    category: 'Home Cleaning',
    description: 'Plant-based surfactants, no bleach or synthetic dyes. Biodegradable formula.',
  },
  {
    id: 4,
    name: 'Clorox Disinfecting Wipes',
    score: 'avoid',
    category: 'Home Cleaning',
    description: 'Contains quaternary ammonium compounds linked to respiratory irritation and aquatic toxicity.',
  },
  {
    id: 5,
    name: "Burt's Bees Baby Shampoo",
    score: 'clean',
    category: 'Baby Care',
    description: 'Tear-free, pediatrician tested. Free from parabens, phthalates, and synthetic fragrances.',
  },
  {
    id: 6,
    name: "Johnson's Baby Powder",
    score: 'caution',
    category: 'Baby Care',
    description: 'Talc-based formula with ongoing regulatory review. Fragrance listed as a potential irritant.',
  },
]

const CATEGORIES = ['All', 'Personal Care', 'Home Cleaning', 'Baby Care']

export default function BrowsePage() {
  const [saved, setSaved] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')

  const toggleSave = (id) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const filtered =
    activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory)

  return (
    <div className="max-w-[1100px] mx-auto px-space-xl py-space-3xl">
      <div className="mb-space-2xl">
        <h1 className="text-h1 text-neutral-900 mb-space-sm">Browse products</h1>
        <p className="text-body text-neutral-600">
          Explore products by category and see their safety ratings.
        </p>
      </div>

      <div className="flex flex-wrap gap-space-sm mb-space-2xl">
        {CATEGORIES.map((cat) => (
          <CategoryTag
            key={cat}
            label={cat}
            interactive
            selected={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          headline="No products in this category"
          description="Try selecting a different category above."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-xl">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              score={product.score}
              category={product.category}
              description={product.description}
              isSaved={saved.includes(product.id)}
              onSave={() => toggleSave(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
