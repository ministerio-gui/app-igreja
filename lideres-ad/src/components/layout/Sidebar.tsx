/**
 * Sidebar — desktop navigation (lg: breakpoint and above)
 * Matches reference: logo + subtitle, nav items, settings + logout at bottom
 */
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { to: '/', icon: 'home', label: 'Home', end: true },
  { to: '/calendario', icon: 'calendar_today', label: 'Calendário', end: false },
  { to: '/cantina', icon: 'restaurant', label: 'Cantina', end: false },
  { to: '/ausencias', icon: 'person_off', label: 'Ausências', end: false },
] as const

export function Sidebar() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div
      className="flex flex-col h-full w-full"
      style={{ backgroundColor: 'var(--color-bg-elevated)', borderRight: '1px solid rgba(76,114,196,0.12)' }}
    >
      {/* ── Logo / Brand ── */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-5" style={{ borderBottom: '1px solid rgba(76,114,196,0.12)' }}>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'var(--color-accent-primary)' }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: '20px',
              color: '#EEE8DC',
              fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
            }}
          >
            shield_with_heart
          </span>
        </div>
        <div>
          <p style={{ color: 'var(--color-text-primary)', fontWeight: 700, fontSize: '16px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            Líderes AD
          </p>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Assembleia de Deus
          </p>
        </div>
      </div>

      {/* ── Navigation items ── */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {NAV_ITEMS.map(({ to, icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors text-[14px] font-medium',
                isActive
                  ? 'text-[#EEE8DC]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[rgba(76,114,196,0.06)]'
              )
            }
            style={({ isActive }) =>
              isActive ? { backgroundColor: '#4C72C4' } : undefined
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: '20px',
                    fontVariationSettings: isActive
                      ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
                      : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  {icon}
                </span>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Bottom: Settings + Logout ── */}
      <div className="px-3 pb-5 flex flex-col gap-1" style={{ borderTop: '1px solid rgba(76,114,196,0.12)', paddingTop: '12px' }}>
        <NavLink
          to="/configuracoes"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors text-[14px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[rgba(76,114,196,0.06)]"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>settings</span>
          <span>Configurações</span>
        </NavLink>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors text-[14px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[rgba(76,114,196,0.06)] w-full text-left"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
          <span>Sair</span>
        </button>
      </div>
    </div>
  )
}
