/**
 * BottomNav — glassmorphism com FAB central e speed-dial
 * Layout 5 slots: Início | Calendário | [+FAB] | Cantina | Ausências
 */
import { useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { Home, Calendar, ShoppingBag, UserX, Plus, CalendarPlus, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fabItemVariants, backdropVariants } from '@/lib/animations'
import { useUIStore } from '@/store/uiStore'

// ─── Nav items (4 regulares, FAB fica no slot 3) ─────────────────────────────

const LEFT_NAV: { to: string; icon: LucideIcon; label: string; end: boolean }[] = [
  { to: '/', icon: Home, label: 'Início', end: true },
  { to: '/calendario', icon: Calendar, label: 'Calendário', end: false },
]

const RIGHT_NAV: { to: string; icon: LucideIcon; label: string; end: boolean }[] = [
  { to: '/cantina', icon: ShoppingBag, label: 'Cantina', end: false },
  { to: '/ausencias', icon: UserX, label: 'Ausências', end: false },
]

// ─── NavItem ─────────────────────────────────────────────────────────────────

interface NavItemProps {
  to: string
  icon: LucideIcon
  label: string
  isActive: boolean
}

function NavItem({ to, icon: Icon, label, isActive }: NavItemProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.88 }}
      transition={{ type: 'spring', damping: 20, stiffness: 500 }}
      className="relative flex flex-col items-center gap-1 py-1.5 flex-1"
    >
      {isActive && (
        <motion.div
          layoutId="bottom-nav-pill"
          className="absolute inset-0 rounded-2xl"
          style={{
            backgroundColor: 'rgba(76,114,196,0.12)',
            border: '1px solid rgba(76,114,196,0.15)',
          }}
          transition={{ type: 'spring', damping: 28, stiffness: 380 }}
        />
      )}

      <Link to={to} className="flex flex-col items-center gap-1 relative z-10 w-full">
        <motion.div
          animate={{ scale: isActive ? 1.1 : 1, y: isActive ? -1 : 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 400 }}
        >
          <Icon
            size={20}
            strokeWidth={isActive ? 2 : 1.5}
            style={{ color: isActive ? 'var(--color-accent-primary)' : 'var(--color-text-muted)' }}
          />
        </motion.div>
        <motion.span
          animate={{ opacity: isActive ? 1 : 0.5 }}
          className={cn(
            'text-[10px] font-medium leading-none',
            isActive ? 'text-[var(--color-accent-primary)]' : 'text-[var(--color-text-muted)]'
          )}
        >
          {label}
        </motion.span>
      </Link>
    </motion.div>
  )
}

// ─── FAB speed-dial ──────────────────────────────────────────────────────────

interface SpeedDialItem {
  id: string
  label: string
  icon: React.ReactNode
  color: string
  action: () => void
}

interface SpeedDialButtonProps {
  item: SpeedDialItem
  onPress: () => void
}

function SpeedDialButton({ item, onPress }: SpeedDialButtonProps) {
  return (
    <motion.div
      variants={fabItemVariants}
      className="flex items-center gap-3"
      style={{ flexDirection: 'row-reverse' }}
    >
      {/* Circle button */}
      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={onPress}
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'rgba(27,42,74,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${item.color}33`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: `0 4px 20px ${item.color}22, 0 2px 6px rgba(0,0,0,0.4)`,
          flexShrink: 0,
          color: item.color,
        }}
      >
        {item.icon}
      </motion.button>

      {/* Label */}
      <span
        className="speed-dial-label"
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          padding: '5px 10px',
          borderRadius: '8px',
          whiteSpace: 'nowrap',
        }}
      >
        {item.label}
      </span>
    </motion.div>
  )
}

// ─── BottomNav ────────────────────────────────────────────────────────────────

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { openEventModal, openNoteModal } = useUIStore()
  const [fabOpen, setFabOpen] = useState(false)

  function closeFab() { setFabOpen(false) }

  const speedDialItems: SpeedDialItem[] = [
    {
      id: 'event',
      label: 'Novo Evento',
      icon: <CalendarPlus size={22} />,
      color: '#4C72C4',
      action: () => { closeFab(); openEventModal() },
    },
    {
      id: 'note',
      label: 'Nova Nota',
      icon: <FileText size={22} />,
      color: '#22D3A0',
      action: () => { closeFab(); openNoteModal() },
    },
    {
      id: 'absence',
      label: 'Nova Ausência',
      icon: <UserX size={22} />,
      color: '#F5A623',
      action: () => { closeFab(); navigate('/ausencias') },
    },
  ]

  return (
    <>
      {/* Speed-dial backdrop */}
      <AnimatePresence>
        {fabOpen && (
          <motion.div
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
            onClick={closeFab}
          />
        )}
      </AnimatePresence>

      {/* Speed-dial items */}
      <AnimatePresence>
        {fabOpen && (
          <motion.div
            variants={{ animate: { transition: { staggerChildren: 0.055, staggerDirection: -1 } } }}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed z-50 flex flex-col gap-3 items-end"
            style={{ bottom: '96px', right: '20px' }}
          >
            {speedDialItems.map((item) => (
              <SpeedDialButton key={item.id} item={item} onPress={item.action} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 pb-safe">
        <div className="mx-3 mb-3 rounded-[26px] glass-2 px-2 py-2 flex items-center">
          {/* Left nav items */}
          {LEFT_NAV.map(({ to, icon, label, end }) => {
            const isActive = end
              ? location.pathname === to
              : location.pathname.startsWith(to)
            return (
              <NavItem key={to} to={to} icon={icon} label={label} isActive={isActive} />
            )
          })}

          {/* FAB slot — elevated center button */}
          <div className="flex-1 flex justify-center">
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => setFabOpen(!fabOpen)}
              className="-mt-6 w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: fabOpen
                  ? 'rgba(76,114,196,0.3)'
                  : 'linear-gradient(135deg, #4C72C4 0%, #3A5BA8 100%)',
                border: '3px solid rgba(9,13,21,1)',
                boxShadow: '0 4px 20px rgba(76,114,196,0.5), 0 2px 6px rgba(0,0,0,0.5)',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              <motion.div
                animate={{ rotate: fabOpen ? 45 : 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              >
                <Plus size={26} color="#fff" strokeWidth={2.5} />
              </motion.div>
            </motion.button>
          </div>

          {/* Right nav items */}
          {RIGHT_NAV.map(({ to, icon, label, end }) => {
            const isActive = end
              ? location.pathname === to
              : location.pathname.startsWith(to)
            return (
              <NavItem key={to} to={to} icon={icon} label={label} isActive={isActive} />
            )
          })}
        </div>
      </div>
    </>
  )
}
