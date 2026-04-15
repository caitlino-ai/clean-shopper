import ProductCard from './components/ProductCard'

const SAMPLE_PRODUCTS = [
  {
    name: 'Seventh Generation Free & Clear Laundry Detergent',
    score: 'clean',
    category: 'Laundry',
    description:
      'Plant-based formula with no synthetic fragrances or dyes. EWG Verified. Rated 1 on Skin Deep — no ingredients of concern.',
  },
  {
    name: 'Tide Original Scent Liquid Detergent',
    score: 'caution',
    category: 'Laundry',
    description:
      'Contains synthetic fragrance and optical brighteners flagged for moderate concern. Effective cleaning performance but several ingredients lack full safety data.',
  },
  {
    name: 'Gain Fireworks In-Wash Scent Booster',
    score: 'avoid',
    category: 'Laundry',
    description:
      'Contains synthetic musks and fragrance allergens rated high concern by EWG. Ingredients linked to hormone disruption and aquatic toxicity.',
  },
]

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-50 px-xl py-3xl">
      <h1 className="text-h1 text-neutral-900 mb-2xl">Clean Shopper</h1>
      <div className="grid grid-cols-1 gap-xl max-w-[42rem]">
        {SAMPLE_PRODUCTS.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>
    </div>
  )
}
