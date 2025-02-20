"use client"; // ✅ Ensure it runs on the client

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

interface ReactQueryProviderProps {
  children: ReactNode;
}

export default function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient()); // ✅ Ensure the client persists

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
