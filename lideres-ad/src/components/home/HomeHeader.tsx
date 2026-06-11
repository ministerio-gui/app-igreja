/**
 * HomeHeader — Sticky header com glass blur progressivo ao scroll
 * Scroll 0: transparente | Scroll 60px: glass blur completo
 * Dados: useAuth (nome) + useThemeStore (toggle)
 */
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Bell, Moon, Sun } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useThemeStore } from '@/store/themeStore'
import { getInitials } from '@/lib/utils'

function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

export function HomeHeader() {
  const { profile } = useAuth()
  const { theme, toggle } = useThemeStore()

  const firstName = profile?.full_name?.split(' ')[0] ?? ''
  const initials = getInitials(profile?.full_name ?? null)

  const isLight = theme === 'light'
  const { scrollY } = useScroll()
  const headerBg    = useTransform(
    scrollY, [0, 60],
    isLight ? ['rgba(255,255,255,0)', 'rgba(255,255,255,0.92)'] : ['rgba(9,13,21,0)', 'rgba(9,13,21,0.92)']
  )
  const headerBlur  = useTransform(scrollY, [0, 60], [0, 20])
  const borderColor = useTransform(
    scrollY, [40, 80],
    isLight ? ['rgba(27,42,74,0)', 'rgba(27,42,74,0.08)'] : ['rgba(255,255,255,0)', 'rgba(255,255,255,0.08)']
  )

  return (
    <motion.header
      style={{
        backgroundColor: headerBg,
        backdropFilter: useTransform(headerBlur, (v) => `blur(${v}px)`),
        borderBottomColor: borderColor,
      }}
      className="sticky top-0 z-30 flex items-center justify-between px-5 py-3 border-b border-transparent"
    >
      {/* ── Avatar + saudação ── */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            fontSize: '13px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
          }}
        >
          {initials}
        </div>
        <div>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1 }}>
            {getGreeting()}
          </p>
          <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.2 }}>
            {firstName} 👋
          </p>
        </div>
      </div>

      {/* ── Ações direita ── */}
      <div className="flex items-center gap-1">
        {/* Notificações */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          transition={{ type: 'spring', damping: 20, stiffness: 500 }}
          className="relative p-2.5 rounded-full glass-1"
          aria-label="Notificações"
        >
          <Bell size={18} style={{ color: 'var(--color-text-secondary)' }} />
        </motion.button>

        {/* Toggle tema */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          transition={{ type: 'spring', damping: 20, stiffness: 500 }}
          className="p-2.5 rounded-full glass-1"
          onClick={toggle}
          aria-label="Alternar tema"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {theme === 'dark'
                ? <Moon size={18} style={{ color: 'var(--color-text-secondary)' }} />
                : <Sun size={18} style={{ color: 'var(--color-text-secondary)' }} />
              }
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.header>
  )
}
