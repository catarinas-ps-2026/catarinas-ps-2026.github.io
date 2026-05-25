# Contexto del Proyecto: alf.io

## ¿Qué es alf.io?

**alf.io** es un sistema de gestión de eventos y venta de entradas (ticket reservation system) de **código abierto** (GPL v3). Está diseñado para organizadores de eventos que valoran la **privacidad, seguridad y precios justos**, sin comisiones ocultas ni dependencia de plataformas externas.

- Repositorio oficial: [github.com/alfio-event/alf.io](https://github.com/alfio-event/alf.io)
- Versión actual: 2.0-M6-SNAPSHOT (pre-release hacia v2.0)
- Licencia: GNU General Public License v3.0

---

## Stack Tecnológico

### Backend
| Tecnología | Propósito |
|---|---|
| **Java 17** | Lenguaje runtime |
| **Spring Boot 3.5.14** | Framework de aplicación |
| **Spring MVC** | Framework web |
| **Spring Security** | Autenticación y autorización |
| **PostgreSQL** | Base de datos principal |
| **Flyway** | Migraciones de BD |
| **Mustache (jmustache)** | Templates HTML server-side |
| **OpenHTMLtoPDF** | Generación de PDF (facturas, tickets) |
| **ZXing** | Generación de códigos QR |
| **Rhino Runtime** | Sistema de extensiones vía JavaScript |

### Frontend
| Tecnología | Propósito |
|---|---|
| **Angular 17** | SPA pública (compra de entradas) |
| **Lit 3 + Shoelace** | Admin frontend (Web Components) |
| **Vite** | Build tool del admin |
| **TypeScript / SCSS** | Lenguaje y estilos |
| **pnpm** | Gestor de paquetes |

### DevOps
- **Gradle** (build system)
- **Docker** (multi-stage, jlink, CDS)
- **GitHub Actions** (CI/CD)
- **SonarCloud** (calidad de código)
- **Hugo + Docsy** (sitio de documentación)

---

## Arquitectura

alf.io sigue una **arquitectura monolítica Spring Boot** con capas bien definidas:

1. **Capa de Presentación** (Controllers) — `alfio.controller.*`
2. **Capa de Negocio** (Managers) — `alfio.manager.*`
3. **Capa de Acceso a Datos** (Repositories) — `alfio.repository.*`
4. **Modelo de Dominio** — `alfio.model.*`
5. **Configuración** — `alfio.config.*`

### Flujo de una Reserva (ejemplo)
1. Usuario visita `https://tickets.example.com/event/miconf`
2. El SPA Angular carga y obtiene datos del evento vía API
3. Usuario selecciona tickets, completa información
4. Se crea una reserva (POST a `/api/v2/public/...`)
5. Usuario es redirigido al pago (Stripe/PayPal/etc.)
6. Webhook de pago confirma la transacción
7. Se generan los tickets con códigos QR
8. Se envía email de confirmación
9. Tickets disponibles en Apple Wallet / Google Wallet

---

## Características Principales

### Gestión de Eventos
- Eventos **presenciales**, **en línea** e **híbridos**
- Múltiples **categorías de tickets** (Early Bird, General, VIP)
- **Cupos limitados** y **precios especiales** (códigos promocionales)
- **Campos personalizados** para datos del asistente
- Soporte **multilenguaje** (20+ idiomas)

### Sistema de Reservas
- Flujo tipo carrito de compras
- **Tiempo de expiración** de reservas
- **Lista de espera** para eventos agotados
- **Transferencia de tickets** a otras personas
- **Pases para Apple Wallet y Google Wallet**
- **Carga masiva** de tickets vía CSV

### Pagos
- **Stripe**, **PayPal**, **Mollie** (iDEAL), **Saferpay**
- **Transferencia bancaria**
- **Pago en sitio** (en el evento)
- **Reembolsos** vía proveedores soportados
- **3D Secure / SCA**

### Facturación
- Generación automática de **facturas en PDF**
- Soporte **IVA** (incluido/excluido, reverse charge, UE)
- **Factura electrónica italiana**
- Múltiples modos de manejo de IVA

### Sistema de Extensiones
- Extensiones vía **JavaScript** (Rhino)
- Hooks en: `RESERVATION_CONFIRMED`, `RESERVATION_EXPIRED`, `TICKET_ASSIGNED`, `EVENT_CREATED`, etc.
- Acceso a HTTP client, logging y parámetros de extensión

### Notificaciones
- Múltiples **mailers**: SMTP, SendGrid, Mailgun, Mailjet
- **Plantillas MJML** (emails responsivos)
- Categorías: confirmación, asignación, recordatorios

### Seguridad
- Spring Security con **OpenID Connect**
- **PostgreSQL Row-Level Security** (multi-tenancy)
- Contraseñas con **BCrypt**
- **CAPTCHA** para login
- **CSP headers** (Content Security Policy)

### Suscripciones
- Pases de temporada / membresías
- Asignación automática de tickets a suscriptores
- Múltiples modelos de validez

---

## Jobs Programados

Todos los jobs se ejecutan in-process (Spring `@Scheduled`):
- `sendEmails` — cada 5s
- `processReservationRequests` — cada 5s
- `cleanupExpiredPendingReservation` — cada 30s
- `processReleasedTickets` (waiting queue) — cada 30s
- `cleanupUnreferencedBlobFiles` — cada 60min
- `sendOfflinePaymentReminder` — cada 30min
- `assignTicketsToSubscribers` — cada 60min

---

## Integraciones

| Integración | Tipo |
|---|---|
| Stripe | Pasarela de pago |
| PayPal | Pasarela de pago |
| Mollie | Pasarela de pago (iDEAL, Connect) |
| Saferpay | Pasarela de pago (Tarjeta) |
| Revolut | Transferencia bancaria (beta) |
| Apple Wallet | Pases de ticket |
| Google Wallet | Pases de ticket |
| OpenID Connect | Autenticación |
| SendGrid / Mailgun / Mailjet | Email transaccional |
| Google Maps | Mapas de ubicación |
| reCAPTCHA | Seguridad |

---

## Perfiles de Configuración

| Profile | Propósito |
|---|---|
| `dev` | Desarrollo |
| `demo` | Demo (crea admin automáticamente) |
| `live` | Producción |
| `openid` | Habilita OpenID Connect |
| `disable-jobs` | Desactiva jobs programados |
| `jdbc-session` | Sesiones persistentes en BD |
| `integration-test` | Tests de integración |

---

## Despliegue

- **Docker** (imágenes oficiales en Docker Hub y ghcr.io)
- **Heroku**
- **Cloud Foundry**
- **Clever Cloud**
- **Kubernetes** (healthz endpoint, graceful shutdown)

*Documentación generada a partir del repositorio alf.io para el proyecto de presentación de producto de software.*
