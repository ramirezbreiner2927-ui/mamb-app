// src/pages/TiendaPage.jsx
import { useEffect, useState } from 'react'
import api from '../lib/api'

const CAT_ICONS = { CAMISAS:'👕', TOTEBAGS:'👜', TAZAS:'☕', LIBROS:'📚', PRINTS:'🖼️', ACCESORIOS:'💍' }

export default function TiendaPage() {
  const [productos, setProductos] = useState([])
  const [cat, setCat] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.get(`/productos${cat ? `?category=${cat}` : ''}`)
      .then(r => setProductos(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [cat])

  return (
    <div className="space-y-10">
      <div>
        <p className="text-mamb-orange font-semibold text-sm uppercase tracking-wider mb-1">Colección</p>
        <h1 className="font-display text-4xl font-bold text-mamb-brown">Tienda MAMB</h1>
        <p className="text-mamb-brown/60 mt-2">Arte y cultura barranquillera en cada producto.</p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setCat('')}
          className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition-all ${!cat ? 'bg-mamb-orange border-mamb-orange text-white' : 'border-mamb-orange/30 text-mamb-brown'}`}>
          Todo
        </button>
        {Object.entries(CAT_ICONS).map(([key, icon]) => (
          <button key={key} onClick={() => setCat(key)}
            className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition-all ${cat === key ? 'bg-mamb-orange border-mamb-orange text-white' : 'border-mamb-orange/30 text-mamb-brown'}`}>
            {icon} {key.charAt(0) + key.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => <div key={i} className="bg-white rounded-2xl h-64 animate-pulse" />)}
        </div>
      ) : productos.length === 0 ? (
        <div className="text-center py-20 text-mamb-brown/40">
          <p className="text-5xl mb-4">🛍️</p>
          <p className="font-display text-xl">Sin productos disponibles</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {productos.map(p => (
            <div key={p.id} className="bg-white border border-mamb-orange/10 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-mamb-cream to-mamb-gold/20 flex items-center justify-center text-6xl">
                {CAT_ICONS[p.category] || '🎨'}
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-mamb-brown text-lg">{p.name}</h3>
                {p.description && <p className="text-sm text-mamb-brown/60 mt-1 mb-3 line-clamp-2">{p.description}</p>}
                <div className="flex items-center justify-between">
                  <span className="font-bold text-mamb-orange text-lg">${p.price?.toLocaleString('es-CO')} COP</span>
                  <span className={`text-xs font-semibold ${p.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {p.stock > 0 ? `${p.stock} disponibles` : 'Agotado'}
                  </span>
                </div>
                {p.stock > 0 && (
                  <button className="w-full mt-3 bg-mamb-brown text-mamb-gold font-bold py-2.5 rounded-xl hover:bg-mamb-orange hover:text-white transition-all duration-200">
                    Agregar al carrito
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
