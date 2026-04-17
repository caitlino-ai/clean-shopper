import { useState, useEffect } from 'react'
import ProductCard from '../../components/ProductCard'
import CategoryTag from '../../components/CategoryTag'
import EmptyState from '../../components/EmptyState'
import { supabase } from '../../lib/supabase'

const CATEGORIES = ['All', 'Personal Care', 'Home Cleaning', 'Baby Care', 'Kitchen']

export default function BrowsePage({ savedIds = [], onToggleSave }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('Products').select('*').order('name')
      if (!error) setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory)

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

      {loading ? (
        <p className="text-body text-neutral-600">Loading products…</p>
      ) : filtered.length === 0 ? (
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
              brand={product.brand}
              score={product.safety_score}
              category={product.category}
              description={product.description}
              isSaved={savedIds.includes(product.id)}
              onSave={() => onToggleSave(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
