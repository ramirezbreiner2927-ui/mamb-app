// src/pages/HomePage.jsx
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function HomePage() {
  const [eventos, setEventos] = useState([])

  useEffect(() => {
    api.get('/eventos?type=').then(r => setEventos(r.data.slice(0, 3))).catch(() => {})
  }, [])

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="relative -mx-6 -mt-10 px-6 py-24 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #7A3B1E 0%, #D44B2A 50%, #E8813A 100%)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px)' }} />
        <div className="relative max-w-2xl">
          <p className="text-mamb-gold font-semibold text-sm tracking-widest uppercase mb-4 animate-fade-in">
            Museo de Arte Moderno · Barranquilla
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in"
            style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
            El arte vive<br />en el Caribe
          </h1>
          <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-lg animate-fade-in"
            style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
            Descubre la colección, vive las exposiciones y deja que la creatividad te inspire en el corazón de Barranquilla.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in"
            style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
            <Link to="/agenda"
              className="bg-mamb-gold text-mamb-brown font-bold px-8 py-4 rounded-xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Ver agenda
            </Link>
            <Link to="/kids"
              className="bg-white/15 text-white font-bold px-8 py-4 rounded-xl border border-white/30 hover:bg-white/25 transition-all duration-300 backdrop-blur-sm">
              🎨 Arte infantil
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6">
        {[
          { icon: '🗓️', title: 'Agenda Cultural', desc: 'Visitas guiadas, talleres y encuentros para toda la familia.', to: '/agenda', color: 'bg-amber-50 border-amber-200' },
          { icon: '🛍️', title: 'Tienda MAMB', desc: 'Camisas, totebags y accesorios con identidad caribeña.', to: '/tienda', color: 'bg-teal-50 border-teal-200' },
          { icon: '🎨', title: 'Arte Infantil IA', desc: 'Tu dibujo transformado en obra de arte por inteligencia artificial.', to: '/kids', color: 'bg-orange-50 border-orange-200' },
        ].map(({ icon, title, desc, to, color }) => (
          <Link key={to} to={to}
            className={`group ${color} border rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg`}>
            <span className="text-4xl mb-4 block">{icon}</span>
            <h3 className="font-display font-bold text-xl text-mamb-brown mb-2">{title}</h3>
            <p className="text-mamb-brown/60 text-sm leading-relaxed">{desc}</p>
            <span className="mt-4 inline-block text-mamb-orange font-semibold text-sm group-hover:translate-x-1 transition-transform">
              Explorar →
            </span>
          </Link>
        ))}
      </section>

      {/* Próximos eventos */}
      {eventos.length > 0 && (
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-mamb-orange font-semibold text-sm uppercase tracking-wider mb-1">Próximamente</p>
              <h2 className="font-display text-3xl font-bold text-mamb-brown">Eventos</h2>
            </div>
            <Link to="/agenda" className="text-mamb-orange font-semibold text-sm hover:underline">Ver todos →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {eventos.map(e => (
              <div key={e.id} className="bg-white border border-mamb-orange/15 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-2 bg-gradient-to-r from-mamb-orange to-mamb-gold" />
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-mamb-orange bg-mamb-orange/10 px-3 py-1 rounded-full">
                    {e.type?.replace('_', ' ')}
                  </span>
                  <h4 className="font-display font-bold text-lg text-mamb-brown mt-3 mb-2">{e.title}</h4>
                  <p className="text-sm text-mamb-brown/60 mb-4 line-clamp-2">{e.description}</p>
                  <p className="text-xs text-mamb-brown/40">
                    {new Date(e.date).toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Álvaro Cepeda Samudio quote */}
      <section className="bg-mamb-brown rounded-3xl p-12 text-center">
        <p className="text-mamb-gold font-display text-4xl italic leading-relaxed mb-6">
          "La casa grande está llena de silencios que hablan."
        </p>
        <p className="text-mamb-cream/60 text-sm tracking-widest uppercase">
          — Álvaro Cepeda Samudio, escritor barranquillero
        </p>
      </section>
    </div>
  )
}
