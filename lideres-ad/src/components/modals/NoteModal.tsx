import { useState } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { AdaptiveModal } from '@/components/ui/AdaptiveModal'
import { useUIStore } from '@/store/uiStore'
import { useNotes } from '@/hooks/useNotes'
import { useAuth } from '@/hooks/useAuth'

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--color-bg-subtle)',
  border: '1px solid var(--color-bg-overlay)',
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

export function NoteModal() {
  const { noteModalOpen, closeNoteModal } = useUIStore()
  const { createAsync, isCreating } = useNotes()
  const { user, profile } = useAuth()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isGlobal, setIsGlobal] = useState(false)

  const isAdmin = profile?.role === 'admin'

  function resetForm() {
    setTitle('')
    setContent('')
    setIsGlobal(false)
  }

  function handleClose() {
    resetForm()
    closeNoteModal()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    if (!content.trim()) {
      toast.error('O conteúdo da nota é obrigatório.')
      return
    }

    try {
      await createAsync({
        title: title.trim() || undefined,
        content: content.trim(),
        is_global: isAdmin ? isGlobal : false,
        author_id: user.id,
      })
      toast.success('Nota criada!')
      handleClose()
    } catch {
      toast.error('Erro ao criar nota. Tente novamente.')
    }
  }

  return (
    <AdaptiveModal open={noteModalOpen} onClose={handleClose} title="Nova Nota">
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Título (opcional) */}
          <div>
            <label style={labelStyle}>Título</label>
            <input
              style={inputStyle}
              placeholder="Sem título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Conteúdo */}
          <div>
            <label style={labelStyle}>Conteúdo *</label>
            <textarea
              style={{ ...inputStyle, resize: 'none', height: '144px' }}
              placeholder="Escreva sua nota aqui..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              autoFocus
            />
          </div>

          {/* Global toggle — admins apenas */}
          {isAdmin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setIsGlobal(!isGlobal)}
                style={{
                  width: '40px',
                  height: '24px',
                  borderRadius: '12px',
                  background: isGlobal ? '#22D3A0' : 'rgba(76,114,196,0.15)',
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
                    left: isGlobal ? '19px' : '3px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: '#fff',
                    transition: 'left 0.2s',
                  }}
                />
              </button>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>
                  Nota global
                </p>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0 }}>
                  Visível para todos os líderes
                </p>
              </div>
            </div>
          )}

          {/* Botão */}
          <button
            type="submit"
            disabled={isCreating}
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: '12px',
              background: isCreating ? 'rgba(34,211,160,0.4)' : '#22D3A0',
              border: 'none',
              color: '#0F2614',
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
            {isCreating ? 'Salvando...' : 'Salvar Nota'}
          </button>
        </div>
      </form>
    </AdaptiveModal>
  )
}
