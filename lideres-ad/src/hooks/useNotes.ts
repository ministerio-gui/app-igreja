import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Note } from '@/types'

interface CreateNoteInput {
  title?: string
  content: string
  is_global?: boolean
  author_id: string
}

export function useNotes() {
  const queryClient = useQueryClient()

  const query = useQuery({
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

  const createMutation = useMutation({
    mutationFn: async (note: CreateNoteInput) => {
      const { error } = await supabase.from('notes').insert({
        title: note.title ?? '',
        content: note.content,
        is_global: note.is_global ?? false,
        pinned: false,
        author_id: note.author_id,
      })
      if (error) throw new Error(`[useNotes] create: ${error.message}`)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
    onError: (err) => console.error('[useNotes] create error:', err),
  })

  return {
    ...query,
    create: createMutation.mutate,
    createAsync: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
  }
}
