// src/pages/AgendaPage.jsx
import { useEffect, useState } from 'react'
import api from '../lib/api'

const TYPE_LABELS = {
  VISITA_GUIADA: 'Visita guiada',
  TALLER: 'Taller',
  ENCUENTRO: 'Encuentro',
  EVENTO_RECURRENTE: 'Evento recurrente',
}
const TYPE_COLORS = {
  VISITA_GUIADA: 'bg-blue-100 text-blue-700',
  TALLER: 'bg-green-100 text-green-700',
  ENCUENTRO: 'bg-purple-100 text-purple-700',
  EVENTO_RECURRENTE: 'bg-amber-100 text-amber-700',
}

export default function AgendaPage() {
  const [eventos, setEventos] = useState([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.get(`/eventos${filter ? `?type=${filter}` : ''}`)
      .then(r => setEventos(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [filter])

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <p className="text-mamb-orange font-semibold text-sm uppercase tracking-wider mb-1">Calendario</p>
        <h1 className="font-display text-4xl font-bold text-mamb-brown">Agenda Cultural</h1>
        <p className="text-mamb-brown/60 mt-2 max-w-lg">
          Visitas guiadas, talleres creativos y encuentros culturales en el MAMB.
          Entrada general: <strong>$10.000 COP</strong>.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilter('')}
          className={`px-5 py-2 rounded-full text-sm font-bold border-2 transition-all ${!filter ? 'bg-mamb-orange border-mamb-orange text-white' : 'border-mamb-orange/30 text-mamb-brown hover:border-mamb-orange'}`}>
          Todos
        </button>
        {Object.entries(TYPE_LABELS).map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)}
            className={`px-5 py-2 rounded-full text-sm font-bold border-2 transition-all ${filter === key ? 'bg-mamb-orange border-mamb-orange text-white' : 'border-mamb-orange/30 text-mamb-brown hover:border-mamb-orange'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Events grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white rounded-2xl h-48 animate-pulse" />
          ))}
        </div>
      ) : eventos.length === 0 ? (
        <div className="text-center py-20 text-mamb-brown/40">
          <p className="text-5xl mb-4">📅</p>
          <p className="font-display text-xl">Sin eventos programados</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {eventos.map(e => {
            const date = new Date(e.date)
            return (
              <div key={e.id} className="bg-white border border-mamb-orange/10 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="flex">
                  {/* Date sidebar */}
                  <div className="bg-mamb-brown text-mamb-gold p-5 flex flex-col items-center justify-center min-w-[80px]">
                    <span className="text-2xl font-display font-bold">{date.getDate()}</span>
                    <span className="text-xs uppercase opacity-70">{date.toLocaleString('es', { month: 'short' })}</span>
                    <span className="text-xs opacity-50 mt-1">{date.getFullYear()}</span>
                  </div>
                  {/* Content */}
                  <div className="p-5 flex-1">
                    <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${TYPE_COLORS[e.type] || 'bg-gray-100 text-gray-600'}`}>
                      {TYPE_LABELS[e.type] || e.type}
                    </span>
                    <h3 className="font-display font-bold text-lg text-mamb-brown mt-2 mb-1">{e.title}</h3>
                    {e.description && (
                      <p className="text-sm text-mamb-brown/60 mb-3 line-clamp-2">{e.description}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-mamb-brown/40">
                        {date.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}
                        {e.recurrence && ` · ${e.recurrence}`}
                      </span>
                      <span className="text-sm font-bold text-mamb-orange">
                        ${e.price?.toLocaleString('es-CO')} COP
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
