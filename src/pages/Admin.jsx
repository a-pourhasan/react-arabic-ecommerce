import { useState } from 'react'
import {
  LayoutDashboard, Package, ShoppingBag, Users, TrendingUp,
  TrendingDown, Plus, Edit2, Trash2, Eye
} from 'lucide-react'
import { PRODUCTS, ORDERS, CUSTOMERS, STATUS_STYLES } from '../data/products'

const SIDEBAR_TABS = [
  { key: 'dashboard', label: 'الإحصائيات',    icon: LayoutDashboard },
  { key: 'products',  label: 'المنتجات',       icon: Package },
  { key: 'orders',    label: 'الطلبات',        icon: ShoppingBag },
  { key: 'customers', label: 'العملاء',        icon: Users },
]

const STATS = [
  { label: 'إجمالي المبيعات',  val: '٢٣٬٤٥٠ ر.س', change: '+١٢٪', up: true },
  { label: 'الطلبات الجديدة',  val: '٤٨',          change: '+٥٪',  up: true },
  { label: 'العملاء الجدد',    val: '٢١',          change: '-٣٪',  up: false },
  { label: 'معدل التحويل',     val: '٣.٤٪',        change: '+٠.٢٪', up: true },
]

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || {}
  return (
    <span className={`status-badge border ${s.bg} ${s.text} ${s.border}`}>
      {status}
    </span>
  )
}

function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] text-gold tracking-[2px] mb-2">نظرة عامة</p>
        <h2 className="text-xl font-semibold">لوحة التحكم</h2>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {STATS.map((s, i) => (
          <div key={i} className="card p-5">
            <p className="text-[11px] text-white/30 mb-3">{s.label}</p>
            <p className="text-2xl font-bold mb-2">{s.val}</p>
            <div className={`flex items-center gap-1 text-[12px] ${s.up ? 'text-green-400' : 'text-red-400'}`}>
              {s.up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {s.change} من الشهر الماضي
            </div>
          </div>
        ))}
      </div>

      {/* Revenue chart placeholder */}
      <div className="card p-5 mb-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-[14px] font-semibold">المبيعات الشهرية</h3>
          <span className="text-[11px] text-white/25 border border-white/[0.08] px-3 py-1 rounded-lg">٢٠٢٤</span>
        </div>
        {/* Simple bar chart */}
        <div className="flex items-end gap-2 h-32">
          {[40, 65, 50, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-md transition-all"
                style={{ height: `${h}%`, background: i === 11 ? '#c9a96e' : 'rgba(201,169,110,0.25)' }} />
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          {['ي','ف','م','أ','م','ي','ي','أ','س','أ','ن','د'].map((m, i) => (
            <div key={i} className="flex-1 text-center text-[10px] text-white/20">{m}</div>
          ))}
        </div>
      </div>

      {/* Recent orders */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.07]">
          <h3 className="text-[14px] font-semibold">آخر الطلبات</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-white/[0.05]">
                {['رقم الطلب','العميل','الحالة','الإجمالي'].map(h => (
                  <th key={h} className="px-5 py-3 text-right font-medium text-white/30">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ORDERS.slice(0, 5).map(o => (
                <tr key={o.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3 text-gold font-semibold">{o.id}</td>
                  <td className="px-5 py-3">{o.customer}</td>
                  <td className="px-5 py-3"><StatusBadge status={o.status} /></td>
                  <td className="px-5 py-3 font-semibold">{o.total} ر.س</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function Products() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] text-gold tracking-[2px] mb-2">إدارة المخزون</p>
          <h2 className="text-xl font-semibold">المنتجات</h2>
        </div>
        <button className="gold-btn flex items-center gap-2 text-[13px]">
          <Plus size={15} /> إضافة منتج
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-white/[0.07]">
                {['المنتج','الفئة','السعر','التقييم','المراجعات','الإجراءات'].map(h => (
                  <th key={h} className="px-4 py-3 text-right font-medium text-white/30 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map(p => (
                <tr key={p.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{p.emoji}</span>
                      <span className="font-medium">{p.name}</span>
                      {p.badge && (
                        <span className="bg-gold/10 text-gold text-[10px] px-2 py-0.5 rounded-md border border-gold/20">
                          {p.badge}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white/40">{p.category}</td>
                  <td className="px-4 py-3 text-gold font-semibold">{p.price} ر.س</td>
                  <td className="px-4 py-3">⭐ {p.rating}</td>
                  <td className="px-4 py-3 text-white/40">{p.reviews}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 bg-blue-900/30 border border-blue-800/30
                                         text-blue-400 px-3 py-1.5 rounded-lg text-[11px] cursor-pointer
                                         hover:bg-blue-900/50 transition-all">
                        <Edit2 size={11} /> تعديل
                      </button>
                      <button className="flex items-center gap-1 bg-red-900/30 border border-red-800/30
                                         text-red-400 px-3 py-1.5 rounded-lg text-[11px] cursor-pointer
                                         hover:bg-red-900/50 transition-all">
                        <Trash2 size={11} /> حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function Orders() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] text-gold tracking-[2px] mb-2">إدارة المبيعات</p>
        <h2 className="text-xl font-semibold">الطلبات</h2>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'مكتمل',         count: '٣٤', color: 'text-green-400' },
          { label: 'قيد المعالجة', count: '٨',  color: 'text-amber-400' },
          { label: 'تم الشحن',     count: '١٢', color: 'text-blue-400' },
          { label: 'ملغي',         count: '٣',  color: 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="card p-4 text-center">
            <p className={`text-xl font-bold ${s.color} mb-1`}>{s.count}</p>
            <p className="text-[12px] text-white/30">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-white/[0.07]">
                {['رقم الطلب','العميل','التاريخ','العناصر','الحالة','الإجمالي',''].map(h => (
                  <th key={h} className="px-4 py-3 text-right font-medium text-white/30 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ORDERS.map(o => (
                <tr key={o.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-gold font-semibold">{o.id}</td>
                  <td className="px-4 py-3">{o.customer}</td>
                  <td className="px-4 py-3 text-white/40">{o.date}</td>
                  <td className="px-4 py-3 text-white/40">{o.items} قطعة</td>
                  <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                  <td className="px-4 py-3 font-semibold">{o.total} ر.س</td>
                  <td className="px-4 py-3">
                    <button className="flex items-center gap-1 border border-white/[0.08] text-white/40
                                       px-3 py-1.5 rounded-lg text-[11px] cursor-pointer hover:bg-white/5 transition-all">
                      <Eye size={11} /> تفاصيل
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function CustomersTab() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] text-gold tracking-[2px] mb-2">إدارة المستخدمين</p>
        <h2 className="text-xl font-semibold">العملاء</h2>
      </div>

      <div className="flex flex-col gap-3">
        {CUSTOMERS.map(c => (
          <div key={c.id} className="card p-4 flex items-center gap-4 hover:border-white/15 transition-all">
            <div className="w-11 h-11 rounded-full bg-gold/10 border border-gold/20 shrink-0
                             flex items-center justify-center text-gold font-bold text-[14px]">
              {c.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[14px]">{c.name}</p>
              <p className="text-white/30 text-[12px]">
                {c.email} · عضو منذ {c.joined}
              </p>
            </div>
            <div className="text-left shrink-0">
              <p className="text-gold font-semibold text-[14px]">{c.total} ر.س</p>
              <p className="text-white/30 text-[12px]">{c.orders} طلبات</p>
            </div>
            <button className="border border-white/[0.08] text-white/30 px-3 py-1.5 rounded-xl
                               text-[11px] hover:bg-white/5 cursor-pointer transition-all shrink-0">
              عرض الملف
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

const TAB_COMPONENTS = {
  dashboard: Dashboard,
  products:  Products,
  orders:    Orders,
  customers: CustomersTab,
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const TabComponent = TAB_COMPONENTS[activeTab]

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className="w-56 bg-dark-sidebar border-l border-white/[0.05] shrink-0 py-6">
        <p className="text-[10px] text-white/20 tracking-[2px] px-5 mb-4">القائمة الرئيسية</p>
        <nav className="flex flex-col gap-0.5 px-2">
          {SIDEBAR_TABS.map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setActiveTab(key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] text-right
                          cursor-pointer border-none transition-all duration-200 w-full
                          ${activeTab === key
                            ? 'bg-gold/10 text-gold'
                            : 'bg-transparent text-white/30 hover:bg-white/5 hover:text-white/60'}`}>
              <Icon size={16} className="shrink-0" />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-auto">
        <TabComponent />
      </main>
    </div>
  )
}
