# TrueFragancia — tienda online

Sitio estático (HTML/CSS/JS puro, sin instalación ni build) con:
- Catálogo de productos
- Carrito de compras (persiste en el navegador)
- Botón "Pedir por WhatsApp" que arma el mensaje automáticamente con el detalle del pedido
- Botón flotante de WhatsApp para consultas rápidas

## Cómo abrirlo en VS Code

1. Descomprime la carpeta `truefragancia`.
2. Abre VS Code → `Archivo > Abrir carpeta...` → selecciona `truefragancia`.
3. Instala la extensión **Live Server** (de Ritwick Dey) desde el panel de extensiones.
4. Click derecho sobre `index.html` → **"Open with Live Server"**. Se abre en tu navegador con recarga automática al guardar.

## Qué cambiar primero

### 1. Tu logo
Ahora mismo hay un placeholder temporal (`assets/logo.svg` con las iniciales "TF"). Cuando tengas tu logo real (el que descargaste de WhatsApp), guárdalo en la carpeta `assets/` — por ejemplo `assets/logo.png` — y cambia la ruta en `index.html`, en la línea `<img src="assets/logo.svg" ... id="brandLogo">`, poniendo el nombre de tu archivo. Tamaño recomendado: cuadrado, mínimo 128×128px, fondo transparente si es posible.

### 2. Tus productos
Edita `js/products.js`. Cada perfume es un objeto con nombre, precio, descripción, foto y su pirámide olfativa (notas de salida, corazón y fondo). El archivo tiene comentarios explicando cada campo.

Para las fotos: crea una carpeta `assets/productos/` y pon ahí las imágenes; luego en cada producto pon `image: "assets/productos/nombre-archivo.jpg"`.

### 3. Tu número de WhatsApp
Ya está configurado con **+1 849 287 4453** en `js/script.js`, en la constante `WHATSAPP_NUMBER` (arriba del todo). Si cambia, edítalo ahí — debe ir sin `+`, espacios ni guiones.

### 4. Textos de marca
- Título y bajada del hero: en `index.html`, sección `<section class="hero">`.
- Historia de la marca: sección `<section class="story">`.

### 5. Envíos, pagos y preguntas frecuentes
En `index.html` busca `id="envios"` y `id="faq"`. Ahí hay textos de ejemplo (zonas de envío, métodos de pago, garantía, preguntas frecuentes) — reemplázalos por tu información real.

### 6. Redes sociales
En el pie de página (`<footer class="site-footer">`), el enlace de Instagram apunta a `href="#"` — cámbialo por el link real de tu cuenta.

## Cuando quieras agregar pagos con tarjeta

El botón de WhatsApp está pensado como solución inmediata mientras tramitas tu cuenta comercial (Azul o CardNet, que son las pasarelas más usadas en RD). Cuando la tengas, se puede agregar un botón de pago junto al de WhatsApp sin tener que rehacer el resto del sitio — vuelve a escribirme cuando llegue ese momento.

## Estructura de archivos

```
truefragancia/
├── index.html          → estructura de la página
├── css/style.css        → todos los estilos
├── js/products.js       → tu catálogo (edítalo seguido)
├── js/script.js         → lógica del carrito y WhatsApp
├── assets/logo.png      → tu logo (reemplázalo)
└── assets/productos/    → fotos de tus perfumes (créala tú)
```
