# 🏛️ MAMB — Museo de Arte Moderno de Barranquilla

Aplicación web full-stack para el MAMB, con experiencia diferenciada para adultos y niños, IA para arte infantil, gestión de agenda, horarios y tienda.

## Stack tecnológico

| Capa       | Tecnología                        |
|------------|-----------------------------------|
| Frontend   | React + Vite + Tailwind CSS       |
| Backend    | Node.js + Express (MVC, REST API) |
| Base datos | PostgreSQL                        |
| ORM        | Prisma                            |
| Auth       | JWT + bcrypt                      |

---

## 🚀 Setup rápido

### 1. Requisitos previos
- Node.js v18+
- PostgreSQL corriendo localmente
- Git

### 2. Clonar y configurar

```bash
git clone <repo>
cd mamb-app
```

### 3. Backend

```bash
cd backend
npm install

# Copiar y editar variables de entorno
cp .env.example .env
# Editar DATABASE_URL con tus credenciales PostgreSQL
# Ejemplo: postgresql://postgres:password@localhost:5432/mamb_db

# Generar cliente Prisma
npx prisma generate

# Crear base de datos y tablas
npx prisma migrate dev --name init

# Iniciar servidor
npm run dev
# → API en http://localhost:4000
```

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
# → App en http://localhost:3000
```

---

## 📁 Estructura del proyecto

```
mamb-app/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Modelos: User, Evento, Horario, Producto, Image
│   ├── src/
│   │   ├── index.js               # Entry point Express
│   │   ├── controllers/
│   │   │   ├── auth.controller.js     # signup, login, me
│   │   │   ├── eventos.controller.js  # CRUD eventos
│   │   │   ├── horarios.controller.js # CRUD horarios
│   │   │   ├── productos.controller.js# CRUD productos
│   │   │   └── images.controller.js   # Upload, gallery
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── eventos.routes.js
│   │   │   ├── horarios.routes.js
│   │   │   ├── productos.routes.js
│   │   │   └── images.routes.js
│   │   └── middleware/
│   │       ├── auth.js            # JWT authenticate + requireAdmin
│   │       └── errorHandler.js
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── App.jsx                # Router principal
    │   ├── lib/
    │   │   ├── api.js             # Axios con interceptores
    │   │   └── store.js           # Zustand auth store
    │   ├── components/
    │   │   ├── public/Layout.jsx  # Navbar + Footer
    │   │   └── admin/AdminLayout.jsx
    │   └── pages/
    │       ├── HomePage.jsx
    │       ├── AgendaPage.jsx
    │       ├── HorariosPage.jsx
    │       ├── TiendaPage.jsx
    │       ├── KidsPage.jsx       # ✨ Experiencia infantil con IA
    │       ├── AboutPage.jsx
    │       ├── LoginPage.jsx
    │       ├── SignupPage.jsx
    │       └── admin/
    │           ├── AdminDashboard.jsx
    │           ├── AdminEventos.jsx
    │           ├── AdminProductos.jsx
    │           └── AdminHorarios.jsx
    └── tailwind.config.js         # Tema MAMB personalizado
```

---

## 🔌 API Endpoints

### Auth
| Método | Ruta            | Acceso   |
|--------|-----------------|----------|
| POST   | /api/auth/signup | Público  |
| POST   | /api/auth/login  | Público  |
| GET    | /api/auth/me     | JWT      |

### Eventos
| Método | Ruta               | Acceso    |
|--------|--------------------|-----------|
| GET    | /api/eventos        | Público   |
| GET    | /api/eventos/:id    | Público   |
| POST   | /api/eventos        | Admin JWT |
| PUT    | /api/eventos/:id    | Admin JWT |
| DELETE | /api/eventos/:id    | Admin JWT |

### Horarios
| Método | Ruta                   | Acceso    |
|--------|------------------------|-----------|
| GET    | /api/horarios           | Público   |
| PUT    | /api/horarios/:id       | Admin JWT |
| POST   | /api/horarios/seed      | Admin JWT |

### Productos
| Método | Ruta                | Acceso    |
|--------|---------------------|-----------|
| GET    | /api/productos       | Público   |
| GET    | /api/productos/:id   | Público   |
| POST   | /api/productos       | Admin JWT |
| PUT    | /api/productos/:id   | Admin JWT |
| DELETE | /api/productos/:id   | Admin JWT |

### Imágenes (Arte infantil)
| Método | Ruta                      | Acceso  |
|--------|---------------------------|---------|
| GET    | /api/images/gallery        | Público |
| GET    | /api/images/mine           | JWT     |
| POST   | /api/images/upload         | JWT     |
| PATCH  | /api/images/:id/generated  | JWT     |

---

## 🗄️ Modelo de datos

```prisma
User       → id, name, email, password (bcrypt), role, createdAt
Evento     → id, title, description, date, type, recurrence, price, capacity, isActive
Horario    → id, day, dayOrder, openTime, closeTime, isClosed, basePrice
Producto   → id, name, description, price, stock, category, isActive
Image      → id, userId, originalUrl, generatedUrl, artworkName, authorName, authorAge, isPublic
```

---

## 🎨 Integrar IA (Arte Infantil)

En `backend/src/controllers/images.controller.js`, en el flujo de `uploadImage`:

1. Tras guardar la imagen, llamar a tu servicio de IA (Replicate, HuggingFace, etc.)
2. Ejemplo con Replicate / style transfer:

```javascript
// Ejemplo con Replicate API
const output = await replicate.run(
  "stability-ai/stable-diffusion:...",
  { input: { image: imageUrl, prompt: "estilo Álvaro Cepeda Samudio, colores Caribe" } }
)
await prisma.image.update({
  where: { id: image.id },
  data: { generatedUrl: output[0] }
})
```

---

## 👤 Crear primer admin

```bash
# Después de signup normal, en PostgreSQL:
UPDATE users SET role = 'ADMIN' WHERE email = 'tu@email.com';
```

---

## 📦 Scripts disponibles

```bash
# Backend
npm run dev          # Servidor en modo desarrollo (nodemon)
npm run prisma:studio # Explorar DB visualmente

# Frontend  
npm run dev          # Dev server con HMR
npm run build        # Build para producción
npm run preview      # Preview del build
```

---

*Desarrollado por estudiantes de Ingeniería de Sistemas · Universidad Simón Bolívar · Barranquilla 2026*
