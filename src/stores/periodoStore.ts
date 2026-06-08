/**
 * Store global del período de operación activo (Zustand + persist).
 *
 * El período se elige una sola vez post-login y lo consumen todos los módulos
 * (su `id` es el `PeriodoID` de los filtros). Persiste en `localStorage`: en
 * sesiones posteriores se entra directo al dashboard sin volver a preguntar.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PeriodoActivo } from '../types/periodo';

interface PeriodoState {
  /** Período activo, o `null` si aún no se eligió. */
  periodo: PeriodoActivo | null;
  /** Fija el período activo. */
  setPeriodo: (periodo: PeriodoActivo) => void;
  /** Limpia el período (ej. al cerrar sesión). */
  clear: () => void;
}

export const usePeriodoStore = create<PeriodoState>()(
  persist(
    (set) => ({
      periodo: null,
      setPeriodo: (periodo) => set({ periodo }),
      clear: () => set({ periodo: null }),
    }),
    { name: 'periodo' },
  ),
);

/** Selector: `true` si ya hay un período activo. */
export const selectHasPeriodo = (s: PeriodoState): boolean => s.periodo !== null;
