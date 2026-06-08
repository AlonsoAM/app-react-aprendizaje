/**
 * API de combos del módulo Maestra de Precios Arándanos.
 *
 * Normaliza los distintos shapes del backend a `ComboItem { value, label }`.
 * El mapper es tolerante al casing (`id`/`Id`, `nombre`/`Nombre`) porque el
 * casing real de estos endpoints no está confirmado (el row de Pagination vino
 * en camelCase, pero la spec documentó PascalCase) — así no se rompe en ninguno.
 *
 * Globales (staleTime alto): Vías, Mercados, Métodos de Cultivo.
 * Por cultivo `BLU`: Calibres, Marcas, Consignatarios.
 * Presentaciones: vienen por cultivo y se filtran client-side por `empresaID`.
 */

import { httpClient } from './httpClient';
import { CULTIVO_ID, type ComboItem } from '../types/maestraPrecio';

const BASE = 'api/MaestraPreciosArandano';

/** Combo crudo genérico: el backend puede devolver camelCase o PascalCase. */
interface RawCombo {
  id?: number;
  Id?: number;
  nombre?: string;
  Nombre?: string;
}

/** Presentación cruda (`api/PesosVGM/GetPresentations`). */
interface RawPresentacion {
  id?: number;
  Id?: number;
  presentacion?: string;
  Presentacion?: string;
  empresaID?: string;
  EmpresaID?: string;
}

/** Normaliza un combo crudo a `ComboItem`, tolerante al casing. */
function toComboItem(raw: RawCombo): ComboItem {
  return {
    value: raw.id ?? raw.Id ?? '',
    label: raw.nombre ?? raw.Nombre ?? '',
  };
}

async function fetchCombo(
  endpoint: string,
  params?: Record<string, string | number>,
): Promise<ComboItem[]> {
  const res = await httpClient.get<RawCombo[]>(`${BASE}/${endpoint}`, {
    params,
  });
  return res.data.map(toComboItem);
}

// --- Combos globales ---
export const getVias = (): Promise<ComboItem[]> => fetchCombo('GetVias');
export const getMercados = (): Promise<ComboItem[]> => fetchCombo('GetMercados');
export const getMetodosCultivo = (): Promise<ComboItem[]> =>
  fetchCombo('GetMetodosCultivo');

// --- Combos por cultivo BLU ---
export const getCalibres = (): Promise<ComboItem[]> =>
  fetchCombo('GetCalibres', { cultivoID: CULTIVO_ID });
export const getMarcas = (): Promise<ComboItem[]> =>
  fetchCombo('GetMarcas', { cultivoID: CULTIVO_ID });

/**
 * Consignatarios filtrados por cultivo `BLU` (y empresa si el backend lo usa).
 * `empresaID` se envía como query; ajustar si resulta ser filtrado client-side.
 */
export const getConsignatarios = (empresaID: string): Promise<ComboItem[]> =>
  fetchCombo('GetConsignatarios', { cultivoID: CULTIVO_ID, empresaID });

/**
 * Presentaciones del cultivo `BLU`, filtradas **client-side** por `empresaID`
 * (el endpoint devuelve todas las del cultivo; spec L335).
 */
export async function getPresentaciones(
  empresaID: string,
): Promise<ComboItem[]> {
  const res = await httpClient.get<RawPresentacion[]>(
    'api/PesosVGM/GetPresentations',
    { params: { cropID: CULTIVO_ID } },
  );
  return res.data
    .filter((p) => (p.empresaID ?? p.EmpresaID) === empresaID)
    .map((p) => ({
      value: p.id ?? p.Id ?? '',
      label: p.presentacion ?? p.Presentacion ?? '',
    }));
}
