// src/pages/AboutPage.jsx
export default function AboutPage() {
  const team = [
    { name: 'Ana Suárez', role: 'Frontend & UX', emoji: '💻' },
    { name: 'Diego Mora', role: 'Backend & BD', emoji: '⚙️' },
    { name: 'Valeria Ríos', role: 'IA & ML', emoji: '🤖' },
    { name: 'Carlos Peña', role: 'Diseño & UX', emoji: '🎨' },
  ]

  return (
    <div className="space-y-20 max-w-4xl">
      {/* Álvaro Cepeda Samudio */}
      <section>
        <p className="text-mamb-orange font-semibold text-sm uppercase tracking-wider mb-2">El artista</p>
        <h1 className="font-display text-5xl font-bold text-mamb-brown mb-8">
          Álvaro Cepeda<br />Samudio
        </h1>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-5 text-mamb-brown/70 leading-relaxed">
            <p>
              Barranquilla, 1926 – Nueva York, 1972. Escritor, periodista y cineasta colombiano,
              Álvaro Cepeda Samudio fue uno de los grandes narradores del Caribe colombiano
              y figura central del Grupo de Barranquilla, el legendario círculo literario que
              compartió con Gabriel García Márquez.
            </p>
            <p>
              Su obra más importante, <em className="font-semibold text-mamb-brown">La casa grande</em> (1962),
              es una novela experimental que reconstruye la Masacre de las Bananeras desde
              múltiples voces, rompiendo con el realismo tradicional y anticipando el boom
              latinoamericano.
            </p>
            <p>
              Su mirada al paisaje Caribe, a lo cotidiano y a la identidad regional inspira
              el estilo artístico que nuestra IA aplica a los dibujos de los niños:
              colores intensos, narrativa visual y raíces profundamente barranquilleras.
            </p>
          </div>
          <div className="bg-mamb-brown rounded-3xl p-10 text-center">
            <div className="text-8xl mb-6">✍️</div>
            <blockquote className="font-display text-2xl italic text-mamb-gold leading-relaxed mb-4">
              "Barranquilla era entonces una ciudad de hierro y agua."
            </blockquote>
            <p className="text-mamb-cream/50 text-sm">— La casa grande, 1962</p>
          </div>
        </div>
      </section>

      {/* Museo */}
      <section className="bg-mamb-orange/8 border border-mamb-orange/15 rounded-3xl p-10">
        <p className="text-mamb-orange font-semibold text-sm uppercase tracking-wider mb-2">El museo</p>
        <h2 className="font-display text-3xl font-bold text-mamb-brown mb-6">Sobre el MAMB</h2>
        <div className="grid md:grid-cols-2 gap-8 text-mamb-brown/70 leading-relaxed">
          <p>
            El Museo de Arte Moderno de Barranquilla (MAMB) es uno de los principales
            espacios culturales del Caribe colombiano. Su misión es promover el arte,
            la cultura y la identidad regional a través de exposiciones, talleres y
            experiencias educativas.
          </p>
          <p>
            Con énfasis en el arte contemporáneo y la apropiación cultural, el MAMB
            abre sus puertas a visitantes de todas las edades, convirtiendo cada visita
            en una experiencia significativa y transformadora.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[['1978', 'Año de fundación'], ['47+', 'Años de historia'], ['200+', 'Exposiciones'], ['50K+', 'Visitantes/año']].map(([num, label]) => (
            <div key={label} className="text-center">
              <p className="font-display text-3xl font-bold text-mamb-orange">{num}</p>
              <p className="text-xs text-mamb-brown/50 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Equipo */}
      <section>
        <p className="text-mamb-orange font-semibold text-sm uppercase tracking-wider mb-2">El equipo</p>
        <h2 className="font-display text-3xl font-bold text-mamb-brown mb-2">Estudiantes UNISIMON</h2>
        <p className="text-mamb-brown/60 mb-8">
          Ingeniería de Sistemas · Universidad Simón Bolívar, Barranquilla
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {team.map(({ name, role, emoji }) => (
            <div key={name} className="flex items-center gap-4 bg-white border border-mamb-orange/10 rounded-2xl p-5 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-mamb-cream flex items-center justify-center text-2xl">{emoji}</div>
              <div>
                <p className="font-bold text-mamb-brown">{name}</p>
                <p className="text-sm text-mamb-brown/50">{role}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-5 bg-mamb-brown/5 rounded-2xl">
          <p className="text-sm text-mamb-brown/60 text-center">
            Proyecto desarrollado en los programas de{' '}
            <strong className="text-mamb-brown">Ingeniería de Datos e IA</strong>,{' '}
            <strong className="text-mamb-brown">Ingeniería de Sistemas</strong> y{' '}
            <strong className="text-mamb-brown">Maestría en IA</strong> · Universidad Simón Bolívar
          </p>
        </div>
      </section>
    </div>
  )
}
