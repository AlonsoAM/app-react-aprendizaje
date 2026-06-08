/**
 * Detección de inactividad con cuenta regresiva.
 *
 * Mientras hay actividad (mouse, teclado, scroll…) el temporizador de
 * inactividad se reinicia. Tras `idleTimeoutMs` sin actividad entra en estado
 * `warning` con una cuenta regresiva de `countdownMs`; durante el warning la
 * actividad pasiva se ignora (la decisión es por botón). Si la cuenta llega a
 * 0 se ejecuta `onTimeout` (logout).
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { SESSION_CONFIG } from '../config/session';

interface UseIdleTimerOptions {
  /** Se ejecuta cuando la cuenta regresiva llega a 0. */
  onTimeout: () => void;
}

interface UseIdleTimerResult {
  /** `true` mientras se muestra el aviso de expiración. */
  isWarning: boolean;
  /** Milisegundos restantes en la cuenta regresiva. */
  remainingMs: number;
  /** Vuelve al estado activo y reinicia el temporizador de inactividad. */
  stayActive: () => void;
}

export function useIdleTimer({
  onTimeout,
}: UseIdleTimerOptions): UseIdleTimerResult {
  const [isWarning, setIsWarning] = useState(false);
  const [remainingMs, setRemainingMs] = useState<number>(
    SESSION_CONFIG.countdownMs,
  );

  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const isWarningRef = useRef(false);
  // Mantener `onTimeout` en un ref evita re-suscribir listeners si cambia.
  const onTimeoutRef = useRef(onTimeout);
  onTimeoutRef.current = onTimeout;

  const clearTimers = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (countdownTimer.current) clearInterval(countdownTimer.current);
    idleTimer.current = null;
    countdownTimer.current = null;
  }, []);

  const startCountdown = useCallback(() => {
    isWarningRef.current = true;
    setIsWarning(true);
    setRemainingMs(SESSION_CONFIG.countdownMs);

    const startedAt = Date.now();
    countdownTimer.current = setInterval(() => {
      const left = SESSION_CONFIG.countdownMs - (Date.now() - startedAt);
      if (left <= 0) {
        clearTimers();
        isWarningRef.current = false;
        setIsWarning(false);
        onTimeoutRef.current();
      } else {
        setRemainingMs(left);
      }
    }, 250);
  }, [clearTimers]);

  const startIdleTimer = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(startCountdown, SESSION_CONFIG.idleTimeoutMs);
  }, [startCountdown]);

  const stayActive = useCallback(() => {
    clearTimers();
    isWarningRef.current = false;
    setIsWarning(false);
    startIdleTimer();
  }, [clearTimers, startIdleTimer]);

  useEffect(() => {
    startIdleTimer();

    const handleActivity = (): void => {
      // Durante el warning la decisión es por botón: ignorar actividad pasiva.
      if (!isWarningRef.current) startIdleTimer();
    };

    const { activityEvents } = SESSION_CONFIG;
    activityEvents.forEach((event) =>
      window.addEventListener(event, handleActivity, { passive: true }),
    );

    return () => {
      activityEvents.forEach((event) =>
        window.removeEventListener(event, handleActivity),
      );
      clearTimers();
    };
  }, [startIdleTimer, clearTimers]);

  return { isWarning, remainingMs, stayActive };
}