
# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```
=======
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

Antes de correr el proyecto en local, instala lo siguiente:

#### Node.js v18+
1. Descarga el instalador desde https://nodejs.org (versión LTS)
2. Instálalo con las opciones por defecto
3. Verifica: `node --version` y `npm --version`

#### PostgreSQL
1. Descarga desde https://www.postgresql.org/download
2. Durante la instalación:
   - Usuario: `postgres`
   - Contraseña: la que prefieras (anótala, la necesitarás)
   - Puerto: `5432` (por defecto)
3. Verifica que el servicio esté corriendo en el Administrador de servicios de Windows

#### Git
1. Descarga desde https://git-scm.com
2. Instala con opciones por defecto

---

### 2. Clonar el repositorio

```bash
git clone https://github.com/ramirezbreiner2927-ui/mamb-app.git
cd mamb-app
```

---

### 3. Backend

```bash
cd backend
npm install
```

#### Crear el archivo .env

Crea un archivo llamado `.env` dentro de la carpeta `backend/` con este contenido:

```env
DATABASE_URL="postgresql://postgres:TU_CONTRASEÑA@localhost:5432/mamb_db"
JWT_SECRET="mamb_secret_key_2026"
PORT=4000
HF_TOKEN="tu_huggingface_token"
CF_ACCOUNT_ID="tu_cloudflare_account_id"
CF_TOKEN="tu_cloudflare_token"
```

> Reemplaza `TU_CONTRASEÑA` con la contraseña que pusiste al instalar PostgreSQL.

#### Crear la carpeta de uploads

Esta carpeta es necesaria para guardar las imágenes subidas por los usuarios. No se incluye en el repositorio, debes crearla manualmente:

```bash
# En Windows (cmd):
mkdir uploads

# En Mac/Linux:
mkdir uploads
```

#### Crear la base de datos y aplicar migraciones

```bash
npx prisma migrate dev --name init
```

> Si aparece el mensaje "Drift detected" preguntando si quieres resetear, escribe `y` y presiona Enter. Esto solo borra datos de prueba anteriores.

#### Iniciar el servidor

```bash
npm run dev
# → API corriendo en http://localhost:4000
```

---

### 4. Frontend

Abre una **nueva terminal** y ejecuta:

```bash
cd frontend
npm install
npm run dev
# → App en http://localhost:3000
```

Abre tu navegador en http://localhost:3000

---

### 5. Crear el primer administrador

Después de registrarte normalmente en la app, entra a PostgreSQL y ejecuta:

```bash
psql -U postgres -d mamb_db
```

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'tu@email.com';
\q
```

---

## 📁 Estructura del proyecto

```
mamb-app/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Modelos: User, Evento, Horario, Producto, Image
│   ├── uploads/                   # Imágenes subidas (crear manualmente, no está en git)
│   ├── src/
│   │   ├── index.js               # Entry point Express
│   │   ├── controllers/
│   │   │   ├── auth.controller.js     # signup, login, me
│   │   │   ├── eventos.controller.js  # CRUD eventos
│   │   │   ├── horarios.controller.js # CRUD horarios
│   │   │   ├── productos.controller.js# CRUD productos
│   │   │   └── images.controller.js   # Upload, gallery, IA
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

## 🎨 IA para Arte Infantil

El flujo de transformación de dibujos funciona en dos pasos:

1. **LLaVA (Cloudflare Workers AI)** analiza el dibujo del niño y genera una descripción en texto
2. **Stable Diffusion XL (Cloudflare Workers AI)** toma esa descripción y genera una versión artística al estilo Álvaro Cepeda Samudio

Todo corre sobre la cuenta gratuita de Cloudflare Workers AI.

---

## 📦 Scripts disponibles

```bash
# Backend
npm run dev           # Servidor en modo desarrollo (nodemon)
npm run prisma:studio # Explorar DB visualmente en localhost:5555

# Frontend
npm run dev           # Dev server con HMR
npm run build         # Build para producción
npm run preview       # Preview del build
```

---

*Desarrollado por estudiantes de Ingeniería de Sistemas · Universidad Simón Bolívar · Barranquilla 2026*
>>>>>>>
