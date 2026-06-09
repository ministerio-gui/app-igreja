/**
 * WeekAbsences — Avatares de ausências da semana atual
 * Com ausências: row com overlap + stagger
 * Sem ausências: card glass-1 "Todos presentes 🙌"
 * Dados: useAbsences() — filtragem local pela semana atual
 */
import { motion, AnimatePresence } from 'framer-motion'
import { useAbsences } from '@/hooks/useAbsences'
import { staggerContainer, cardVariants } from '@/lib/animations'

function getWeekRange(): { start: Date; end: Date } {
  const now = new Date()
  const day = now.getDay()
  const start = new Date(now)
  start.setDate(now.getDate() - day)
  start.setHours(0, 0, 0, 0)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  end.setHours(23, 59, 59, 999)
  return { start, end }
}

function getInitials(fullName: string | null): string {
  if (!fullName) return '?'
  const parts = fullName.trim().split(' ')
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const MAX_VISIBLE = 5

export function WeekAbsences() {
  const { data: absences, isLoading } = useAbsences()

  if (isLoading) {
    return (
      <div className="flex gap-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-1"
          >
            <div
              className="w-11 h-11 rounded-full"
              style={{ backgroundColor: 'var(--color-bg-elevated)' }}
            />
            <div
              className="h-2 w-10 rounded"
              style={{ backgroundColor: 'var(--color-bg-elevated)' }}
            />
          </div>
        ))}
      </div>
    )
  }

  const { start, end } = getWeekRange()
  const weekAbsences = absences?.filter((a) => {
    const d = new Date(a.absence_date)
    return d >= start && d <= end
  }) ?? []

  if (weekAbsences.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass-1 rounded-2xl p-5 text-center"
      >
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Todos presentes esta semana 🙌
        </p>
      </motion.div>
    )
  }

  const visible = weekAbsences.slice(0, MAX_VISIBLE)
  const overflow = weekAbsences.length - MAX_VISIBLE

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex items-end"
    >
      <AnimatePresence>
        {visible.map((absence, i) => (
          <motion.div
            key={absence.id}
            variants={cardVariants}
            className="flex flex-col items-center gap-1 flex-shrink-0"
            style={{ marginLeft: i > 0 ? -10 : 0, zIndex: visible.length - i }}
          >
            <div
              className="w-11 h-11 rounded-full glass-1 flex items-center justify-center"
              style={{ fontSize: '14px', fontWeight: 600, color: '#EEE8DC' }}
            >
              {getInitials(absence.member?.full_name ?? null)}
            </div>
            <p
              className="text-center"
              style={{
                fontSize: '11px',
                color: 'var(--color-text-secondary)',
                maxWidth: '48px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {absence.member?.full_name?.split(' ')[0] ?? '—'}
            </p>
          </motion.div>
        ))}

        {overflow > 0 && (
          <motion.div
            variants={cardVariants}
            className="flex flex-col items-center gap-1 flex-shrink-0"
            style={{ marginLeft: -10 }}
          >
            <div
              className="w-11 h-11 rounded-full glass-1 flex items-center justify-center"
              style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)' }}
            >
              +{overflow}
            </div>
            <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>mais</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
