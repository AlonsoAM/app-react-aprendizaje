/**
 * Skeleton de tabla para el estado de carga.
 *
 * Renderiza `rows` × `cols` celdas con efecto `animate-pulse` mientras llegan
 * los datos paginados.
 */

interface TableSkeletonProps {
  rows?: number;
  cols?: number;
}

export function TableSkeleton({ rows = 5, cols = 6 }: TableSkeletonProps) {
  return (
    <div className="w-full animate-pulse" aria-hidden="true">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-3 border-b border-gray-100 px-2 py-3">
          {Array.from({ length: cols }).map((_, c) => (
            <div key={c} className="h-4 flex-1 rounded bg-gray-200" />
          ))}
        </div>
      ))}
    </div>
  );
}