/**
 * LoginPage — email/password authentication
 */
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await signIn(email.trim(), password)
    setLoading(false)
    if (error) {
      setError('E-mail ou senha incorretos.')
    } else {
      navigate('/', { replace: true })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-dvh bg-[var(--color-bg-base)] px-5">
      <div className="w-full max-w-sm">
        {/* Logo area */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-18 h-18 rounded-[var(--radius-lg)] bg-[var(--color-bg-elevated)] flex items-center justify-center mb-4">
            <span className="text-3xl">✝</span>
          </div>
          <h1 className="text-[var(--color-cream)] font-bold text-3xl tracking-tight">Líderes AD</h1>
          <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest mt-1">
            Assembleia de Deus · Liderança Jovem
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--color-bg-surface)] rounded-[var(--radius-lg)] p-6 shadow-lg space-y-4"
        >
          <div className="space-y-1">
            <label className="text-[var(--color-text-secondary)] text-sm font-medium">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] rounded-[var(--radius-sm)] px-4 py-3 text-sm outline-none border border-transparent focus:border-[var(--color-accent-primary)] transition-colors"
              placeholder="seu@email.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[var(--color-text-secondary)] text-sm font-medium">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] rounded-[var(--radius-sm)] px-4 py-3 text-sm outline-none border border-transparent focus:border-[var(--color-accent-primary)] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-[var(--color-danger)] text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-accent-primary)] text-[var(--color-cream)] font-semibold rounded-[var(--radius-sm)] py-3.5 text-sm transition-opacity disabled:opacity-60 active:scale-[0.98]"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
