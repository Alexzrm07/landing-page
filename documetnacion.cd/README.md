

---

# Documentación Técnica: Proyecto Landing Page - "MiMarca"

## 1. Introducción y Objetivo del Proyecto

Este proyecto consiste en una landing page funcional para una tienda de moda minimalista llamada **MiMarca**. El objetivo es ofrecer una experiencia de usuario fluida que combine un diseño visual atractivo (Front-end) con una capacidad real de gestión de datos (Back-end), permitiendo suscripciones y compras.

---

## 2. Requisitos de Diseño y Estética (Criterios 5 y 6)

### 2.1 Uso de Tipografías (5%)

He seleccionado tres tipografías (o variantes) para crear una jerarquía clara:

1. **Arial / Sans-serif:** Es la fuente principal del cuerpo. La he elegido porque es neutra y facilita la lectura de descripciones largas.
2. **Títulos con Letter-spacing:** En el logo (`h1`) y encabezados (`h2`), he aplicado un espaciado de `4px`. **El porqué:** Esto da una sensación de marca premium y moderna, separando visualmente el nombre de la marca del texto común.
3. **Fuentes en Mayúsculas (Botones):** Para los botones y el menú, uso texto en mayúsculas. **El porqué:** Ayuda al usuario a identificar rápidamente los elementos en los que puede hacer clic.

### 2.2 Diseño Responsive (10%)

La web utiliza **Media Queries** y un sistema de **Flexbox/Grid** para adaptarse a:

* **Escritorio:** Layout ancho con navegación completa.
* **Tablet (V/H):** Los productos pasan de 3 columnas a 2 para mantener el tamaño de imagen.
* **Móvil (V/H):** Los elementos se apilan verticalmente y el padding se reduce para aprovechar la pantalla pequeña.

---

## 3. Funcionalidades Implementadas (Criterio 4 - 20%)

He implementado **6 funcionalidades**, cumpliendo el mínimo de 5 exigido:

### 1. Sistema de Cambio de Tema (Dark Mode)

* **Qué hace:** Cambia los colores de toda la web de claro a oscuro.
* **Por qué:** He decidido añadirlo para mejorar la **accesibilidad** (fatiga visual) y porque es una tendencia valorada por los usuarios modernos.
* **Código:** Utilizo `localStorage` para que, si el usuario refresca la página, la web "recuerde" su preferencia.

### 2. Filtrado Dinámico de Productos

* **Qué hace:** Permite filtrar por "Camisetas", "Jeans" o "Chaquetas".
* **Por qué:** Mejora la **usabilidad**. Un cliente no quiere perder tiempo buscando entre ropa que no le interesa.
* **Código:** El script oculta o muestra elementos del DOM basándose en el atributo `data-category`.

### 3. Carrito de Compra Interactivo

* **Qué hace:** Permite añadir productos, ver el contador en tiempo real y calcular el total de la compra.
* **Por qué:** Es la funcionalidad core de cualquier tienda. Sin carrito, no hay conversión de venta.

### 4. Modal de Visualización de Imágenes

* **Qué hace:** Al hacer clic en un producto, la imagen se abre en grande.
* **Por qué:** En la moda, el detalle es vital. He decidido añadirlo para que el usuario pueda apreciar la textura de las prendas sin cambiar de página.

### 5. Animaciones de Front-end (Criterio 7 - 5%)

* **Qué hace:** He incluido un **Marquee (marquesina)** infinito para las ofertas y efectos de **hover** en las tarjetas de producto.
* **Por qué:** La marquesina capta la atención del usuario hacia los descuentos inmediatamente, y el efecto hover (elevación de la tarjeta) da feedback visual de que el elemento es interactivo.

### 6. Persistencia de Datos (Back-end)

* **Qué hace:** Envía el email del suscriptor y los datos del carrito al servidor para guardarlos permanentemente.

---

## 4. Integración del Back-end (Criterio 3 - 15%)

El Back-end está construido con **Node.js** nativo (sin frameworks externos pesados) para demostrar un control total sobre el servidor.

* **Lógica del Servidor:** El archivo `server.js` gestiona tanto la entrega de archivos (HTML/CSS) como una API propia.
* **Almacenamiento (JSON local):** He decidido usar un archivo `db.json` como base de datos.
* **Por qué el Back-end es vital:** Sin él, cuando un usuario se suscribe a la newsletter, esa información se perdería. Gracias a la integración que he hecho, los emails se guardan en el servidor:
```javascript
// Fragmento de server.js que guarda la suscripción
database.subscribers.push({ email, id: crypto.randomUUID() });
writeDatabase(database);

```


* **Ruta API:** He creado rutas específicas como `/api/subscribe` y `/api/orders` para separar la lógica de la interfaz de la lógica de datos.

---

## 5. Estabilidad y Ejecución (Criterio 1 y 2)

El proyecto ha sido testeado para asegurar que:

1. No hay errores en la consola del navegador.
2. El servidor arranca correctamente con `npm start` (definido en `package.json`).
3. Las rutas relativas son correctas, permitiendo que la landing sea ejecutable en cualquier entorno local de Visual Studio Code.

---
