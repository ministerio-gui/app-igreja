/**
 * useEvents — calendar events CRUD
 * Source: Supabase events table
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Event } from '@/types'

const QUERY_KEYS = { events: ['events'] as const }

export function useEvents() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: QUERY_KEYS.events,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_at', { ascending: true })
      if (error) throw new Error(`[useEvents] ${error.message}`)
      return data as Event[]
    },
  })

  const createMutation = useMutation({
    mutationFn: async (event: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => {
      const { error } = await supabase.from('events').insert(event)
      if (error) throw new Error(`[useEvents] create: ${error.message}`)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.events }),
    onError: (err) => console.error('[useEvents] create error:', err),
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Event> & { id: string }) => {
      const { error } = await supabase.from('events').update(updates).eq('id', id)
      if (error) throw new Error(`[useEvents] update: ${error.message}`)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.events }),
    onError: (err) => console.error('[useEvents] update error:', err),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('events').delete().eq('id', id)
      if (error) throw new Error(`[useEvents] delete: ${error.message}`)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.events }),
    onError: (err) => console.error('[useEvents] delete error:', err),
  })

  return {
    ...query,
    create: createMutation.mutate,
    createAsync: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    update: updateMutation.mutate,
    remove: deleteMutation.mutate,
  }
}
