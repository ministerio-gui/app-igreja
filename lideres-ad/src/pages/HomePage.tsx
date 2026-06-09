/**
 * HomePage — dashboard responsivo
 * Mobile: layout vertical com seções empilhadas + BottomNav + FAB
 * Desktop (lg+): header fixo + grid 2 colunas (eventos+cantina | notas) + ausências largura total
 */
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useEvents } from '@/hooks/useEvents'
import { useNotes } from '@/hooks/useNotes'
import { useCantina } from '@/hooks/useCantina'
import { useAbsences } from '@/hooks/useAbsences'
import { useThemeStore } from '@/store/themeStore'
import { formatCurrency, formatTime } from '@/lib/formatters'
import type { Event, Note } from '@/types'

// ─── Helpers ────────────────────────────────────────────────────────────────

function getInitials(name: string | null): string {
  if (!name) return 'AD'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function formatEventDate(dateStr: string): string {
  const d = new Date(dateStr)
  const weekday = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(d)
  const wd = weekday.charAt(0).toUpperCase() + weekday.slice(1).replace('.', '')
  return `${wd}, ${formatTime(dateStr)}`
}

function formatRelativeTime(dateStr: string): string {
  const now = new Date()
  const then = new Date(dateStr)
  const diffMs = now.getTime() - then.getTime()
  const diffH = Math.floor(diffMs / 3_600_000)
  const diffD = Math.floor(diffMs / 86_400_000)
  if (diffH < 1) return 'Agora'
  if (diffH < 24) return `${diffH}h atrás`
  if (diffD === 1) return 'Ontem'
  return `${diffD}d atrás`
}

function getThisWeekRange(): { start: Date; end: Date } {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const day = today.getDay()
  const diffToMon = day === 0 ? -6 : 1 - day
  const start = new Date(today)
  start.setDate(today.getDate() + diffToMon)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  end.setHours(23, 59, 59, 999)
  return { start, end }
}

// ─── Shared primitives ──────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: '11px',
        fontWeight: 600,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.1em',
        color: '#7A8BA8',
      }}
    >
      {children}
    </h2>
  )
}

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}
    />
  )
}

// ─── Mobile sub-components ───────────────────────────────────────────────────

function MobileEventCard({ event }: { event: Event }) {
  return (
    <div
      className="flex-shrink-0 w-[200px] h-[90px] flex flex-col justify-center p-4 rounded-xl shadow-md"
      style={{ backgroundColor: '#1B2A4A', borderLeft: '4px solid #4C72C4' }}
    >
      <span className="font-bold block" style={{ color: '#EEE8DC', fontSize: '14px' }}>
        {event.title}
      </span>
      <span className="mt-1" style={{ color: '#7A8BA8', fontSize: '12px' }}>
        {formatEventDate(event.start_at)}
      </span>
    </div>
  )
}

function MobileNoteCard({ note }: { note: Note }) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col justify-between"
      style={{
        backgroundColor: '#111827',
        border: '1px solid rgba(255,255,255,0.07)',
        minHeight: '120px',
      }}
    >
      <div className="flex justify-between items-start">
        {note.is_global ? (
          <span
            className="rounded-full px-2 py-0.5 uppercase font-extrabold"
            style={{
              backgroundColor: 'rgba(34,211,160,0.12)',
              color: '#22D3A0',
              fontSize: '10px',
              letterSpacing: '0.05em',
            }}
          >
            Global
          </span>
        ) : (
          <span />
        )}
        {note.pinned && (
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: '18px',
              color: '#7A8BA8',
              fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
            }}
          >
            push_pin
          </span>
        )}
      </div>
      <p className="mt-2 font-medium leading-tight" style={{ color: '#EEE8DC', fontSize: '13px' }}>
        {note.title}
      </p>
    </div>
  )
}

function MobileNoteEmptyCard() {
  return (
    <div
      className="rounded-xl p-4 flex flex-col items-center justify-center gap-2"
      style={{
        backgroundColor: '#111827',
        border: '1px solid rgba(255,255,255,0.07)',
        minHeight: '120px',
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#3D506B' }}>
        add_notes
      </span>
      <span style={{ fontSize: '12px', color: '#3D506B' }}>Nova nota</span>
    </div>
  )
}

// ─── Desktop sub-components ──────────────────────────────────────────────────

function DesktopEventCard({ event }: { event: Event }) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3"
      style={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="flex justify-between items-center">
        <span
          className="rounded-full px-2.5 py-0.5 uppercase font-bold text-[10px] tracking-wider"
          style={{ backgroundColor: (event.color || '#4C72C4') + '22', color: event.color || '#4C72C4' }}
        >
          Evento
        </span>
        <span style={{ color: '#7A8BA8', fontSize: '12px' }}>{formatEventDate(event.start_at)}</span>
      </div>
      <div>
        <h3 style={{ color: '#EEE8DC', fontWeight: 700, fontSize: '17px', lineHeight: 1.3 }}>
          {event.title}
        </h3>
        {event.description && (
          <p className="mt-1 line-clamp-2" style={{ color: '#7A8BA8', fontSize: '13px', lineHeight: 1.5 }}>
            {event.description}
          </p>
        )}
      </div>
      <div className="flex justify-end mt-auto">
        <button
          className="px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-colors"
          style={{
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#EEE8DC',
            backgroundColor: 'transparent',
          }}
        >
          Detalhes
        </button>
      </div>
    </div>
  )
}

function DesktopNoteCard({ note }: { note: Note }) {
  return (
    <div
      className="rounded-xl p-4"
      style={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="flex justify-between items-start gap-3">
        <span
          className="font-semibold leading-tight"
          style={{ color: '#EEE8DC', fontSize: '14px', flex: 1 }}
        >
          {note.title}
        </span>
        <span className="flex-shrink-0" style={{ color: '#7A8BA8', fontSize: '11px', marginTop: '2px' }}>
          {formatRelativeTime(note.created_at)}
        </span>
      </div>
      {note.content && (
        <p className="mt-1.5 line-clamp-2" style={{ color: '#7A8BA8', fontSize: '13px', lineHeight: 1.5 }}>
          {note.content}
        </p>
      )}
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function HomePage() {
  const { profile } = useAuth()
  const { toggle: toggleTheme } = useThemeStore()
  const { data: events, isLoading: eventsLoading } = useEvents()
  const { data: notes, isLoading: notesLoading } = useNotes()
  const { balance, balanceLoading } = useCantina()
  const { data: absences, isLoading: absencesLoading } = useAbsences()

  const now = new Date().toISOString()
  const upcomingEvents = events?.filter(e => e.start_at >= now).slice(0, 4) ?? []

  const { start, end } = getThisWeekRange()
  const weekAbsences = absences?.filter(a => {
    const d = new Date(a.absence_date + 'T12:00:00')
    return d >= start && d <= end
  }).slice(0, 8) ?? []

  const firstName = profile?.full_name?.split(' ')[0] ?? 'líder'

  return (
    <>
      {/* ════════════════════════════════════════════════════
          MOBILE HEADER  (hidden on lg+)
      ════════════════════════════════════════════════════ */}
      <header
        className="lg:hidden sticky top-0 z-30 flex justify-between items-center px-6 py-4"
        style={{ backgroundColor: '#090D15', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#EEE8DC', letterSpacing: '-0.01em' }}>
          Olá, {firstName} 👋
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
            style={{ color: '#7A8BA8' }}
            aria-label="Alternar tema"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>dark_mode</span>
          </button>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
            style={{ backgroundColor: '#1B2A4A', color: '#EEE8DC', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            {getInitials(profile?.full_name ?? null)}
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════
          DESKTOP HEADER  (hidden below lg)
      ════════════════════════════════════════════════════ */}
      <header
        className="hidden lg:flex sticky top-0 z-30 justify-between items-center px-8 py-5"
        style={{ backgroundColor: '#090D15', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#EEE8DC', letterSpacing: '-0.02em' }}>
          Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
            style={{ color: '#7A8BA8' }}
            aria-label="Buscar"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>search</span>
          </button>
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full transition-colors relative"
            style={{ color: '#7A8BA8' }}
            aria-label="Notificações"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>notifications</span>
          </button>
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
            style={{ color: '#7A8BA8' }}
            aria-label="Alternar tema"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>dark_mode</span>
          </button>
          <div className="flex items-center gap-3 pl-4" style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ color: '#EEE8DC', fontSize: '14px', fontWeight: 500 }}>
              {profile?.full_name ?? 'Líder'}
            </span>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ backgroundColor: '#1B2A4A', color: '#EEE8DC', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              {getInitials(profile?.full_name ?? null)}
            </div>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════
          MOBILE CONTENT  (hidden on lg+)
      ════════════════════════════════════════════════════ */}
      <main className="lg:hidden px-6 pt-6 pb-6 space-y-8">

        {/* Próximos Eventos */}
        <section>
          <SectionLabel>Próximos Eventos</SectionLabel>
          <div className="mt-4">
            {eventsLoading ? (
              <div className="flex gap-4 -mx-6 px-6">
                <Skeleton className="flex-shrink-0 w-[200px] h-[90px]" />
                <Skeleton className="flex-shrink-0 w-[200px] h-[90px]" />
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div
                className="rounded-xl px-4 py-6 text-center"
                style={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <p style={{ color: '#3D506B', fontSize: '13px' }}>Nenhum evento nos próximos dias</p>
              </div>
            ) : (
              <div className="flex overflow-x-auto gap-4 no-scrollbar -mx-6 px-6">
                {upcomingEvents.map(e => <MobileEventCard key={e.id} event={e} />)}
              </div>
            )}
          </div>
        </section>

        {/* Notas */}
        <section>
          <SectionLabel>Notas</SectionLabel>
          <div className="mt-4">
            {notesLoading ? (
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-[120px]" />
                <Skeleton className="h-[120px]" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {notes && notes.length > 0
                  ? notes.map(n => <MobileNoteCard key={n.id} note={n} />)
                  : <><MobileNoteEmptyCard /><MobileNoteEmptyCard /></>}
              </div>
            )}
          </div>
        </section>

        {/* Saldo Atual */}
        <section>
          <div
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{ backgroundColor: '#1B2A4A' }}
          >
            <div
              className="absolute -right-12 -top-12 w-32 h-32 rounded-full pointer-events-none"
              style={{ backgroundColor: '#4C72C4', opacity: 0.10, filter: 'blur(40px)' }}
            />
            <h2
              className="mb-2"
              style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#7A8BA8' }}
            >
              SALDO ATUAL
            </h2>
            {balanceLoading
              ? <Skeleton className="h-12 w-48 mt-1" />
              : <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '42px', fontWeight: 700, color: '#EEE8DC', lineHeight: 1.1, letterSpacing: '-0.02em', display: 'block' }}>
                  {formatCurrency(balance?.balance ?? 0)}
                </span>
            }
            <div className="flex items-center gap-2 mt-6" style={{ color: '#22D3A0' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                check_circle
              </span>
              <span style={{ fontSize: '12px', fontWeight: 600 }}>Atualizado em tempo real</span>
            </div>
          </div>
        </section>

        {/* Ausências */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <SectionLabel>Ausências Justificadas</SectionLabel>
            <Link to="/ausencias" style={{ fontSize: '10px', fontWeight: 700, color: '#4C72C4', letterSpacing: '0.05em' }}>
              VER TODAS
            </Link>
          </div>
          {absencesLoading ? (
            <div className="flex gap-5">
              {[0, 1, 2].map(i => <Skeleton key={i} className="w-10 h-10 rounded-full" />)}
            </div>
          ) : weekAbsences.length === 0 ? (
            <p style={{ color: '#3D506B', fontSize: '13px' }}>Nenhuma ausência esta semana</p>
          ) : (
            <div className="flex gap-5 items-center flex-wrap">
              {weekAbsences.map(a => (
                <div key={a.id} className="flex flex-col items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[11px]"
                    style={{ backgroundColor: '#1B2A4A', border: '2px solid rgba(255,255,255,0.12)', color: '#EEE8DC' }}
                  >
                    {getInitials(a.member.full_name)}
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#EEE8DC' }}>
                    {a.member.full_name?.split(' ')[0] ?? '—'}
                  </span>
                </div>
              ))}
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: '#111827', border: '1.5px dashed rgba(255,255,255,0.30)', color: '#7A8BA8' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
              </button>
            </div>
          )}
        </section>

      </main>

      {/* ════════════════════════════════════════════════════
          DESKTOP CONTENT  (hidden below lg)
      ════════════════════════════════════════════════════ */}
      <div className="hidden lg:block px-8 py-6">

        {/* Greeting hero */}
        <div className="mb-7">
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#EEE8DC', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Olá, {firstName} 👋
          </h2>
          <p className="mt-1" style={{ fontSize: '15px', color: '#7A8BA8' }}>
            Aqui está o resumo da liderança para hoje.
          </p>
        </div>

        {/* Top grid — Eventos (esq) + Notas (dir) */}
        <div className="grid gap-6" style={{ gridTemplateColumns: '1fr 320px' }}>

          {/* ── Coluna esquerda: Eventos + Cantina ── */}
          <div className="space-y-6">

            {/* Próximos Eventos */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <SectionLabel>Próximos Eventos</SectionLabel>
                <Link to="/calendario" style={{ fontSize: '13px', fontWeight: 600, color: '#4C72C4' }}>
                  Ver tudo
                </Link>
              </div>
              {eventsLoading ? (
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-[160px]" />
                  <Skeleton className="h-[160px]" />
                </div>
              ) : upcomingEvents.length === 0 ? (
                <div
                  className="rounded-2xl px-6 py-10 text-center"
                  style={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <span className="material-symbols-outlined block mb-3" style={{ fontSize: '32px', color: '#3D506B' }}>
                    event_busy
                  </span>
                  <p style={{ color: '#3D506B', fontSize: '14px' }}>Nenhum evento nos próximos dias</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {upcomingEvents.map(e => <DesktopEventCard key={e.id} event={e} />)}
                </div>
              )}
            </section>

            {/* Cantina Balance Card */}
            <section>
              <div
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{ backgroundColor: '#1B2A4A' }}
              >
                <div
                  className="absolute -right-12 -top-12 w-48 h-48 rounded-full pointer-events-none"
                  style={{ backgroundColor: '#4C72C4', opacity: 0.08, filter: 'blur(60px)' }}
                />
                <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#7A8BA8', marginBottom: '4px' }}>
                  Cantina Balance Card
                </p>
                <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#7A8BA8', marginBottom: '12px' }}>
                  Saldo Atual
                </p>
                {balanceLoading
                  ? <Skeleton className="h-14 w-56 mb-2" />
                  : <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '48px', fontWeight: 700, color: '#EEE8DC', lineHeight: 1, letterSpacing: '-0.02em', display: 'block', marginBottom: '6px' }}>
                      {formatCurrency(balance?.balance ?? 0)}
                    </span>
                }
                {balance?.total_church_cut != null && balance.total_church_cut > 0 && (
                  <p style={{ fontSize: '12px', color: '#7A8BA8', marginBottom: '20px' }}>
                    {formatCurrency(balance.total_church_cut)} destinados à igreja
                  </p>
                )}
                <div className="flex gap-3 justify-end mt-4">
                  <Link
                    to="/cantina"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors font-semibold"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#EEE8DC', fontSize: '13px', border: '1px solid rgba(255,255,255,0.12)' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>account_balance_wallet</span>
                    Recarregar
                  </Link>
                  <Link
                    to="/cantina"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors font-semibold"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#EEE8DC', fontSize: '13px', border: '1px solid rgba(255,255,255,0.12)' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>history</span>
                    Histórico
                  </Link>
                </div>
              </div>
            </section>

          </div>

          {/* ── Coluna direita: Notas ── */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <SectionLabel>Notas</SectionLabel>
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: 'rgba(76,114,196,0.15)', color: '#4C72C4' }}
                aria-label="Nova nota"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
              </button>
            </div>
            {notesLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-[80px]" />
                <Skeleton className="h-[80px]" />
              </div>
            ) : notes && notes.length > 0 ? (
              <div className="space-y-3">
                {notes.map(n => <DesktopNoteCard key={n.id} note={n} />)}
              </div>
            ) : (
              <div
                className="rounded-xl p-6 flex flex-col items-center justify-center gap-3 text-center"
                style={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.07)', minHeight: '160px' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#3D506B' }}>sticky_note_2</span>
                <p style={{ color: '#3D506B', fontSize: '13px' }}>Nenhuma nota ainda</p>
              </div>
            )}
          </section>

        </div>

        {/* ── Ausências — largura total ── */}
        <section className="mt-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <SectionLabel>Ausências esta semana</SectionLabel>
              <p className="mt-1" style={{ color: '#7A8BA8', fontSize: '12px' }}>
                Líderes que justificaram falta em atividades.
              </p>
            </div>
            <Link
              to="/ausencias"
              style={{ fontSize: '12px', fontWeight: 600, color: '#4C72C4', whiteSpace: 'nowrap', paddingTop: '2px' }}
            >
              Ver relatório detalhado
            </Link>
          </div>

          {absencesLoading ? (
            <div className="flex gap-5">
              {[0, 1, 2, 3].map(i => <Skeleton key={i} className="w-[72px] h-[90px]" />)}
            </div>
          ) : weekAbsences.length === 0 ? (
            <div
              className="rounded-2xl px-6 py-8 flex items-center gap-3"
              style={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#3D506B' }}>
                how_to_reg
              </span>
              <p style={{ color: '#3D506B', fontSize: '13px' }}>Nenhuma ausência registrada esta semana</p>
            </div>
          ) : (
            <div className="flex gap-5 items-end flex-wrap">
              {weekAbsences.map(a => (
                <div key={a.id} className="flex flex-col items-center gap-2">
                  <div className="relative">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{ backgroundColor: '#1B2A4A', border: '2px solid rgba(255,255,255,0.12)', color: '#EEE8DC' }}
                    >
                      {getInitials(a.member.full_name)}
                    </div>
                    <div
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#F05252' }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '12px', color: '#fff' }}>close</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#EEE8DC' }}>
                    {a.member.full_name?.split(' ').slice(0, 2).map((p, i) =>
                      i === 1 ? p[0] + '.' : p
                    ).join(' ') ?? '—'}
                  </span>
                </div>
              ))}
              <button
                className="w-14 h-14 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: '#111827', border: '1.5px dashed rgba(255,255,255,0.25)', color: '#7A8BA8' }}
                aria-label="Registrar ausência"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
              </button>
            </div>
          )}
        </section>

      </div>

      {/* ── FAB — mobile only ── */}
      <button
        className="lg:hidden fixed right-6 bottom-20 w-14 h-14 rounded-full flex items-center justify-center z-50 transition-transform active:scale-90"
        style={{ backgroundColor: '#4C72C4', boxShadow: '0 4px 24px rgba(76,114,196,0.35)', color: '#EEE8DC' }}
        aria-label="Adicionar"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '24px', fontVariationSettings: "'wght' 600" }}>
          add
        </span>
      </button>
    </>
  )
}
