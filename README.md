# alf.io - Sitio de presentación

Sitio web estático de presentación para [alf.io](https://github.com/alfio-event/alf.io), un sistema open source de gestión de eventos y venta de entradas.

El objetivo de esta página es resumir de forma visual qué es el proyecto, sus características principales, el stack tecnológico y la arquitectura general del software.

## Contenido

- Hero con llamada a la acción
- Sección “Acerca de”
- Características principales
- Stack tecnológico
- Arquitectura del sistema
- Flujo de trabajo de una reserva
- CTA final y footer

## Estructura del proyecto

- `index.html`: página principal
- `css/styles.css`: estilos globales
- `js/main.js`: comportamiento interactivo
- `assets/`: recursos gráficos y demás archivos estáticos

## Cómo ejecutarlo localmente

Como es un sitio estático, basta con abrir `index.html` en el navegador. Si prefieres servirlo con un servidor local, puedes usar por ejemplo:

```bash
python3 -m http.server 8000
```

Después abre `http://localhost:8000`.

## Despliegue

Este proyecto está pensado para publicarse en GitHub Pages, por lo que no requiere un proceso de build.

## Licencia

El contenido de este sitio se utiliza con fines académicos y de presentación del proyecto alf.io.
