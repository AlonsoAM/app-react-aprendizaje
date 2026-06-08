/**
 * Hooks de combos del módulo (TanStack Query).
 *
 * Globales y por-cultivo (`BLU` fijo) tienen `staleTime` alto. Los combos
 * dependientes de empresa (consignatarios, presentaciones) incluyen `empresaID`
 * en el `queryKey` y solo se piden cuando hay empresa (`enabled`).
 */

import { useQuery } from '@tanstack/react-query';
import {
  getCalibres,
  getConsignatarios,
  getMarcas,
  getMercados,
  getMetodosCultivo,
  getPresentaciones,
  getVias,
} from '../api/combosApi';
import type { ComboItem } from '../types/maestraPrecio';

/** Combos de catálogo casi estático: 1 hora. */
const STALE_TIME_MS = 60 * 60_000;

// --- Globales ---
export function useVias() {
  return useQuery<ComboItem[]>({
    queryKey: ['combos', 'vias'],
    queryFn: getVias,
    staleTime: STALE_TIME_MS,
  });
}

export function useMercados() {
  return useQuery<ComboItem[]>({
    queryKey: ['combos', 'mercados'],
    queryFn: getMercados,
    staleTime: STALE_TIME_MS,
  });
}

export function useMetodosCultivo() {
  return useQuery<ComboItem[]>({
    queryKey: ['combos', 'metodosCultivo'],
    queryFn: getMetodosCultivo,
    staleTime: STALE_TIME_MS,
  });
}

// --- Por cultivo BLU ---
export function useCalibres() {
  return useQuery<ComboItem[]>({
    queryKey: ['combos', 'calibres'],
    queryFn: getCalibres,
    staleTime: STALE_TIME_MS,
  });
}

export function useMarcas() {
  return useQuery<ComboItem[]>({
    queryKey: ['combos', 'marcas'],
    queryFn: getMarcas,
    staleTime: STALE_TIME_MS,
  });
}

// --- Dependientes de empresa ---
export function useConsignatarios(empresaID: string | null) {
  return useQuery<ComboItem[]>({
    queryKey: ['combos', 'consignatarios', empresaID],
    queryFn: () => getConsignatarios(empresaID as string),
    enabled: !!empresaID,
    staleTime: STALE_TIME_MS,
  });
}

export function usePresentaciones(empresaID: string | null) {
  return useQuery<ComboItem[]>({
    queryKey: ['combos', 'presentaciones', empresaID],
    queryFn: () => getPresentaciones(empresaID as string),
    enabled: !!empresaID,
    staleTime: STALE_TIME_MS,
  });
}
