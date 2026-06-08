/**
 * API CRUD del módulo Maestra de Precios Arándanos.
 *
 * Endpoints bajo `api/MaestraPreciosArandano/`. El interceptor desempaca
 * `ApiResponse<T>`, por eso cada función resuelve su payload directo.
 *
 * `Pagination`/`Find` devuelven `MaestraPrecio` (IDs + nombres resueltos por el
 * backend). `Insert`/`Update`/`Delete` resuelven `void`: el éxito se infiere
 * (sin `ApiError`) y la UI refresca el listado invalidando la query.
 */

import { httpClient } from './httpClient';
import type { Paginacion } from '../types/pagination';
import type {
  MaestraPrecio,
  MaestraPrecioInsertDto,
  MaestraPrecioUpdateDto,
  MaestraPreciosFilter,
} from '../types/maestraPrecio';

const BASE = 'api/MaestraPreciosArandano';

/**
 * Listado paginado. Mapea el filtro interno (camelCase) al casing que espera
 * la API (`PeriodoID`/`EmpresaID` en mayúsculas).
 */
export async function getPagination(
  filter: MaestraPreciosFilter,
): Promise<Paginacion<MaestraPrecio>> {
  const res = await httpClient.get<Paginacion<MaestraPrecio>>(
    `${BASE}/Pagination`,
    {
      params: {
        nroPage: filter.nroPage,
        numberOfEntries: filter.numberOfEntries,
        textSearch: filter.textSearch,
        PeriodoID: filter.periodoID,
        EmpresaID: filter.empresaID,
      },
    },
  );
  return res.data;
}

/** Trae un precio por id (prefill del modal de edición). */
export async function findById(id: number): Promise<MaestraPrecio> {
  const res = await httpClient.get<MaestraPrecio>(`${BASE}/Find`, {
    params: { id },
  });
  return res.data;
}

/** Crea un precio (body sin `id`). */
export async function insert(dto: MaestraPrecioInsertDto): Promise<void> {
  await httpClient.post(`${BASE}/Insert`, dto);
}

/** Actualiza un precio (body con `id`). */
export async function update(dto: MaestraPrecioUpdateDto): Promise<void> {
  await httpClient.put(`${BASE}/Update`, dto);
}

/** Elimina un precio (baja lógica en el backend). */
export async function remove(id: number): Promise<void> {
  await httpClient.delete(`${BASE}/Delete`, { params: { id } });
}
