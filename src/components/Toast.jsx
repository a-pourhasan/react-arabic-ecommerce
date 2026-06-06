import { useCart } from '../context/CartContext'
import { CheckCircle } from 'lucide-react'

export default function Toast() {
  const { toast } = useCart()
  if (!toast) return null

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] pointer-events-none">
      <div className="flex items-center gap-3 bg-dark-card border border-gold/25 text-[#e8d5b0]
                      px-5 py-3 rounded-2xl shadow-2xl text-sm animate-fade-in">
        <CheckCircle size={16} className="text-gold shrink-0" />
        {toast.msg}
      </div>
    </div>
  )
}
