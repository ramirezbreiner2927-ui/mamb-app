// src/pages/admin/AdminHorarios.jsx
import { useEffect, useState } from 'react'
import api from '../../lib/api'
import toast from 'react-hot-toast'

export default function AdminHorarios() {
  const [horarios, setHorarios] = useState([])

  const load = () => api.get('/horarios').then(r => setHorarios(r.data)).catch(() => {})
  useEffect(() => { load() }, [])

  const seed = async () => {
    await api.post('/horarios/seed'); toast.success('Horarios inicializados'); load()
  }

  const update = async (h) => {
    await api.put(`/horarios/${h.id}`, h)
    toast.success('Horario actualizado')
    load()
  }

  const toggle = (id, field, val) => {
    setHorarios(prev => prev.map(h => h.id === id ? { ...h, [field]: val } : h))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-mamb-brown">Horarios</h1>
        {horarios.length === 0 && (
          <button onClick={seed} className="bg-mamb-teal text-white font-bold px-5 py-2.5 rounded-xl hover:opacity-90">
            Inicializar horarios
          </button>
        )}
      </div>
      <p className="text-mamb-brown/50 text-sm mb-6">Precio base: <strong>$10.000 COP</strong> por persona.</p>

      <div className="bg-white border border-mamb-orange/10 rounded-2xl overflow-hidden">
        {horarios.length === 0 ? (
          <div className="p-12 text-center text-mamb-brown/30">
            <p className="text-4xl mb-3">🕐</p>
            <p>Haz clic en "Inicializar horarios" para comenzar</p>
          </div>
        ) : horarios.map((h, i) => (
          <div key={h.id} className={`flex items-center gap-4 px-6 py-4 ${i !== horarios.length - 1 ? 'border-b border-mamb-orange/8' : ''}`}>
            <span className="w-24 font-bold text-mamb-brown text-sm">{h.day}</span>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={h.isClosed}
                onChange={e => toggle(h.id, 'isClosed', e.target.checked)}
                className="w-4 h-4 accent-mamb-red" />
              <span className="text-sm text-mamb-brown/60">Cerrado</span>
            </label>

            {!h.isClosed && (
              <>
                <input type="time" value={h.openTime}
                  onChange={e => toggle(h.id, 'openTime', e.target.value)}
                  className="border border-mamb-orange/20 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-mamb-orange" />
                <span className="text-mamb-brown/30 text-sm">–</span>
                <input type="time" value={h.closeTime}
                  onChange={e => toggle(h.id, 'closeTime', e.target.value)}
                  className="border border-mamb-orange/20 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-mamb-orange" />
              </>
            )}

            <button onClick={() => update(h)} className="ml-auto text-mamb-orange font-semibold text-xs hover:underline">
              Guardar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
