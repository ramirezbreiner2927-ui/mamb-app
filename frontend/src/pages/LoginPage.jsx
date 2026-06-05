// src/pages/LoginPage.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../lib/store'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const login = useAuthStore(s => s.login)
  const nav = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const user = await login(form.email, form.password)
      toast.success(`Bienvenido, ${user.name}`)
      nav(user.role === 'ADMIN' ? '/admin' : '/')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error al iniciar sesión')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-mamb-cream flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block">
            <div className="w-14 h-14 rounded-full bg-mamb-orange flex items-center justify-center text-white font-display font-bold text-xl mx-auto mb-4">M</div>
          </Link>
          <h1 className="font-display text-3xl font-bold text-mamb-brown">Ingresar al MAMB</h1>
          <p className="text-mamb-brown/60 mt-2 text-sm">Accede a tu cuenta</p>
        </div>

        <form onSubmit={handle} className="bg-white border border-mamb-orange/15 rounded-3xl p-8 space-y-5 shadow-sm">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mamb-brown/60 mb-2">Email</label>
            <input type="email" value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="tu@email.com"
              className="w-full border border-mamb-orange/20 rounded-xl px-4 py-3 text-mamb-brown focus:outline-none focus:border-mamb-orange focus:ring-2 focus:ring-mamb-orange/20 transition-all"
              required />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mamb-brown/60 mb-2">Contraseña</label>
            <input type="password" value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="••••••••"
              className="w-full border border-mamb-orange/20 rounded-xl px-4 py-3 text-mamb-brown focus:outline-none focus:border-mamb-orange focus:ring-2 focus:ring-mamb-orange/20 transition-all"
              required />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-mamb-orange text-white font-bold py-3.5 rounded-xl hover:bg-mamb-red transition-colors disabled:opacity-60">
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="text-center text-sm text-mamb-brown/60 mt-6">
          ¿No tienes cuenta?{' '}
          <Link to="/signup" className="text-mamb-orange font-semibold hover:underline">Regístrate</Link>
        </p>
      </div>
    </div>
  )
}
