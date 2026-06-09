/**
 * HomePage — dashboard with greeting, events strip, and summary cards
 * Placeholder until Sprint 2 build-out
 */
import { useAuth } from '@/hooks/useAuth'

export default function HomePage() {
  const { profile } = useAuth()

  return (
    <div className="p-5 space-y-6">
      <header>
        <h1 className="text-[var(--color-cream)] font-bold text-2xl">
          Olá, {profile?.full_name?.split(' ')[0] ?? 'líder'} 👋
        </h1>
        <p className="text-[var(--color-text-secondary)] text-sm mt-1">
          Bem-vindo ao painel de liderança
        </p>
      </header>

      <div className="bg-[var(--color-bg-surface)] rounded-[var(--radius-md)] p-5 border border-[var(--color-bg-overlay)]">
        <p className="text-[var(--color-text-muted)] text-sm text-center py-6">
          Dashboard em construção — Sprint 2
        </p>
      </div>
    </div>
  )
}
