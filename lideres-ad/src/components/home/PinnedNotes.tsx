/**
 * PinnedNotes — Grid 2-col de notas fixadas/globais
 * Notas globais com badge "GLOBAL", notas pessoais com ícone pin
 * Dados: useNotes() — pinned first, limit 4
 */
import { motion, AnimatePresence } from 'framer-motion'
import { Pin } from 'lucide-react'
import { useNotes } from '@/hooks/useNotes'
import { NoteCardSkeleton } from '@/components/ui/Skeleton'
import { staggerContainerFast, cardVariants } from '@/lib/animations'
import type { Note } from '@/types'

// ─── Note card ────────────────────────────────────────────────────────────────
function NoteCard({ note }: { note: Note }) {
  return (
    <motion.div
      variants={cardVariants}
      whileTap={{ scale: 0.96 }}
      className="glass-1 rounded-[14px] relative cursor-pointer"
      style={{
        padding: '14px',
        minHeight: '100px',
        border: note.is_global ? '1px solid rgba(34,211,160,0.2)' : undefined,
      }}
    >
      {/* Pin icon */}
      {note.pinned && (
        <Pin
          size={12}
          className="absolute top-3 right-3"
          style={{ color: 'var(--color-text-muted)' }}
        />
      )}

      {/* Badge global */}
      <AnimatePresence>
        {note.is_global && (
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 400 }}
            className="inline-block mb-2 text-label"
            style={{ color: 'var(--color-success)' }}
          >
            GLOBAL
          </motion.span>
        )}
      </AnimatePresence>

      {/* Título */}
      {note.title && (
        <p
          className="mb-1 truncate"
          style={{ fontSize: '14px', fontWeight: 600, color: '#EEE8DC' }}
        >
          {note.title}
        </p>
      )}

      {/* Conteúdo preview */}
      {note.content && (
        <p
          style={{
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {note.content}
        </p>
      )}
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export function PinnedNotes() {
  const { data: notes, isLoading } = useNotes()

  if (isLoading) {
    return (
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '0 20px' }}
      >
        {[0, 1, 2, 3].map((i) => <NoteCardSkeleton key={i} />)}
      </div>
    )
  }

  if (!notes || notes.length === 0) return null

  return (
    <motion.div
      variants={staggerContainerFast}
      initial="initial"
      animate="animate"
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '0 20px' }}
    >
      <AnimatePresence>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
