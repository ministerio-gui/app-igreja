import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  backdropVariants,
  slideUpVariants,
  scaleInVariants,
} from '@/lib/animations'

interface AdaptiveModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export function AdaptiveModal({ open, onClose, children, title }: AdaptiveModalProps) {
  const isMobile = useMediaQuery('(max-width: 767px)')

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Mobile: bottom sheet */}
          {isMobile && (
            <motion.div
              variants={slideUpVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed bottom-0 inset-x-0 z-50 rounded-t-[24px] glass-2"
              style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-9 h-1 rounded-full bg-white/20" />
              </div>
              <div className="px-5 pt-3 pb-8">
                {title && (
                  <div className="flex items-center justify-between mb-5">
                    <h2
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {title}
                    </h2>
                    <button
                      onClick={onClose}
                      className="w-8 h-8 rounded-full glass-1 flex items-center justify-center"
                    >
                      <X size={16} style={{ color: 'var(--color-text-muted)' }} />
                    </button>
                  </div>
                )}
                {children}
              </div>
            </motion.div>
          )}

          {/* Desktop: modal centralizado */}
          {!isMobile && (
            <motion.div
              variants={scaleInVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="glass-2 rounded-[18px] w-full max-w-lg p-6 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {title && (
                  <div className="flex items-center justify-between mb-5">
                    <h2
                      style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {title}
                    </h2>
                    <button
                      onClick={onClose}
                      className="w-8 h-8 rounded-full glass-1 flex items-center justify-center"
                    >
                      <X size={16} style={{ color: 'var(--color-text-muted)' }} />
                    </button>
                  </div>
                )}
                {children}
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  )
}
