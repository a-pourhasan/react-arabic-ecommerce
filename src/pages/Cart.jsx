import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cart, cartSubtotal, cartTax, cartTotal, removeFromCart, updateQty } = useCart()

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
        <ShoppingBag size={56} className="text-white/10 mb-6" />
        <h2 className="text-xl font-semibold mb-2">سلتك فارغة</h2>
        <p className="text-white/30 text-sm mb-8">أضف منتجات إلى سلتك للمتابعة</p>
        <Link to="/shop" className="gold-btn no-underline">ابدأ التسوق</Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-8">سلة التسوق</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
        {/* Items */}
        <div className="flex flex-col gap-3">
          {cart.map(item => (
            <div key={item.id}
              className="card p-4 flex gap-4 items-center">
              <div className="bg-dark-input rounded-xl w-16 h-16 flex items-center justify-center text-3xl shrink-0">
                {item.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[15px] truncate">{item.name}</p>
                <p className="text-white/30 text-[12px] mb-1">{item.category}</p>
                <p className="text-gold font-semibold text-[14px]">{item.price} ر.س / قطعة</p>
              </div>

              {/* Qty controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => updateQty(item.id, -1)}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white/60
                             hover:bg-white/10 hover:text-white cursor-pointer transition-all
                             flex items-center justify-center">
                  <Minus size={13} />
                </button>
                <span className="w-7 text-center font-semibold text-[14px]">{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white/60
                             hover:bg-white/10 hover:text-white cursor-pointer transition-all
                             flex items-center justify-center">
                  <Plus size={13} />
                </button>
              </div>

              {/* Line total + delete */}
              <div className="text-left shrink-0 flex flex-col items-end gap-2">
                <p className="font-bold text-[15px]">{item.price * item.qty} ر.س</p>
                <button onClick={() => removeFromCart(item.id)}
                  className="text-red-500/60 hover:text-red-400 cursor-pointer transition-colors bg-transparent border-none p-0">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}

          <Link to="/shop"
            className="flex items-center gap-2 text-white/30 text-sm no-underline hover:text-white/60 transition-colors w-fit mt-2">
            <ArrowLeft size={14} />
            متابعة التسوق
          </Link>
        </div>

        {/* Summary */}
        <div className="card p-5 sticky top-20">
          <h3 className="font-semibold text-[15px] mb-4">ملخص الطلب</h3>

          <div className="space-y-3 text-[13px]">
            <div className="flex justify-between">
              <span className="text-white/40">المجموع الفرعي</span>
              <span>{cartSubtotal} ر.س</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">رسوم الشحن</span>
              <span className="text-green-400 text-[12px]">مجاني</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">ضريبة القيمة المضافة (١٥٪)</span>
              <span>{cartTax} ر.س</span>
            </div>
          </div>

          <div className="border-t border-white/[0.08] mt-4 pt-4 flex justify-between font-bold text-[16px]">
            <span>الإجمالي</span>
            <span className="text-gold">{cartTotal} ر.س</span>
          </div>

          {/* Coupon */}
          <div className="mt-4 flex gap-2">
            <input placeholder="كوبون الخصم" className="form-input text-[12px] flex-1" />
            <button className="shrink-0 border border-white/10 text-white/40 px-3 py-2 rounded-xl
                               text-[12px] hover:bg-white/5 cursor-pointer transition-all">
              تطبيق
            </button>
          </div>

          <Link to="/checkout"
            className="gold-btn w-full text-center mt-4 block no-underline text-[14px]">
            متابعة الدفع ←
          </Link>

          <div className="mt-4 flex items-center gap-2 bg-green-900/20 border border-green-800/30
                          rounded-xl p-3 text-[11px] text-green-400">
            <span>🔒</span>
            <span>الدفع مشفر وآمن بالكامل</span>
          </div>
        </div>
      </div>
    </div>
  )
}
