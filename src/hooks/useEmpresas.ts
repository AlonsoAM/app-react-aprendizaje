/**
 * Hook de empresas (TanStack Query).
 *
 * Envuelve `getEmpresas` con cache compartido (`queryKey: ['empresas']`).
 * `staleTime` alto: el catálogo de empresas cambia con poca frecuencia.
 */

import { useQuery } from '@tanstack/react-query';
import { getEmpresas } from '../api/empresaApi';
import type { Empresa } from '../types/empresa';

/** Cache de datos casi estáticos: 1 hora antes de considerarse obsoleto. */
const STALE_TIME_MS = 60 * 60_000;

export function useEmpresas() {
  return useQuery<Empresa[]>({
    queryKey: ['empresas'],
    queryFn: getEmpresas,
    staleTime: STALE_TIME_MS,
  });
}
