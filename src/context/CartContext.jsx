import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [toast, setToast] = useState(null)

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 2800)
  }, [])

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
    showToast(`تمت إضافة "${product.name}" إلى السلة`)
  }, [showToast])

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQty = useCallback((id, delta) => {
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartSubtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const cartTax = Math.round(cartSubtotal * 0.15)
  const cartTotal = cartSubtotal + cartTax

  return (
    <CartContext.Provider value={{
      cart, cartCount, cartSubtotal, cartTax, cartTotal,
      addToCart, removeFromCart, updateQty, clearCart,
      toast, showToast,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
