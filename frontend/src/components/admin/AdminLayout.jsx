// src/components/admin/AdminLayout.jsx
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../lib/store'

export default function AdminLayout() {
  const { user, logout } = useAuthStore()
  const nav = useNavigate()

  const handleLogout = () => { logout(); nav('/') }

  return (
    <div className="min-h-screen bg-gray-50 flex font-body">
      {/* Sidebar */}
      <aside className="w-56 bg-mamb-brown fixed h-full flex flex-col">
        <div className="p-6 border-b border-mamb-cream/10">
          <p className="font-display text-xl font-bold text-mamb-gold">MAMB</p>
          <p className="text-mamb-cream/50 text-xs mt-0.5">Panel admin</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
            { to: '/admin/eventos', label: 'Eventos', icon: '📅' },
            { to: '/admin/productos', label: 'Productos', icon: '🛍️' },
            { to: '/admin/horarios', label: 'Horarios', icon: '🕐' },
          ].map(({ to, label, icon, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive ? 'bg-mamb-orange text-white' : 'text-mamb-cream/70 hover:bg-mamb-cream/10 hover:text-mamb-cream'
                }`
              }>
              <span>{icon}</span>{label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-mamb-cream/10">
          <p className="text-mamb-cream/60 text-xs mb-2 px-2">{user?.name}</p>
          <button onClick={handleLogout}
            className="w-full text-mamb-red/80 text-sm font-semibold py-2 px-4 rounded-lg hover:bg-mamb-red/10 transition-colors text-left">
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-56 flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}
