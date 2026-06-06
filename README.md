# متجر نموذجي — Arabic RTL E-Commerce

فرانت‌اند کامل یک فروشگاه اینترنتی عربی با React + Vite + Tailwind CSS

## نصب و راه‌اندازی

```bash
cd arabic-ecommerce
npm install
npm run dev
```

سایت روی `http://localhost:5173` اجرا می‌شود.

## صفحات

| مسیر | توضیح |
|------|-------|
| `/` | صفحه اصلی با هیرو، آمار، محصولات پرفروش |
| `/shop` | صفحه جستجو با فیلتر دسته‌بندی و مرتب‌سازی |
| `/cart` | سبد خرید با مدیریت تعداد و خلاصه قیمت |
| `/checkout` | پرداخت ۳ مرحله‌ای (شحن ← پرداخت ← تأیید) |
| `/admin` | لوحة الإدارة با داشبورد، محصولات، طلبات، مشتریان |

## ساختار پروژه

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   └── Toast.jsx
├── context/
│   └── CartContext.jsx
├── data/
│   └── products.js
├── pages/
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   └── Admin.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## تکنولوژی‌ها

- **React 18** + **React Router v6**
- **Vite 5**
- **Tailwind CSS 3**
- **Lucide React** (آیکون‌ها)
- فونت **Noto Kufi Arabic**
- RTL کامل با `direction: rtl`
