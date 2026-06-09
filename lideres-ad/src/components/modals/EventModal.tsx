import { useState } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { AdaptiveModal } from '@/components/ui/AdaptiveModal'
import { useUIStore } from '@/store/uiStore'
import { useEvents } from '@/hooks/useEvents'
import { useAuth } from '@/hooks/useAuth'

const COLOR_SWATCHES = [
  { value: '#4C72C4', label: 'Azul' },
  { value: '#22D3A0', label: 'Verde' },
  { value: '#F5A623', label: 'Laranja' },
  { value: '#E85D4A', label: 'Vermelho' },
  { value: '#A855F7', label: 'Roxo' },
  { value: '#64748B', label: 'Cinza' },
]

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px',
  padding: '10px 12px',
  fontSize: '15px',
  color: 'var(--color-text-primary)',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: 'var(--color-text-muted)',
  display: 'block',
  marginBottom: '6px',
}

export function EventModal() {
  const { eventModalOpen, closeEventModal } = useUIStore()
  const { createAsync, isCreating } = useEvents()
  const { user } = useAuth()

  const today = new Date().toISOString().split('T')[0]

  const [title, setTitle] = useState('')
  const [date, setDate] = useState(today)
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('10:00')
  const [allDay, setAllDay] = useState(false)
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('#4C72C4')

  function resetForm() {
    setTitle('')
    setDate(today)
    setStartTime('09:00')
    setEndTime('10:00')
    setAllDay(false)
    setLocation('')
    setDescription('')
    setColor('#4C72C4')
  }

  function handleClose() {
    resetForm()
    closeEventModal()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    if (!title.trim()) {
      toast.error('O título é obrigatório.')
      return
    }
    if (!date) {
      toast.error('A data é obrigatória.')
      return
    }

    const start_at = allDay ? `${date}T00:00:00` : `${date}T${startTime}:00`
    const end_at   = allDay ? `${date}T23:59:59` : `${date}T${endTime}:00`

    try {
      await createAsync({
        title: title.trim(),
        description: description.trim() || null,
        location: location.trim() || null,
        start_at,
        end_at,
        all_day: allDay,
        color,
        created_by: user.id,
      })
      toast.success('Evento criado!')
      handleClose()
    } catch {
      toast.error('Erro ao criar evento. Tente novamente.')
    }
  }

  return (
    <AdaptiveModal open={eventModalOpen} onClose={handleClose} title="Novo Evento">
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Título */}
          <div>
            <label style={labelStyle}>Título *</label>
            <input
              style={inputStyle}
              placeholder="Nome do evento"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          {/* Data */}
          <div>
            <label style={labelStyle}>Data *</label>
            <input
              type="date"
              style={{ ...inputStyle, colorScheme: 'dark' }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* O dia todo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setAllDay(!allDay)}
              style={{
                width: '40px',
                height: '24px',
                borderRadius: '12px',
                background: allDay ? 'var(--color-accent-primary)' : 'rgba(255,255,255,0.12)',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '3px',
                  left: allDay ? '19px' : '3px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#fff',
                  transition: 'left 0.2s',
                }}
              />
            </button>
            <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              O dia todo
            </span>
          </div>

          {/* Horários */}
          {!allDay && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Início</label>
                <input
                  type="time"
                  style={{ ...inputStyle, colorScheme: 'dark' }}
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>Fim</label>
                <input
                  type="time"
                  style={{ ...inputStyle, colorScheme: 'dark' }}
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Local */}
          <div>
            <label style={labelStyle}>Local</label>
            <input
              style={inputStyle}
              placeholder="Endereço ou nome do local"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Descrição */}
          <div>
            <label style={labelStyle}>Descrição</label>
            <textarea
              style={{ ...inputStyle, resize: 'none', height: '72px' }}
              placeholder="Detalhes do evento..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Cor */}
          <div>
            <label style={labelStyle}>Cor</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {COLOR_SWATCHES.map((swatch) => (
                <button
                  key={swatch.value}
                  type="button"
                  onClick={() => setColor(swatch.value)}
                  title={swatch.label}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: swatch.value,
                    border: color === swatch.value ? '2px solid #fff' : '2px solid transparent',
                    cursor: 'pointer',
                    outline: color === swatch.value ? `3px solid ${swatch.value}` : 'none',
                    outlineOffset: '1px',
                    transition: 'transform 0.15s',
                    transform: color === swatch.value ? 'scale(1.15)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={isCreating}
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: '12px',
              background: isCreating ? 'rgba(76,114,196,0.5)' : 'var(--color-accent-primary)',
              border: 'none',
              color: '#fff',
              fontSize: '15px',
              fontWeight: 600,
              cursor: isCreating ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '4px',
            }}
          >
            {isCreating && <Loader2 size={16} className="animate-spin" />}
            {isCreating ? 'Salvando...' : 'Salvar Evento'}
          </button>
        </div>
      </form>
    </AdaptiveModal>
  )
}
