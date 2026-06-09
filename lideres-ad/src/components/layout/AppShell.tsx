/**
 * AppShell — wraps authenticated pages with responsive navigation
 * Mobile: BottomNav (fixed bottom)
 * Desktop (lg+): Sidebar (fixed left, 240px)
 */
import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { Sidebar } from './Sidebar'

export function AppShell() {
  return (
    <div className="min-h-dvh" style={{ backgroundColor: 'var(--color-bg-base)' }}>
      {/* Sidebar — desktop only (lg: ≥1024px) */}
      <div className="hidden lg:block fixed inset-y-0 left-0 w-60 z-40">
        <Sidebar />
      </div>

      {/* Content area — offset by sidebar width on desktop */}
      <div className="lg:pl-60">
        <main className="max-w-[480px] mx-auto lg:max-w-none pb-16 lg:pb-0">
          <Outlet />
        </main>
      </div>

      {/* Bottom nav — mobile only */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  )
}
