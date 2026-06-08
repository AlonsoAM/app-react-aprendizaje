---
plan_version: 2
spec_ref: mantenimiento-maestra-precios-arandanos-spec.md
created: 2026-06-04
status: in_progress
total_tasks: 41
completed_tasks: 18
last_session: "2026-06-07 18:59"
last_completed_task: T2.5
next_pending_task: T3.1
sessions_count: 3
paused_reason: ""
---

# Plan de Implementación: Mantenimiento de Maestra de Precios Arándanos

> Basado en: mantenimiento-maestra-precios-arandanos-spec.md (rev. 4, aprobada)
> Fecha: 2026-06-04
> Estado: ⏳ Pendiente
> Tareas: 41 atómicas en 8 bloques

## Resumen
- **Total tareas atómicas:** 41
- **Prioridades:** 🔴 P0: 27 | 🟡 P1: 10 | 🟢 P2: 4
- **Bloques:** 0 Entorno → 1 Tipos → 2 API Client → 3 Stores/Hooks → 4 Componentes base → 5 Auth+Período+Layout → 6 Módulo Maestra Precios → 7 Calidad/Tests
- **Nota de aprendizaje:** cada bloque se explica pieza por pieza antes de codear (método híbrido). Mapea al ROADMAP-React.md.

## Tareas

### 🛠️ Bloque 0 — Entorno + Scaffold (Fase 0 del roadmap)
- [x] **T0.1**: Scaffold Vite `react-ts` en `app-react` `🔴 P0`
  - Comando: `npm create vite@latest . -- --template react-ts`
  - Depende de: ninguno
  - Rollback: borrar archivos generados
- [x] **T0.2**: `npm install` dependencias base `🔴 P0`
  - Depende de: T0.1
  - Rollback: borrar `node_modules`
- [x] **T0.3**: Instalar deps del stack (`react-router-dom`, `@tanstack/react-query`, `zustand`, `react-hook-form`, `zod`, `@hookform/resolvers`, `axios`) `🔴 P0`
  - Depende de: T0.2
  - Rollback: `npm uninstall ...`
- [x] **T0.4**: Integrar Tailwind v4 (`tailwindcss @tailwindcss/vite`, plugin en `vite.config.ts`, `@import "tailwindcss";` en `index.css`) `🔴 P0`
  - Archivo: `vite.config.ts`, `src/index.css`
  - Depende de: T0.2
  - Rollback: revertir archivos
- [x] **T0.5**: ESLint flat config + Prettier `🟡 P1`
  - Archivo: `eslint.config.js`, `.prettierrc`
  - Depende de: T0.2
  - Rollback: `git revert`
- [x] **T0.6**: `.env` con `VITE_API_BASE_URL=http://localhost:5000` + `.env.example` `🔴 P0`
  - Archivo: `.env`, `.env.example`
  - Depende de: T0.1
  - Rollback: borrar archivos
- [x] **T0.7**: Estructura de carpetas (`src/{api,components,pages,hooks,stores,types,config,lib}`) `🔴 P0`
  - Depende de: T0.1
  - Rollback: borrar carpetas
- [x] **T0.8**: Explicación archivo por archivo del scaffold (`index.html`→`main.tsx`→`App`, `createRoot`, `StrictMode`) `🟢 P2`
  - Depende de: T0.1
  - Rollback: N/A (didáctico)

### 📐 Bloque 1 — Tipos / Interfaces (Fase 3 del roadmap)
- [x] **T1.1**: `ApiResponse<T>` + `ErrorModel` `🔴 P0`
  - Archivo: `src/types/api.ts`
  - Depende de: T0.7
  - Rollback: `git revert`
- [x] **T1.2**: Tipos de auth (`AuthRequest`, `AuthResponse`, `MenuItem`) `🔴 P0`
  - Archivo: `src/types/auth.ts`
  - Depende de: T0.7
  - Rollback: `git revert`
- [x] **T1.3**: Tipo `Paginacion<T>` + filtro de paginación `🔴 P0`
  - Archivo: `src/types/pagination.ts`
  - Depende de: T0.7
  - Rollback: `git revert`
- [x] **T1.4**: Tipos de período y empresa (`PeriodoOperacion`, `Empresa`) `🔴 P0`
  - Archivo: `src/types/periodo.ts`, `src/types/empresa.ts`
  - Depende de: T0.7
  - Rollback: `git revert`
- [x] **T1.5**: Tipos del módulo (`MaestraPrecio`, DTOs I/U, filtro, combos `ComboItem`) `🔴 P0`
  - Archivo: `src/types/maestraPrecio.ts`
  - Depende de: T0.7
  - Rollback: `git revert`

### 🌐 Bloque 2 — API Client (Fase 5 del roadmap)
- [x] **T2.1**: Cliente HTTP base (axios `baseURL`, interceptor `Authorization: Bearer`, desempaque `ApiResponse`) `🔴 P0`
  - Archivo: `src/api/httpClient.ts`
  - Depende de: T1.1, T0.6
  - Rollback: `git revert`
- [x] **T2.2**: API de auth (`login` con password Base64, `refresh`) `🔴 P0`
  - Archivo: `src/api/authApi.ts`
  - Depende de: T2.1, T1.2
  - Rollback: `git revert`
- [x] **T2.3**: API de período + empresa (`GetAll`) `🔴 P0`
  - Archivo: `src/api/periodoApi.ts`, `src/api/empresaApi.ts`
  - Depende de: T2.1, T1.4
  - Rollback: `git revert`
- [x] **T2.4**: API del módulo (CRUD `Pagination/Find/Insert/Update/Delete`) `🔴 P0`
  - Archivo: `src/api/maestraPrecioApi.ts`
  - Depende de: T2.1, T1.5
  - Rollback: `git revert`
- [x] **T2.5**: API de combos (vías, mercados, métodos, calibres, consignatarios, marcas, presentaciones) `🔴 P0`
  - Archivo: `src/api/combosApi.ts`
  - Depende de: T2.1, T1.5
  - Rollback: `git revert`

### 🪝 Bloque 3 — Stores + Hooks (Fases 2 y 6 del roadmap)
- [ ] **T3.1**: `useAuthStore` (Zustand persist: token, refreshToken, expToken, user, menus) `🔴 P0`
  - Archivo: `src/stores/authStore.ts`
  - Depende de: T1.2
  - Rollback: `git revert`
- [ ] **T3.2**: `usePeriodoStore` (Zustand persist: período activo) `🔴 P0`
  - Archivo: `src/stores/periodoStore.ts`
  - Depende de: T1.4
  - Rollback: `git revert`
- [ ] **T3.3**: Hook de refresh proactivo de token (usa `expToken`) `🟡 P1`
  - Archivo: `src/hooks/useTokenRefresh.ts`
  - Depende de: T3.1, T2.2
  - Rollback: `git revert`
- [ ] **T3.4**: Hook de idle timeout + cuenta regresiva `🟡 P1`
  - Archivo: `src/hooks/useIdleTimer.ts`, `src/config/session.ts`
  - Depende de: T3.1
  - Rollback: `git revert`
- [ ] **T3.5**: Hooks TanStack Query de período y empresa `🔴 P0`
  - Archivo: `src/hooks/usePeriodos.ts`, `src/hooks/useEmpresas.ts`
  - Depende de: T2.3
  - Rollback: `git revert`
- [ ] **T3.6**: Hooks TanStack Query de combos `🔴 P0`
  - Archivo: `src/hooks/useCombos.ts`
  - Depende de: T2.5
  - Rollback: `git revert`
- [ ] **T3.7**: Hooks del módulo (`usePreciosPagination`, `usePrecio`, mutations insert/update/delete) `🔴 P0`
  - Archivo: `src/hooks/useMaestraPrecios.ts`
  - Depende de: T2.4
  - Rollback: `git revert`

### 🧩 Bloque 4 — Componentes base (Fase 1 del roadmap)
- [ ] **T4.1**: `QueryProvider` (QueryClient + provider) `🔴 P0`
  - Archivo: `src/lib/queryClient.tsx`
  - Depende de: T0.3
  - Rollback: `git revert`
- [ ] **T4.2**: `ComboField` (select tipado reutilizable) `🔴 P0`
  - Archivo: `src/components/ui/ComboField.tsx`
  - Depende de: T1.5
  - Rollback: `git revert`
- [ ] **T4.3**: `ConfirmDialog` (modal de confirmación) `🔴 P0`
  - Archivo: `src/components/ui/ConfirmDialog.tsx`
  - Depende de: T0.4
  - Rollback: `git revert`
- [ ] **T4.4**: Sistema de toasts (`useUiStore` + `Toaster`) `🟡 P1`
  - Archivo: `src/components/ui/Toaster.tsx`, `src/stores/uiStore.ts`
  - Depende de: T0.4
  - Rollback: `git revert`
- [ ] **T4.5**: Skeleton / Loading + Empty state reutilizables `🟡 P1`
  - Archivo: `src/components/ui/TableSkeleton.tsx`, `src/components/ui/EmptyState.tsx`
  - Depende de: T0.4
  - Rollback: `git revert`

### 🔐 Bloque 5 — Auth + Período + Layout (Fase 6 del roadmap)
- [ ] **T5.1**: `LoginPage` (RHF + Zod, password Base64, guarda sesión) `🔴 P0`
  - Archivo: `src/pages/LoginPage.tsx`
  - Depende de: T3.1, T2.2
  - Rollback: `git revert`
- [ ] **T5.2**: `ProtectedRoute` (guard de sesión) `🔴 P0`
  - Archivo: `src/components/auth/ProtectedRoute.tsx`
  - Depende de: T3.1
  - Rollback: `git revert`
- [ ] **T5.3**: `PeriodoSelectPage` (selección post-login, 2026 default) `🔴 P0`
  - Archivo: `src/pages/PeriodoSelectPage.tsx`
  - Depende de: T3.2, T3.5
  - Rollback: `git revert`
- [ ] **T5.4**: `RequirePeriodo` (guard de período activo) `🔴 P0`
  - Archivo: `src/components/auth/RequirePeriodo.tsx`
  - Depende de: T3.2
  - Rollback: `git revert`
- [ ] **T5.5**: `MenuSidebar` (menú dinámico recursivo desde `menus[]`) `🔴 P0`
  - Archivo: `src/components/layout/MenuSidebar.tsx`
  - Depende de: T3.1
  - Rollback: `git revert`
- [ ] **T5.6**: `PeriodoSwitcher` (selector de período en navbar) `🔴 P0`
  - Archivo: `src/components/layout/PeriodoSwitcher.tsx`
  - Depende de: T3.2, T3.5
  - Rollback: `git revert`
- [ ] **T5.7**: `AppLayout` (navbar + sidebar + Outlet) `🔴 P0`
  - Archivo: `src/components/layout/AppLayout.tsx`
  - Depende de: T5.5, T5.6
  - Rollback: `git revert`
- [ ] **T5.8**: `SessionExpiryModal` (cuenta regresiva por inactividad) `🟡 P1`
  - Archivo: `src/components/auth/SessionExpiryModal.tsx`
  - Depende de: T3.4
  - Rollback: `git revert`
- [ ] **T5.9**: `DashboardPage` (inicio post-login) `🟡 P1`
  - Archivo: `src/pages/DashboardPage.tsx`
  - Depende de: T5.7
  - Rollback: `git revert`

### 💰 Bloque 6 — Módulo Maestra de Precios (Fases 4 y 8 del roadmap)
- [ ] **T6.1**: Esquema Zod del formulario (mapeo Calibre/Mercado a string) `🔴 P0`
  - Archivo: `src/pages/maestra-precios/precioSchema.ts`
  - Depende de: T1.5
  - Rollback: `git revert`
- [ ] **T6.2**: `EmpresaSelect` (combo empresa que dispara carga) `🔴 P0`
  - Archivo: `src/pages/maestra-precios/EmpresaSelect.tsx`
  - Depende de: T3.5, T4.2
  - Rollback: `git revert`
- [ ] **T6.3**: `MaestraPreciosTable` (tabla paginada server-side + acciones) `🔴 P0`
  - Archivo: `src/pages/maestra-precios/MaestraPreciosTable.tsx`
  - Depende de: T3.7, T4.5
  - Rollback: `git revert`
- [ ] **T6.4**: `MaestraPrecioFormModal` (modal RHF/Zod + combos dependientes) `🔴 P0`
  - Archivo: `src/pages/maestra-precios/MaestraPrecioFormModal.tsx`
  - Depende de: T6.1, T3.6, T4.2
  - Rollback: `git revert`
- [ ] **T6.5**: `MaestraPreciosPage` (ensambla filtro + tabla + modal + delete) `🔴 P0`
  - Archivo: `src/pages/maestra-precios/MaestraPreciosPage.tsx`
  - Depende de: T6.2, T6.3, T6.4, T4.3
  - Rollback: `git revert`
- [ ] **T6.6**: Router (`/login`, `/seleccionar-periodo`, `/`, `/administracion/maestra-precios-arandanos`) `🔴 P0`
  - Archivo: `src/router.tsx`, `src/App.tsx`
  - Depende de: T5.1, T5.2, T5.3, T5.4, T5.7, T6.5
  - Rollback: `git revert`

### 🧪 Bloque 7 — Calidad / Tests (Fase 7 del roadmap)
- [ ] **T7.1**: Setup Vitest + Testing Library `🟡 P1`
  - Archivo: `vitest.config.ts`, `src/test/setup.ts`
  - Depende de: T0.2
  - Rollback: `git revert`
- [ ] **T7.2**: Tests del cliente API + manejo de `ApiResponse` `🟡 P1`
  - Archivo: `src/api/httpClient.test.ts`
  - Depende de: T7.1, T2.1
  - Rollback: `git revert`
- [ ] **T7.3**: Tests del formulario (Zod) + tabla `🟢 P2`
  - Archivo: `src/pages/maestra-precios/*.test.tsx`
  - Depende de: T7.1, T6.4
  - Rollback: `git revert`
- [ ] **T7.4**: Smoke E2E manual del flujo completo (login→período→CRUD) `🟢 P2`
  - Depende de: T6.6
  - Rollback: N/A

## Plan de Rollback Global
1. **Frontend:** `git revert` del commit/bloque afectado.
2. **Datos:** ninguno en el front. ⚠️ El CRUD impacta datos **reales** de AGROCOM — usar siempre la API en ambiente **dev/local**, nunca productivo, durante el aprendizaje.
3. **Punto sin retorno:** N/A.

## Registro de Ejecución
(A completar durante el Build — 1 fila por tarea atómica)

| Tarea | Estado | Fecha (Perú) | Notas |
|-------|--------|--------------|-------|
| T0.1 | ✅ | 2026-06-04 | Scaffold vía subcarpeta temporal (carpeta no vacía) y movido a app-react |
| T0.2 | ✅ | 2026-06-04 | 152 paquetes, 0 vulnerabilidades |
| T0.3 | ✅ | 2026-06-04 | RR7.17, TanStack Query 5.101, Zustand 5, RHF 7.77, Zod 4.4, axios; Tailwind v4.3 |
| T0.4 | ✅ | 2026-06-04 | Plugin @tailwindcss/vite + `@import "tailwindcss"`; demo limpiado; App.tsx mínimo |
| T0.5 | ✅ | 2026-06-04 | eslint.config.js del scaffold + Prettier (.prettierrc) + script format |
| T0.6 | ✅ | 2026-06-04 | .env y .env.example con VITE_API_BASE_URL |
| T0.7 | ✅ | 2026-06-04 | src/{api,components,pages,hooks,stores,types,config,lib} |
| T0.8 | ✅ | 2026-06-04 | Explicación del flujo index.html→main.tsx→App en el chat |
| T1.1 | ✅ | 2026-06-05 08:28 | `src/types/api.ts`: `ApiResponse<T>` genérico + `ErrorModel` (propertyName/errorMessage); campos nullable para strict |
| T1.2 | ✅ | 2026-06-05 08:28 | `src/types/auth.ts`: `AuthRequest` (pwd Base64), `RefreshRequest` ({token}), `MenuItem` (jerárquico), `AuthResponse` (token/refreshToken/expToken/user/menus) |
| T1.3 | ✅ | 2026-06-05 08:28 | `src/types/pagination.ts`: `Paginacion<T>` (cantidadTotal/paginaActual/totalPaginas/registrosPorPagina/listado) + `PaginationParams` base (nroPage/numberOfEntries/textSearch) |
| T1.4 | ✅ | 2026-06-07 18:16 | `src/types/periodo.ts`: `PeriodoOperacion` (id/descripcion/fechaInicio/fechaFin ISO string) + `PeriodoActivo` (subset {id,descripcion} para store global). `src/types/empresa.ts`: `Empresa` (growerID string + businessName); growerID es string por `EmpresaID:string` del DTO. `tsc --noEmit` OK |
| T1.5 | ✅ | 2026-06-07 18:19 | `src/types/maestraPrecio.ts`: `MaestraPrecio` (entidad, mercadoID/calibreID string\|null, empresaID string), `MaestraPrecioInsertDto` (Omit id), `MaestraPrecioUpdateDto` (=entidad), `MaestraPreciosFilter` (extends PaginationParams + periodoID/empresaID), `ComboItem` ({value:string\|number,label}), `CULTIVO_ID='BLU'`. Flag: nombres del row no documentados, confirmar en T2.4. `tsc --noEmit` OK. **Bloque 1 cerrado** |
| T2.1 | ✅ | 2026-06-07 18:37 | `src/api/httpClient.ts`: instancia axios (baseURL desde VITE_API_BASE_URL), interceptor request inyecta `Bearer` vía `setTokenGetter` (desacopla del store), interceptor response desempaca `ApiResponse<T>` (resuelve `data`, lanza `ApiError` en succeeded:false / error red). Clase `ApiError` (message/errors/status). Trabajado en **worktree** `feat/maestra-precios-arandanos`. `npm run build` OK |
| T2.2 | ✅ | 2026-06-07 18:41 | `src/api/authApi.ts`: `login(userName,password)` codifica password con `btoa` (Base64) y POST `/autentificacion`; `refresh(refreshToken)` POST `/actualizar-token` body `{token}`. Ambas resuelven `AuthResponse` (interceptor desempaca). Base64 vive en la capa API, no en UI. `npm run build` OK |
| T2.3 | ✅ | 2026-06-07 18:42 | `src/api/periodoApi.ts`: `getPeriodos()` GET `api/Administracion/PeriodoOperacion/GetAll` → `PeriodoOperacion[]`. `src/api/empresaApi.ts`: `getEmpresas()` GET `api/Administracion/Grower/GetAll` → `Empresa[]`. Combos globales. `npm run build` OK |
| T1.5↺ | ✅ | 2026-06-07 18:54 | **Revisión de T1.5 con shape real (API test):** el row de `Pagination` trae IDs + nombres resueltos (via/mercado/consignatario/presentacion/calibre/marca/metodoCultivo) + auditoría + `cultivoID`. Refactor: `MaestraPrecioBase` (campos escribibles) → `MaestraPrecio extends Base` (+ nombres + audit + id), `InsertDto=Base`, `UpdateDto=Base&{id}`. Corrige el `Omit` previo que filtraba nombres/audit a los DTOs. Flag de T1.5 cerrado. |
| T2.4 | ✅ | 2026-06-07 18:54 | `src/api/maestraPrecioApi.ts`: `getPagination(filter)` (mapea periodoID/empresaID→`PeriodoID`/`EmpresaID`) → `Paginacion<MaestraPrecio>`; `findById(id)`; `insert`/`update`/`remove` → `void` (UI invalida query y refresca). Base `api/MaestraPreciosArandano`. `npm run build` OK |
| T2.5 | ✅ | 2026-06-07 18:59 | `src/api/combosApi.ts`: `getVias/getMercados/getMetodosCultivo` (globales), `getCalibres/getMarcas` (cultivoID=BLU), `getConsignatarios(empresaID)`, `getPresentaciones(empresaID)` (cropID=BLU + filtro client-side). Mapper `toComboItem` tolerante a casing (id/Id, nombre/Nombre) → `ComboItem`. Flags abiertos: casing real de combos y mecanismo de filtro de consignatarios (confirmar al cablear form). `npm run build` OK. **Bloque 2 cerrado** |
