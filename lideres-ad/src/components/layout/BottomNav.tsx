/**
 * BottomNav — mobile navigation bar (4 tabs)
 */
import { NavLink } from 'react-router-dom'
import { Home, Calendar, ShoppingBag, UserX } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { to: '/', icon: Home, label: 'Início', end: true },
  { to: '/calendario', icon: Calendar, label: 'Calendário', end: false },
  { to: '/cantina', icon: ShoppingBag, label: 'Cantina', end: false },
  { to: '/ausencias', icon: UserX, label: 'Ausências', end: false },
]

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[var(--color-bg-elevated)] border-t border-[var(--color-bg-overlay)] flex items-center safe-area-bottom z-40">
      {NAV_ITEMS.map(({ to, icon: Icon, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            cn(
              'flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-colors',
              isActive ? 'text-[var(--color-accent-primary)]' : 'text-[var(--color-text-muted)]'
            )
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={cn(
                  'p-1.5 rounded-full transition-colors',
                  isActive && 'bg-[var(--color-accent-subtle)]'
                )}
              >
                <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
              </div>
              <span className="text-[10px] uppercase tracking-wider font-medium">{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
