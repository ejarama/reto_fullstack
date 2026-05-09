# Especificación del Proyecto: BlackAnd Store

## 1. Objetivo
Desarrollar un e-commerce funcional como proyecto final para el curso Full Stack. El objetivo es tomar una plantilla base de React/Vite existente y extenderla para crear una tienda en línea completa y estilizada bajo la marca "BlackAnd Store". Esta tienda estará enfocada en vender los siguientes productos: prints artísticos, camisetas, hoodies, stickers, posters, accesorios creativos y gift cards. (Nota: El catálogo no debe incluir gestión de citas de tatuajes).

## 2. Alcance
El proyecto abarca la implementación del frontend del e-commerce utilizando React. Las características principales incluirán:
- Catálogo de galería de productos con funcionalidad de búsqueda y paginación.
- Carrito de compras funcional (agregar, eliminar, modificar cantidades).
- Flujo de checkout simulado.
- Sistema de autenticación (registro/login) simulado.
- Navegación tipo SPA (Single Page Application) fluida.
- Diseño visual altamente personalizado inspirado en el portafolio "BlackAndrey".
- Persistencia de datos locales usando `localStorage` para carritos y sesiones.
- Integración con Firebase se mantiene estrictamente como un bonus opcional; no implementarlo todavía.

No se incluye el desarrollo de un backend real; se utilizarán mock data, servicios simulados y almacenamiento local para replicar la funcionalidad completa de frontend.

## 3. Stack Tecnológico
- **Core:** React, Vite
- **Estilos:** Tailwind CSS
- **Gestión de Estado Global:** Zustand
- **Peticiones HTTP:** Axios (preparado para integración futura o consumo de APIs externas).
- **Enrutamiento:** React Router (DOM)
- **Persistencia de Datos:** `localStorage` (API del Navegador)
- **Bonus:** Firebase (Opcional, sin prioridad inicial, no implementarlo todavía)

## 4. Estado Actual de la Plantilla
El repositorio no parte desde cero y NO debe ser recreado. Actualmente cuenta con una base que incluye:
- Configuración inicial y optimizada de React + Vite.
- Estructura de carpetas predefinida.
- Componentes iniciales de UI.
- Archivos de `mockdata` para productos o datos de prueba.
- Stores iniciales configurados (Zustand).
- Capa de servicios base (para Axios/simulaciones).
- Estilos base y configuraciones de Tailwind CSS.
- *Nota: Todo el desarrollo debe conservar y mejorar esta base sin romper su funcionamiento original.*

## 5. Concepto Visual
- **Inspiración Principal:** Portafolio BlackAndrey (https://ejarama.github.io/BlackAndrey/)
- **Marca:** BlackAnd Store
- **Estilo General:** Moderno, oscuro, artístico, minimalista y responsive.
- **Dirección de Arte:** 
  - Predominancia de fondos oscuros (negros profundos, grises carbón).
  - Uso de contrastes altos para legibilidad de textos (blancos, grises claros).
  - Detalles artísticos sutiles, tipografía moderna y limpia.
  - Atmósfera premium que ponga el foco visual completamente en el arte y los productos.
  - Animaciones y transiciones sutiles (smooth scrolling, hover effects suaves).

## 6. Requisitos Funcionales
- **Catálogo de Productos:** Visualización en cuadrícula responsiva de los productos disponibles.
- **Búsqueda:** Barra de búsqueda funcional para filtrar productos en tiempo real por nombre o descripción.
- **Paginación:** División del catálogo de productos en múltiples páginas para mejorar el rendimiento y la experiencia del usuario.
- **Detalle de Producto:** Vista individual (o modal) de cada producto con imagen ampliada, descripción detallada, precio y botón de agregar al carrito.
- **Carrito de Compras:**
  - Agregar productos desde el catálogo o detalle.
  - Ver lista resumen de productos en el carrito.
  - Modificar cantidades (sumar/restar).
  - Eliminar productos individuales.
  - Cálculo automático de subtotal y total.
- **Checkout (Simulado):** Formulario para ingresar datos básicos de envío y pago, finalizando con un mensaje o pantalla de éxito de compra.
- **Autenticación (Simulada):** Formularios funcionales de registro e inicio de sesión. El estado del usuario conectado debe manejarse globalmente y guardarse localmente.
- **Navegación:** Menú principal persistente (Navbar) para acceder a Inicio, Tienda/Catálogo, Carrito y Perfil/Login de forma SPA.

## 7. Requisitos No Funcionales
- **Responsive Design:** La aplicación debe adaptarse y ser 100% funcional en dispositivos móviles, tablets y pantallas de escritorio.
- **Performance:** Tiempos de carga rápidos gracias a Vite y la arquitectura SPA.
- **Usabilidad (UX):** Interfaz intuitiva, retroalimentación visual clara al interactuar (ej. notificaciones (toasts) al agregar al carrito).
- **Código Limpio (Clean Code):** Mantenimiento de una arquitectura limpia, modular, componentes reutilizables (DRY), y aplicación estricta de buenas prácticas de React (Hooks).
- **Persistencia Temporal:** El carrito de compras y la sesión del usuario simulado deben sobrevivir a recargas accidentales de la página (usando `localStorage`).

## 8. Arquitectura Esperada
Se espera mantener y expandir la estructura modular de la plantilla integrando la metodología de **Atomic Design**:
- **`/src/components`**:
  - `/atoms`: Elementos básicos (Botones, Inputs, Textos, Iconos).
  - `/molecules`: Agrupaciones simples de átomos (Campos de formulario con label, Tarjetas de Producto básicas).
  - `/organisms`: Componentes complejos funcionales (Navbar, Footer, Cuadrícula de productos, Formularios completos).
  - `/templates`: Estructuras de página genéricas y layouts.
- **`/src/pages`** o **`/src/views`**: Componentes contenedores que representan páginas completas (Home, Shop, Cart, Checkout, Login).
- **`/src/store`**: Definición de los stores de Zustand para el estado global (ej. `useCartStore`, `useUserStore`).
- **`/src/services`**: Funciones centralizadas para simular peticiones de red o configurar Axios.
- **`/src/mockdata`**: Archivos de datos estáticos (JSON o JS) con el catálogo de productos y usuarios de prueba.
- **`/src/styles`**: Archivos CSS globales y extensiones de configuración de Tailwind.
- **`/src/routes`**: Configuración de React Router.
- **`/src/utils`**: Funciones de utilidad pura y helpers.

## 9. Restricciones Técnicas
- **Prioridad Absoluta:** Primero se debe conservar y asegurar la funcionalidad existente de la plantilla. Solo una vez garantizado esto, se procederá a mejorar la UI/UX.
- **NO recrear el proyecto desde cero.** Construir sobre la base existente.
- **NO romper funcionalidades existentes** al integrar código nuevo.
- Todo el estilizado principal debe realizarse mediante clases de **Tailwind CSS**. Evitar CSS externo complejo a menos que sea estrictamente necesario para animaciones específicas.
- Uso obligatorio de Functional Components y React Hooks.

## 10. Criterios de Verificación
- [ ] La aplicación se compila y ejecuta sin errores en la consola del navegador.
- [ ] La navegación entre rutas ocurre sin recargar el navegador entero (SPA real).
- [ ] El catálogo muestra los productos desde la carpeta de `mockdata`.
- [ ] La búsqueda y la paginación filtran correctamente el catálogo visual.
- [ ] Es posible agregar, editar y eliminar productos del carrito.
- [ ] El estado del carrito persiste tras recargar la página (F5).
- [ ] El diseño responde adecuadamente en resoluciones móviles (ej. 375px de ancho) y escritorio.
- [ ] El flujo de checkout puede completarse (simuladamente) vaciando el carrito al final.
- [ ] El flujo de login/registro permite "entrar" y cambia la UI (ej. muestra el nombre del usuario en lugar de "Login").
- [ ] El aspecto visual cumple claramente con la estética "BlackAnd Store" solicitada.

## 11. Plan de Implementación por Fases
*Nota: Cada fase debe cerrarse de manera estricta con un commit descriptivo que resuma los cambios realizados en ella.*
- **Fase 1: Reconocimiento y Estilización Base**
  - Revisar la estructura y código de la plantilla.
  - Modificar `tailwind.config.js` y CSS global para establecer los colores base del tema oscuro (estilo BlackAnd).
  - Revisar y ajustar el enrutamiento base (React Router).
- **Fase 2: Datos y UI del Catálogo**
  - Actualizar `mockdata` con productos reales (prints, camisetas, hoodies, stickers, etc.).
  - Crear/Mejorar el componente de Tarjeta de Producto (`ProductCard`).
  - Implementar la vista principal del Catálogo (`Shop` / `Gallery`).
- **Fase 3: Lógica Core (Búsqueda y Paginación)**
  - Integrar la barra de búsqueda en el Navbar o encabezado del catálogo.
  - Implementar lógica local de filtrado en el componente del catálogo.
  - Agregar controles y lógica de paginación de productos.
- **Fase 4: Carrito de Compras Global**
  - Revisar/Crear store de Zustand para el carrito (`cartStore`).
  - Implementar el componente del Carrito (puede ser una página dedicada o un Sidebar/Drawer).
  - Conectar botones de "Agregar" de los productos al store.
  - Sincronizar el store con `localStorage`.
- **Fase 5: Autenticación y Checkout (Simulaciones)**
  - Implementar store de usuario (`userStore`).
  - Crear vistas de Login y Registro.
  - Crear vista de Checkout con formulario simulado.
- **Fase 6: Refinamiento y QA Visual**
  - Revisión exhaustiva de responsividad en móviles y tablets.
  - Pulido de márgenes, tipografías e interacciones (hover en Tailwind).
  - Pruebas manuales de todos los flujos de usuario para garantizar que no hay quiebres.

## 12. Lista Sugerida de Commits (Granularidad)
- `docs: crear spec.md con especificaciones del proyecto`
- `style: configurar tema oscuro minimalista en tailwind.config`
- `feat: definir rutas principales y layout base`
- `chore: actualizar mockdata con catálogo BlackAnd Store`
- `feat: construir componente ProductCard y vista de Galería`
- `feat: implementar filtrado por búsqueda en galería`
- `feat: agregar sistema de paginación de productos`
- `feat: configurar Zustand cartStore con localStorage`
- `feat: construir UI del carrito de compras (lista y totales)`
- `feat: conectar ProductCard y Carrito con operaciones CRUD`
- `feat: implementar flujo simulado de autenticación y userStore`
- `feat: construir flujo de checkout simulado`
- `style: pulir diseño responsivo en vistas móviles`
- `refactor: optimizar código de componentes y limpieza general`
- `docs: actualizar README con detalles de ejecución`
