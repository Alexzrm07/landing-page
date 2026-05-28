**Evaluación: Alexzrm07 / landing-page**

**Estado:** Evaluable con incumplimiento de requisito obligatorio

**Nota:** 4.50/10

**Desglose:**
- Ejecución y estabilidad: 11/20
- Front-end: 5/15
- Back-end: 7/15
- Funcionalidades: 10/20
- Responsive: 5/10
- Tipografías: 0/5
- Animación: 2/5
- Documentación: 4/10
- Repositorio: 1/5
**Resumen técnico:**
El proyecto se ejecuta con `npm start` desde `RepoLanding/base de datos local/Files/nodejs`. La ruta `/index.html` carga correctamente y también funcionan `style.css`, `script.js`, `/api/health`, `/api/subscribe` y `/api/orders`. La ruta raíz local, que sería la esperable, devuelve 404 en esta revisión, así que la ejecución no está del todo fina. El proyecto está además demasiado enterrado en carpetas y contiene un `.zip`, lo que dificulta un poco la revisión.

**Funcionalidades indicadas:**
- Cambio de tema claro/oscuro con `localStorage`.
- Filtrado dinámico de productos por categoría.
- Carrito de compra interactivo con contador y total.
- Modal para ampliar imágenes de producto.
- Animación tipo marquesina y efectos hover.
- Back-end con persistencia en JSON para suscripciones y pedidos.

**Complejidad del back-end:**
Media-baja. Es un back-end real con Node nativo, rutas API, validación de email, validación de pedidos y guardado en `db.json`. Tiene más valor que un simple mensaje de confirmación, porque persiste datos. Aun así, sigue siendo sencillo: no hay base de datos real, autenticación ni separación avanzada de capas.

**Puntos fuertes:**
La web tiene una idea clara de tienda de ropa y las funcionalidades encajan con esa temática. El carrito, la suscripción y el guardado de pedidos hacen que la landing tenga un flujo funcional completo. Se valora especialmente que haya persistencia en JSON y que el back-end conecte la interfaz con datos reales; esa parte está bien encaminada.

**Aspectos a mejorar:**
El front-end es bastante básico y simple. La página cumple, pero visualmente se queda en una estructura muy estándar y no se aprecia mucho trabajo de composición, detalle o interacción más allá de lo mínimo. El responsive funciona de forma general, aunque se apoya en un único breakpoint y no se ve un trabajo específico para todas las orientaciones. Las tres tipografías no están realmente implementadas como fuentes distintas: se usan estilos como mayúsculas o espaciado, pero eso no equivale a tres tipografías. Esto incumple un requisito mínimo obligatorio de la rúbrica. La documentación explica la idea, pero le faltan más fragmentos concretos de código y mejor formato.

**Retroalimentación:**
Es una entrega funcional, pero queda muy justa frente a la rúbrica. Buen trabajo por incluir carrito, suscripción y guardado de datos, porque eso aporta utilidad real a la landing. La bajada viene por el incumplimiento de las tres tipografías, la ruta inicial con 404, el responsive poco trabajado y la estructura del repo. Para subir nota, habría que pulir la ruta inicial, mejorar el responsive, usar tres fuentes reales y trabajar mucho más la presentación visual.
