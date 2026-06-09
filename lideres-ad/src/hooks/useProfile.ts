/**
 * useProfile — read and update authenticated user's profile
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/types'

const QUERY_KEYS = { profile: (id: string) => ['profile', id] }

export function useProfile(userId: string | undefined) {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: userId ? QUERY_KEYS.profile(userId) : ['profile', 'none'],
    queryFn: async () => {
      if (!userId) return null
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      if (error) throw new Error(`[useProfile] ${error.message}`)
      return data as Profile
    },
    enabled: !!userId,
  })

  const updateMutation = useMutation({
    mutationFn: async (updates: Partial<Pick<Profile, 'full_name' | 'avatar_url'>>) => {
      if (!userId) throw new Error('No userId')
      const { error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', userId)
      if (error) throw new Error(`[useProfile] update: ${error.message}`)
    },
    onSuccess: () => {
      if (userId) queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile(userId) })
    },
    onError: (err) => console.error('[useProfile] update error:', err),
  })

  return { ...query, update: updateMutation.mutate, updating: updateMutation.isPending }
}
