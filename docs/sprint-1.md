# Sprint 1 — Synapsse (E-commerce de cuidado de la piel)

Duración del sprint: 2 semanas

---

## 1. Formulación del Proyecto

- **Objetivo del proyecto:**
  Construir el MVP de la tienda Synapsse para skincare, con una landing que comunique propuesta de valor y una página de Tienda con catálogo de productos, carrito lateral persistente y navegación básica. El foco es permitir al usuario explorar productos, agregarlos al carrito y visualizar el total de compra con una experiencia clara, rápida y responsiva.

- **Alcance del MVP (este sprint):**
  - Home con héroe principal, beneficios del producto y CTA.
  - Página Tienda con grilla de productos y ficha breve (título, descripción corta, precio e imagen).
  - Carrito lateral (SideCart) con conteo, totales, vaciar carrito y persistencia local.
  - Navegación básica en la barra superior (Home/Tienda).
  - Estilos base con Tailwind y contenidos en español.

- **Requisitos generales (funcionales):**
  - Visualizar listado de productos con imagen, título, descripción y precio.
  - Agregar productos al carrito desde cada tarjeta.
  - Abrir/cerrar carrito lateral y ver detalle (título, cantidad, subtotal y total).
  - Mostrar badge de cantidad en el ícono del carrito del navbar.
  - Vaciar carrito desde el panel.
  - Persistir carrito en `localStorage` para mantener estado entre recargas.
  - Navegar entre Home (`/`) y Tienda (`/shop`).

- **Requisitos no funcionales / técnicos:**
  - Next.js 15 + React + Redux Toolkit (estado de carrito), Tailwind CSS.
  - Performance básica: imágenes optimizadas en siguientes sprints (reemplazar `<img>` por `next/image`).
  - Accesibilidad y responsive: navegación usable en desktop y mobile.
  - Código tipado con TypeScript y ESLint activo.

- **Stakeholders y expectativas:**
  - Cliente/Marca (Synapsse): presencia digital coherente con la marca y catálogo visible.
  - Marketing: secciones de valor (beneficios), CTA visibles y fácil navegación.
  - Usuarios finales: experiencia rápida, clara y confiable para explorar y armar carrito.
  - Equipo de Desarrollo: base técnica mantenible para integrar checkout y autenticación más adelante.

- **Criterios de éxito del sprint:**
  - Home y Tienda navegables con UI estable y responsive.
  - Carrito funcional: agregar, ver totales, badge en navbar y vaciado.
  - Persistencia del carrito probada tras recarga de página.
  - Prototipo navegable en Figma que represente el flujo del MVP.
  - Historias de usuario definidas con criterios de aceptación y estimaciones.

---

## 2. Historias de Usuario

> Estimaciones en puntos (Fibonacci): 1, 2, 3, 5, 8.

1) HU-001 — Ver landing principal (Home) — 2 pts
- Descripción: Como visitante, quiero ver una landing con héroe, mensajes de valor y beneficios para entender la propuesta de Synapsse.
- Criterios de aceptación:
  - Se visualiza héroe con imagen principal y mensajes (FlipWords dinámico en CTA).
  - Se muestran beneficios/propiedades («Hidratación profunda», «Regeneración», «Antiarrugas»).
  - Navbar visible con enlaces Home/Tienda e ícono de carrito.

2) HU-002 — Navegar a Tienda — 1 pt
- Descripción: Como visitante, quiero ir desde Home a la página Tienda para ver el catálogo.
- Criterios de aceptación:
  - Existe un botón/enlace «Ir a la Tienda» que lleva a `/shop`.
  - Breadcrumbs no requeridos en este sprint.

3) HU-003 — Ver catálogo de productos — 3 pts
- Descripción: Como visitante, quiero ver una grilla de productos con imagen, título, breve descripción y precio.
- Criterios de aceptación:
  - Grilla responsive con al menos 8–10 productos.
  - Cada tarjeta muestra imagen, título, descripción y precio.

4) HU-004 — Agregar producto al carrito — 3 pts
- Descripción: Como visitante, quiero agregar un producto al carrito desde la tarjeta para construir mi compra.
- Criterios de aceptación:
  - Botón «Comprar» agrega 1 unidad y abre el SideCart.
  - Si el producto ya está en el carrito, incrementa la cantidad.

5) HU-005 — Ver carrito lateral (SideCart) — 3 pts
- Descripción: Como visitante, quiero ver el carrito con productos, cantidades y total para entender el costo de mi compra.
- Criterios de aceptación:
  - SideCart muestra lista de ítems (título y cantidad) y total en moneda.
  - Cierra al hacer clic fuera o con el botón de cerrar.

6) HU-006 — Ver contador en ícono de carrito — 2 pts
- Descripción: Como visitante, quiero ver la cantidad total de ítems en el ícono del carrito del navbar.
- Criterios de aceptación:
  - Badge numérico visible solo si cantidad > 0.
  - El contador refleja la suma de cantidades del carrito.

7) HU-007 — Persistir carrito entre recargas — 3 pts
- Descripción: Como visitante, quiero que mi carrito se mantenga si recargo la página.
- Criterios de aceptación:
  - El estado del carrito se guarda en `localStorage`.
  - Al recargar, se rehidrata el estado y se conserva el contenido.

8) HU-008 — Vaciar carrito — 2 pts
- Descripción: Como visitante, quiero poder vaciar el carrito para empezar de nuevo.
- Criterios de aceptación:
  - Botón «Vaciar Carrito» elimina todos los ítems y el total pasa a 0.

9) HU-009 — Abrir/cerrar carrito desde navbar — 2 pts
- Descripción: Como visitante, quiero abrir el carrito desde el ícono del navbar y cerrarlo fácilmente.
- Criterios de aceptación:
  - Clic en el ícono abre el SideCart.
  - Overlay o botón «X» cierra el panel.

10) HU-010 — Responsive básico — 5 pts
- Descripción: Como visitante, quiero que la experiencia funcione correctamente en pantallas móviles y desktop.
- Criterios de aceptación:
  - Navbar, grilla de productos y SideCart se adaptan sin solaparse.
  - No hay scroll horizontal inesperado.

11) HU-011 — Preparar checkout (no implementar) — 1 pt
- Descripción: Como negocio, quiero un botón «Ir a pagar» que por ahora no procese pago, para introducirlo visualmente.
- Criterios de aceptación:
  - Botón visible en el SideCart sin flujo de pago aún.

12) HU-012 — Footer con enlaces informativos — 1 pt
- Descripción: Como visitante, quiero ver un pie de página con enlaces útiles (registrarse, iniciar sesión, chatbot) para orientación futura.
- Criterios de aceptación:
  - Footer visible en Home/Tienda con los enlaces de referencia.

---

## 3. Bosquejo de Pantallas (wireframe textual)

- **Navbar (global):**
  - Logo Synapsse a la izquierda.
  - Enlaces: Home, Tienda, Categorías (placeholder), Nuestros Procesos (placeholder), Contacto.
  - Ícono de carrito con badge de cantidad.

- **Home (`/`):**
  - Héroe a dos columnas: izquierda con mensajes/beneficios, derecha con imagen de producto.
  - Sección de tarjetas/beneficios y propiedades destacadas (hidratación, regeneración, antiarrugas).
  - Botón «Ir a la Tienda» en la columna derecha inferior.

- **Tienda (`/shop`):**
  - Sección CTA superior con FlipWords.
  - Grilla de productos (2–5 columnas según breakpoint) con tarjetas `ProductCard`.
  - En cada tarjeta: imagen, título, descripción, precio y botón «Comprar».

- **SideCart (panel derecho sobrepuesto):**
  - Header con título «Tu Carrito» y botón cerrar.
  - Lista de ítems: título y x{cantidad}.
  - Total calculado y botones «Ir a pagar» y «Vaciar Carrito».

- **Footer (global):**
  - Logo y lema: «La armonía entre naturaleza y tecnología en cada gota.»
  - Enlaces: Registrarse, Iniciar Sesión, Chatbot.

---

## 4. Prototipo en Figma (entregable)

- **Alcance del prototipo:**
  - Frames: Navbar (componente), Home, Tienda, SideCart (overlay), Footer.
  - Estados: carrito vacío y carrito con ítems (2–3 productos).
  - Interacciones: botón «Ir a la Tienda» (Home → Tienda), ícono del carrito (abre SideCart), overlay/botón «X» (cierra SideCart).

- **Lineamientos visuales:**
  - Tipografía base similar a Poppins (usada en código).
  - Paleta coherente con UI actual (#2f3031, #535657, #839EA7, verdes lima para CTA).
  - Imágenes de producto y placeholders según catálogo mock actual.

- **Salida esperada:**
  - Prototipo navegable con al menos 1 flujo completo: Home → Tienda → abrir carrito → vaciar/ir a pagar (dummy).
  - URL del prototipo: (a completar durante el sprint).

---

## 5. Roles y Responsabilidades

- **Product Owner:** Define y prioriza historias, valida criterios de aceptación.
- **Product Manager:** Alinea objetivos de negocio, roadmap y métricas (CTR «Comprar», conversión a carrito, tiempo en página).
- **Scrum Master:** Facilita ceremonias, elimina bloqueos, vela por el marco Scrum.
- **Equipo de Desarrollo:** Implementa UI/estado del carrito, navegación y persistencia; prepara base para checkout y auth futuros.

---

## 6. Reuniones Scrum

- **Daily Standup:** 15 minutos diarios; estado, bloqueos, plan del día.
- **Sprint Planning (inicio):** Definir objetivo del sprint y seleccionar historias (HU-001 a HU-009 como núcleo; HU-010–HU-012 si hay capacidad).
- **Sprint Review (fin):** Demostración en entorno local; recorrer flujo Home → Tienda → carrito.
- **Sprint Retrospective (fin):** Identificar mejoras de proceso y aspectos técnicos (p. ej., migrar `<img>` a `next/image` y pulir tipados).

---

## 7. Criterios de Hecho (DoD) del Sprint

- Historias completadas con criterios de aceptación verificados en navegador.
- Estado de carrito persistente probado tras recarga.
- Sin errores de runtime; warnings de ESLint aceptados o con plan de mitigación (p. ej., migrar imágenes en Sprint 2).
- Prototipo Figma navegable entregado y enlaces documentados.
- Documentación de sprint almacenada en `docs/sprint-1.md`.
