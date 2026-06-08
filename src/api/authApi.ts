/**
 * API de autenticación AGROCOM V3.
 *
 * Envuelve los endpoints de sesión sobre {@link httpClient}:
 *  - `login`: `POST /autentificacion` (password en Base64).
 *  - `refresh`: `POST /actualizar-token` (rota el refreshToken).
 *
 * El desempaque de `ApiResponse<AuthResponse>` lo hace el interceptor del
 * cliente, por eso estas funciones resuelven `AuthResponse` directo.
 */

import { httpClient } from './httpClient';
import type { AuthRequest, AuthResponse, RefreshRequest } from '../types/auth';

const ENDPOINTS = {
  login: '/autentificacion',
  refresh: '/actualizar-token',
} as const;

/**
 * Inicia sesión. La contraseña se codifica a Base64 aquí (la capa de UI la
 * pasa en claro). Devuelve la sesión completa (token, refreshToken, menús…).
 */
export async function login(
  userName: string,
  password: string,
): Promise<AuthResponse> {
  const body: AuthRequest = {
    userName,
    password: btoa(password),
  };
  const res = await httpClient.post<AuthResponse>(ENDPOINTS.login, body);
  return res.data;
}

/**
 * Renueva la sesión con el refreshToken vigente (refresh proactivo).
 * El backend rota el refreshToken: usar el nuevo a partir de aquí.
 */
export async function refresh(refreshToken: string): Promise<AuthResponse> {
  const body: RefreshRequest = { token: refreshToken };
  const res = await httpClient.post<AuthResponse>(ENDPOINTS.refresh, body);
  return res.data;
}
