/**
 * Render de la pila de toasts.
 *
 * Lee del `useUiStore` y muestra las notificaciones fijas abajo a la derecha.
 * Cada toast se auto-descarta tras `AUTO_DISMISS_MS`. Montar una vez en la raíz.
 */

import { useEffect } from 'react';
import { useUiStore, type Toast } from '../../stores/uiStore';

const AUTO_DISMISS_MS = 4_000;

const TYPE_STYLES: Record<Toast['type'], string> = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  info: 'bg-gray-800',
};

function ToastItem({ toast }: { toast: Toast }) {
  const removeToast = useUiStore((s) => s.removeToast);

  useEffect(() => {
    const timer = setTimeout(() => removeToast(toast.id), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  return (
    <div
      role="status"
      className={`flex items-start gap-3 rounded-md px-4 py-3 text-sm text-white
        shadow-lg ${TYPE_STYLES[toast.type]}`}
    >
      <span className="flex-1">{toast.message}</span>
      <button
        type="button"
        onClick={() => removeToast(toast.id)}
        aria-label="Cerrar"
        className="text-white/80 hover:text-white"
      >
        ×
      </button>
    </div>
  );
}

export function Toaster() {
  const toasts = useUiStore((s) => s.toasts);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-80 flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}