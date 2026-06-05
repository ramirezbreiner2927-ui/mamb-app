# Frontend y Navegación

## Tecnologías

* React
* Vite
* Tailwind CSS
* Axios
* Zustand

## Estructura Principal

```text
src/
├── components/
├── pages/
├── lib/
└── App.jsx
```

## Gestión de Estado

La autenticación se administra mediante Zustand.

Funciones principales:

* Login.
* Logout.
* Persistencia de sesión.
* Información del usuario autenticado.

## Consumo de API

Axios centraliza las peticiones mediante interceptores para:

* Adjuntar JWT.
* Manejo global de errores.
* Configuración de URLs base.
