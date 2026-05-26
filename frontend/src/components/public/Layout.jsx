// src/components/public/Layout.jsx
import { Outlet, NavLink, Link } from 'react-router-dom'
import { useAuthStore } from '../../lib/store'

export default function Layout() {
  const { user, logout } = useAuthStore()

  return (
    <div className="min-h-screen bg-mamb-cream font-body">
      {/* Top bar */}
      <div className="bg-mamb-brown text-mamb-gold text-xs text-center py-1.5 tracking-widest font-semibold uppercase">
        Museo de Arte Moderno de Barranquilla — MAMB
      </div>

      {/* Navbar */}
      <nav className="bg-mamb-cream border-b border-mamb-orange/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-mamb-orange flex items-center justify-center text-white font-display font-bold text-sm">M</div>
            <span className="font-display text-xl font-bold text-mamb-brown tracking-tight">MAMB</span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { to: '/agenda', label: 'Agenda' },
              { to: '/horarios', label: 'Horarios' },
              { to: '/tienda', label: 'Tienda' },
              { to: '/about', label: 'Nosotros' },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-mamb-orange text-white'
                      : 'text-mamb-brown hover:bg-mamb-orange/10'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            {/* Kids special */}
            <Link
              to="/kids"
              className="ml-2 px-4 py-2 rounded-lg text-sm font-bold bg-mamb-gold text-mamb-brown hover:bg-mamb-orange hover:text-white transition-all duration-200"
            >
              🎨 Arte Infantil
            </Link>
          </div>

          {/* Solo Admin si está autenticado */}
          <div className="flex items-center gap-3">
            {user && user.role === 'ADMIN' && (
              <>
                <Link to="/admin" className="text-xs font-bold text-mamb-teal hover:underline">Admin</Link>
                <button onClick={logout} className="text-xs text-mamb-red hover:underline font-semibold">Salir</button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-mamb-brown text-mamb-cream mt-20 py-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <p className="font-display text-2xl font-bold text-mamb-gold mb-2">MAMB</p>
            <p className="text-sm text-mamb-cream/70 leading-relaxed">
              Museo de Arte Moderno de Barranquilla.<br />
              Cra. 36 # 74 – 23, Barranquilla.
            </p>
          </div>
          <div>
            <p className="font-semibold text-mamb-gold mb-3">Horario general</p>
            <p className="text-sm text-mamb-cream/70">Lun – Vie: 9:00 – 17:00</p>
            <p className="text-sm text-mamb-cream/70">Sáb: 10:00 – 18:00</p>
            <p className="text-sm text-mamb-cream/70">Dom: 10:00 – 14:00</p>
          </div>
          <div>
            <p className="font-semibold text-mamb-gold mb-3">Entrada</p>
            <p className="text-sm text-mamb-cream/70">General: $10.000 COP</p>
            <p className="text-sm text-mamb-cream/70">Niños y estudiantes: Gratis</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-8 pt-6 border-t border-mamb-cream/10 text-center">
          <p className="text-xs text-mamb-cream/40">
            © 2026 MAMB · Desarrollado por estudiantes de Ing. Sistemas, Universidad Simón Bolívar
          </p>
        </div>
      </footer>
    </div>
  )
}
