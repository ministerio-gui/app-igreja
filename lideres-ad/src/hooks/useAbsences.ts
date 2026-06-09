/**
 * useAbsences — register and list member absences
 * Source: Supabase absences table
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Absence } from '@/types'

const QUERY_KEYS = { absences: ['absences'] as const }

export function useAbsences() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: QUERY_KEYS.absences,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('absences')
        .select('*, member:profiles(full_name, avatar_url)')
        .order('absence_date', { ascending: false })
      if (error) throw new Error(`[useAbsences] ${error.message}`)
      return data as (Absence & { member: { full_name: string | null; avatar_url: string | null } })[]
    },
  })

  const registerMutation = useMutation({
    mutationFn: async (absence: Omit<Absence, 'id' | 'created_at'>) => {
      const { error } = await supabase.from('absences').insert(absence)
      if (error) throw new Error(`[useAbsences] register: ${error.message}`)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.absences }),
    onError: (err) => console.error('[useAbsences] register error:', err),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('absences').delete().eq('id', id)
      if (error) throw new Error(`[useAbsences] delete: ${error.message}`)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.absences }),
    onError: (err) => console.error('[useAbsences] delete error:', err),
  })

  return {
    ...query,
    register: registerMutation.mutate,
    remove: deleteMutation.mutate,
  }
}
