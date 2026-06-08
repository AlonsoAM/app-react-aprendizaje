/**
 * Estado vacío reutilizable.
 *
 * Muestra un título, un mensaje y una acción opcional (CTA). Se usa, por
 * ejemplo, cuando no hay empresa seleccionada o el listado no tiene resultados.
 */

import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  message?: string;
  /** Acción opcional (botón/enlace) bajo el mensaje. */
  action?: ReactNode;
  /** Icono o emoji opcional sobre el título. */
  icon?: ReactNode;
}

export function EmptyState({ title, message, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-4 py-12 text-center">
      {icon && <div className="text-4xl text-gray-300">{icon}</div>}
      <h3 className="text-base font-medium text-gray-800">{title}</h3>
      {message && <p className="max-w-sm text-sm text-gray-500">{message}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}