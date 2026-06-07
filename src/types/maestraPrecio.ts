/**
 * Tipos del módulo Maestra de Precios Arándanos (cultivo fijo `BLU`).
 *
 * Backend AGROCOM V3 (`api/MaestraPreciosArandano/*`). Toda respuesta viaja
 * dentro de `ApiResponse<T>`; los listados como `ApiResponse<Paginacion<MaestraPrecio>>`.
 *
 * ⚠️ Tipos sensibles (spec L339): `mercadoID` y `calibreID` son `string | null`
 * aunque sus combos devuelvan `{ Id, Nombre }` numérico → mapear a string al enviar.
 */

import type { PaginationParams } from './pagination';

/** Cultivo fijo del módulo. */
export const CULTIVO_ID = 'BLU' as const;

/**
 * Precio de la maestra tal como lo devuelve `Find` / `Pagination`.
 *
 * ⚠️ Pendiente confirmar en T2.4: el listado del mockup muestra nombres
 * (Vía, Mercado, Consignatario…), pero el contrato solo documenta los IDs.
 * Si `Pagination` devuelve campos de nombre, agregarlos aquí al cablearlo.
 */
export interface MaestraPrecio {
  id: number;
  viaID: number;
  mercadoID: string | null;
  consignatarioID: number;
  presentacionID: number;
  calibreID: string | null;
  marcaID: number;
  precio: number;
  metodoCultivoID: number;
  periodoID: number;
  empresaID: string;
  estadoID: number;
}

/** Body de `POST Insert` — la entidad sin `id` (lo genera el backend). */
export type MaestraPrecioInsertDto = Omit<MaestraPrecio, 'id'>;

/** Body de `PUT Update` — la entidad completa con `id`. */
export type MaestraPrecioUpdateDto = MaestraPrecio;

/**
 * Query de `GET Pagination`.
 * Extiende la paginación base (T1.3) con los filtros del módulo:
 * `periodoID` del contexto global + `empresaID` del combo.
 */
export interface MaestraPreciosFilter extends PaginationParams {
  periodoID: number;
  empresaID: string;
}

/**
 * Item normalizado de combo que consume la UI.
 *
 * El API client mapea los shapes crudos del backend
 * (`{ Id, Nombre }`, `{ growerID, businessName }`, `{ Id, Presentacion }`)
 * a esta forma uniforme. `value` es `string | number` porque la empresa
 * (`growerID`) es string y el resto numérico.
 */
export interface ComboItem {
  value: string | number;
  label: string;
}
