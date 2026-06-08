/**
 * Selector de período en el navbar.
 *
 * Muestra el período activo y permite cambiarlo. Al cambiarlo actualiza el
 * contexto global (`usePeriodoStore`); como el `periodoID` forma parte del
 * `queryKey` de los listados, los módulos dependientes refrescan solos.
 */

import { usePeriodos } from '../../hooks/usePeriodos';
import { usePeriodoStore } from '../../stores/periodoStore';

export function PeriodoSwitcher() {
  const { data: periodos } = usePeriodos();
  const periodo = usePeriodoStore((s) => s.periodo);
  const setPeriodo = usePeriodoStore((s) => s.setPeriodo);

  if (!periodo) return null;

  const opciones = periodos ?? [periodo];

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const sel = periodos?.find((p) => p.id === Number(e.target.value));
    if (sel) setPeriodo({ id: sel.id, descripcion: sel.descripcion });
  };

  return (
    <label className="flex items-center gap-2 text-sm text-gray-600">
      <span className="hidden sm:inline">Período:</span>
      <select
        value={periodo.id}
        onChange={onChange}
        className="rounded-md border border-gray-300 px-2 py-1 text-sm outline-none
          focus:ring-2 focus:ring-blue-500"
      >
        {opciones.map((p) => (
          <option key={p.id} value={p.id}>
            {p.descripcion}
          </option>
        ))}
      </select>
    </label>
  );
}
