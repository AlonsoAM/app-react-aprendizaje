/**
 * Store global de autenticación (Zustand + persist).
 *
 * Persiste la sesión en `localStorage` para sobrevivir a recargas de página.
 * Además conecta el token con el `httpClient` vía `setTokenGetter`: cada
 * request lee el token vigente del store sin que el cliente importe el store
 * (cierra el desacople sembrado en T2.1).
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setTokenGetter } from '../api/httpClient';
import type { AuthResponse, MenuItem } from '../types/auth';

/** Datos del usuario que guardamos en sesión (subset de `AuthResponse`). */
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  empresa: string;
  perfil: number | null;
  descripcionPerfil: string;
}

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  /** Unix ts de expiración del JWT (base del refresh proactivo). */
  expToken: number | null;
  user: AuthUser | null;
  menus: MenuItem[];

  /** Inicia sesión con la respuesta del login. */
  login: (auth: AuthResponse) => void;
  /** Actualiza solo los tokens tras un refresh (rotación). */
  setSession: (auth: AuthResponse) => void;
  /** Limpia la sesión. */
  logout: () => void;
}

function toAuthUser(auth: AuthResponse): AuthUser {
  return {
    id: auth.id,
    name: auth.name,
    email: auth.email,
    empresa: auth.empresa,
    perfil: auth.perfil,
    descripcionPerfil: auth.descripcionPerfil,
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      expToken: null,
      user: null,
      menus: [],

      login: (auth) =>
        set({
          token: auth.token,
          refreshToken: auth.refreshToken,
          expToken: auth.expToken,
          user: toAuthUser(auth),
          menus: auth.menus,
        }),

      setSession: (auth) =>
        set({
          token: auth.token,
          refreshToken: auth.refreshToken,
          expToken: auth.expToken,
        }),

      logout: () =>
        set({
          token: null,
          refreshToken: null,
          expToken: null,
          user: null,
          menus: [],
        }),
    }),
    { name: 'auth' },
  ),
);

/** Selector simple de sesión activa. */
export const selectIsAuthenticated = (s: AuthState): boolean => s.token !== null;

// Conectar el token del store con el interceptor del httpClient (T2.1).
setTokenGetter(() => useAuthStore.getState().token);
