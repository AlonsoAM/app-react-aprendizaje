/**
 * Tipos del módulo Maestra de Precios Arándanos (cultivo fijo `BLU`).
 *
 * Backend AGROCOM V3 (`api/MaestraPreciosArandano/*`). Toda respuesta viaja
 * dentro de `ApiResponse<T>`; los listados como `ApiResponse<Paginacion<MaestraPrecio>>`.
 *
 * Shape confirmado contra la API test (2026-06-07): el row de `Pagination`
 * trae los IDs escribibles + los nombres resueltos por el backend
 * (via, mercado, …) + columnas de auditoría. Los DTOs de escritura solo
 * envían los IDs (los nombres los calcula el servidor).
 *
 * ⚠️ Tipos sensibles (spec L339): `mercadoID` y `calibreID` son `string`
 * (ej. `"AS "`, `"+18"`), no numéricos.
 */

import type { PaginationParams } from './pagination';

/** Cultivo fijo del módulo. */
export const CULTIVO_ID = 'BLU' as const;

/**
 * Campos escribibles del precio — lo que viaja en `Insert`/`Update`.
 * El backend resuelve los nombres y la auditoría a partir de estos IDs.
 */
export interface MaestraPrecioBase {
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
  /** Cultivo fijo `BLU`. */
  cultivoID: string;
}

/**
 * Fila devuelta por `Pagination` / `Find`: campos escribibles
 * + nombres resueltos por el backend (para mostrar en la tabla)
 * + columnas de auditoría.
 */
export interface MaestraPrecio extends MaestraPrecioBase {
  id: number;
  // Nombres resueltos por el backend (display en la tabla).
  via: string;
  mercado: string;
  consignatario: string;
  presentacion: string;
  calibre: string;
  marca: string;
  metodoCultivo: string;
  // Auditoría.
  creadoPor: number;
  fechaCreacion: string;
  actualizadoPor: number;
  fechaActualizacion: string;
}

/** Body de `POST Insert` — solo los campos escribibles (sin `id`). */
export type MaestraPrecioInsertDto = MaestraPrecioBase;

/** Body de `PUT Update` — campos escribibles con `id`. */
export type MaestraPrecioUpdateDto = MaestraPrecioBase & { id: number };

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
