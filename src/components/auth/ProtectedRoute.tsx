/**
 * Guard de sesión.
 *
 * Ruta-layout: si no hay sesión activa redirige a `/login`; si la hay, renderiza
 * las rutas hijas vía `<Outlet/>`.
 */

import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAuthenticated, useAuthStore } from '../../stores/authStore';

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
