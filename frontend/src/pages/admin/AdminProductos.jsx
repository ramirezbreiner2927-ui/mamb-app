// src/pages/admin/AdminProductos.jsx
import { useEffect, useState } from 'react'
import api from '../../lib/api'
import toast from 'react-hot-toast'

const CATS = ['CAMISAS', 'TOTEBAGS', 'TAZAS', 'LIBROS', 'PRINTS', 'ACCESORIOS']
const EMPTY = { name: '', description: '', price: '', stock: 0, category: 'CAMISAS' }

export default function AdminProductos() {
  const [productos, setProductos] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const load = () => api.get('/productos').then(r => setProductos(r.data)).catch(() => {})
  useEffect(() => { load() }, [])

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const save = async () => {
    try {
      if (editing) { await api.put(`/productos/${editing}`, form); toast.success('Producto actualizado') }
      else { await api.post('/productos', form); toast.success('Producto creado') }
      setForm(EMPTY); setEditing(null); setShowForm(false); load()
    } catch (err) { toast.error(err.response?.data?.error || 'Error') }
  }

  const del = async (id) => {
    if (!confirm('¿Desactivar producto?')) return
    await api.delete(`/productos/${id}`)
    toast.success('Producto desactivado'); load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-mamb-brown">Productos</h1>
        <button onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(true) }}
          className="bg-mamb-orange text-white font-bold px-6 py-2.5 rounded-xl hover:bg-mamb-red transition-colors">
          + Nuevo producto
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-mamb-orange/20 rounded-2xl p-6 mb-8">
          <h2 className="font-display font-bold text-xl text-mamb-brown mb-5">
            {editing ? 'Editar producto' : 'Nuevo producto'}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-mamb-brown/60 uppercase mb-1">Nombre</label>
              <input value={form.name} onChange={set('name')}
                className="w-full border border-mamb-orange/20 rounded-xl px-4 py-2.5 focus:outline-none focus:border-mamb-orange" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold text-mamb-brown/60 uppercase mb-1">Descripción</label>
              <textarea value={form.description} onChange={set('description')} rows={2}
                className="w-full border border-mamb-orange/20 rounded-xl px-4 py-2.5 focus:outline-none focus:border-mamb-orange resize-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-mamb-brown/60 uppercase mb-1">Precio (COP)</label>
              <input type="number" value={form.price} onChange={set('price')}
                className="w-full border border-mamb-orange/20 rounded-xl px-4 py-2.5 focus:outline-none focus:border-mamb-orange" />
            </div>
            <div>
              <label className="block text-xs font-bold text-mamb-brown/60 uppercase mb-1">Stock</label>
              <input type="number" value={form.stock} onChange={set('stock')}
                className="w-full border border-mamb-orange/20 rounded-xl px-4 py-2.5 focus:outline-none focus:border-mamb-orange" />
            </div>
            <div>
              <label className="block text-xs font-bold text-mamb-brown/60 uppercase mb-1">Categoría</label>
              <select value={form.category} onChange={set('category')}
                className="w-full border border-mamb-orange/20 rounded-xl px-4 py-2.5 focus:outline-none focus:border-mamb-orange bg-white">
                {CATS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={save} className="bg-mamb-orange text-white font-bold px-6 py-2.5 rounded-xl hover:bg-mamb-red">
              {editing ? 'Guardar' : 'Crear'}
            </button>
            <button onClick={() => setShowForm(false)}
              className="border border-mamb-brown/20 text-mamb-brown font-semibold px-6 py-2.5 rounded-xl">
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border border-mamb-orange/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-mamb-brown/5 border-b border-mamb-orange/10">
            <tr>
              {['Nombre', 'Categoría', 'Precio', 'Stock', 'Acciones'].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase text-mamb-brown/50">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id} className="border-b border-mamb-orange/5 hover:bg-mamb-orange/3">
                <td className="px-5 py-3 font-semibold text-mamb-brown">{p.name}</td>
                <td className="px-5 py-3 text-mamb-brown/60">{p.category}</td>
                <td className="px-5 py-3 text-mamb-brown/60">${p.price?.toLocaleString()}</td>
                <td className="px-5 py-3"><span className={p.stock > 0 ? 'text-green-600' : 'text-red-500'}>{p.stock}</span></td>
                <td className="px-5 py-3 flex gap-2">
                  <button onClick={() => { setForm(p); setEditing(p.id); setShowForm(true) }}
                    className="text-mamb-orange font-semibold hover:underline text-xs">Editar</button>
                  <button onClick={() => del(p.id)} className="text-mamb-red font-semibold hover:underline text-xs">Eliminar</button>
                </td>
              </tr>
            ))}
            {!productos.length && <tr><td colSpan={5} className="px-5 py-10 text-center text-mamb-brown/30">Sin productos</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
