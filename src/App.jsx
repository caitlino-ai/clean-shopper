import { useState } from 'react'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import ProductCard from './components/ProductCard'
import EmptyState from './components/EmptyState'
import BrowsePage from './features/browse/BrowsePage'

const SAMPLE_RESULTS = [
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

          {hasSearched ? (
            <div>
              <p className="text-small text-neutral-600 mb-space-lg">
                {SAMPLE_RESULTS.length} results for <span className="font-semibold text-neutral-900">"{query}"</span>
              </p>
              <div className="flex flex-col gap-space-xl">
                {SAMPLE_RESULTS.map((product) => (
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
          ) : (
            <EmptyState
              headline="Search to see results"
              description="Type a product name or category above to get an ingredient safety analysis."
            />
          )}
        </div>
      )}
    </div>
  )
}
