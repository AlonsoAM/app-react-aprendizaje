/**
 * Contrato base de la API AGROCOM V3.
 *
 * TODA respuesta del backend viene envuelta en este sobre. El cliente HTTP
 * (ver `src/api/httpClient.ts`) lo desempaca en una sola capa: chequea
 * `succeeded` y devuelve `data` ya tipado al resto de la app.
 */

/** Error de validación/negocio devuelto por el backend (FluentValidation). */
export interface ErrorModel {
  /** Nombre de la propiedad del DTO que falló (ej. "Precio"). */
  propertyName: string;
  /** Mensaje legible del error. */
  errorMessage: string;
}

/** Sobre estándar de respuesta. `T` es el tipo del payload útil (`data`). */
export interface ApiResponse<T> {
  /** `true` si la operación fue exitosa. Si es `false`, revisar `message`/`errors`. */
  succeeded: boolean;
  /** Mensaje general (éxito o error de negocio). `null` cuando no aplica. */
  message: string | null;
  /** Errores de validación por campo. `null` cuando no hay. */
  errors: ErrorModel[] | null;
  /** Payload útil. `null` en errores o respuestas sin cuerpo. */
  data: T | null;
}
