import { Link } from 'react-router-dom'
import { ArrowLeft, ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { PRODUCTS, CATEGORIES } from '../data/products'

const STATS = [
  { num: '+١٢٠٠', label: 'منتج متاح' },
  { num: '+٥٠٠٠', label: 'عميل راضٍ' },
  { num: '+٩٨٪',  label: 'تقييم إيجابي' },
  { num: '٢٤/٧',  label: 'دعم متواصل' },
]

const FEATURES = [
  { icon: Truck,        title: 'شحن مجاني',      desc: 'على جميع الطلبات فوق ٢٠٠ ر.س' },
  { icon: RotateCcw,    title: 'إرجاع سهل',       desc: 'إرجاع مجاني خلال ٣٠ يوماً' },
  { icon: ShieldCheck,  title: 'دفع آمن',          desc: 'تشفير كامل لبياناتك المصرفية' },
  { icon: Headphones,   title: 'دعم متواصل',       desc: 'فريق دعم على مدار الساعة' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.05]"
        style={{ background: 'linear-gradient(135deg, #0d0d18 0%, #13131f 60%, #0d0d18 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 60%, rgba(201,169,110,0.05) 0%, transparent 65%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <p className="text-[11px] text-gold tracking-[4px] mb-5 font-medium uppercase">
            اسم المتجر التجاري · منذ ٢٠٢٤
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5 tracking-tight">
            اكتشف أفضل المنتجات
            <br />
            <span className="text-gold opacity-90">بأسعار استثنائية</span>
          </h1>
          <p className="text-white/40 text-base max-w-md mx-auto mb-10 leading-relaxed">
            وصف مختصر للمتجر وما يقدمه من منتجات وخدمات متميزة تلبي احتياجات العملاء.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/shop" className="gold-btn no-underline">تسوق الآن</Link>
            <Link to="/shop" className="outline-gold-btn no-underline">تصفح الفئات</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-x-reverse divide-white/[0.05]
                      border-b border-white/[0.05]">
        {STATS.map((s, i) => (
          <div key={i} className="py-8 text-center px-4">
            <p className="text-3xl font-bold text-gold mb-1.5">{s.num}</p>
            <p className="text-[12px] text-white/25">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[10px] text-gold tracking-[2px] mb-2">المنتجات المميزة</p>
            <h2 className="text-2xl font-semibold">الأكثر مبيعاً</h2>
          </div>
          <Link to="/shop"
            className="flex items-center gap-2 text-gold text-sm border border-gold/20
                       px-4 py-2 rounded-xl no-underline hover:bg-gold/10 transition-all">
            عرض الكل
            <ArrowLeft size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {PRODUCTS.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-dark-card/50 border-y border-white/[0.05] py-14">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[11px] text-gold tracking-[3px] text-center mb-8">تصفح حسب الفئة</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {CATEGORIES.slice(1).map(cat => (
              <Link key={cat} to={`/shop?category=${encodeURIComponent(cat)}`}
                className="bg-dark-card border border-white/[0.07] text-white/40 px-6 py-3
                           rounded-2xl text-sm no-underline hover:border-gold/25 hover:text-gold
                           hover:bg-gold/5 transition-all duration-200">
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[10px] text-gold tracking-[2px] mb-2">وصل حديثاً</p>
            <h2 className="text-2xl font-semibold">منتجات جديدة</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {PRODUCTS.slice(4, 8).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-white/[0.05] py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center gap-3 p-6
                                         card hover:border-gold/20 transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Icon size={18} className="text-gold" />
              </div>
              <p className="font-semibold text-[14px]">{title}</p>
              <p className="text-white/30 text-[12px] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
