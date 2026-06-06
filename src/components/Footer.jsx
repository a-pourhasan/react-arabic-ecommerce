export default function Footer() {
  const cols = [
    { title: 'عن المتجر',       items: ['من نحن', 'رؤيتنا', 'فريق العمل', 'وظائف'] },
    { title: 'خدمة العملاء',   items: ['تواصل معنا', 'الأسئلة الشائعة', 'سياسة الإرجاع', 'تتبع الطلب'] },
    { title: 'الروابط السريعة', items: ['الرئيسية', 'المنتجات', 'العروض', 'المدونة'] },
    { title: 'تابعنا',          items: ['تويتر / إكس', 'إنستغرام', 'يوتيوب', 'لينكدإن'] },
  ]

  return (
    <footer className="border-t border-white/[0.06] mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-[10px] text-gold tracking-[2px] mb-4 font-medium">{col.title}</p>
              <ul className="space-y-2.5">
                {col.items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-white/30 text-[13px] hover:text-white/60 transition-colors no-underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row justify-between
                        items-center gap-3 text-[12px] text-white/20">
          <span>© ٢٠٢٤ اسم المتجر. جميع الحقوق محفوظة.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/40 no-underline transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-white/40 no-underline transition-colors">شروط الاستخدام</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
