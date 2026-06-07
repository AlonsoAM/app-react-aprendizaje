/**
 * Período de operación de AGROCOM V3.
 *
 * Origen: `GET api/Administracion/PeriodoOperacion/GetAll`.
 * El período activo se elige post-login y se guarda en el contexto global
 * (`usePeriodoStore`); todos los módulos consumen su `id` como `PeriodoID`.
 */

/** Período de operación tal como lo devuelve la API. */
export interface PeriodoOperacion {
  /** Identificador del período. Es el `PeriodoID` global que consumen los módulos. */
  id: number;
  /** Texto visible en el selector (ej. "Campaña 2026"). */
  descripcion: string;
  /** Fecha de inicio en ISO 8601 (string del JSON, no `Date`). */
  fechaInicio: string;
  /** Fecha de fin en ISO 8601 (string del JSON, no `Date`). */
  fechaFin: string;
}

/**
 * Período activo persistido en el store global.
 * Subconjunto de {@link PeriodoOperacion} con lo mínimo para la UI.
 */
export interface PeriodoActivo {
  id: number;
  descripcion: string;
}
