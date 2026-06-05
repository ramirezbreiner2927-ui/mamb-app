// src/pages/SignupPage.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../lib/store'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const signup = useAuthStore(s => s.signup)
  const nav = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      toast.error('Las contraseñas no coinciden')
      return
    }
    if (form.password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres')
      return
    }
    setLoading(true)
    try {
      await signup(form.name, form.email, form.password)
      toast.success('¡Cuenta creada! Bienvenido al MAMB')
      nav('/')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error al registrarse')
    } finally { setLoading(false) }
  }

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  return (
    <div className="min-h-screen bg-mamb-cream flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block">
            <div className="w-14 h-14 rounded-full bg-mamb-orange flex items-center justify-center text-white font-display font-bold text-xl mx-auto mb-4">M</div>
          </Link>
          <h1 className="font-display text-3xl font-bold text-mamb-brown">Crear cuenta</h1>
          <p className="text-mamb-brown/60 mt-2 text-sm">Únete a la comunidad MAMB</p>
        </div>

        <form onSubmit={handle} className="bg-white border border-mamb-orange/15 rounded-3xl p-8 space-y-4 shadow-sm">
          {[
            { key: 'name', label: 'Nombre completo', type: 'text', ph: 'Tu nombre' },
            { key: 'email', label: 'Email', type: 'email', ph: 'tu@email.com' },
            { key: 'password', label: 'Contraseña', type: 'password', ph: 'Mínimo 6 caracteres' },
            { key: 'confirm', label: 'Confirmar contraseña', type: 'password', ph: '••••••••' },
          ].map(({ key, label, type, ph }) => (
            <div key={key}>
              <label className="block text-xs font-bold uppercase tracking-wider text-mamb-brown/60 mb-2">{label}</label>
              <input type={type} value={form[key]} onChange={set(key)} placeholder={ph} required
                className="w-full border border-mamb-orange/20 rounded-xl px-4 py-3 text-mamb-brown focus:outline-none focus:border-mamb-orange focus:ring-2 focus:ring-mamb-orange/20 transition-all" />
            </div>
          ))}
          <button type="submit" disabled={loading}
            className="w-full bg-mamb-orange text-white font-bold py-3.5 rounded-xl hover:bg-mamb-red transition-colors disabled:opacity-60 mt-2">
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </form>

        <p className="text-center text-sm text-mamb-brown/60 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-mamb-orange font-semibold hover:underline">Ingresar</Link>
        </p>
      </div>
    </div>
  )
}
