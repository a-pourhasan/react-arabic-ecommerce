import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Lock } from 'lucide-react'
import { useCart } from '../context/CartContext'

const STEPS = [
  { n: 1, label: 'معلومات الشحن' },
  { n: 2, label: 'طريقة الدفع' },
  { n: 3, label: 'تأكيد الطلب' },
]

const PAYMENT_METHODS = [
  { id: 'card',   icon: '💳', label: 'بطاقة ائتمانية / مدى', sub: 'Visa · Mastercard · Mada' },
  { id: 'apple',  icon: '🍎', label: 'Apple Pay',              sub: 'الدفع السريع عبر Apple' },
  { id: 'bank',   icon: '🏦', label: 'تحويل بنكي',             sub: 'دفع مباشر من حسابك البنكي' },
]

function FormField({ label, placeholder, type = 'text', half = false }) {
  return (
    <div className={half ? '' : ''}>
      <label className="block text-[12px] text-white/40 mb-1.5">{label}</label>
      <input type={type} placeholder={placeholder} className="form-input" />
    </div>
  )
}

export default function Checkout() {
  const [step, setStep] = useState(1)
  const [payMethod, setPayMethod] = useState('card')
  const { cart, cartSubtotal, cartTax, cartTotal, clearCart, showToast } = useCart()
  const navigate = useNavigate()

  const handleConfirm = () => {
    clearCart()
    showToast('✓ تم تأكيد طلبك بنجاح! سيتم التواصل معك قريباً')
    navigate('/')
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-10 flex-wrap">
        {STEPS.map((s, i) => (
          <div key={s.n} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold
                             transition-all duration-300 shrink-0
                             ${step > s.n  ? 'bg-green-500 text-white'
                             : step === s.n ? 'bg-gold text-dark-bg'
                             : 'bg-dark-card border border-white/10 text-white/25'}`}>
              {step > s.n ? <Check size={14} /> : s.n}
            </div>
            <span className={`text-[13px] whitespace-nowrap transition-colors
              ${step >= s.n ? 'text-[#e8e4df]' : 'text-white/25'}`}>
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`w-8 h-px mx-1 transition-colors ${step > s.n ? 'bg-green-500/40' : 'bg-white/[0.08]'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_270px] gap-6 items-start">
        {/* Main form */}
        <div className="card p-6">
          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h2 className="text-[16px] font-semibold mb-6">معلومات الشحن</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <FormField label="الاسم الأول" placeholder="اسم العميل" />
                <FormField label="اسم العائلة"  placeholder="اللقب" />
              </div>
              <div className="space-y-4">
                <FormField label="البريد الإلكتروني" placeholder="example@email.com" type="email" />
                <FormField label="رقم الهاتف"        placeholder="+966 5X XXX XXXX" />
                <FormField label="العنوان"             placeholder="الشارع، رقم المبنى، الحي" />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <FormField label="المدينة"        placeholder="المدينة" />
                <FormField label="المنطقة"        placeholder="المنطقة" />
                <FormField label="الرمز البريدي"  placeholder="XXXXX" />
              </div>
              <button onClick={() => setStep(2)} className="gold-btn w-full mt-6 text-[14px]">
                التالي: طريقة الدفع ←
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h2 className="text-[16px] font-semibold mb-6">طريقة الدفع</h2>
              <div className="space-y-3 mb-6">
                {PAYMENT_METHODS.map(m => (
                  <label key={m.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all
                                ${payMethod === m.id
                                  ? 'bg-gold/6 border-gold/25'
                                  : 'border-white/[0.07] hover:border-white/15'}`}
                    onClick={() => setPayMethod(m.id)}>
                    <input type="radio" name="pay" checked={payMethod === m.id}
                      onChange={() => setPayMethod(m.id)}
                      className="accent-[#c9a96e] shrink-0" />
                    <span className="text-2xl">{m.icon}</span>
                    <div>
                      <p className="text-[14px] font-medium">{m.label}</p>
                      <p className="text-[12px] text-white/30">{m.sub}</p>
                    </div>
                  </label>
                ))}
              </div>

              {payMethod === 'card' && (
                <div className="space-y-4 border-t border-white/[0.07] pt-5">
                  <FormField label="رقم البطاقة" placeholder="XXXX  XXXX  XXXX  XXXX" />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="تاريخ الانتهاء" placeholder="MM / YY" />
                    <FormField label="رمز الأمان CVV"  placeholder="XXX" />
                  </div>
                  <FormField label="اسم حامل البطاقة" placeholder="الاسم كما يظهر على البطاقة" />
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)}
                  className="border border-white/10 text-white/40 px-5 py-3 rounded-xl text-[13px]
                             hover:bg-white/5 cursor-pointer transition-all">
                  ← رجوع
                </button>
                <button onClick={() => setStep(3)} className="gold-btn flex-1 text-[14px]">
                  مراجعة الطلب ←
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <h2 className="text-[16px] font-semibold mb-6">مراجعة وتأكيد الطلب</h2>

              <div className="space-y-3 mb-6">
                <div className="bg-dark-bg rounded-xl p-4">
                  <p className="text-[11px] text-white/30 mb-2 tracking-wide">📍 عنوان الشحن</p>
                  <p className="text-[13px] text-white/60 leading-relaxed">
                    اسم العميل · الشارع، الحي<br />المدينة، المنطقة · الرمز البريدي
                  </p>
                </div>
                <div className="bg-dark-bg rounded-xl p-4">
                  <p className="text-[11px] text-white/30 mb-2 tracking-wide">💳 طريقة الدفع</p>
                  <p className="text-[13px] text-white/60">
                    {PAYMENT_METHODS.find(m => m.id === payMethod)?.icon}{' '}
                    {PAYMENT_METHODS.find(m => m.id === payMethod)?.label}
                    {payMethod === 'card' && ' ···· XXXX'}
                  </p>
                </div>
              </div>

              {/* Order items */}
              <div className="border border-white/[0.07] rounded-xl overflow-hidden mb-6">
                <div className="px-4 py-3 border-b border-white/[0.07] text-[12px] text-white/30">
                  المنتجات ({cart.reduce((s, i) => s + i.qty, 0)} قطعة)
                </div>
                {cart.map(item => (
                  <div key={item.id}
                    className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.04] last:border-0">
                    <span className="text-xl">{item.emoji}</span>
                    <div className="flex-1 text-[13px]">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-white/30 mr-2">× {item.qty}</span>
                    </div>
                    <span className="text-gold font-semibold text-[13px]">{item.price * item.qty} ر.س</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)}
                  className="border border-white/10 text-white/40 px-5 py-3 rounded-xl text-[13px]
                             hover:bg-white/5 cursor-pointer transition-all">
                  ← رجوع
                </button>
                <button onClick={handleConfirm}
                  className="gold-btn flex-1 text-[14px] flex items-center justify-center gap-2">
                  <Lock size={14} />
                  تأكيد الطلب ودفع {cartTotal} ر.س
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="card p-4 sticky top-20">
          <h4 className="text-[13px] font-semibold mb-4">ملخص الطلب</h4>
          <div className="space-y-3 mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="bg-dark-bg w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0">
                  {item.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium truncate">{item.name}</p>
                  <p className="text-[11px] text-white/30">× {item.qty}</p>
                </div>
                <span className="text-[12px] text-gold font-semibold shrink-0">
                  {item.price * item.qty} ر.س
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/[0.07] pt-3 space-y-2 text-[12px]">
            <div className="flex justify-between text-white/40">
              <span>المجموع الفرعي</span><span>{cartSubtotal} ر.س</span>
            </div>
            <div className="flex justify-between text-white/40">
              <span>الشحن</span><span className="text-green-400">مجاني</span>
            </div>
            <div className="flex justify-between text-white/40">
              <span>الضريبة ١٥٪</span><span>{cartTax} ر.س</span>
            </div>
            <div className="flex justify-between font-bold text-[14px] pt-2 border-t border-white/[0.07]">
              <span>الإجمالي</span>
              <span className="text-gold">{cartTotal} ر.س</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
