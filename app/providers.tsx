'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { useState, useEffect } from 'react';
import { createIndexedDBPersister } from '@/app/utils/indexedDBPersister';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  }));

  useEffect(() => {
    createIndexedDBPersister().then((persister) => {
      persistQueryClient({
        queryClient,
        persister,
      });
    });
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
