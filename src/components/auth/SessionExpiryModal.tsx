/**
 * Modal de expiración de sesión por inactividad.
 *
 * Usa `useIdleTimer`: cuando hay inactividad prolongada muestra una cuenta
 * regresiva. "Seguir activo" mantiene la sesión; "Cerrar sesión" o el fin de la
 * cuenta hacen logout (limpia auth + período y navega a /login).
 */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIdleTimer } from '../../hooks/useIdleTimer';
import { useAuthStore } from '../../stores/authStore';
import { usePeriodoStore } from '../../stores/periodoStore';

function formatMmSs(ms: number): string {
  const secs = Math.max(0, Math.ceil(ms / 1000));
  const mm = String(Math.floor(secs / 60)).padStart(2, '0');
  const ss = String(secs % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

export function SessionExpiryModal() {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const clearPeriodo = usePeriodoStore((s) => s.clear);

  const doLogout = useCallback((): void => {
    logout();
    clearPeriodo();
    navigate('/login', { replace: true });
  }, [logout, clearPeriodo, navigate]);

  const { isWarning, remainingMs, stayActive } = useIdleTimer({
    onTimeout: doLogout,
  });

  if (!isWarning) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="session-title"
        className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-xl"
      >
        <h2 id="session-title" className="text-lg font-semibold text-gray-900">
          ⚠ Tu sesión está por expirar
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Por inactividad, tu sesión se cerrará en:
        </p>
        <p className="my-4 text-4xl font-bold tabular-nums text-gray-900">
          {formatMmSs(remainingMs)}
        </p>
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={doLogout}
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cerrar sesión
          </button>
          <button
            type="button"
            onClick={stayActive}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Seguir activo
          </button>
        </div>
      </div>
    </div>
  );
}