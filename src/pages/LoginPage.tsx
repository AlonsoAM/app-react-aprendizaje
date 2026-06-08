/**
 * Página de login.
 *
 * Formulario con react-hook-form + Zod. Al enviar: `login` (codifica la
 * contraseña en Base64) → guarda la sesión en el store → navega al dashboard.
 * Si las credenciales son inválidas, muestra el `message` del backend sin
 * redirigir.
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';
import { ApiError } from '../api/httpClient';
import { useAuthStore } from '../stores/authStore';

const loginSchema = z.object({
  userName: z.string().min(1, 'Ingresa tu usuario'),
  password: z.string().min(1, 'Ingresa tu contraseña'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const setLogin = useAuthStore((s) => s.login);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm): Promise<void> => {
    setServerError(null);
    try {
      const auth = await login(data.userName, data.password);
      setLogin(auth);
      navigate('/', { replace: true });
    } catch (e) {
      setServerError(
        e instanceof ApiError ? e.message : 'No se pudo iniciar sesión.',
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4 rounded-lg bg-white p-8 shadow-md"
        noValidate
      >
        <h1 className="text-center text-xl font-semibold text-gray-900">
          Agro Comercial
        </h1>

        {serverError && (
          <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="userName" className="text-sm font-medium text-gray-700">
            Usuario
          </label>
          <input
            id="userName"
            type="text"
            autoComplete="username"
            {...register('userName')}
            className={`rounded-md border px-3 py-2 text-sm outline-none focus:ring-2
              focus:ring-blue-500 ${errors.userName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.userName && (
            <span className="text-xs text-red-600">{errors.userName.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register('password')}
            className={`rounded-md border px-3 py-2 text-sm outline-none focus:ring-2
              focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.password && (
            <span className="text-xs text-red-600">{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white
            hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Ingresando…' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
}
