import { useState } from 'react'
import SearchBar from '../../components/SearchBar'
import ProductCard from '../../components/ProductCard'
import EmptyState from '../../components/EmptyState'
import { supabase } from '../../lib/supabase'

export default function SearchPage({ savedIds = [], onToggleSave }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (value) => {
    const trimmed = value.trim()
    if (!trimmed) return

    setIsLoading(true)
    setHasSearched(true)

    const { data, error } = await supabase
      .from('Products')
      .select('*')
      .order('name')

    if (!error) {
      const term = trimmed.toLowerCase()
      const matches = data.filter(
        (p) =>
          p.name?.toLowerCase().includes(term) ||
          p.brand?.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term)
      )
      setResults(matches)
    }

    setIsLoading(false)
  }

  return (
    <div className="max-w-[720px] mx-auto px-space-xl py-space-3xl">
      <div className="mb-space-2xl">
        <h1 className="text-h1 text-neutral-900 mb-space-sm">Find safer products</h1>
        <p className="text-body text-neutral-600">
          Search any home or personal care product by name, brand, or ingredient concern.
        </p>
      </div>

      <div className="mb-space-2xl">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={handleSearch}
          placeholder="e.g. dish soap, shampoo, laundry detergent…"
          isLoading={isLoading}
        />
      </div>

      {hasSearched && !isLoading && (
        results.length === 0 ? (
          <EmptyState
            headline="No results found"
            description={`No products matched "${query}". Try a different name, brand, or keyword.`}
          />
        ) : (
          <div>
            <p className="text-small text-neutral-600 mb-space-lg">
              {results.length} {results.length === 1 ? 'result' : 'results'} for{' '}
              <span className="font-semibold text-neutral-900">"{query}"</span>
            </p>
            <div className="flex flex-col gap-space-xl">
              {results.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  brand={product.brand}
                  score={product.safety_score}
                  category={product.category}
                  description={product.description}
                  isSaved={savedIds.includes(product.id)}
                  onSave={() => onToggleSave(product.id)}
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  )
}
