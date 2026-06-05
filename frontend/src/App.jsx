// src/App.jsx
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './lib/store'
import Layout from './components/public/Layout'
import HomePage from './pages/HomePage'
import AgendaPage from './pages/AgendaPage'
import HorariosPage from './pages/HorariosPage'
import TiendaPage from './pages/TiendaPage'
import KidsPage from './pages/KidsPage'
import AboutPage from './pages/AboutPage'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminEventos from './pages/admin/AdminEventos'
import AdminProductos from './pages/admin/AdminProductos'
import AdminHorarios from './pages/admin/AdminHorarios'

// Login solo para acceso admin (ruta oculta /mamb-admin-login)
import LoginPage from './pages/LoginPage'

function ProtectedAdmin({ children }) {
  const { user, loading } = useAuthStore()
  if (loading) return <div className="flex items-center justify-center h-screen">Cargando...</div>
  if (!user || user.role !== 'ADMIN') return <Navigate to="/mamb-admin-login" replace />
  return children
}

export default function App() {
  const init = useAuthStore(s => s.init)
  useEffect(() => { init() }, [])

  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ style: { fontFamily: 'Nunito, sans-serif' } }} />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="agenda" element={<AgendaPage />} />
          <Route path="horarios" element={<HorariosPage />} />
          <Route path="tienda" element={<TiendaPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
        {/* Kids — diseño separado */}
        <Route path="/kids" element={<KidsPage />} />
        {/* Login admin — ruta discreta, sin enlace en el navbar */}
        <Route path="/mamb-admin-login" element={<LoginPage />} />
        {/* Admin */}
        <Route path="/admin" element={<ProtectedAdmin><AdminLayout /></ProtectedAdmin>}>
          <Route index element={<AdminDashboard />} />
          <Route path="eventos" element={<AdminEventos />} />
          <Route path="productos" element={<AdminProductos />} />
          <Route path="horarios" element={<AdminHorarios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
