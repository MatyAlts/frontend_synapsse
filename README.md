## Monorepo overview

This repository now contains two applications:

- **frontend** – a Next.js storefront located in the repository root.
- **backend** – a Spring Boot API located in [`backend/`](backend/) that exposes product, catalog search, authentication and admin features backed by PostgreSQL.

## ⚙️ Configuración Rápida

### 🔐 Variables de Entorno

**Antes de ejecutar el proyecto, configura las variables de entorno:**

1. **Backend:** Copia y edita `.env` en `backend_synapsse/`
2. **Frontend:** Copia y edita `.env.local` en `frontend_synapsse/`

📖 **Guía completa:** [ENV_SETUP.md](../ENV_SETUP.md)

## Backend (Spring Boot)

### Requisitos previos

- Java 17+
- Maven 3.9+
- PostgreSQL 14+

### Configuración de base de datos

1. **Configurar variables de entorno:** Copia el archivo de ejemplo y edítalo con tus credenciales:
   ```bash
   cd backend_synapsse
   copy .env.example .env
   ```

2. **Edita el archivo `.env`** con tus credenciales de PostgreSQL:
   ```env
   DB_URL=jdbc:postgresql://localhost:5432/synapsse
   DB_USERNAME=tu_usuario
   DB_PASSWORD=tu_contraseña
   JWT_SECRET=tu-secreto-jwt-en-base64
   ```

3. El esquema se genera y actualiza automáticamente usando JPA (`hibernate.ddl-auto=update`).

### Ejecutar el backend

```bash
cd backend
mvn spring-boot:run
```

Esto expone la API en `http://localhost:8080` con los siguientes grupos principales de endpoints:

- `POST /api/auth/register` y `POST /api/auth/login` – registro y autenticación usando JWT.
- `GET /api/products` / `GET /api/products/{id}` – catálogo público.
- `GET /api/products/search?q=...` – barra de búsqueda sobre nombre y descripción.
- `POST|PUT|DELETE /api/admin/products` – gestión de productos (requiere rol `ADMIN`).
- `GET /api/admin/users` – listado de usuarios para el panel admin (requiere rol `ADMIN`).

Al iniciar por primera vez se crea automáticamente un usuario administrador (`admin@synapsse.com` / `Admin1234`).

## Frontend (Next.js)

### Requisitos previos

- Node.js 18+

### Configurar variables de entorno

```bash
copy .env.example .env.local
```

Edita `.env.local` con tus configuraciones:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_APP_URL=http://localhost:3000
MERCADOPAGO_ACCESS_TOKEN=tu_access_token
```

### Ejecutar el frontend

```bash
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## 🔒 Seguridad

- **NUNCA** cometas archivos `.env` o `.env.local` al repositorio
- Los archivos `.env.example` sirven como plantilla y sí deben ser versionados
- Genera JWT secrets seguros usando herramientas de cifrado
- Usa diferentes credenciales para desarrollo y producción

## Desarrollo adicional

- Ajusta los dominios permitidos, CORS, reglas de seguridad y secretos antes de desplegar a producción.
- Todas las variables sensibles están ahora en archivos `.env` (ver [ENV_SETUP.md](../ENV_SETUP.md))
- Para producción, configura las variables de entorno en tu plataforma de hosting
