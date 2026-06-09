/**
 * UpcomingEvents — Lista de até 3 próximos eventos com stagger
 * EventCard: glass-1, border-l colorida, date badge, animação de entrada
 * Dados: useEvents() — filtragem e ordenação local
 */
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, CalendarX } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEvents } from '@/hooks/useEvents'
import { EventCardSkeleton } from '@/components/ui/Skeleton'
import { staggerContainer, cardVariants, transition } from '@/lib/animations'
import type { Event } from '@/types'

// ─── Event card ───────────────────────────────────────────────────────────────
function EventCard({ event }: { event: Event }) {
  const startDate = new Date(event.start_at)

  return (
    <motion.div
      variants={cardVariants}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-4 glass-1 rounded-[16px] p-4 cursor-pointer"
      style={{ borderLeft: `3px solid ${event.color}` }}
    >
      {/* Date badge */}
      <div
        className="flex flex-col items-center justify-center w-12 h-12 rounded-2xl flex-shrink-0"
        style={{ backgroundColor: '#1B2A4A' }}
      >
        <span
          style={{ fontSize: '10px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 500 }}
        >
          {format(startDate, 'MMM', { locale: ptBR })}
        </span>
        <span style={{ fontSize: '20px', fontWeight: 700, color: '#EEE8DC', lineHeight: 1 }}>
          {format(startDate, 'dd')}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p
          className="truncate"
          style={{ fontSize: '15px', fontWeight: 600, color: '#EEE8DC' }}
        >
          {event.title}
        </p>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
          {format(startDate, 'HH:mm')} · {event.location ?? 'Sem local'}
        </p>
      </div>

      <ChevronRight size={16} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
    </motion.div>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EventsEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="flex flex-col items-center justify-center py-10 gap-3 text-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 14, stiffness: 280, delay: 0.15 }}
        className="p-4 rounded-2xl"
        style={{ backgroundColor: 'var(--color-bg-elevated)' }}
      >
        <CalendarX size={28} style={{ color: 'var(--color-text-muted)' }} />
      </motion.div>
      <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
        Nenhum evento próximo
      </p>
      <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
        Adicione eventos no Calendário
      </p>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export function UpcomingEvents() {
  const { data: events, isLoading } = useEvents()

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[0, 1, 2].map((i) => <EventCardSkeleton key={i} />)}
      </div>
    )
  }

  const now = new Date()
  const upcoming = events
    ?.filter((e) => new Date(e.start_at) > now)
    .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime())
    .slice(0, 3) ?? []

  if (upcoming.length === 0) return <EventsEmptyState />

  return (
    <motion.ul
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-3 list-none p-0 m-0"
    >
      <AnimatePresence>
        {upcoming.map((event) => (
          <motion.li key={event.id} variants={cardVariants}>
            <EventCard event={event} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  )
}
