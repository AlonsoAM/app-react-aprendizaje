/**
 * Parámetros de sesión (configurables).
 *
 * Controlan el manejo de inactividad: cuánto se espera antes de avisar y
 * cuántos segundos dura la cuenta regresiva antes del logout automático.
 */
export const SESSION_CONFIG = {
  /** Inactividad antes de mostrar el aviso (25 min). */
  idleTimeoutMs: 25 * 60_000,
  /** Duración de la cuenta regresiva antes del logout (60 s). */
  countdownMs: 60_000,
  /** Eventos del DOM que cuentan como actividad del usuario. */
  activityEvents: [
    'mousemove',
    'keydown',
    'click',
    'scroll',
    'touchstart',
  ] as const,
} as const;