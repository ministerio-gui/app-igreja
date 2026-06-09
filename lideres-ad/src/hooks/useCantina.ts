/**
 * useCantina — balance, products, and transactions
 * Source: cantina_balance view + cantina_products + cantina_transactions
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { CantinaBalance, CantinaProduct, CantinaTransaction } from '@/types'

const QUERY_KEYS = {
  balance: ['cantina', 'balance'] as const,
  products: ['cantina', 'products'] as const,
  transactions: ['cantina', 'transactions'] as const,
}

export function useCantina() {
  const queryClient = useQueryClient()

  const balanceQuery = useQuery({
    queryKey: QUERY_KEYS.balance,
    queryFn: async () => {
      const { data, error } = await supabase.from('cantina_balance').select('*').single()
      if (error) throw new Error(`[useCantina] balance: ${error.message}`)
      return data as CantinaBalance
    },
  })

  const productsQuery = useQuery({
    queryKey: QUERY_KEYS.products,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cantina_products')
        .select('*')
        .eq('active', true)
        .order('name')
      if (error) throw new Error(`[useCantina] products: ${error.message}`)
      return data as CantinaProduct[]
    },
  })

  const transactionsQuery = useQuery({
    queryKey: QUERY_KEYS.transactions,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cantina_transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)
      if (error) throw new Error(`[useCantina] transactions: ${error.message}`)
      return data as CantinaTransaction[]
    },
  })

  const addTransactionMutation = useMutation({
    mutationFn: async (tx: Omit<CantinaTransaction, 'id' | 'created_at'>) => {
      const { error } = await supabase.from('cantina_transactions').insert(tx)
      if (error) throw new Error(`[useCantina] addTransaction: ${error.message}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.balance })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions })
    },
    onError: (err) => console.error('[useCantina] addTransaction error:', err),
  })

  return {
    balance: balanceQuery.data,
    balanceLoading: balanceQuery.isLoading,
    products: productsQuery.data ?? [],
    productsLoading: productsQuery.isLoading,
    transactions: transactionsQuery.data ?? [],
    transactionsLoading: transactionsQuery.isLoading,
    addTransaction: addTransactionMutation.mutate,
  }
}
