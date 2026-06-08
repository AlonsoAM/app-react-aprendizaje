/**
 * Hook de períodos de operación (TanStack Query).
 *
 * Envuelve `getPeriodos` con cache compartido (`queryKey: ['periodos']`).
 * `staleTime` alto porque los períodos cambian con muy poca frecuencia.
 */

import { useQuery } from '@tanstack/react-query';
import { getPeriodos } from '../api/periodoApi';
import type { PeriodoOperacion } from '../types/periodo';

/** Cache de datos casi estáticos: 1 hora antes de considerarse obsoleto. */
const STALE_TIME_MS = 60 * 60_000;

export function usePeriodos() {
  return useQuery<PeriodoOperacion[]>({
    queryKey: ['periodos'],
    queryFn: getPeriodos,
    staleTime: STALE_TIME_MS,
  });
}
