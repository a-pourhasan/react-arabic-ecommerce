import { ShoppingCart, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <div className="card group flex flex-col overflow-hidden transition-all duration-300
                    hover:border-gold/25 hover:-translate-y-0.5">
      {/* Image area */}
      <div className="bg-dark-input h-44 flex items-center justify-center relative shrink-0">
        <span className="text-6xl select-none transition-transform duration-300 group-hover:scale-110">
          {product.emoji}
        </span>
        {product.badge && (
          <span className="absolute top-3 right-3 bg-gold text-dark-bg text-[10px] font-bold
                           px-2.5 py-1 rounded-lg">
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 left-3 bg-green-900/50 text-green-400 border border-green-800/40
                           text-[10px] font-bold px-2 py-0.5 rounded-md">
            -{discount}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <span className="text-[10px] text-white/30 tracking-widest uppercase">{product.category}</span>
        <h3 className="font-semibold text-[15px] leading-snug text-[#e8e4df]">{product.name}</h3>
        <p className="text-[12px] text-white/30 leading-relaxed line-clamp-2">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-auto pt-1">
          <Star size={12} className="text-gold fill-gold" />
          <span className="text-gold text-[12px] font-medium">{product.rating}</span>
          <span className="text-white/25 text-[11px]">({product.reviews} تقييم)</span>
        </div>

        {/* Price + Add */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
          <div className="flex flex-col">
            <span className="text-gold font-bold text-[17px]">{product.price} ر.س</span>
            {discount && (
              <span className="text-white/20 text-[12px] line-through">{product.originalPrice} ر.س</span>
            )}
          </div>
          <button onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 bg-gold/10 border border-gold/20 text-gold
                       px-3 py-2 rounded-xl text-[12px] font-medium cursor-pointer
                       hover:bg-gold/20 transition-all duration-200 active:scale-95">
            <ShoppingCart size={13} />
            أضف
          </button>
        </div>
      </div>
    </div>
  )
}
