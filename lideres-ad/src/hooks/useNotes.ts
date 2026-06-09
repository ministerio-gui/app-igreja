/**
 * useNotes — fetch notes (pinned first, then by creation date)
 */
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Note } from '@/types'

export function useNotes() {
  return useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('pinned', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(4)
      if (error) throw new Error(`[useNotes] ${error.message}`)
      return data as Note[]
    },
  })
}
