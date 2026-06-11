/**
 * types/index — domain types for the app
 * Mirrors the Supabase schema defined in migrations
 */

export type Role = 'admin' | 'leader'

export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  role: Role
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  title: string
  description: string | null
  location: string | null
  start_at: string
  end_at: string
  all_day: boolean
  color: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface Note {
  id: string
  title: string
  content: string | null
  is_global: boolean
  pinned: boolean
  author_id: string
  created_at: string
  updated_at: string
  author?: { full_name: string | null; avatar_url: string | null }
}

export type TransactionType = 'sale' | 'expense' | 'deposit' | 'adjustment'

export interface CantinaProduct {
  id: string
  name: string
  emoji: string | null
  price: number
  cost_price: number | null
  stock_quantity: number
  church_percent: number
  active: boolean
  created_by: string
  created_at: string
  updated_at: string
}

export interface CantinaTransaction {
  id: string
  type: TransactionType
  description: string | null
  amount: number
  product_id: string | null
  quantity: number | null
  church_cut: number | null
  created_by: string
  created_at: string
}

export interface CantinaBalance {
  balance: number
  total_church_cut: number
}

export interface Absence {
  id: string
  member_id: string
  absence_date: string
  reason: string | null
  created_by: string
  created_at: string
}
