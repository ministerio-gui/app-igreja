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
      style={{ backgroundColor: '#0D1B2E', borderRight: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* ── Logo / Brand ── */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: '#1B2A4A' }}
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
          <p style={{ color: '#EEE8DC', fontWeight: 700, fontSize: '16px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            Líderes AD
          </p>
          <p style={{ color: '#7A8BA8', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
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
                  : 'text-[#7A8BA8] hover:text-[#EEE8DC] hover:bg-[rgba(255,255,255,0.04)]'
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
      <div className="px-3 pb-5 flex flex-col gap-1" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '12px' }}>
        <NavLink
          to="/configuracoes"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors text-[14px] font-medium text-[#7A8BA8] hover:text-[#EEE8DC] hover:bg-[rgba(255,255,255,0.04)]"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>settings</span>
          <span>Configurações</span>
        </NavLink>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors text-[14px] font-medium text-[#7A8BA8] hover:text-[#EEE8DC] hover:bg-[rgba(255,255,255,0.04)] w-full text-left"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
          <span>Sair</span>
        </button>
      </div>
    </div>
  )
}
