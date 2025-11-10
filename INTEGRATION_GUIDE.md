# Integración Backend-Frontend - Resumen de Cambios

## ✅ Cambios Realizados

### 1. **Servicios API Creados** (`src/services/`)
- `api.ts` - Cliente HTTP base con manejo de errores
- `authService.ts` - Servicio de autenticación (login, register, token management)
- `productService.ts` - Servicio de productos (listar, buscar, obtener por ID)

### 2. **Componentes Actualizados**

#### Login (`src/components/login/Login.tsx`)
- ✅ Conectado al endpoint `/api/auth/login`
- ✅ Guarda token JWT en localStorage
- ✅ Redirige a `/shop` o `/admin` según el rol
- ✅ Muestra errores de autenticación

#### Register (`src/components/register/Register.tsx`)
- ✅ Conectado al endpoint `/api/auth/register`
- ✅ Validación de contraseñas
- ✅ Guarda token JWT en localStorage
- ✅ Redirige a `/shop` después del registro
- ✅ Muestra errores de validación

#### ProductsSection (`src/components/shop/ProductsSection.tsx`)
- ✅ Carga productos desde `/api/products`
- ✅ Muestra estado de carga
- ✅ Maneja errores de conexión
- ✅ Muestra mensaje cuando no hay productos

#### SearchBar (`src/components/shop/SearchBar.tsx`)
- ✅ Busca productos en `/api/products/search?q={query}`
- ✅ Búsqueda por tags predefinidos
- ✅ Callback para mostrar resultados

### 3. **Variables de Entorno**
- Agregada `NEXT_PUBLIC_API_URL=http://localhost:8080` en `.env.local`

---

## 🚀 Cómo Ejecutar

### 1. **Backend (Spring Boot)**
```cmd
cd backend
mvn clean install
mvn spring-boot:run
```

**Requisitos:**
- PostgreSQL corriendo en `localhost:5432`
- Base de datos `synapsse` creada
- Variables configuradas en `backend/.env` (ya creado)

### 2. **Frontend (Next.js)**
```cmd
npm install
npm run dev
```

---

## 🔧 Verificación

### 1. **Backend está corriendo**
- Verificar en: http://localhost:8080/api/products
- Debería retornar un JSON con productos

### 2. **Frontend puede conectarse**
- Abrir: http://localhost:3000/shop
- Los productos deberían cargarse del backend
- Si ves "Cargando productos..." indefinidamente, revisa:
  - ¿Backend está corriendo?
  - ¿CORS está configurado correctamente?
  - Consola del navegador (F12) para ver errores

### 3. **Registro funciona**
- Ir a: http://localhost:3000/register
- Registrar un usuario nuevo
- Debería redirigir a `/shop` con sesión iniciada

### 4. **Login funciona**
- Ir a: http://localhost:3000/login
- Iniciar sesión con usuario registrado
- Verificar que se guarda el token en localStorage (F12 > Application > Local Storage)

---

## 🐛 Posibles Problemas

### Error CORS
Si ves errores de CORS en la consola:
```
Access to fetch at 'http://localhost:8080/api/...' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solución:** Ya está configurado en `SecurityConfig.java` para permitir `http://localhost:3000`

### Backend no inicia
Verifica:
1. PostgreSQL está corriendo
2. Base de datos `synapsse` existe
3. Credenciales en `backend/.env` son correctas
4. Java 17 está instalado

### Productos no cargan
Verifica:
1. Backend tiene datos iniciales (revisar `DataInitializer.java`)
2. Endpoint `/api/products` retorna datos
3. La URL en `.env.local` es correcta

### Token no se guarda
Verifica en consola del navegador si hay errores de CORS o autenticación

---

## 📝 Próximos Pasos

### Para Admin Panel
Necesitarás crear:
1. Componente de Admin Dashboard
2. CRUD de productos en el frontend
3. Servicio para llamar a `/api/admin/products`
4. Protección de rutas (middleware de autenticación)

### Para Mejorar Búsqueda
1. Actualizar `Shop.tsx` para recibir y mostrar resultados de búsqueda
2. Crear estado compartido o context para productos filtrados
3. Agregar filtros adicionales (categoría, precio, etc.)

---

## 🔑 Endpoints del Backend

### Públicos (sin autenticación)
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login
- `GET /api/products` - Listar todos los productos
- `GET /api/products/{id}` - Obtener producto por ID
- `GET /api/products/search?q={query}` - Buscar productos

### Protegidos (requieren token)
- `POST /api/admin/products` - Crear producto (solo ADMIN)
- `PUT /api/admin/products/{id}` - Actualizar producto (solo ADMIN)
- `DELETE /api/admin/products/{id}` - Eliminar producto (solo ADMIN)

---

## 💡 Notas Importantes

1. **Token JWT**: Se guarda en localStorage como `authToken`
2. **Usuario**: Se guarda en localStorage como `user` (JSON con email e isAdmin)
3. **CORS**: Configurado para `http://localhost:3000` solamente
4. **Seguridad**: En producción, usa HTTPS y protege mejor las credenciales
