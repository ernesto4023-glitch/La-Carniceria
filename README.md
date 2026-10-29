# La Carnicería — menú digital de demostración

Aplicación web mobile-first en HTML, CSS y JavaScript, con catálogo JSON y almacenamiento local mediante `localStorage`.

## Cómo abrirla

1. Descomprime el archivo ZIP.
2. Para probar todas las funciones, inicia un servidor local desde esta carpeta. El PWA y el Service Worker no funcionan al abrir el archivo con `file://`.
3. En Visual Studio Code usa **Live Server** y abre la dirección local que genere. También puedes ejecutar `python -m http.server 8000` desde esta carpeta y visitar `http://localhost:8000`.
4. En un teléfono, abre la dirección publicada mediante HTTPS. En Android/Chrome utiliza el botón **Instalar app** cuando aparezca o el menú del navegador. En iPhone/iPad, abre el sitio en Safari, toca **Compartir** y elige **Añadir a pantalla de inicio**.

La aplicación incluye un catálogo de prueba y también un respaldo de los productos dentro de `js/app.js`, por lo que puede mostrar la interfaz incluso si el navegador bloquea `fetch()` al abrir `index.html` directamente con `file://`.

## Funciones incluidas

- Inicio visual con degradado rojo, blanco y fotografías de cortes.
- Menú por categorías: res, cerdo, pollo y embutidos.
- Búsqueda de productos y filtro por categoría.
- Cambio de precio y compra por **kilogramos (kg) o libras (lb)**.
- Conversión de peso para estimar el valor en pesos colombianos (1 lb = 0,45359237 kg).
- Carrito con cantidades editables, cambio de unidad por producto y cálculo de domicilio.
- Formulario de entrega y confirmación de pedido.
- Registro e inicio de sesión de prueba desde Perfil, con nombre, teléfono, dirección, barrio y contraseña.
- Una vez registrado, el formulario desaparece y el perfil muestra el estado de la cuenta.
- Historial de pedidos y persistencia local de carrito, cuentas, sesión, pedidos y favoritos.
- PWA instalable con manifiesto, iconos para pantalla de inicio, Service Worker y caché de recursos para abrir la interfaz sin conexión después de la primera carga.
- Botón de instalación compatible con navegadores que admiten el evento de instalación y guía de instalación para iOS.

## Persistencia y límites

Esta es una demostración frontend: el registro y el inicio de sesión son locales, no tienen backend ni constituyen autenticación real. No hay base de datos compartida ni pagos. Los datos permanecen en el almacenamiento local del navegador y no se sincronizan con otros dispositivos. Usa el botón **Reiniciar datos de prueba** del perfil para borrar los datos guardados.

Los precios del archivo `data/products.json` son valores ilustrativos y deben reemplazarse por los precios reales del negocio antes de publicar.
