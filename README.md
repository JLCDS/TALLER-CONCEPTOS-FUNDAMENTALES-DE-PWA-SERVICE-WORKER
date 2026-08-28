# Taller – Conceptos Fundamentales de PWA – Service Worker

**Electiva III - PWA**  
Universidad Pedagógica y Tecnológica de Colombia (UPTC)  
Facultad de Ingeniería – Escuela de Ingeniería de Sistemas

## Descripción

Este proyecto corresponde al taller práctico sobre **Service Workers**, desarrollado como parte de la electiva de Aplicaciones Web Progresivas (PWA). A partir de un Service Worker base creado en clase, se implementan las siguientes funcionalidades:

- **Imágenes SVG aleatorias**: al hacer clic sobre una imagen de animal, el Service Worker intercepta la petición y devuelve de forma aleatoria una de las otras imágenes disponibles.
- **Nuevas funcionalidades mediante eventos `fetch`**: se añaden al menos dos comportamientos adicionales que interceptan y manejan peticiones de red.
- **Ciclo de vida del Service Worker**: se documenta el comportamiento observado en la pestaña *Application* de DevTools (`installing`, `waiting`, `activated`, `running`), así como el proceso necesario para activar una nueva versión del worker.
- **Alcance (scope) del Service Worker**: análisis de por qué el Service Worker no controla el `index.html` ubicado en la raíz del sitio cuando está registrado en una subcarpeta, y exploración de la posibilidad de establecer un scope "hacia arriba".

## Tecnologías utilizadas

- HTML5, CSS3, JavaScript
- Service Workers API
- SVG

## Integrantes

- Andres Barrera
- Sebastian Arias
- Juan López
