/**
 * RequireAuth — wraps protected routes, redirects to /login if no session
 */
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

interface Props {
  children: React.ReactNode
}

export function RequireAuth({ children }: Props) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-dvh bg-[var(--color-bg-base)]">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--color-accent-primary)] border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!session) return <Navigate to="/login" replace />

  return <>{children}</>
}
