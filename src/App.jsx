import { useState } from 'react'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import ProductCard from './components/ProductCard'
import BrowsePage from './features/browse/BrowsePage'

const SEARCH_RESULTS = [
  {
    id: 1,
    name: "Dr. Bronner's Pure Castile Soap",
    score: 'clean',
    category: 'Personal Care',
    description: 'Organic, fair trade, no synthetic preservatives or detergents. EWG Verified.',
  },
  {
    id: 2,
    name: 'Seventh Generation Dish Liquid',
    score: 'clean',
    category: 'Cleaning',
    description: 'Plant-based formula, no synthetic fragrances or dyes. Biodegradable surfactants.',
  },
  {
    id: 3,
    name: 'Tide Original Liquid Detergent',
    score: 'caution',
    category: 'Laundry',
    description: 'Contains synthetic fragrance and optical brighteners flagged for moderate concern.',
  },
]

const RECOMMENDED_PRODUCTS = [
  {
    id: 10,
    name: 'Native Deodorant',
    score: 'clean',
    category: 'Personal Care',
    description: 'No aluminum, parabens, or sulfates. Simple ingredient list with coconut oil and shea butter.',
  },
  {
    id: 11,
    name: 'Branch Basics Concentrate',
    score: 'clean',
    category: 'Cleaning',
    description: 'One plant-based concentrate replaces all household cleaners. Free from fragrance and dyes.',
  },
  {
    id: 12,
    name: 'Burt\'s Bees Lip Balm',
    score: 'clean',
    category: 'Personal Care',
    description: '100% natural origin, beeswax-based formula. No parabens, phthalates, or synthetic fragrances.',
  },
  {
    id: 13,
    name: 'Method Foaming Hand Wash',
    score: 'clean',
    category: 'Cleaning',
    description: 'Plant-derived cleaning agents, no triclosan or parabens. Biodegradable formula.',
  },
  {
    id: 14,
    name: 'CeraVe Moisturizing Cream',
    score: 'caution',
    category: 'Personal Care',
    description: 'Contains parabens as preservatives. Otherwise gentle ceramide formula suitable for sensitive skin.',
  },
  {
    id: 15,
    name: 'Arm & Hammer Sensitive Toothpaste',
    score: 'caution',
    category: 'Personal Care',
    description: 'Fluoride formula with low-concern ingredients overall, but contains artificial flavors.',
  },
]

function getRecommended(savedIds) {
  if (savedIds.length === 0) return RECOMMENDED_PRODUCTS.slice(0, 4)

  const savedProducts = [...SEARCH_RESULTS, ...RECOMMENDED_PRODUCTS].filter((p) =>
    savedIds.includes(p.id)
  )
  const savedCategories = [...new Set(savedProducts.map((p) => p.category))]

  const prioritized = RECOMMENDED_PRODUCTS.filter((p) =>
    savedCategories.includes(p.category)
  )
  const rest = RECOMMENDED_PRODUCTS.filter(
    (p) => !savedCategories.includes(p.category)
  )

  return [...prioritized, ...rest].slice(0, 4)
}

export default function App() {
  const [page, setPage] = useState('library')
  const [query, setQuery] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [saved, setSaved] = useState([])

  const handleSearch = (value) => {
    if (value.trim()) setHasSearched(true)
  }

  const toggleSave = (id) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const recommended = getRecommended(saved)

  return (
    <div className="min-h-screen bg-neutral-50">
      <NavBar activePage={page} onNavigate={setPage} />

      {page === 'library' && <BrowsePage />}

      {page === 'search' && (
        <div className="max-w-[720px] mx-auto px-space-xl py-space-3xl">
          <div className="mb-space-2xl">
            <h1 className="text-h1 text-neutral-900 mb-space-sm">Find safer products</h1>
            <p className="text-body text-neutral-600">
              Search any home or personal care product. We'll analyze its ingredients and tell you if it's clean.
            </p>
          </div>

          <div className="mb-space-2xl">
            <SearchBar
              value={query}
              onChange={setQuery}
              onSubmit={handleSearch}
              placeholder="e.g. dish soap, shampoo, laundry detergent…"
            />
          </div>

          {hasSearched && (
            <div className="mb-space-3xl">
              <p className="text-small text-neutral-600 mb-space-lg">
                {SEARCH_RESULTS.length} results for{' '}
                <span className="font-semibold text-neutral-900">"{query}"</span>
              </p>
              <div className="flex flex-col gap-space-xl">
                {SEARCH_RESULTS.map((product) => (
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
            </div>
          )}

          <div>
            <div className="mb-space-lg">
              <h2 className="text-h2 text-neutral-900 mb-space-xs">Recommended for you</h2>
              <p className="text-body text-neutral-600">
                {saved.length > 0
                  ? 'Based on your saves and recent searches.'
                  : 'Popular clean products to get you started.'}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xl">
              {recommended.map((product) => (
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
          </div>
        </div>
      )}
    </div>
  )
}
