/**
 * Guard de período activo.
 *
 * Ruta-layout que se anida dentro de `ProtectedRoute`: si no hay período activo
 * redirige a la selección de período; si lo hay, renderiza las rutas hijas.
 */

import { Navigate, Outlet } from 'react-router-dom';
import { selectHasPeriodo, usePeriodoStore } from '../../stores/periodoStore';

export function RequirePeriodo() {
  const hasPeriodo = usePeriodoStore(selectHasPeriodo);

  if (!hasPeriodo) {
    return <Navigate to="/seleccionar-periodo" replace />;
  }

  return <Outlet />;
}
