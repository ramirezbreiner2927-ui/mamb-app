# Guía de Operación y Mantenimiento

## Introducción

Este documento describe los procedimientos necesarios para mantener operativa la plataforma MAMB.

---

## Inicio del Sistema

### Backend

```bash
cd backend
npm install
npm run dev
```

Servidor:

```text
https://api.mambapp.online
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicación:

```text
https://mambapp.online
```

---

## Gestión de Base de Datos

### Ejecutar migraciones

```bash
npx prisma migrate dev
```

### Abrir Prisma Studio

```bash
npm run prisma:studio
```

---

## Gestión de Administradores

Después del registro de un usuario:

```sql
UPDATE users
SET role = 'ADMIN'
WHERE email = 'correo@ejemplo.com';
```

---

## Monitoreo Recomendado

Verificar periódicamente:

* Disponibilidad de la API.
* Espacio de almacenamiento.
* Conectividad con PostgreSQL.
* Uso de Cloudflare Workers AI.
* Logs de errores.

---

## Gestión de Imágenes

La carpeta:

```text
backend/uploads/
```

debe existir siempre en producción.

Si es eliminada:

```bash
mkdir uploads
```

---

## Respaldo de Base de Datos

### Backup

```bash
pg_dump -U postgres mamb_db > backup.sql
```

### Restauración

```bash
psql -U postgres mamb_db < backup.sql
```

---

## Problemas Frecuentes

### Error de conexión a PostgreSQL

Verificar:

* Servicio PostgreSQL iniciado.
* Credenciales correctas.
* Puerto 5432 disponible.

### Error JWT

Verificar:

```env
JWT_SECRET
```

### Error Prisma

Ejecutar:

```bash
npx prisma generate
```

### Error al subir imágenes

Verificar existencia de:

```text
backend/uploads/
```

---

## Buenas Prácticas

* Realizar respaldos periódicos.
* Mantener dependencias actualizadas.
* Revisar logs semanalmente.
* Proteger variables de entorno.
* Utilizar HTTPS en producción.
* Limitar acceso administrativo.
