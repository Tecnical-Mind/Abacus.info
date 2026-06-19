# Abacus.AI · Análisis de Privacidad & Seguridad

Reporte web interactivo con análisis crítico de la política de privacidad y seguridad de Abacus.AI (Junio 2026).

## Stack

- HTML5 semántico
- CSS3 custom properties (sin frameworks)
- JavaScript vanilla (sin dependencias)
- Google Fonts — IBM Plex Mono + IBM Plex Sans

## Estructura

```
abacus-security-report/
├── index.html          # Aplicación principal
├── css/
│   └── styles.css      # Design system completo
├── js/
│   └── app.js          # Navegación, acordeones, animaciones
├── vercel.json         # Config deploy Vercel
└── README.md
```

## Deploy en Vercel

1. Subí el repositorio a GitHub
2. Conectá el repo en [vercel.com](https://vercel.com)
3. Framework: **Other** (sitio estático)
4. Deploy automático — no requiere build step

## Deploy manual con Vercel CLI

```bash
npm i -g vercel
cd abacus-security-report
vercel
```

## Features

- 🌑 Dark theme con estética cybersecurity
- 📱 Responsive (mobile-first)
- ⌨️ Navegación por teclado (flechas entre tabs)
- 🎞 Acordeones animados por issue
- 📊 Barras de progreso con animación on-scroll
- 🔢 Contadores animados
- 🖨️ Print-friendly (CSS @media print)
- ⚡ Sin dependencias externas de JS

## Secciones

| Tab | Contenido |
|---|---|
| **Privacidad** | 13 problemas críticos + tabla comparativa + recomendaciones |
| **Seguridad** | 10 gaps vs. estándar enterprise + métricas + recomendaciones |
| **Resumen** | Score por categoría + hallazgos clave + veredicto |

---

> Análisis basado en políticas públicas de Abacus.AI (junio 2026).  
> No constituye asesoramiento legal. Consultá a un profesional para decisiones vinculantes.
