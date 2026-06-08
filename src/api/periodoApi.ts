/**
 * API de períodos de operación AGROCOM V3.
 *
 * `GET api/Administracion/PeriodoOperacion/GetAll` → lista de períodos para el
 * selector global. El interceptor desempaca `ApiResponse<PeriodoOperacion[]>`.
 */

import { httpClient } from './httpClient';
import type { PeriodoOperacion } from '../types/periodo';

const ENDPOINT = 'api/Administracion/PeriodoOperacion/GetAll';

/** Trae todos los períodos de operación. */
export async function getPeriodos(): Promise<PeriodoOperacion[]> {
  const res = await httpClient.get<PeriodoOperacion[]>(ENDPOINT);
  return res.data;
}
