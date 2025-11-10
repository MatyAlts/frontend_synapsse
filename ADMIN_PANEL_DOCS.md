# Panel de Administración - Documentación

## 🎯 Funcionalidades Implementadas

### ✅ **Dashboard Principal** (`/admin`)
- Vista de tabla con todos los productos
- Búsqueda en tiempo real por nombre y descripción
- Estadísticas generales:
  - Total de productos
  - Productos en stock
  - Productos sin stock
- Diseño responsivo y moderno

### ✅ **CRUD Completo de Productos**

#### **Crear Producto**
- Formulario modal con validación
- Campos:
  - Nombre (requerido)
  - Descripción (requerido)
  - Precio (requerido, mínimo 0)
  - Stock (requerido, mínimo 0)
  - URL de imagen (requerido)
  - Categorías (múltiples)
- Preview de imagen en tiempo real
- Endpoint: `POST /api/admin/products`

#### **Editar Producto**
- Modal pre-rellenado con datos del producto
- Mismos campos que crear
- Endpoint: `PUT /api/admin/products/{id}`

#### **Eliminar Producto**
- Confirmación de doble clic
- Endpoint: `DELETE /api/admin/products/{id}`

### ✅ **Seguridad**
- Requiere autenticación con JWT
- Solo usuarios con rol ADMIN pueden acceder
- Redirección automática a `/login` si no está autenticado
- Token enviado en header `Authorization: Bearer {token}`

### ✅ **Gestión de Categorías**
- Agregar múltiples categorías por producto
- Eliminar categorías individualmente
- Vista de categorías en tabla (primeras 2 + contador)

---

## 🎨 Componentes Creados

### 1. **AdminDashboard** (`src/components/admin/AdminDashboard.tsx`)
Componente principal del panel de administración.

**Características:**
- Header con logout
- Barra de búsqueda
- Tarjetas de estadísticas
- Tabla de productos con acciones
- Gestión de estado local

**Props:** Ninguno

### 2. **ProductModal** (`src/components/admin/ProductModal.tsx`)
Modal reutilizable para crear/editar productos.

**Props:**
- `isOpen: boolean` - Controla visibilidad
- `onClose: () => void` - Callback al cerrar
- `onSuccess: () => void` - Callback después de guardar
- `product?: Product | null` - Producto a editar (null para crear)

**Características:**
- Formulario completo con validación
- Preview de imagen
- Gestión de categorías
- Estados de carga y error

### 3. **AdminPage** (`src/app/admin/page.tsx`)
Página Next.js que renderiza el dashboard.

---

## 🔌 Servicios API

### **adminProductService** (`src/services/adminProductService.ts`)

```typescript
// Crear producto
adminProductService.createProduct(data: ProductRequest): Promise<Product>

// Actualizar producto
adminProductService.updateProduct(id: number, data: ProductRequest): Promise<Product>

// Eliminar producto
adminProductService.deleteProduct(id: number): Promise<void>
```

**ProductRequest:**
```typescript
{
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categories: string[];
  stock: number;
}
```

---

## 🚀 Cómo Usar

### 1. **Acceder al Panel**
```
http://localhost:3000/admin
```

### 2. **Credenciales de Admin**
```
Email: admin@synapsse.com
Password: Admin1234
```

### 3. **Crear un Producto**
1. Click en "Nuevo Producto"
2. Llenar el formulario
3. Agregar categorías (opcional)
4. Click en "Crear"

### 4. **Editar un Producto**
1. Click en el ícono de editar (lápiz)
2. Modificar campos necesarios
3. Click en "Actualizar"

### 5. **Eliminar un Producto**
1. Click en el ícono de eliminar (papelera)
2. Click en "Confirmar" o "Cancelar"

---

## 🔧 Endpoints del Backend Usados

### Públicos (ya existentes)
- `GET /api/products` - Listar productos

### Protegidos (ADMIN)
- `POST /api/admin/products` - Crear producto
- `PUT /api/admin/products/{id}` - Actualizar producto
- `DELETE /api/admin/products/{id}` - Eliminar producto

---

## 🎨 Características de UI/UX

### **Diseño Moderno**
- Gradiente de fondo (green-50 to blue-50)
- Tarjetas con sombras y bordes redondeados
- Transiciones suaves
- Responsive design

### **Tabla de Productos**
- Hover effects
- Imagen en miniatura
- Badges de estado (stock)
- Acciones inline

### **Estados Visuales**
- Loading states
- Empty states
- Error messages
- Success feedback
- Color coding:
  - Verde: Stock alto (>10)
  - Amarillo: Stock bajo (1-10)
  - Rojo: Sin stock (0)

### **Confirmación de Eliminación**
- Patrón de doble confirmación
- Previene eliminación accidental

---

## 📱 Responsive Design

El panel es completamente responsive:
- **Desktop:** Tabla completa con todas las columnas
- **Tablet:** Grid de 2 columnas para stats
- **Mobile:** Stack vertical, scrollable

---

## 🔒 Protección de Rutas

El componente verifica automáticamente:
1. ¿Usuario autenticado?
2. ¿Usuario es admin?

Si alguna falla → Redirige a `/login`

**Implementación:**
```typescript
useEffect(() => {
  const user = authService.getUser();
  if (!user || !user.isAdmin) {
    router.push('/login');
    return;
  }
  loadProducts();
}, [router]);
```

---

## 🐛 Manejo de Errores

### **Errores de Red**
- Muestra mensaje en banner rojo
- No rompe la UI
- Permite reintentar

### **Errores de Validación**
- Validación de formulario HTML5
- Validación en backend (DTO)
- Mensajes específicos

### **Errores de Autorización**
- Token expirado → Redirige a login
- No autorizado → Muestra error

---

## 📊 Próximas Mejoras (Opcionales)

### **Funcionalidades Avanzadas**
- [ ] Paginación de productos
- [ ] Filtros por categoría
- [ ] Ordenamiento de columnas
- [ ] Búsqueda avanzada
- [ ] Upload de imágenes (actualmente solo URLs)
- [ ] Bulk actions (eliminar múltiples)
- [ ] Historial de cambios
- [ ] Gestión de usuarios

### **UI/UX**
- [ ] Animaciones de entrada/salida
- [ ] Toast notifications
- [ ] Modo oscuro
- [ ] Exportar a CSV/Excel
- [ ] Drag & drop para reordenar

### **Backend**
- [ ] Soft delete (papelera)
- [ ] Auditoría de cambios
- [ ] Roles más granulares
- [ ] Rate limiting

---

## ✅ Checklist de Verificación

Antes de usar el panel, verifica:

- [ ] Backend corriendo en `http://localhost:8080`
- [ ] Frontend corriendo en `http://localhost:3000`
- [ ] Base de datos PostgreSQL activa
- [ ] Productos de ejemplo cargados
- [ ] Usuario admin creado
- [ ] Variable `NEXT_PUBLIC_API_URL` en `.env.local`
- [ ] Token JWT funcionando correctamente

---

## 🎓 Ejemplos de Uso

### **Crear un Producto Nuevo**
```typescript
// El formulario genera automáticamente:
{
  name: "Crema Revitalizante",
  description: "Crema para pieles maduras con vitamina C",
  price: 45.99,
  stock: 25,
  imageUrl: "/producto-nuevo.png",
  categories: ["Crema", "Anti-edad", "Vitamina C"]
}
```

### **Buscar Productos**
La búsqueda filtra en tiempo real:
- Por nombre: "Sérum"
- Por descripción: "hidratación"
- Case-insensitive

---

## 💡 Notas Importantes

1. **Imágenes:** Actualmente solo acepta URLs. Las imágenes deben estar en `/public/` o ser URLs externas.

2. **Categorías:** No hay límite de categorías por producto.

3. **Stock:** Se muestra con color coding para identificar rápidamente productos con poco stock.

4. **Precios:** Se manejan con 2 decimales automáticamente.

5. **Eliminación:** Es permanente, no hay papelera de recuperación.

6. **Sesión:** El token JWT expira después de 1 hora (configurable en backend).

---

¡El panel de administración está listo para usar! 🎉
