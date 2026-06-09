/**
 * HomeHero — Hero area com data atual + card do próximo evento
 * Se não houver próximo evento: apenas exibe a data
 * Dados: useEvents() — filtragem local por start_at > agora
 */
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, MapPin } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEvents } from '@/hooks/useEvents'
import { transition } from '@/lib/animations'

export function HomeHero() {
  const { data: events } = useEvents()

  const now = new Date()
  const dateLabel = format(now, "EEEE, dd 'de' MMMM", { locale: ptBR }).toUpperCase()

  const nextEvent = events
    ?.filter((e) => new Date(e.start_at) > now)
    .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime())[0]

  return (
    <div
      className="relative px-5 pt-4 pb-6 overflow-hidden"
    >
      {/* Glow de fundo */}
      <div
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(76,114,196,0.08) 0%, transparent 100%)',
        }}
      />

      {/* Data */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, ...transition.fast }}
        className="text-label relative"
        style={{ color: 'var(--color-text-muted)', letterSpacing: '0.12em' }}
      >
        {dateLabel}
      </motion.p>

      {/* Próximo evento */}
      <AnimatePresence>
        {nextEvent && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ delay: 0.2, ...transition.springBounce }}
            className="glass-accent rounded-[18px] p-4 mt-3 relative"
          >
            <p
              className="text-label mb-1"
              style={{ color: 'var(--color-accent-primary)' }}
            >
              PRÓXIMO EVENTO
            </p>
            <p
              className="leading-tight"
              style={{ fontSize: '17px', fontWeight: 600, color: '#EEE8DC' }}
            >
              {nextEvent.title}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span
                className="flex items-center gap-1"
                style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}
              >
                <Clock size={12} />
                {format(new Date(nextEvent.start_at), 'HH:mm')}
              </span>
              {nextEvent.location && (
                <span
                  className="flex items-center gap-1"
                  style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}
                >
                  <MapPin size={12} />
                  {nextEvent.location}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
