/**
 * Skeleton — Shimmer loader que imita o shape do conteúdo real
 * Skeletons compostos: EventCardSkeleton, BalanceCardSkeleton, NoteCardSkeleton
 * Usar com React Query: if (isLoading) return <XxxSkeleton />
 */
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// ─── Base shimmer ─────────────────────────────────────────────────────────────
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md',
        'bg-[var(--color-bg-elevated)]',
        className
      )}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
        transition={{ duration: 1.8, ease: 'linear', repeat: Infinity }}
      />
    </div>
  )
}

// ─── Event card skeleton ──────────────────────────────────────────────────────
export function EventCardSkeleton() {
  return (
    <div className="flex items-center gap-4 glass-1 rounded-[16px] p-4">
      <Skeleton className="w-12 h-12 rounded-2xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  )
}

// ─── Balance card skeleton ────────────────────────────────────────────────────
export function BalanceCardSkeleton() {
  return (
    <div className="mx-5 glass-accent rounded-[20px] p-5 space-y-3">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-11 w-48" />
      <Skeleton className="h-3 w-36" />
      <div className="flex gap-2 mt-2">
        <Skeleton className="flex-1 h-9 rounded-full" />
        <Skeleton className="flex-1 h-9 rounded-full" />
      </div>
    </div>
  )
}

// ─── Note card skeleton ───────────────────────────────────────────────────────
export function NoteCardSkeleton() {
  return (
    <div className="glass-1 rounded-[14px] p-[14px] space-y-2 min-h-[100px]">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  )
}
