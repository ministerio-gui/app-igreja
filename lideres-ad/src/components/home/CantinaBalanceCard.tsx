/**
 * CantinaBalanceCard — Saldo atual da cantina com AnimatedNumber
 * Glass accent card com glow + botões de ação inline
 * Dados: useCantina() → balance, balanceLoading
 */
import { useEffect } from 'react'
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCantina } from '@/hooks/useCantina'
import { formatCurrency } from '@/lib/formatters'
import { BalanceCardSkeleton } from '@/components/ui/Skeleton'
import { numberSpringConfig } from '@/lib/animations'

// ─── Número animado com spring ────────────────────────────────────────────────
function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, numberSpringConfig)
  const display = useTransform(spring, (val) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
  )

  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  return <motion.span>{display}</motion.span>
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export function CantinaBalanceCard() {
  const { balance, balanceLoading } = useCantina()
  const navigate = useNavigate()

  if (balanceLoading) return <BalanceCardSkeleton />

  const balanceValue = balance?.balance ?? 0
  const churchCut = balance?.total_church_cut ?? 0

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 30, stiffness: 280 }}
        className="mx-5 glass-accent rounded-[20px] p-5 overflow-hidden relative"
      >
        {/* Glow decorativo */}
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
          style={{ background: 'rgba(76,114,196,0.08)', filter: 'blur(40px)' }}
        />

        {/* Label */}
        <p className="text-label relative" style={{ color: 'var(--color-text-muted)' }}>
          SALDO ATUAL
        </p>

        {/* Valor animado */}
        <p
          className="relative leading-none mt-2"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '42px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          <AnimatedNumber value={balanceValue} />
        </p>

        {/* Corte da igreja */}
        <p
          className="flex items-center gap-1 mt-2 relative"
          style={{ fontSize: '13px', color: 'var(--color-success)' }}
        >
          <TrendingUp size={13} />
          {formatCurrency(churchCut)} para a igreja
        </p>

        {/* Botões de ação */}
        <div className="flex gap-2 mt-4 relative">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => navigate('/cantina')}
            className="flex-1 h-9 rounded-full glass-1 text-[13px] font-medium"
            style={{ color: 'var(--color-text-primary)' }}
          >
            ＋ Venda
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => navigate('/cantina')}
            className="flex-1 h-9 rounded-full glass-1 text-[13px] font-medium"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Histórico
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
