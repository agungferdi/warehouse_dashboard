'use client'

import { useQuery } from '@tanstack/react-query'
import { supabase, RFIDTag } from '@/lib/supabase'

export function useRFIDData() {
  const query = useQuery({
    queryKey: ['rfid-tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rfid_tags_view')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)

      if (error) throw new Error(error.message)
      return data as RFIDTag[]
    },
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  })

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    error: query.error?.message || null,
    refetch: query.refetch,
  }
}
