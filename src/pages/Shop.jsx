import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { PRODUCTS, CATEGORIES } from '../data/products'

const SORT_OPTIONS = [
  { value: 'default',    label: 'الافتراضي' },
  { value: 'price-asc',  label: 'السعر: الأقل أولاً' },
  { value: 'price-desc', label: 'السعر: الأعلى أولاً' },
  { value: 'rating',     label: 'الأعلى تقييماً' },
]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
  const [category, setCategory] = useState(searchParams.get('category') || 'الكل')

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setCategory(cat)
  }, [searchParams])

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(p => {
      const matchCat = category === 'الكل' || p.category === category
      const matchSearch = !search || p.name.includes(search) || p.category.includes(search) || p.description.includes(search)
      return matchCat && matchSearch
    })
    if (sort === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating')     list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [search, category, sort])

  const handleCategoryChange = (cat) => {
    setCategory(cat)
    if (cat !== 'الكل') setSearchParams({ category: cat })
    else setSearchParams({})
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <p className="text-[10px] text-gold tracking-[2px] mb-2">جميع المنتجات</p>
        <h1 className="text-2xl font-semibold">تصفح المتجر</h1>
      </div>

      {/* Search & Sort bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute top-1/2 -translate-y-1/2 right-4 text-white/25 pointer-events-none" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="ابحث عن منتج أو فئة..."
            className="form-input pr-10"
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <SlidersHorizontal size={15} className="text-white/30" />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="form-input w-auto cursor-pointer"
            style={{ width: 'auto' }}
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-1.5 rounded-xl text-sm border transition-all duration-200 cursor-pointer
              ${category === cat
                ? 'bg-gold/12 text-gold border-gold/30'
                : 'bg-transparent text-white/30 border-white/[0.08] hover:border-white/20 hover:text-white/50'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-[12px] text-white/25 mb-5">
        {filtered.length} منتج
        {search && ` · نتائج "${search}"`}
        {category !== 'الكل' && ` · في "${category}"`}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-white/25">
          <span className="text-5xl mb-4">🔍</span>
          <p className="text-base mb-1">لا توجد نتائج مطابقة</p>
          <p className="text-sm">جرّب تغيير مصطلح البحث أو الفئة</p>
        </div>
      )}
    </div>
  )
}
