'use client'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import React, { useState } from 'react'
import { ThemeProvider } from '@/components/theme-provider'

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
            refetchInterval: 30 * 1000,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
