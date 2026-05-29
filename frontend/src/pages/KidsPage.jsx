// src/pages/KidsPage.jsx
import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../lib/store'
import api from '../lib/api'
import toast from 'react-hot-toast'

const STEPS = ['inicio', 'register', 'upload', 'form', 'processing', 'result', 'gallery']
const PROC_MSGS = [
  { msg: '🔍 Mirando tu dibujo...', sub: 'Cada línea tiene magia' },
  { msg: '🎨 Aplicando colores de Cepeda...', sub: 'Como en La Casa Grande' },
  { msg: '✨ Añadiendo magia Caribe...', sub: 'Barranquilla en cada trazo' },
  { msg: '🖼️ Creando tu obra maestra...', sub: '¡Ya casi está lista!' },
]


export default function KidsPage() {
  const { user, anonymousRegister } = useAuthStore()
  const [step, setStep] = useState('inicio')
  const [visitorName, setVisitorName] = useState('')
  const [visitorAge, setVisitorAge] = useState('')
  const [registerLoading, setRegisterLoading] = useState(false)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [form, setForm] = useState({ artworkName: '', authorName: '', authorAge: '' })
  const [procStep, setProcStep] = useState(0)
  const [result, setResult] = useState(null)
  const [gallery, setGallery] = useState([])
  const fileRef = useRef()

  const handleRegister = async () => {
    if (!visitorName.trim()) { toast.error('¡Escribe tu nombre!'); return }
    setRegisterLoading(true)
    try {
      const u = await anonymousRegister(visitorName.trim(), visitorAge || null)
      setForm(f => ({ ...f, authorName: u.name, authorAge: visitorAge || '' }))
      toast.success(`¡Hola ${u.name}! 🎨 ¡Listo para crear!`)
      setStep('upload')
    } catch (err) {
      toast.error('Error al registrarse. Intenta de nuevo.')
    } finally { setRegisterLoading(false) }
  }

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setStep('form')
  }

  const startProcessing = async () => {
    setStep('processing')
    setProcStep(0)

    for (let i = 1; i < PROC_MSGS.length; i++) {
      await new Promise(r => setTimeout(r, 900))
      setProcStep(i)
    }

    try {
      const fd = new FormData()
      fd.append('image', file)
      fd.append('artworkName', form.artworkName)
      fd.append('authorName', form.authorName)
      fd.append('authorAge', form.authorAge)
      const { data: img } = await api.post('/images/upload', fd)

      setResult({
        id: img.id,
        artworkName: form.artworkName || 'Mi obra',
        authorName: form.authorName || 'Artista',
        authorAge: form.authorAge,
        originalUrl: img.originalUrl,
        generatedUrl: img.generatedUrl || null,
        date: new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })
      })
      setStep('result')
    } catch (err) {
      toast.error('Error al procesar la imagen.')
      setStep('form')
    }
  }

  const loadGallery = async () => {
    try {
      const { data } = await api.get('/images/gallery')
      setGallery(data)
      setStep('gallery')
    } catch {
      toast.error('No se pudo cargar la galería.')
    }
  }

  const reset = () => {
    setStep(user ? 'upload' : 'inicio')
    setFile(null); setPreview(null); setResult(null)
    setForm(f => ({ ...f, artworkName: '' }))
  }

  return (
    <div className="min-h-screen font-kids overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #FFF8DC 0%, #FFE4B5 40%, #FFDAB9 100%)' }}>

      <div className="flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-mamb-brown font-body font-semibold text-sm hover:underline">← Volver</Link>
        <h1 className="text-mamb-orange text-xl font-bold tracking-wide">🎨 Arte Mágico MAMB</h1>
        {user ? (
          <span className="text-xs text-mamb-brown/60 font-body">👋 {user.name}</span>
        ) : (
          <div className="w-16" />
        )}
      </div>

      <div className="fixed top-20 left-4 text-4xl animate-float opacity-40" style={{ animationDelay: '0s' }}>⭐</div>
      <div className="fixed top-40 right-6 text-3xl animate-float opacity-40" style={{ animationDelay: '0.5s' }}>🌈</div>
      <div className="fixed bottom-24 left-8 text-3xl animate-float opacity-30" style={{ animationDelay: '1s' }}>🦋</div>
      <div className="fixed bottom-40 right-4 text-4xl animate-float opacity-30" style={{ animationDelay: '1.5s' }}>✨</div>

      <div className="max-w-md mx-auto px-6 pb-20">

        {/* INICIO */}
        {step === 'inicio' && (
          <div className="text-center py-10 animate-fade-in">
            <div className="text-8xl mb-6 animate-float">🎨</div>
            <h2 className="text-4xl font-bold text-mamb-brown mb-4 leading-tight">
              ¡Tu dibujo se vuelve arte de museo!
            </h2>
            <p className="text-mamb-brown/70 font-body text-base leading-relaxed mb-10 max-w-xs mx-auto">
              Sube tu dibujo y nuestra magia lo transforma en una obra inspirada en Álvaro Cepeda Samudio 🌟
            </p>
            <button onClick={() => setStep('register')}
              className="w-full bg-mamb-orange text-white text-2xl font-bold py-5 rounded-3xl shadow-xl hover:bg-mamb-red hover:scale-105 transition-all duration-300 mb-4">
              🖼️ ¡Subir mi dibujo!
            </button>
            <button onClick={loadGallery}
              className="w-full bg-white/80 text-mamb-brown text-xl font-bold py-4 rounded-3xl border-2 border-mamb-orange/30 hover:border-mamb-orange hover:scale-105 transition-all duration-300">
              🏛️ Ver el museo
            </button>
          </div>
        )}

        {/* REGISTRO ANÓNIMO */}
        {step === 'register' && (
          <div className="py-8 animate-fade-in">
            <div className="text-center mb-8">
              <div className="text-7xl mb-4 animate-float">👋</div>
              <h2 className="text-3xl font-bold text-mamb-brown mb-2">¡Cuéntanos quién eres!</h2>
              <p className="text-mamb-brown/60 font-body text-sm">Solo necesitamos tu nombre para empezar</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white/80 rounded-2xl p-4 border-2 border-mamb-orange/20">
                <label className="block text-sm font-bold text-mamb-brown mb-2 font-body">🧒 ¿Cómo te llamas?</label>
                <input type="text" value={visitorName}
                  onChange={e => setVisitorName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleRegister()}
                  placeholder="Ej: Valentina"
                  className="w-full bg-transparent text-mamb-brown font-body text-xl outline-none placeholder-mamb-brown/30"
                  autoFocus />
              </div>
              <div className="bg-white/80 rounded-2xl p-4 border-2 border-mamb-orange/20">
                <label className="block text-sm font-bold text-mamb-brown mb-2 font-body">🎂 ¿Cuántos años tienes? <span className="font-normal text-mamb-brown/40">(opcional)</span></label>
                <input type="number" value={visitorAge}
                  onChange={e => setVisitorAge(e.target.value)}
                  placeholder="Ej: 8" min="1" max="17"
                  className="w-full bg-transparent text-mamb-brown font-body text-xl outline-none placeholder-mamb-brown/30" />
              </div>
            </div>
            <button onClick={handleRegister}
              disabled={registerLoading || !visitorName.trim()}
              className="w-full mt-8 bg-mamb-orange text-white text-xl font-bold py-5 rounded-3xl shadow-lg hover:bg-mamb-red hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:scale-100">
              {registerLoading ? '¡Preparando magia...' : '¡Vamos a crear! 🚀'}
            </button>
            <button onClick={() => setStep('inicio')} className="w-full mt-3 text-mamb-brown/50 font-body text-sm py-2">← Volver</button>
          </div>
        )}

        {/* UPLOAD */}
        {step === 'upload' && (
          <div className="py-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-mamb-brown text-center mb-2">📷 Tu dibujo</h2>
            <p className="text-mamb-brown/60 font-body text-center mb-8">Toca para tomar una foto o elegir de tu galería</p>
            <div onClick={() => fileRef.current.click()}
              className="border-4 border-dashed border-mamb-orange rounded-3xl p-12 text-center cursor-pointer hover:bg-mamb-orange/5 transition-all duration-300 bg-white/60">
              <div className="text-6xl mb-4">📸</div>
              <p className="text-mamb-brown font-bold text-lg">Tocar aquí</p>
              <p className="text-mamb-brown/50 font-body text-sm mt-1">JPG, PNG hasta 10MB</p>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            <button onClick={() => setStep('inicio')}
              className="w-full mt-4 text-mamb-brown/50 font-body text-sm py-3 hover:text-mamb-brown transition-colors">
              ← Volver
            </button>
          </div>
        )}

        {/* FORM */}
        {step === 'form' && (
          <div className="py-6 animate-fade-in">
            {preview && (
              <div className="rounded-3xl overflow-hidden mb-6 shadow-xl border-4 border-white">
                <img src={preview} alt="Tu dibujo" className="w-full h-52 object-cover" />
              </div>
            )}
            <h2 className="text-2xl font-bold text-mamb-brown text-center mb-6">✏️ ¿Cómo se llama tu obra?</h2>
            <div className="space-y-4">
              {[
                { key: 'artworkName', label: '🖼️ Nombre de la obra', ph: 'Ej: El sol de Barranquilla' },
                { key: 'authorName', label: '🧒 Tu nombre', ph: 'Ej: Valentina' },
                { key: 'authorAge', label: '🎂 Tu edad', ph: 'Ej: 8', type: 'number' },
              ].map(({ key, label, ph, type }) => (
                <div key={key} className="bg-white/80 rounded-2xl p-4 border-2 border-mamb-orange/20">
                  <label className="block text-sm font-bold text-mamb-brown mb-2 font-body">{label}</label>
                  <input type={type || 'text'} value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={ph}
                    className="w-full bg-transparent text-mamb-brown font-body text-lg outline-none placeholder-mamb-brown/30" />
                </div>
              ))}
            </div>
            <button onClick={startProcessing}
              disabled={!form.artworkName || !form.authorName}
              className="w-full mt-8 bg-mamb-orange text-white text-xl font-bold py-5 rounded-3xl shadow-lg hover:bg-mamb-red hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:scale-100">
              ✨ ¡Transformar con magia!
            </button>
            <button onClick={() => setStep('upload')} className="w-full mt-3 text-mamb-brown/50 font-body text-sm py-2">← Cambiar imagen</button>
          </div>
        )}

        {/* PROCESSING */}
        {step === 'processing' && (
          <div className="py-16 text-center animate-fade-in">
            <div className="text-8xl mb-6 animate-spin-slow">🎨</div>
            <h2 className="text-2xl font-bold text-mamb-brown mb-2">{PROC_MSGS[procStep]?.msg}</h2>
            <p className="text-mamb-brown/60 font-body mb-8">{PROC_MSGS[procStep]?.sub}</p>
            <div className="bg-white/60 rounded-2xl p-4 mb-6 max-w-xs mx-auto">
              {PROC_MSGS.map((m, i) => (
                <div key={i} className={`flex items-center gap-3 py-2 transition-all duration-500 ${i < procStep ? 'opacity-50' : i === procStep ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="text-lg">{i < procStep ? '✅' : i === procStep ? '⚡' : '⏳'}</span>
                  <span className="font-body text-sm text-mamb-brown">{m.msg}</span>
                </div>
              ))}
            </div>
            <div className="h-3 bg-mamb-orange/20 rounded-full overflow-hidden max-w-xs mx-auto">
              <div className="h-full bg-mamb-orange rounded-full transition-all duration-700"
                style={{ width: `${((procStep + 1) / PROC_MSGS.length) * 100}%` }} />
            </div>
          </div>
        )}

        {/* RESULT */}
        {step === 'result' && result && (
          <div className="py-6 animate-fade-in">
            <div className="text-center mb-6">
              <div className="text-5xl mb-2">🎉</div>
              <h2 className="text-3xl font-bold text-mamb-brown">¡Tu obra de arte!</h2>
            </div>
            <div className="bg-white rounded-3xl shadow-xl border-4 border-mamb-gold overflow-hidden mb-6">
              <div className="grid grid-cols-2">
                <div className="relative">
                  <img src={result.originalUrl} alt="Original" className="w-full h-48 object-cover" />
                  <div className="absolute bottom-0 inset-x-0 bg-mamb-brown/60 text-white text-xs font-body text-center py-1">Original</div>
                </div>
                <div className="relative">
                  {result.generatedUrl ? (
                    <img src={result.generatedUrl} alt="Estilo Cepeda" className="w-full h-48 object-cover" />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-mamb-orange via-mamb-red to-mamb-brown flex items-center justify-center text-6xl">🎨</div>
                  )}
                  <div className="absolute bottom-0 inset-x-0 bg-mamb-orange/80 text-white text-xs font-body text-center py-1">Estilo Cepeda</div>
                </div>
              </div>
              <div className="p-5 font-body">
                <h3 className="font-display font-bold text-xl text-mamb-brown">{result.artworkName}</h3>
                <p className="text-mamb-brown/60 text-sm">Por {result.authorName}{result.authorAge ? `, ${result.authorAge} años` : ''}</p>
                <p className="text-mamb-brown/40 text-xs mt-1">{result.date} · Estilo Álvaro Cepeda Samudio</p>
              </div>
            </div>
            <div className="space-y-3">
              <button onClick={loadGallery}
                className="w-full bg-mamb-teal text-white text-xl font-bold py-4 rounded-3xl hover:bg-green-700 hover:scale-105 transition-all">
                🏛️ Ver en el museo
              </button>
              <button onClick={reset}
                className="w-full bg-white/80 text-mamb-brown text-lg font-bold py-4 rounded-3xl border-2 border-mamb-orange/30 hover:border-mamb-orange transition-all">
                🎨 Crear otro dibujo
              </button>
            </div>
          </div>
        )}

        {/* GALLERY */}
        {step === 'gallery' && (
          <div className="py-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-mamb-brown text-center mb-2">🏛️ Museo Infantil</h2>
            <p className="text-mamb-brown/60 font-body text-center mb-6 text-sm">Las obras de nuestros pequeños artistas</p>
            {gallery.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🖼️</div>
                <p className="text-mamb-brown/50 font-body">Aún no hay obras. ¡Sé el primero!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {gallery.map(img => (
                  <div key={img.id} className="bg-white rounded-2xl overflow-hidden shadow-md border-2 border-mamb-gold/30 hover:scale-105 transition-transform">
                    {img.generatedUrl ? (
                      <img src={img.generatedUrl} alt={img.artworkName} className="w-full h-32 object-cover" />
                    ) : (
                      <div className="h-32 bg-gradient-to-br from-mamb-orange to-mamb-red flex items-center justify-center text-4xl">🎨</div>
                    )}
                    <div className="p-3">
                      <p className="font-bold text-mamb-brown text-sm truncate">{img.artworkName || 'Sin título'}</p>
                      <p className="text-mamb-brown/50 text-xs">{img.authorName || 'Artista'}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button onClick={reset} className="w-full mt-6 bg-mamb-orange text-white text-xl font-bold py-4 rounded-3xl hover:bg-mamb-red hover:scale-105 transition-all">
              🎨 ¡Crear mi obra!
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
