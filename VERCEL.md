# Vercel - Frontend Synapsse

## Paso 1: Preparar el Repositorio

Asegúrate de que:
- ✅ `.env.local` está en `.gitignore`
- ✅ `.env.example` está en el repo
- ✅ `vercel.json` está configurado

## Paso 2: Deploy en Vercel

### Método 1: Desde Dashboard (Recomendado)

1. **Crear Proyecto**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "Add New" → "Project"
   - Importa tu repositorio de GitHub
   - Selecciona el repositorio `frontend_synapsse`

2. **Configuración del Proyecto**
   - Framework Preset: `Next.js`
   - Root Directory: `./` (o `frontend_synapsse` si el repo incluye backend)
   - Build Command: `npm run build` (auto-detectado)
   - Output Directory: `.next` (auto-detectado)

3. **Variables de Entorno**
   
   En "Environment Variables", agrega:

   **Production:**
   ```
   MERCADOPAGO_ACCESS_TOKEN=APP_USR-7484019146750571-101606-e45b8bb65885cb99a752abcb40964dc7-302841239
   NEXT_PUBLIC_API_URL=https://tu-backend.easypanel.host
   NEXT_PUBLIC_APP_URL=https://tu-app.vercel.app
   NEXT_PUBLIC_CHAT_WEBHOOK_URL=https://belmontelucero-n8n.326kz3.easypanel.host/webhook/chat-widget
   NEXT_PUBLIC_COUPON_WEBHOOK_URL=https://belmontelucero-n8n.326kz3.easypanel.host/webhook/cupon
   NEXT_PUBLIC_WHATSAPP_NUMBER=5492616937588
   ```

   **Preview (opcional):**
   - Mismas variables pero con URLs de staging si las tienes

   **Development (opcional):**
   - URLs localhost para testing

4. **Deploy**
   - Click en "Deploy"
   - Espera a que termine el build (2-3 minutos)
   - Vercel te dará una URL: `https://tu-app.vercel.app`

### Método 2: CLI de Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Navegar al proyecto
cd frontend_synapsse

# Login
vercel login

# Deploy
vercel

# Producción
vercel --prod
```

## Paso 3: Configurar Dominio (Opcional)

1. En tu proyecto de Vercel → Settings → Domains
2. Agrega tu dominio personalizado
3. Configura DNS según las instrucciones
4. Actualiza `NEXT_PUBLIC_APP_URL` con tu dominio

## Paso 4: Actualizar Backend

Después del deploy, actualiza la variable CORS en el backend (Easypanel):

```bash
CORS_ALLOWED_ORIGINS=https://tu-app.vercel.app,https://www.tu-dominio.com
```

## Paso 5: Configurar Webhooks de MercadoPago

1. Ve a [MercadoPago Developers](https://www.mercadopago.com/developers/panel/app)
2. Selecciona tu aplicación
3. Configura las URLs de notificación:
   - Success: `https://tu-app.vercel.app/checkout/success`
   - Pending: `https://tu-app.vercel.app/checkout/pending`
   - Failure: `https://tu-app.vercel.app/checkout/failure`

## Paso 6: Testing Post-Deploy

### ✅ Checklist de Verificación

- [ ] Página principal carga correctamente
- [ ] Productos se muestran (verifica conexión con backend)
- [ ] Login/Register funciona
- [ ] Agregar al carrito funciona
- [ ] Checkout con MercadoPago funciona
- [ ] Cupones se pueden solicitar
- [ ] Chat widget funciona
- [ ] WhatsApp button funciona
- [ ] Admin panel accesible (solo admin)

### Comandos de Testing

```bash
# Test frontend
curl https://tu-app.vercel.app

# Test API connection (desde browser console)
fetch('https://tu-backend.easypanel.host/api/products')
  .then(r => r.json())
  .then(console.log)
```

## Variables de Entorno Explicadas

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `MERCADOPAGO_ACCESS_TOKEN` | Token de producción de MercadoPago | `APP_USR-xxx` |
| `NEXT_PUBLIC_API_URL` | URL del backend en Easypanel | `https://api.tusitio.com` |
| `NEXT_PUBLIC_APP_URL` | URL del frontend en Vercel | `https://tusitio.com` |
| `NEXT_PUBLIC_CHAT_WEBHOOK_URL` | Webhook de n8n para chat | `https://n8n.com/webhook/chat` |
| `NEXT_PUBLIC_COUPON_WEBHOOK_URL` | Webhook de n8n para cupones | `https://n8n.com/webhook/cupon` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de WhatsApp | `5492616937588` |

## Troubleshooting

### Build Fails

**Error:** "Module not found"
- Verifica que todas las dependencias estén en `package.json`
- Ejecuta `npm install` localmente para verificar

**Error:** Environment variable
- Verifica que todas las variables `NEXT_PUBLIC_*` estén configuradas
- Revisa los logs del build en Vercel

### Runtime Errors

**CORS Error:**
- Verifica `CORS_ALLOWED_ORIGINS` en el backend
- Debe incluir `https://` y el dominio exacto

**API 404:**
- Verifica `NEXT_PUBLIC_API_URL`
- Asegúrate de que el backend esté corriendo
- Prueba la URL del backend directamente

**MercadoPago Error:**
- Usa token de PRODUCCIÓN (no TEST)
- Verifica que `NEXT_PUBLIC_APP_URL` tenga HTTPS
- Configura webhooks en MercadoPago dashboard

### Performance Issues

- Vercel tiene límites de función serverless (10s timeout)
- Optimiza imágenes con Next.js Image
- Revisa bundle size en el build log

## Deploy Automático

Vercel hace deploy automático en cada push a `main`:

1. Haces `git push origin main`
2. Vercel detecta el cambio
3. Ejecuta build automáticamente
4. Deploy a producción si tiene éxito

### Preview Deployments

Cada Pull Request genera un preview deploy automático:
- URL única para testing
- Mismo build que producción
- Ideal para QA antes de mergear

## Comandos Útiles

```bash
# Ver deployments
vercel ls

# Ver logs
vercel logs tu-app.vercel.app

# Rollback a deployment anterior
vercel rollback

# Remover proyecto
vercel remove tu-app
```

## Optimizaciones

### 1. Configurar Analytics
- Vercel → Tu proyecto → Analytics (gratis)

### 2. Speed Insights
- Vercel → Tu proyecto → Speed Insights

### 3. Edge Functions
- Funciones ejecutadas en el edge (más rápido)
- Ya configurado con Next.js

### 4. Image Optimization
- Next.js optimiza imágenes automáticamente
- Usa el componente `<Image>` de Next.js

## Monitoreo

### Vercel Dashboard
- Real-time logs
- Build history
- Performance metrics
- Error tracking

### Alertas
- Configura en Settings → Notifications
- Email o Slack cuando hay errores

## Costos

Vercel tiene un plan gratuito generoso:
- 100 GB bandwidth
- Deploy ilimitados
- Preview deployments ilimitados
- Serverless functions

Hobby plan es GRATIS para proyectos personales.

## Siguiente Paso

Después de deployar frontend y backend:

1. ✅ Actualiza CORS en backend
2. ✅ Configura webhooks de MercadoPago
3. ✅ Prueba todo el flujo end-to-end
4. ✅ Configura dominio personalizado (opcional)
5. ✅ Monitorea logs por 24hrs para detectar errores
