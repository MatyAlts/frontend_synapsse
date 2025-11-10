# Chat Widget SYNAPSE - Documentación

## 📋 Descripción General

El Chat Widget de SYNAPSE es un asistente virtual flotante diseñado específicamente para el e-commerce de productos de cuidado de la piel. Implementado con React, TypeScript y Tailwind CSS, siguiendo los principios de diseño de la marca SYNAPSE.

## 🎨 Características de Diseño

### Paleta de Colores
- **Verde principal**: `#8BC34A` - Botones principales y elementos destacados
- **Verde secundario**: `#7CB342` - Gradientes y hover effects
- **Grises neutros**: Para textos y fondos
- **Blanco**: Para limpieza y contraste

### Animaciones
- **Entrada suave**: Slide-up con scale para el chat expandido
- **Fade-in**: Para mensajes individuales
- **Bounce**: Para indicadores de escritura
- **Hover effects**: Micro-interacciones en botones
- **Pulse**: Para indicadores de estado online

## 🏗️ Arquitectura de Componentes

```
src/
├── components/
│   └── chat/
│       ├── ChatWidget.tsx          # Componente principal
│       ├── ChatHeader.tsx          # Header con logo y controles
│       ├── ChatMessage.tsx         # Renderizado de mensajes
│       ├── QuickActions.tsx        # Botones de consultas rápidas
│       └── TypingIndicator.tsx     # Animación de escritura
├── hooks/
│   └── useChatWidget.ts           # Hook personalizado de estado
└── app/
    └── globals.css                # Estilos y animaciones personalizadas
```

## 🚀 Instalación y Uso

### 1. Importar el componente en tu página/componente:

```tsx
import ChatWidget from '../components/chat/ChatWidget';

export default function MyPage() {
  return (
    <div>
      {/* Tu contenido aquí */}
      <ChatWidget />
    </div>
  );
}
```

### 2. El componente es completamente autónomo y no requiere props adicionales.

## ⚙️ Personalización

### Modificar Mensajes de Bienvenida

Edita el archivo `src/hooks/useChatWidget.ts`:

```tsx
const [chatState, setChatState] = useState<ChatState>({
  // ... otros estados
  messages: [
    {
      id: '1',
      text: 'Tu mensaje de bienvenida personalizado aquí',
      isUser: false,
      timestamp: new Date(),
    },
  ],
});
```

### Agregar Nuevas Consultas Rápidas

```tsx
const quickQuestions = [
  '¿Qué producto necesito para mi tipo de piel?',
  'Tu nueva pregunta aquí',
  // ... más preguntas
];
```

### Personalizar Respuestas del Bot

```tsx
const responses: Record<string, string> = {
  'Tu pregunta': 'Tu respuesta personalizada aquí',
  // ... más respuestas
};
```

### Modificar Colores de Marca

En `tailwind.config.ts`, puedes agregar tus colores personalizados:

```tsx
module.exports = {
  theme: {
    extend: {
      colors: {
        'synapse-green': '#8BC34A',
        'synapse-green-dark': '#7CB342',
        // ... más colores
      }
    }
  }
}
```

## 🎯 Funcionalidades Principales

### Estado del Chat
- **Minimizado**: Botón flotante con indicadores de estado
- **Expandido**: Ventana completa con header, mensajes, y controles
- **Typing**: Indicador animado mientras el bot "escribe"
- **Online/Offline**: Simulación de estado de conexión

### Interacciones
- **Click en botón flotante**: Abre/cierra el chat
- **Consultas rápidas**: Botones preconfigurados para preguntas frecuentes
- **Input de texto**: Campo para escribir consultas personalizadas
- **Clear chat**: Limpia el historial manteniendo el mensaje de bienvenida
- **Escape key**: Cierra el chat expandido

### Notificaciones
- **Badge de notificación**: Aparece cuando hay mensajes nuevos y el chat está minimizado
- **Auto-scroll**: Los mensajes nuevos se muestran automáticamente
- **Focus automático**: El input recibe focus al abrir el chat

## 📱 Responsividad

El componente es completamente responsive:

- **Desktop**: Chat de `384px` de ancho (`w-96`)
- **Mobile**: Chat de `320px` de ancho (`w-80`)
- **Posicionamiento**: Fixed en esquina inferior derecha con padding apropiado

## ♿ Accesibilidad

### Características implementadas:
- **ARIA labels**: Descripciones accesibles para lectores de pantalla
- **Roles semánticos**: `dialog`, `region`, `group` para navegación
- **Navegación por teclado**: Escape para cerrar, Tab para navegar
- **Focus management**: Focus automático en elementos interactivos
- **Estados de botones**: Disabled apropiadamente durante operaciones

### Mejoras adicionales recomendadas:
```tsx
// Agregar estas mejoras para mejor accesibilidad
- aria-live para mensajes nuevos
- Skip links para navegación rápida
- Soporte para lectores de pantalla en animaciones
- Configuración de reducción de movimiento
```

## 🔌 Integración con API Real

Para conectar con una API real, modifica el hook `useChatWidget.ts`:

```tsx
const sendMessage = useCallback(async (text: string) => {
  // ... código existente para mensaje del usuario

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, context: 'synapse-skincare' })
    });
    
    const data = await response.json();
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: data.response,
      isUser: false,
      timestamp: new Date(),
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, assistantMessage],
      isTyping: false,
    }));
  } catch (error) {
    // Manejar errores
    console.error('Error sending message:', error);
  }
}, []);
```

## 🧪 Testing

### Estructura de tests recomendada:

```tsx
// __tests__/ChatWidget.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ChatWidget from '../components/chat/ChatWidget';

describe('ChatWidget', () => {
  test('renders floating button', () => {
    render(<ChatWidget />);
    expect(screen.getByLabelText(/abrir chat/i)).toBeInTheDocument();
  });

  test('expands chat on button click', () => {
    render(<ChatWidget />);
    fireEvent.click(screen.getByLabelText(/abrir chat/i));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  // ... más tests
});
```

## 🔧 Troubleshooting

### Problemas Comunes

1. **Animaciones no funcionan**
   - Verificar que las clases CSS personalizadas estén en `globals.css`
   - Asegurar que Tailwind CSS esté configurado correctamente

2. **Estilos no se aplican**
   - Verificar el orden de importación de CSS
   - Comprobar que no hay conflictos con otros estilos

3. **Hook no funciona**
   - Verificar que el componente esté dentro de un componente React válido
   - Comprobar las dependencias del proyecto

## 📄 Dependencias

```json
{
  "react": "^18.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.0.0",
  "@types/react": "^18.0.0"
}
```

## 🚀 Próximas Mejoras

- [ ] Integración con ChatGPT/OpenAI
- [ ] Soporte para archivos adjuntos
- [ ] Modo oscuro automático
- [ ] Configuración de temas personalizados
- [ ] Analytics de conversaciones
- [ ] Notificaciones push
- [ ] Soporte multiidioma
- [ ] Integración con CRM

## 📞 Soporte

Para preguntas o problemas con la implementación, consulta:

1. La documentación de componentes individuales
2. Los comentarios en el código fuente
3. Los tipos TypeScript para referencias de API

---

**Versión**: 1.0.0  
**Última actualización**: Septiembre 2025  
**Compatibilidad**: React 18+, TypeScript 5+, Tailwind CSS 3+