/**
 * supabase — auto-generated types placeholder
 * Replace this file by running: npx supabase gen types typescript --project-id <id> > src/types/supabase.ts
 * once the Supabase project is connected.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          role: 'admin' | 'leader'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'leader'
          created_at?: string
          updated_at?: string
        }
        Update: {
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'leader'
          updated_at?: string
        }
      }
      events: {
        Row: {
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
        Insert: {
          id?: string
          title: string
          description?: string | null
          location?: string | null
          start_at: string
          end_at: string
          all_day?: boolean
          color?: string
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string | null
          location?: string | null
          start_at?: string
          end_at?: string
          all_day?: boolean
          color?: string
          updated_at?: string
        }
      }
      notes: {
        Row: {
          id: string
          title: string
          content: string | null
          is_global: boolean
          pinned: boolean
          author_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content?: string | null
          is_global?: boolean
          pinned?: boolean
          author_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          content?: string | null
          is_global?: boolean
          pinned?: boolean
          updated_at?: string
        }
      }
      cantina_products: {
        Row: {
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
        Insert: {
          id?: string
          name: string
          emoji?: string | null
          price: number
          cost_price?: number | null
          stock_quantity?: number
          church_percent?: number
          active?: boolean
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          emoji?: string | null
          price?: number
          cost_price?: number | null
          stock_quantity?: number
          church_percent?: number
          active?: boolean
          updated_at?: string
        }
      }
      cantina_transactions: {
        Row: {
          id: string
          type: 'sale' | 'expense' | 'deposit' | 'adjustment'
          description: string | null
          amount: number
          product_id: string | null
          quantity: number | null
          church_cut: number | null
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          type: 'sale' | 'expense' | 'deposit' | 'adjustment'
          description?: string | null
          amount: number
          product_id?: string | null
          quantity?: number | null
          church_cut?: number | null
          created_by: string
          created_at?: string
        }
        Update: Record<string, never>
      }
      absences: {
        Row: {
          id: string
          member_id: string
          absence_date: string
          reason: string | null
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          member_id: string
          absence_date: string
          reason?: string | null
          created_by: string
          created_at?: string
        }
        Update: Record<string, never>
      }
    }
    Views: {
      cantina_balance: {
        Row: {
          balance: number
          total_church_cut: number
        }
      }
    }
    Functions: {
      decrement_stock: {
        Args: { product_id: string; qty: number }
        Returns: void
      }
    }
  }
}
