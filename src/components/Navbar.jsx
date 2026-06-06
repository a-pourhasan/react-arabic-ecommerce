import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, LayoutDashboard, Home, Search, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

const NAV_LINKS = [
  { to: '/', label: 'الرئيسية', icon: Home },
  { to: '/shop', label: 'المتجر', icon: Search },
  { to: '/admin', label: 'لوحة الإدارة', icon: LayoutDashboard },
]

export default function Navbar() {
  const { cartCount } = useCart()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-dark-bg/95 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline shrink-0">
          <span className="text-gold text-xl">◈</span>
          <span className="text-lg font-bold"
            style={{ background: 'linear-gradient(135deg, #c9a96e, #e8d5b0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            متجر نموذجي
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => {
            const active = location.pathname === to || (to !== '/' && location.pathname.startsWith(to))
            return (
              <Link key={to} to={to}
                className={`nav-link no-underline text-sm
                  ${active
                    ? 'bg-gold/10 text-gold border-gold/25'
                    : 'bg-transparent text-[#8a8480] border-transparent hover:bg-white/5 hover:text-[#c8c4c0]'
                  }`}>
                {label}
              </Link>
            )
          })}
        </div>

        {/* Cart & mobile menu */}
        <div className="flex items-center gap-3">
          <Link to="/cart"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm border no-underline transition-all duration-200
              ${cartCount > 0 ? 'bg-gold/10 text-gold border-gold/25' : 'bg-transparent text-[#8a8480] border-white/[0.08] hover:bg-white/5'}`}>
            <ShoppingCart size={16} />
            <span>السلة</span>
            {cartCount > 0 && (
              <span className="bg-gold text-dark-bg rounded-full w-5 h-5 flex items-center justify-center text-[11px] font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          <button className="md:hidden text-[#8a8480] hover:text-white transition-colors"
            onClick={() => setMenuOpen(v => !v)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/[0.06] px-6 py-3 flex flex-col gap-1 bg-dark-bg">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to || (to !== '/' && location.pathname.startsWith(to))
            return (
              <Link key={to} to={to} onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm no-underline transition-all
                  ${active ? 'bg-gold/10 text-gold' : 'text-[#8a8480] hover:bg-white/5 hover:text-white'}`}>
                <Icon size={16} />
                {label}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
