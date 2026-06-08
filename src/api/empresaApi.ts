/**
 * API de empresas (Grower) AGROCOM V3.
 *
 * `GET api/Administracion/Grower/GetAll` → lista de empresas/productores para
 * el combo de empresa. El interceptor desempaca `ApiResponse<Empresa[]>`.
 */

import { httpClient } from './httpClient';
import type { Empresa } from '../types/empresa';

const ENDPOINT = 'api/Administracion/Grower/GetAll';

/** Trae todas las empresas (Grower). */
export async function getEmpresas(): Promise<Empresa[]> {
  const res = await httpClient.get<Empresa[]>(ENDPOINT);
  return res.data;
}
