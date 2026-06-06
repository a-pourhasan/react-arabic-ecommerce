import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Admin from './pages/Admin'

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Toast />
        <main className="flex-1">
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/shop"     element={<Shop />} />
            <Route path="/cart"     element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin"    element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}
