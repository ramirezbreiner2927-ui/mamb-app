// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from 'react'
import api from '../../lib/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ eventos: 0, productos: 0, imagenes: 0 })

  useEffect(() => {
    Promise.all([
      api.get('/eventos').then(r => r.data.length).catch(() => 0),
      api.get('/productos').then(r => r.data.length).catch(() => 0),
      api.get('/images/gallery').then(r => r.data.length).catch(() => 0),
    ]).then(([eventos, productos, imagenes]) => setStats({ eventos, productos, imagenes }))
  }, [])

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-mamb-brown mb-8">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Eventos activos', value: stats.eventos, icon: '📅', color: 'bg-blue-50 border-blue-100' },
          { label: 'Productos', value: stats.productos, icon: '🛍️', color: 'bg-green-50 border-green-100' },
          { label: 'Obras generadas', value: stats.imagenes, icon: '🎨', color: 'bg-orange-50 border-orange-100' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className={`${color} border rounded-2xl p-6`}>
            <span className="text-3xl">{icon}</span>
            <p className="font-display text-4xl font-bold text-mamb-brown mt-2">{value}</p>
            <p className="text-mamb-brown/50 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>
      <div className="bg-mamb-brown/5 border border-mamb-brown/10 rounded-2xl p-6">
        <p className="text-mamb-brown/50 text-sm">Usa el menú lateral para gestionar eventos, productos y horarios del museo.</p>
      </div>
    </div>
  )
}
