import React from 'react';
import Layout from '@theme/Layout';
import { Calendar, ShoppingBag, Palette } from 'lucide-react'; // Importamos los iconos

export default function Home() {
  return (
    <Layout title="MAMB Digital" description="Portal del Museo">
      <main className="container margin-vert--lg">
        <div className="hero--mamb">
          <h1>El arte vive en el Caribe</h1>
          <p>Descubre la colección, vive las exposiciones y deja que la creatividad te inspire.</p>
        </div>

        <div className="row">
          <div className="col col--4">
            <div className="card-mamb">
              <Calendar size={48} color="#d35400" /> {/* Icono de Agenda */}
              <h3>Agenda Cultural</h3>
              <p>Visitas guiadas y talleres.</p>
            </div>
          </div>
          <div className="col col--4">
            <div className="card-mamb">
              <ShoppingBag size={48} color="#d35400" /> {/* Icono de Tienda */}
              <h3>Tienda MAMB</h3>
              <p>Productos con identidad caribeña.</p>
            </div>
          </div>
          <div className="col col--4">
            <div className="card-mamb">
              <Palette size={48} color="#d35400" /> {/* Icono de Arte */}
              <h3>Arte Infantil IA</h3>
              <p>Tu dibujo transformado en obra de arte.</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}