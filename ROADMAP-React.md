# 🗺️ Roadmap — Aprendizaje de React Web Empresarial

> **Objetivo:** Aprender React web empresarial al 100% para migrar los fronts de los sistemas de Alonso (Agro Comercial + SAP) a React. Método **híbrido**: un proyecto empresarial real como hilo conductor, con teoría justo antes de cada bloque y aplicada de inmediato.

## 🎯 Principios

- **Entender el flujo, no copiar a ciegas.** Cada archivo y cada decisión se explica.
- **Código ordenado, escalable y mantenible** desde la línea 1.
- **Una sola forma de hacer cada cosa.** Convenciones fijas, no improvisar.
- Alonso ya maneja **TypeScript y SPAs** (Angular/Vue) → se saltan los básicos.
- Después de React web → **React Native**.

## 🧱 Stack objetivo (lo más actual, enero 2026)

| Capa | Elección | Por qué |
|------|----------|---------|
| Build | **Vite** | SPA que consume APIs .NET. Rápido, estándar. |
| Core | **React 19** | Actions, `use()`, mejoras de Suspense |
| Lenguaje | **TypeScript** strict | Innegociable para empresarial |
| Estilos | **Tailwind v4** | Config CSS-first (`@theme`), sin `tailwind.config.js` |
| Routing | **React Router v7** | Estándar maduro empresarial |
| Server state | **TanStack Query v5** | Cache/fetch de APIs — clave |
| Estado global | **Zustand** | Simple, escalable |
| Forms | **React Hook Form + Zod** | Validación tipada, estándar pro |
| Tests | **Vitest + Testing Library + Playwright** | Unit + E2E |
| Calidad | **ESLint flat config + Prettier** | Orden y consistencia automática |

## 📚 Roadmap (8 fases, sin prisa)

- [ ] **Fase 0 — Entorno + scaffold limpio.** Vite + TS strict + Tailwind v4 + ESLint/Prettier. Entender cada archivo, nada de magia.
- [ ] **Fase 1 — Modelo mental React.** Render, reconciliación, *por qué* re-renderiza. Componentes, props, `children`, composición.
- [ ] **Fase 2 — Hooks a fondo.** `useState`, `useEffect` (y cuándo NO usarlo), `useRef`, `useMemo`/`useCallback`, custom hooks. Reglas y trampas.
- [ ] **Fase 3 — TS + React patterns.** Tipar props/eventos, genéricos en componentes, discriminated unions, `as const`.
- [ ] **Fase 4 — Arquitectura escalable.** Feature-Sliced Design / feature-based folders. Separación UI / lógica / datos.
- [ ] **Fase 5 — Datos.** TanStack Query: fetch, cache, mutations, estados loading/error. Conectar a API real.
- [ ] **Fase 6 — Estado global + routing + forms.** Zustand, React Router v7, RHF + Zod.
- [ ] **Fase 7 — Calidad.** Tests, performance (code splitting, lazy), accesibilidad, patrones de error.
- [ ] **Fase 8 — Proyecto integrador.** Módulo CRUD empresarial completo (estilo Agro Comercial) aplicando todo.

## 📌 Estado actual

**2026-06-04 — En Fase 0.**
- Node 24.16 / npm 11.13 verificados.
- Carpeta de trabajo: `AprendizajeReact/app-react`.
- Pendiente: cerrar el **dominio concreto** de la app empresarial (la spec) antes del scaffold.

### Próximos pasos Fase 0
1. Cerrar dominio + spec del proyecto (`.specs/`).
2. Scaffold `npm create vite@latest . -- --template react-ts`.
3. `npm install`.
4. Integrar Tailwind v4 (`tailwindcss @tailwindcss/vite`, plugin en `vite.config.ts`, `@import "tailwindcss";` en `index.css`).
5. ESLint flat config + Prettier.
6. Explicación archivo por archivo del scaffold (`index.html` → `main.tsx` → `App`, `createRoot` en `#root`, `StrictMode`).
