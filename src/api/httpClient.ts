/**
 * Cliente HTTP base de AGROCOM V3.
 *
 * Instancia única de axios que reusan todas las funciones API (auth, módulo,
 * combos…). Centraliza tres cosas:
 *  1. `baseURL` desde `VITE_API_BASE_URL`.
 *  2. Inyección del token JWT (`Authorization: Bearer`) vía un getter inyectable
 *     — el cliente NO importa el store de auth (evita acoplamiento circular).
 *  3. Desempaque central de `ApiResponse<T>`: resuelve con `data` en éxito y
 *     lanza `ApiError` en `succeeded:false` o error de red/HTTP.
 */

import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';
import type { ApiResponse, ErrorModel } from '../types/api';

/** Error normalizado de la API. Lo consume la UI (toasts/modales). */
export class ApiError extends Error {
  /** Errores de validación por campo (si los hay). */
  readonly errors: ErrorModel[];
  /** Código HTTP, si aplica (0 = error de red/sin respuesta). */
  readonly status: number;

  constructor(message: string, errors: ErrorModel[] = [], status = 0) {
    super(message);
    this.name = 'ApiError';
    this.errors = errors;
    this.status = status;
  }
}

/**
 * Getter del token JWT. El store de auth (Bloque 3) lo inyecta con
 * {@link setTokenGetter}. Por defecto no hay token (peticiones anónimas).
 */
let tokenGetter: () => string | null = () => null;

/** Registra la fuente del token JWT (la llama el store de auth al iniciar). */
export function setTokenGetter(getter: () => string | null): void {
  tokenGetter = getter;
}

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const httpClient: AxiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// --- Request: inyectar Bearer token ---
httpClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenGetter();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Response: desempacar ApiResponse<T> / normalizar errores ---
httpClient.interceptors.response.use(
  (response) => {
    const body = response.data as ApiResponse<unknown>;

    // Endpoint que no envuelve en ApiResponse: devolver el body tal cual.
    if (body == null || typeof body.succeeded !== 'boolean') {
      return response;
    }

    if (!body.succeeded) {
      throw new ApiError(
        body.message ?? 'La operación no se completó.',
        body.errors ?? [],
        response.status,
      );
    }

    // Éxito: reemplazar el payload por `data` desempacado.
    response.data = body.data;
    return response;
  },
  (error: AxiosError<ApiResponse<unknown>>) => {
    // Error HTTP con cuerpo ApiResponse → usar su mensaje/errores.
    const body = error.response?.data;
    if (body && typeof body.succeeded === 'boolean') {
      throw new ApiError(
        body.message ?? error.message,
        body.errors ?? [],
        error.response?.status ?? 0,
      );
    }
    // Error de red / timeout / sin respuesta.
    throw new ApiError(
      error.message || 'Error de conexión con el servidor.',
      [],
      error.response?.status ?? 0,
    );
  },
);
