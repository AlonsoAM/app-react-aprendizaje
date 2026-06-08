/**
 * Página de inicio post-login.
 *
 * Saluda al usuario, muestra el período activo y ofrece un atajo al módulo
 * de Maestra de Precios.
 */

import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { usePeriodoStore } from '../stores/periodoStore';

export function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const periodo = usePeriodoStore((s) => s.periodo);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Hola{user?.name?.trim() ? `, ${user.name.trim()}` : ''} 👋
        </h1>
        <p className="text-sm text-gray-600">
          Período activo: <strong>{periodo?.descripcion ?? '—'}</strong>
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="font-medium text-gray-900">Maestra de Precios Arándanos</h2>
        <p className="mt-1 text-sm text-gray-600">
          Administra los precios por empresa, vía, mercado y más.
        </p>
        <Link
          to="/administracion/maestra-precios-arandanos"
          className="mt-3 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm
            font-medium text-white hover:bg-blue-700"
        >
          Ir al módulo
        </Link>
      </div>
    </div>
  );
}
