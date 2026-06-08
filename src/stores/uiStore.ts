/**
 * Store de UI transitoria (Zustand, sin persist): pila de toasts.
 *
 * `addToast` agrega una notificación; `removeToast` la quita (el `Toaster` la
 * auto-descarta tras unos segundos). Helpers `toastSuccess`/`toastError` para
 * disparar desde cualquier parte sin hook (usan `getState`).
 */

import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface UiState {
  toasts: Toast[];
  addToast: (type: ToastType, message: string) => void;
  removeToast: (id: number) => void;
}

let seq = 0;

export const useUiStore = create<UiState>((set) => ({
  toasts: [],
  addToast: (type, message) =>
    set((s) => ({ toasts: [...s.toasts, { id: ++seq, type, message }] })),
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

/** Dispara un toast de éxito desde cualquier parte (sin hook). */
export const toastSuccess = (message: string): void =>
  useUiStore.getState().addToast('success', message);

/** Dispara un toast de error desde cualquier parte (sin hook). */
export const toastError = (message: string): void =>
  useUiStore.getState().addToast('error', message);