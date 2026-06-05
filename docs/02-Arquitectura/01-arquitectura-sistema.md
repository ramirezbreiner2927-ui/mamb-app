# Arquitectura del Sistema

## Visión General

El proyecto implementa una arquitectura cliente-servidor desacoplada basada en una API REST.

La solución está dividida en tres capas principales:

1. Frontend
2. Backend
3. Base de Datos

## Arquitectura General

```text
Usuario
   │
   ▼
Frontend React
   │
   ▼
API REST Express
   │
   ├── Prisma ORM
   │
   ▼
PostgreSQL

   │
   └── Cloudflare Workers AI
         ├── LLaVA
         └── Stable Diffusion XL
```

## Frontend

Responsable de:

* Interfaz de usuario.
* Navegación.
* Gestión de sesión.
* Consumo de APIs.

## Backend

Responsable de:

* Lógica de negocio.
* Validaciones.
* Autenticación.
* Gestión de recursos.
* Integración con IA.

## Base de Datos

PostgreSQL almacena:

* Usuarios.
* Eventos.
* Horarios.
* Productos.
* Imágenes generadas.

## Patrón Arquitectónico

El backend implementa el patrón MVC:

### Model

Representado mediante Prisma.

### Controller

Implementa la lógica de negocio.

### Routes

Define los endpoints REST.

### Middleware

Gestiona autenticación y manejo de errores.

## Seguridad

* JWT para autenticación.
* bcrypt para cifrado de contraseñas.
* Control de acceso basado en roles.
* Middleware de autorización para administradores.
s