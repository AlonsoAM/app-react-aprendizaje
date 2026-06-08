/**
 * QueryClient y provider de TanStack Query.
 *
 * Monta el cache central que habilita todos los hooks `useQuery`/`useMutation`.
 * Debe envolver la app por encima de cualquier componente que use esos hooks.
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 1 reintento ante fallos de red; los hooks suben staleTime cuando aplica.
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  },
});

export function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}