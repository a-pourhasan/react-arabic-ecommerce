import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username.trim(), password);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <div className="card p-8 shadow-lg border border-white/[0.08] bg-dark-bg/95">
        <h1 className="text-2xl font-semibold mb-3">
          تسجيل الدخول إلى لوحة الإدارة
        </h1>
        <p className="text-sm text-white/60 mb-6">
          أدخل بيانات المسؤول للوصول إلى لوحة التحكم.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-white/70">اسم المستخدم</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="mt-2 w-full rounded-2xl border border-white/[0.08] bg-white/5 px-4 py-3 text-white outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
          </label>

          <label className="block">
            <span className="text-sm text-white/70">كلمة المرور</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-2 w-full rounded-2xl border border-white/[0.08] bg-white/5 px-4 py-3 text-white outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-2xl bg-gold py-3 text-sm font-semibold text-dark-bg transition hover:bg-gold/90"
          >
            تسجيل دخول
          </button>
        </form>

        <p className="mt-6 text-sm text-white/50">
          لا يوجد حساب فعلي؟ استخدم اسم المستخدم{' '}
          <span className="text-white">admin</span> وكلمة المرور{' '}
          <span className="text-white">admin123</span>.
        </p>

        <Link
          to="/"
          className="mt-5 inline-block text-sm text-gold hover:underline"
        >
          العودة إلى المتجر
        </Link>
      </div>
    </div>
  );
}
