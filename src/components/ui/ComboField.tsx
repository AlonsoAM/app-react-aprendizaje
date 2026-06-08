/**
 * Select tipado reutilizable que consume `ComboItem[]`.
 *
 * Usa `forwardRef` para integrarse con react-hook-form: el resultado de
 * `register('campo')` (`{ ref, name, onChange, onBlur }`) se esparce vía props.
 * Muestra label, placeholder, estado de carga y error de validación.
 */

import { forwardRef, type SelectHTMLAttributes } from 'react';
import type { ComboItem } from '../../types/maestraPrecio';

interface ComboFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: ComboItem[];
  /** Mensaje de error (ej. de Zod). */
  error?: string;
  placeholder?: string;
  /** Deshabilita y muestra estado de carga mientras llegan las opciones. */
  loading?: boolean;
}

export const ComboField = forwardRef<HTMLSelectElement, ComboFieldProps>(
  function ComboField(
    {
      label,
      options,
      error,
      placeholder = 'Seleccionar...',
      loading = false,
      id,
      name,
      disabled,
      className = '',
      ...rest
    },
    ref,
  ) {
    const fieldId = id ?? name;

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={fieldId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <select
          id={fieldId}
          name={name}
          ref={ref}
          disabled={disabled || loading}
          aria-invalid={!!error}
          className={`rounded-md border px-3 py-2 text-sm outline-none transition
            focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100
            ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
          {...rest}
        >
          <option value="">{loading ? 'Cargando…' : placeholder}</option>
          {options.map((opt) => (
            <option key={String(opt.value)} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="text-xs text-red-600">{error}</span>}
      </div>
    );
  },
);
