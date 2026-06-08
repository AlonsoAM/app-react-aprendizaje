/**
 * Hooks del módulo Maestra de Precios (TanStack Query).
 *
 * Lectura: `usePreciosPagination` (listado, no pide sin empresa) y `usePrecio`
 * (prefill de edición). Escritura: mutations insert/update/delete que invalidan
 * el cache del listado en `onSuccess` → la tabla refresca sola.
 */

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  findById,
  getPagination,
  insert,
  remove,
  update,
} from '../api/maestraPrecioApi';
import type {
  MaestraPrecio,
  MaestraPrecioInsertDto,
  MaestraPrecioUpdateDto,
  MaestraPreciosFilter,
} from '../types/maestraPrecio';
import type { Paginacion } from '../types/pagination';

/** Raíz del cache del módulo (para invalidar todo el listado de una). */
const ROOT_KEY = ['maestraPrecios'] as const;

/** Listado paginado. No se ejecuta hasta que hay empresa seleccionada. */
export function usePreciosPagination(filter: MaestraPreciosFilter) {
  return useQuery<Paginacion<MaestraPrecio>>({
    queryKey: [...ROOT_KEY, 'list', filter],
    queryFn: () => getPagination(filter),
    enabled: !!filter.empresaID,
    placeholderData: keepPreviousData,
  });
}

/** Un precio por id (prefill del modal de edición). */
export function usePrecio(id: number | null) {
  return useQuery<MaestraPrecio>({
    queryKey: [...ROOT_KEY, 'detail', id],
    queryFn: () => findById(id as number),
    enabled: !!id,
  });
}

/** Crea un precio e invalida el listado. */
export function useInsertPrecio() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: MaestraPrecioInsertDto) => insert(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: ROOT_KEY }),
  });
}

/** Actualiza un precio e invalida el listado. */
export function useUpdatePrecio() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: MaestraPrecioUpdateDto) => update(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: ROOT_KEY }),
  });
}

/** Elimina un precio (baja lógica) e invalida el listado. */
export function useDeletePrecio() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ROOT_KEY }),
  });
}
