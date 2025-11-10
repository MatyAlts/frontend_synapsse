# 🚀 Guía de Despliegue a Vercel

## Opción 1: Despliegue desde GitHub (Recomendado)

### Paso 1: Preparar el Repositorio

1. **Asegúrate de que el código esté en GitHub:**
   ```bash
   cd "c:\Users\Maty\Downloads\proyecto synapsse\frontend_synapsse"
   git status
   ```

2. **Si no está inicializado, crea el repositorio:**
   ```bash
   git init
   git add .
   git commit -m "Preparar proyecto para Vercel"
   git branch -M main
   git remote add origin https://github.com/MatyAlts/frontend_synapsse.git
   git push -u origin main
   ```

### Paso 2: Conectar con Vercel

1. **Ve a [vercel.com](https://vercel.com)** e inicia sesión
2. Haz clic en **"Add New Project"**
3. Selecciona **"Import Git Repository"**
4. Busca y selecciona: `MatyAlts/frontend_synapsse`
5. Haz clic en **"Import"**

### Paso 3: Configurar el Proyecto

En la pantalla de configuración:

**Framework Preset:** Next.js (detectado automáticamente)

**Root Directory:** `./` (raíz del proyecto)

**Build Command:** 
```bash
npm run build
```

**Output Directory:** 
```bash
.next
```

**Install Command:**
```bash
npm install
```

### Paso 4: Configurar Variables de Entorno

⚠️ **MUY IMPORTANTE:** Configura estas variables antes de hacer deploy:

Haz clic en **"Environment Variables"** y agrega:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | Tu URL del backend en producción (ej: `https://tu-backend.com` o `http://72.61.33.27:8080`) | Production |
| `NEXT_PUBLIC_APP_URL` | La URL que Vercel te asignará (por ahora usa `https://tu-proyecto.vercel.app`) | Production |
| `MERCADOPAGO_ACCESS_TOKEN` | Tu token de producción de MercadoPago | Production |

**Notas:**
- Usa tu token de **PRODUCCIÓN** de MercadoPago, no el de test
- La `NEXT_PUBLIC_APP_URL` la puedes actualizar después del primer deploy
- Si tu backend aún está en localhost, necesitarás desplegarlo también

### Paso 5: Desplegar

1. Haz clic en **"Deploy"**
2. Espera a que termine el build (2-5 minutos)
3. ¡Listo! Vercel te dará una URL como: `https://frontend-synapsse.vercel.app`

---

## Opción 2: Despliegue con Vercel CLI

### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Paso 2: Login

```bash
vercel login
```

### Paso 3: Desplegar

```bash
cd "c:\Users\Maty\Downloads\proyecto synapsse\frontend_synapsse"
vercel
```

Sigue las instrucciones en pantalla:
- Set up and deploy? **Y**
- Which scope? Selecciona tu cuenta
- Link to existing project? **N** (primera vez)
- What's your project's name? `frontend-synapsse`
- In which directory is your code located? `./`
- Want to override settings? **N**

### Paso 4: Configurar Variables de Entorno

```bash
vercel env add NEXT_PUBLIC_API_URL production
# Ingresa el valor cuando te lo pida

vercel env add NEXT_PUBLIC_APP_URL production
# Ingresa el valor cuando te lo pida

vercel env add MERCADOPAGO_ACCESS_TOKEN production
# Ingresa el valor cuando te lo pida
```

### Paso 5: Redesplegar con las Variables

```bash
vercel --prod
```

---

## Opción 3: Build Local y Subir

### Paso 1: Build Local

```bash
cd "c:\Users\Maty\Downloads\proyecto synapsse\frontend_synapsse"
npm run build
```

Verifica que no haya errores de build.

### Paso 2: Deploy

```bash
vercel --prod
```

---

## 📋 Checklist Pre-Deploy

Antes de hacer el deploy, verifica:

- [ ] `.env.local` NO está en Git (verificado con `.gitignore`)
- [ ] El proyecto hace build correctamente: `npm run build`
- [ ] Tienes las variables de entorno listas:
  - [ ] URL del backend en producción
  - [ ] Token de MercadoPago (producción)
- [ ] El backend está accesible públicamente (no localhost)
- [ ] Has probado el proyecto localmente

---

## 🔧 Configuración Post-Deploy

### Actualizar la URL de la App

Después del primer deploy, obtendrás una URL de Vercel. Actualízala:

1. Ve al dashboard de Vercel
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Edita `NEXT_PUBLIC_APP_URL` con la URL real:
   ```
   https://frontend-synapsse.vercel.app
   ```
5. Redeploy haciendo un nuevo commit o usando:
   ```bash
   vercel --prod
   ```

### Configurar Dominio Personalizado (Opcional)

1. En el dashboard de Vercel, ve a **Settings** → **Domains**
2. Agrega tu dominio: `www.synapsse.com`
3. Sigue las instrucciones para configurar DNS
4. Actualiza `NEXT_PUBLIC_APP_URL` con tu dominio

---

## 🔐 Configuración del Backend

⚠️ **IMPORTANTE:** Para que el frontend en Vercel funcione, necesitas:

### Opción A: Backend en Servidor Público

Si tu backend está en `72.61.33.27:8080`:

1. Asegúrate de que el puerto 8080 esté abierto públicamente
2. Configura CORS en el backend para permitir tu dominio de Vercel:
   ```java
   @CrossOrigin(origins = "https://frontend-synapsse.vercel.app")
   ```
3. Usa `http://72.61.33.27:8080` como `NEXT_PUBLIC_API_URL`

### Opción B: Backend en Heroku/Railway/Render

Despliega tu backend Spring Boot en una plataforma cloud:

**Heroku:**
```bash
cd backend_synapsse
heroku create synapsse-backend
git push heroku main
```

**Railway:**
1. Ve a [railway.app](https://railway.app)
2. Conecta tu repositorio
3. Configura las variables de entorno

Luego usa la URL del backend deployado en `NEXT_PUBLIC_API_URL`

---

## 🐛 Troubleshooting

### Error: "Build Failed"

**Causa:** Errores de TypeScript o dependencias faltantes

**Solución:**
```bash
npm install
npm run build
# Revisa los errores y corrígelos
```

### Error: "Cannot connect to backend"

**Causa:** Backend no accesible o CORS no configurado

**Solución:**
1. Verifica que el backend esté público
2. Configura CORS en Spring Boot
3. Revisa `NEXT_PUBLIC_API_URL` en Vercel

### Error: "MercadoPago token invalid"

**Causa:** Token incorrecto o expirado

**Solución:**
1. Obtén un nuevo token desde el [Panel de MercadoPago](https://www.mercadopago.com/developers/panel/app)
2. Actualízalo en Vercel: Settings → Environment Variables
3. Redeploy

### Error: "Module not found"

**Causa:** Dependencia faltante o error en import

**Solución:**
```bash
npm install
# Verifica que todos los imports sean correctos
```

---

## 📊 Monitoreo

Una vez desplegado, monitorea:

1. **Logs de Vercel:**
   - Dashboard → Tu Proyecto → Deployments → Ver logs

2. **Analytics:**
   - Dashboard → Tu Proyecto → Analytics

3. **Errores:**
   - Dashboard → Tu Proyecto → Activity

---

## 🔄 Actualizaciones Automáticas

Vercel redesplegará automáticamente cuando:
- Hagas push a la rama `main` de GitHub
- Actualices variables de entorno (necesita redeploy manual)

Para redeploy manual:
```bash
vercel --prod
```

O desde el dashboard: **Deployments** → **...** → **Redeploy**

---

## 📚 Recursos

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## ✅ Checklist Final

- [ ] Proyecto desplegado en Vercel
- [ ] Variables de entorno configuradas
- [ ] Frontend accesible públicamente
- [ ] Backend conectado correctamente
- [ ] MercadoPago funcionando
- [ ] Dominio configurado (si aplica)
- [ ] CORS configurado en backend
- [ ] Logs revisados sin errores

---

**¡Listo para producción!** 🚀
