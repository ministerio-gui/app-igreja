/**
 * PageWrapper — Envolve toda página com animação de entrada/saída
 * Usar em: TODAS as páginas sem exceção
 * Requer AnimatePresence no App.tsx pai para exit animations funcionarem
 */
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { pageVariants } from '@/lib/animations'

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn('h-full', className)}
    >
      {children}
    </motion.div>
  )
}
