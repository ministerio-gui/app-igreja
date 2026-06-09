/**
 * LoginPage — tela de login fiel ao protótipo
 * Design: Navy #1B2A4A + Cream #EEE8DC, fundo #090D15
 */
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const { signIn } = useAuth()
  
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError]       = useState<string | null>(null)
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await signIn(email.trim(), password)
    setLoading(false)
    if (error) setError('E-mail ou senha incorretos.')
    else navigate('/', { replace: true })
  }

  return (
    /* Fundo escuro cobre toda a viewport, flex justify-center centraliza a coluna */
    <div
      className="min-h-dvh w-full flex justify-center"
      style={{ backgroundColor: '#090D15', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Blobs decorativos — fixos na viewport */}
      <div className="pointer-events-none fixed top-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full"
        style={{ background: '#4C72C4', opacity: 0.03, filter: 'blur(100px)' }} />
      <div className="pointer-events-none fixed bottom-[-50px] left-[-50px] w-[250px] h-[250px] rounded-full"
        style={{ background: '#4C72C4', opacity: 0.02, filter: 'blur(80px)' }} />

      {/* Coluna central — w-full até max 390px, h-dvh fixa para h-[35%] funcionar */}
      <div className="h-dvh w-full max-w-[390px] flex flex-col overflow-hidden" style={{ color: '#EEE8DC' }}>

      {/* Área superior — 35% da altura para alinhar logo ao fundo da seção */}
      <div className="flex flex-col items-center justify-end h-[35%] pb-8 px-6">
        {/* Logo */}
        <div
          className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: '#1B2A4A' }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: '40px', color: '#EEE8DC', fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
          >
            shield_with_heart
          </span>
        </div>

        <h1
          className="text-[32px] leading-tight text-center mb-1"
          style={{ fontWeight: 800, color: '#EEE8DC', letterSpacing: '-0.02em' }}
        >
          Líderes AD
        </h1>
        <p
          className="text-[11px] text-center uppercase"
          style={{ color: '#3D506B', letterSpacing: '0.12em' }}
        >
          Assembleia de Deus · Liderança Jovem
        </p>
      </div>

      {/* Form card */}
      <main className="flex-1 px-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-5 rounded-[18px] p-[26px]"
          style={{
            backgroundColor: '#111827',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          }}
        >
          {/* Email */}
          <div className="flex flex-col space-y-2">
            <label className="text-[13px] font-medium px-1" style={{ color: '#7A8BA8' }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="nome@admissao.com.br"
              className="w-full h-[50px] rounded-[10px] px-4 outline-none transition-all"
              style={{
                backgroundColor: '#0F1A2E',
                border: '1px solid rgba(255,255,255,0.10)',
                color: '#EEE8DC',
                fontSize: '14px',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = '#4C72C4')}
              onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)')}
            />
          </div>

          {/* Senha */}
          <div className="flex flex-col space-y-2">
            <label className="text-[13px] font-medium px-1" style={{ color: '#7A8BA8' }}>
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full h-[50px] rounded-[10px] px-4 pr-12 outline-none transition-all"
                style={{
                  backgroundColor: '#0F1A2E',
                  border: '1px solid rgba(255,255,255,0.10)',
                  color: '#EEE8DC',
                  fontSize: '14px',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#4C72C4')}
                onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)')}
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: '#7A8BA8' }}
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-[13px]" style={{ color: '#7A8BA8' }}>
                Esqueci minha senha
              </a>
            </div>
          </div>

          {/* Erro */}
          {error && (
            <p className="text-[13px] text-center" style={{ color: '#F05252' }}>{error}</p>
          )}

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[52px] font-semibold text-[15px] rounded-[10px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60 mt-4"
            style={{
              backgroundColor: '#4C72C4',
              color: '#EEE8DC',
              boxShadow: '0 4px 24px rgba(76,114,196,0.35)',
            }}
          >
            {loading ? 'Entrando...' : (
              <>
                <span>Entrar</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="pb-10 flex flex-col items-center gap-4">
        <span className="text-[11px]" style={{ color: '#3D506B' }}>v1.0</span>
        <div className="h-1 w-32 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.10)' }} />
      </footer>

      </div>{/* fim coluna central */}
    </div>
  )
}
