// src/pages/HorariosPage.jsx
import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function HorariosPage() {
  const [horarios, setHorarios] = useState([])

  useEffect(() => {
    api.get('/horarios').then(r => setHorarios(r.data)).catch(() => {})
  }, [])

  const today = new Date().getDay() // 0=Sun
  const jsToOrder = { 1:1,2:2,3:3,4:4,5:5,6:6,0:7 }
  const todayOrder = jsToOrder[today]

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <p className="text-mamb-orange font-semibold text-sm uppercase tracking-wider mb-1">Visítanos</p>
        <h1 className="font-display text-4xl font-bold text-mamb-brown">Horarios</h1>
        <p className="text-mamb-brown/60 mt-2">
          El MAMB te espera. Entrada general <strong>$10.000 COP</strong>. Niños y estudiantes gratis.
        </p>
      </div>

      <div className="bg-white border border-mamb-orange/15 rounded-2xl overflow-hidden">
        {horarios.length === 0 ? (
          <div className="p-8 text-center text-mamb-brown/40 animate-pulse">Cargando horarios...</div>
        ) : horarios.map((h, i) => (
          <div key={h.id}
            className={`flex items-center justify-between px-6 py-4 ${i !== horarios.length - 1 ? 'border-b border-mamb-orange/10' : ''} ${h.dayOrder === todayOrder ? 'bg-mamb-gold/10' : ''}`}>
            <div className="flex items-center gap-3">
              {h.dayOrder === todayOrder && (
                <span className="w-2 h-2 rounded-full bg-mamb-orange animate-pulse inline-block" />
              )}
              <span className={`font-semibold ${h.dayOrder === todayOrder ? 'text-mamb-orange' : 'text-mamb-brown'}`}>
                {h.day}
                {h.dayOrder === todayOrder && <span className="ml-2 text-xs font-normal opacity-60">Hoy</span>}
              </span>
            </div>
            {h.isClosed ? (
              <span className="text-mamb-red/70 font-semibold text-sm">Cerrado</span>
            ) : (
              <span className="text-mamb-brown/70 text-sm">{h.openTime} – {h.closeTime}</span>
            )}
          </div>
        ))}
      </div>

      <div className="bg-mamb-brown/5 border border-mamb-brown/10 rounded-2xl p-6">
        <p className="font-semibold text-mamb-brown mb-1">📍 Dirección</p>
        <p className="text-mamb-brown/60 text-sm">Cra. 36 # 74 – 23, Barranquilla, Atlántico</p>
        <p className="text-mamb-brown/60 text-sm mt-1">Teléfono: (605) 340-1234</p>
      </div>
    </div>
  )
}
