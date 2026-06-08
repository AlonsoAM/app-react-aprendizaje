/**
 * Layout de la app autenticada.
 *
 * Navbar (PeriodoSwitcher + usuario + logout) + MenuSidebar + `<Outlet/>`.
 * Monta el refresh proactivo del token mientras el usuario está dentro.
 */

import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { usePeriodoStore } from '../../stores/periodoStore';
import { useTokenRefresh } from '../../hooks/useTokenRefresh';
import { SessionExpiryModal } from '../auth/SessionExpiryModal';
import { MenuSidebar } from './MenuSidebar';
import { PeriodoSwitcher } from './PeriodoSwitcher';

export function AppLayout() {
  useTokenRefresh();

  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const clearPeriodo = usePeriodoStore((s) => s.clear);

  const onLogout = (): void => {
    logout();
    clearPeriodo();
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
        <span className="font-semibold text-gray-900">Agro Comercial</span>
        <div className="flex items-center gap-4">
          <PeriodoSwitcher />
          {user && (
            <span className="hidden text-sm text-gray-600 sm:inline">
              {user.name?.trim() || user.descripcionPerfil}
            </span>
          )}
          <button
            type="button"
            onClick={onLogout}
            className="rounded-md px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <MenuSidebar />
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>

      <SessionExpiryModal />
    </div>
  );
}
