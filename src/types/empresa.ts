/**
 * Empresa (Grower) de AGROCOM V3.
 *
 * Origen: `GET api/Administracion/Grower/GetAll` (Grower = empresa/productor).
 * Alimenta el combo de empresa que dispara la carga de precios.
 *
 * ⚠️ El identificador de empresa es `string` (`EmpresaID:string` en el DTO del
 * módulo), por eso `growerID` es `string` y no `number`.
 */

/** Empresa tal como la consume el combo de selección. */
export interface Empresa {
  /** Identificador de la empresa. Value del combo y `EmpresaID` del filtro/DTO. */
  growerID: string;
  /** Razón social. Label visible en el combo. */
  businessName: string;
}
