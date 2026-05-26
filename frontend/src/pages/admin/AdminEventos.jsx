// src/pages/admin/AdminEventos.jsx
import { useEffect, useState } from 'react'
import api from '../../lib/api'
import toast from 'react-hot-toast'

const TYPES = ['VISITA_GUIADA', 'TALLER', 'ENCUENTRO', 'EVENTO_RECURRENTE']
const EMPTY = { title: '', description: '', date: '', type: 'TALLER', recurrence: '', price: 10000, capacity: '' }

export default function AdminEventos() {
  const [eventos, setEventos] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const load = () => api.get('/eventos').then(r => setEventos(r.data)).catch(() => {})
  useEffect(() => { load() }, [])

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const save = async () => {
    try {
      if (editing) {
        await api.put(`/eventos/${editing}`, form)
        toast.success('Evento actualizado')
      } else {
        await api.post('/eventos', form)
        toast.success('Evento creado')
      }
      setForm(EMPTY); setEditing(null); setShowForm(false); load()
    } catch (err) { toast.error(err.response?.data?.error || 'Error al guardar') }
  }

  const del = async (id) => {
    if (!confirm('¿Desactivar este evento?')) return
    await api.delete(`/eventos/${id}`)
    toast.success('Evento desactivado'); load()
  }

  const edit = (e) => {
    setForm({ ...e, date: e.date?.slice(0, 16) }); setEditing(e.id); setShowForm(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-mamb-brown">Eventos</h1>
        <button onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(true) }}
          className="bg-mamb-orange text-white font-bold px-6 py-2.5 rounded-xl hover:bg-mamb-red transition-colors">
          + Nuevo evento
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-mamb-orange/20 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="font-display font-bold text-xl text-mamb-brown mb-5">
            {editing ? 'Editar evento' : 'Nuevo evento'}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-mamb-brown/60 uppercase mb-1">Título</label>
              <input value={form.title} onChange={set('title')} placeholder="Nombre del evento"
                className="w-full border border-mamb-orange/20 rounded-xl px-4 py-2.5 focus:outline-none focus:border-mamb-orange" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold text-mamb-brown/60 uppercase mb-1">Descripción</label>
              <textarea value={form.description} onChange={set('description')} rows={2}
                className="w-full border border-mamb-orange/20 rounded-xl px-4 py-2.5 focus:outline-none focus:border-mamb-orange resize-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-mamb-brown/60 uppercase mb-1">Fecha y hora</label>
              <input type="datetime-local" value={form.date} onChange={set('date')}
                className="w-full border border-mamb-orange/20 rounded-xl px-4 py-2.5 focus:outline-none focus:border-mamb-orange" />
            </div>
            <div>
              <label className="block text-xs font-bold text-mamb-brown/60 uppercase mb-1">Tipo</label>
              <select value={form.type} onChange={set('type')}
                className="w-full border border-mamb-orange/20 rounded-xl px-4 py-2.5 focus:outline-none focus:border-mamb-orange bg-white">
                {TYPES.map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-mamb-brown/60 uppercase mb-1">Precio (COP)</label>
              <input type="number" value={form.price} onChange={set('price')}
                className="w-full border border-mamb-orange/20 rounded-xl px-4 py-2.5 focus:outline-none focus:border-mamb-orange" />
            </div>
            <div>
              <label className="block text-xs font-bold text-mamb-brown/60 uppercase mb-1">Cupos</label>
              <input type="number" value={form.capacity} onChange={set('capacity')} placeholder="Sin límite"
                className="w-full border border-mamb-orange/20 rounded-xl px-4 py-2.5 focus:outline-none focus:border-mamb-orange" />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={save} className="bg-mamb-orange text-white font-bold px-6 py-2.5 rounded-xl hover:bg-mamb-red transition-colors">
              {editing ? 'Guardar cambios' : 'Crear evento'}
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null) }}
              className="border border-mamb-brown/20 text-mamb-brown font-semibold px-6 py-2.5 rounded-xl hover:bg-mamb-brown/5 transition-colors">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-mamb-orange/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-mamb-brown/5 border-b border-mamb-orange/10">
            <tr>
              {['Título', 'Tipo', 'Fecha', 'Precio', 'Acciones'].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase text-mamb-brown/50">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {eventos.map(e => (
              <tr key={e.id} className="border-b border-mamb-orange/5 hover:bg-mamb-orange/3 transition-colors">
                <td className="px-5 py-3 font-semibold text-mamb-brown">{e.title}</td>
                <td className="px-5 py-3 text-mamb-brown/60">{e.type?.replace('_', ' ')}</td>
                <td className="px-5 py-3 text-mamb-brown/60">{new Date(e.date).toLocaleDateString('es-CO')}</td>
                <td className="px-5 py-3 text-mamb-brown/60">${e.price?.toLocaleString()}</td>
                <td className="px-5 py-3 flex gap-2">
                  <button onClick={() => edit(e)} className="text-mamb-orange font-semibold hover:underline text-xs">Editar</button>
                  <button onClick={() => del(e.id)} className="text-mamb-red font-semibold hover:underline text-xs">Eliminar</button>
                </td>
              </tr>
            ))}
            {eventos.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-10 text-center text-mamb-brown/30">Sin eventos</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
