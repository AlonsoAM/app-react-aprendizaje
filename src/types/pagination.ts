/**
 * Paginación server-side de AGROCOM V3.
 *
 * Los listados llegan como `ApiResponse<Paginacion<T>>`. El cliente envía
 * los `PaginationParams` (página, tamaño, búsqueda) por query string; cada
 * módulo extiende esos params con sus filtros propios (ej. EmpresaID/PeriodoID).
 */

/** Sobre paginado devuelto por los endpoints `.../Pagination`. */
export interface Paginacion<T> {
  cantidadTotal: number;
  paginaActual: number;
  totalPaginas: number;
  registrosPorPagina: number;
  /** Filas de la página actual. */
  listado: T[];
}

/** Parámetros base de paginación (comunes a todos los listados). */
export interface PaginationParams {
  /** Número de página (1-based). */
  nroPage: number;
  /** Registros por página. */
  numberOfEntries: number;
  /** Búsqueda textual server-side. Vacío = sin filtro. */
  textSearch: string;
}
