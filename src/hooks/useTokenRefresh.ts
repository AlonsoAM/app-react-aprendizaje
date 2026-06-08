/**
 * Refresh proactivo del JWT.
 *
 * Programa la renovación del token ~60s antes de su expiración (`expToken`),
 * de forma que el usuario activo nunca queda con un token vencido. Tras renovar,
 * `setSession` actualiza `expToken` y el efecto se reprograma solo. Si el refresh
 * falla, cierra la sesión.
 *
 * Montar una vez dentro del área autenticada.
 */

import { useEffect } from 'react';
import { refresh as refreshApi } from '../api/authApi';
import { useAuthStore } from '../stores/authStore';

/** Margen previo a la expiración para renovar (ms). */
const REFRESH_SKEW_MS = 60_000;

export function useTokenRefresh(): void {
  const expToken = useAuthStore((s) => s.expToken);
  const refreshToken = useAuthStore((s) => s.refreshToken);
  const setSession = useAuthStore((s) => s.setSession);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    if (expToken == null || !refreshToken) return;

    let cancelled = false;
    const msUntilRefresh = expToken * 1000 - Date.now() - REFRESH_SKEW_MS;

    const run = async (): Promise<void> => {
      try {
        const auth = await refreshApi(refreshToken);
        if (!cancelled) setSession(auth);
      } catch {
        if (!cancelled) logout();
      }
    };

    const timer = setTimeout(run, Math.max(0, msUntilRefresh));
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [expToken, refreshToken, setSession, logout]);
}
