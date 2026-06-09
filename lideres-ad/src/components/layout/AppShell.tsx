/**
 * AppShell — wraps all authenticated pages with BottomNav
 */
import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'

export function AppShell() {
  return (
    <div className="min-h-dvh bg-[var(--color-bg-base)] pb-16">
      <main className="max-w-[480px] mx-auto">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
