/**
 * Selección de período de operación (post-login).
 *
 * Carga los períodos y pre-selecciona el del año 2026 (fallback: el primero).
 * Al confirmar, guarda el período en el store global y entra al dashboard.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePeriodos } from '../hooks/usePeriodos';
import { usePeriodoStore } from '../stores/periodoStore';

const DEFAULT_YEAR = 2026;

export function PeriodoSelectPage() {
  const navigate = useNavigate();
  const { data: periodos, isLoading, isError } = usePeriodos();
  const setPeriodo = usePeriodoStore((s) => s.setPeriodo);
  const [selectedId, setSelectedId] = useState<number | ''>('');

  useEffect(() => {
    if (!periodos?.length) return;
    const byYear = periodos.find(
      (p) => new Date(p.fechaInicio).getFullYear() === DEFAULT_YEAR,
    );
    const fallback = byYear ?? periodos[0];
    setSelectedId((prev) => (prev === '' ? fallback.id : prev));
  }, [periodos]);

  const onConfirm = (): void => {
    const sel = periodos?.find((p) => p.id === selectedId);
    if (!sel) return;
    setPeriodo({ id: sel.id, descripcion: sel.descripcion });
    navigate('/', { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm space-y-4 rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-center text-lg font-semibold text-gray-900">
          Selecciona el período de operación
        </h1>

        {isLoading && (
          <p className="text-center text-sm text-gray-500">Cargando períodos…</p>
        )}
        {isError && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            No se pudieron cargar los períodos.
          </p>
        )}

        {periodos && periodos.length > 0 && (
          <>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(Number(e.target.value))}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                outline-none focus:ring-2 focus:ring-blue-500"
            >
              {periodos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.descripcion}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={onConfirm}
              disabled={selectedId === ''}
              className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium
                text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Continuar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
