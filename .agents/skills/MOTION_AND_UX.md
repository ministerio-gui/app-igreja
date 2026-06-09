# SKILL — Motion & UX Premium
> Líderes AD · Bible de animações, interações e experiência
> Nível: Apple / Linear / Vercel — consultar em TODA feature desenvolvida
> Stack: Framer Motion + Tailwind CSS + React

---

## PRINCÍPIO CENTRAL

> "A interface deve parecer viva. Cada elemento responde ao toque, cada transição tem física, cada estado tem personalidade."

Toda interação do usuário — clique, hover, foco, scroll, navegação — deve ter resposta visual imediata e fisicamente coerente. Uma interface sem animação parece quebrada. Uma interface com animação errada parece barata. O objetivo é **invisível**: o usuário nunca pensa "que animação bonita", ele apenas sente que o app é premium.

---

## 1. FUNDAÇÃO — SETUP OBRIGATÓRIO

### Dependências
```bash
npm install framer-motion
npm install tailwindcss-animate   # para animações CSS utilitárias
```

### Arquivo de animações centralizadas
```typescript
// src/lib/animations.ts
// TODAS as variantes Framer Motion do projeto ficam aqui
// Nunca definir animações inline — sempre importar deste arquivo

import type { Variants, Transition } from 'framer-motion'

// ─── Easings ──────────────────────────────────────────────────────
export const ease = {
  spring:    [0.25, 0.46, 0.45, 0.94] as const,
  out:       [0.0,  0.0,  0.2,  1.0]  as const,
  inOut:     [0.4,  0.0,  0.2,  1.0]  as const,
  bounce:    [0.34, 1.56, 0.64, 1.0]  as const,
  sharp:     [0.4,  0.0,  0.6,  1.0]  as const,
}

// ─── Transitions base ─────────────────────────────────────────────
export const transition = {
  instant:   { duration: 0.08 }                                    as Transition,
  fast:      { duration: 0.15, ease: ease.out }                    as Transition,
  normal:    { duration: 0.22, ease: ease.spring }                 as Transition,
  slow:      { duration: 0.35, ease: ease.spring }                 as Transition,
  spring:    { type: 'spring', damping: 30, stiffness: 350 }       as Transition,
  springBounce: { type: 'spring', damping: 18, stiffness: 280 }   as Transition,
  springStiff:  { type: 'spring', damping: 40, stiffness: 500 }   as Transition,
}

// ─── Page Transitions ─────────────────────────────────────────────
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 16, scale: 0.99 },
  animate: { opacity: 1, y: 0,  scale: 1.0,
    transition: { duration: 0.28, ease: ease.spring } },
  exit:    { opacity: 0, y: -8, scale: 0.99,
    transition: { duration: 0.18, ease: ease.sharp } },
}

// ─── Stagger containers ───────────────────────────────────────────
export const staggerContainer: Variants = {
  animate: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
}
export const staggerContainerFast: Variants = {
  animate: { transition: { staggerChildren: 0.035, delayChildren: 0.02 } },
}

// ─── Card/Item de lista ───────────────────────────────────────────
export const cardVariants: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.97 },
  animate: { opacity: 1, y: 0,  scale: 1.0,
    transition: { duration: 0.30, ease: ease.spring } },
  exit:    { opacity: 0, y: -8, scale: 0.97,
    transition: { duration: 0.16, ease: ease.sharp } },
}

// ─── Fade simples ─────────────────────────────────────────────────
export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.20, ease: ease.out } },
  exit:    { opacity: 0, transition: { duration: 0.15, ease: ease.sharp } },
}

// ─── Slide up (bottom sheets, modais mobile) ──────────────────────
export const slideUpVariants: Variants = {
  initial: { y: '100%', opacity: 0.5 },
  animate: { y: 0, opacity: 1, transition: transition.spring },
  exit:    { y: '100%', opacity: 0,
    transition: { duration: 0.25, ease: ease.sharp } },
}

// ─── Slide in from right (drawer desktop) ─────────────────────────
export const slideRightVariants: Variants = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1, transition: transition.spring },
  exit:    { x: '100%', opacity: 0,
    transition: { duration: 0.22, ease: ease.sharp } },
}

// ─── Scale in (modais desktop) ────────────────────────────────────
export const scaleInVariants: Variants = {
  initial: { opacity: 0, scale: 0.94, y: 8 },
  animate: { opacity: 1, scale: 1.0,  y: 0,
    transition: transition.spring },
  exit:    { opacity: 0, scale: 0.96, y: 4,
    transition: { duration: 0.18, ease: ease.sharp } },
}

// ─── Backdrop ─────────────────────────────────────────────────────
export const backdropVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.20 } },
  exit:    { opacity: 0, transition: { duration: 0.18 } },
}

// ─── FAB expansion ────────────────────────────────────────────────
export const fabItemVariants: Variants = {
  initial: { opacity: 0, scale: 0.7, y: 12 },
  animate: { opacity: 1, scale: 1.0, y: 0,
    transition: transition.springBounce },
  exit:    { opacity: 0, scale: 0.8, y: 6,
    transition: { duration: 0.12, ease: ease.sharp } },
}

// ─── Skeleton pulse ───────────────────────────────────────────────
export const skeletonVariants: Variants = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: { duration: 1.8, ease: 'linear', repeat: Infinity },
  },
}

// ─── Search expansion ─────────────────────────────────────────────
export const searchExpandVariants: Variants = {
  collapsed: { width: 40, opacity: 0.7 },
  expanded:  { width: 280, opacity: 1,
    transition: transition.spring },
}

// ─── Número contador (saldo) ──────────────────────────────────────
// Usar com useSpring do framer-motion
export const numberSpringConfig = {
  type: 'spring', damping: 30, stiffness: 120,
}

// ─── Notificação/Toast entrada ────────────────────────────────────
export const toastVariants: Variants = {
  initial: { opacity: 0, y: -12, scale: 0.96 },
  animate: { opacity: 1, y: 0,   scale: 1.0,
    transition: transition.springStiff },
  exit:    { opacity: 0, y: -8,  scale: 0.96,
    transition: { duration: 0.18 } },
}
```

---

## 2. TRANSIÇÕES DE PÁGINA

### Regra absoluta
Toda troca de rota deve ter animação. Nunca corte seco entre páginas.

```typescript
// src/components/layout/PageWrapper.tsx
/**
 * PageWrapper — Envolve toda página com animação de entrada/saída
 * Usar em: TODAS as páginas sem exceção
 */
import { motion } from 'framer-motion'
import { pageVariants } from '@/lib/animations'

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn('h-full', className)}
    >
      {children}
    </motion.div>
  )
}

// Uso em App.tsx com AnimatePresence:
<AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>
    <Route path="/home" element={
      <PageWrapper><HomePage /></PageWrapper>
    } />
    {/* ... outras rotas */}
  </Routes>
</AnimatePresence>
```

---

## 3. MODAIS — COMPORTAMENTO ADAPTATIVO

### Regra central
**Desktop (≥ 768px):** Modal centralizado com scale-in + backdrop blur  
**Mobile (< 768px):** Bottom Sheet que desliza de baixo para cima

Nunca navegar para outra rota para uma ação que cabe em modal.
Exemplos de ações que SEMPRE abrem modal/sheet:
- Criar/editar evento, nota, produto, ausência
- Confirmar exclusão
- Ver detalhes de item
- Formulários de até 6 campos
- Busca expandida

```typescript
// src/components/ui/AdaptiveModal.tsx
/**
 * AdaptiveModal — Modal no desktop, Bottom Sheet no mobile
 * Detecta viewport e renderiza o container correto automaticamente
 */
import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  scaleInVariants, slideUpVariants,
  backdropVariants
} from '@/lib/animations'

interface AdaptiveModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export function AdaptiveModal({ open, onClose, children, title }: AdaptiveModalProps) {
  const isMobile = useMediaQuery('(max-width: 767px)')

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — igual nos dois */}
          <motion.div
            variants={backdropVariants}
            initial="initial" animate="animate" exit="exit"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Desktop: modal centralizado */}
          {!isMobile && (
            <motion.div
              variants={scaleInVariants}
              initial="initial" animate="animate" exit="exit"
              className={cn(
                'fixed inset-0 z-50 flex items-center justify-center p-4',
                'pointer-events-none'
              )}
            >
              <div className="
                bg-surface border border-white/[0.07]
                rounded-[18px] shadow-lg
                w-full max-w-lg p-6
                pointer-events-auto
              ">
                {title && (
                  <h2 className="text-h2 text-primary font-semibold mb-5">{title}</h2>
                )}
                {children}
              </div>
            </motion.div>
          )}

          {/* Mobile: bottom sheet */}
          {isMobile && (
            <motion.div
              variants={slideUpVariants}
              initial="initial" animate="animate" exit="exit"
              className="
                fixed bottom-0 inset-x-0 z-50
                bg-surface rounded-t-[24px]
                safe-area-bottom
              "
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-9 h-1 rounded-full bg-white/20" />
              </div>
              <div className="px-5 pb-6 pt-3">
                {title && (
                  <h2 className="text-h2 text-primary font-semibold mb-5">{title}</h2>
                )}
                {children}
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  )
}
```

### Confirmação de exclusão
```typescript
// Sempre usar modal de confirmação — nunca deletar direto
// Desktop: modal centralizado pequeno (max-w-sm)
// Mobile: action sheet de baixo com opções
export function DeleteConfirmModal({ open, onClose, onConfirm, itemName }: Props) {
  // Usa AdaptiveModal internamente
  // Botão "Deletar" em danger color
  // Botão "Cancelar" em ghost
  // Animação de shake no ícone de warning ao abrir
}
```

---

## 4. HOVER STATES — REGRAS POR COMPONENTE

### Botões
```typescript
// Toda variante de botão DEVE ter:
// 1. Hover: background muda + translateY(-1px) sutil
// 2. Active/Press: scale(0.97) spring
// 3. Focus: ring visível (acessibilidade)
// 4. Disabled: opacity-40, cursor-not-allowed, SEM hover effect

// src/components/ui/Button.tsx
<motion.button
  whileHover={!disabled ? {
    scale: 1.01,
    y: -1,
    transition: { duration: 0.15 }
  } : undefined}
  whileTap={!disabled ? {
    scale: 0.97,
    y: 0,
    transition: { duration: 0.08 }
  } : undefined}
  className={cn(
    'transition-colors duration-150',      // cores via CSS, posição via Framer
    'focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2',
    variant === 'primary' && 'hover:bg-accent-hover',
    disabled && 'opacity-40 cursor-not-allowed',
  )}
>
```

### Cards clicáveis
```typescript
// Cards que têm ação de clique (não todos os cards têm)
<motion.div
  whileHover={{ scale: 1.015, y: -2,
    transition: { duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }
  }}
  whileTap={{ scale: 0.99, y: 0,
    transition: { duration: 0.08 }
  }}
  className="cursor-pointer card-base"
>
```

### Nav items (Sidebar)
```typescript
// Hover: background slide in da esquerda
// Active: borda esquerda accent + background accent-subtle
// Transition: 150ms ease-out em cores, spring em scale

<motion.div
  whileHover={{ x: 2, transition: { duration: 0.12 } }}
  className={cn(
    'transition-colors duration-150',
    isActive ? 'bg-accent-subtle text-cream border-l-[3px] border-accent' : 'text-secondary',
    'hover:bg-overlay hover:text-primary',
  )}
>
```

### Ícones de ação (ícones de botão standalone)
```typescript
// Ex: sino de notificação, busca, mais opções
<motion.button
  whileHover={{ scale: 1.1, rotate: isNotification ? [0, -8, 8, 0] : 0 }}
  whileTap={{ scale: 0.9 }}
  transition={{ duration: 0.2, type: 'spring' }}
  className="p-2 rounded-full hover:bg-overlay transition-colors"
>
```

---

## 5. SKELETON LOADERS

### Regra
Todo dado async deve ter skeleton que imita EXATAMENTE o shape do conteúdo real.
Nunca usar spinner genérico onde um skeleton serve.
Spinner: apenas em ações (submit de form, delete, etc.).

```typescript
// src/components/ui/Skeleton.tsx
/**
 * Skeleton — Shimmer loader que imita o shape do conteúdo
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md',
        'bg-elevated',
        className
      )}
    >
      {/* Shimmer wave */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
        transition={{ duration: 1.8, ease: 'linear', repeat: Infinity }}
      />
    </div>
  )
}

// Skeletons compostos para cada seção da Home:
export function EventCardSkeleton() {
  return (
    <div className="flex gap-3 p-4 card-base">
      <Skeleton className="w-1 h-full rounded-full" />           {/* left border */}
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />                       {/* título */}
        <Skeleton className="h-3 w-1/2" />                       {/* data */}
      </div>
    </div>
  )
}

export function BalanceCardSkeleton() {
  return (
    <div className="card-elevated p-5 space-y-3">
      <Skeleton className="h-3 w-24" />                           {/* label */}
      <Skeleton className="h-11 w-48" />                          {/* número grande */}
      <Skeleton className="h-3 w-36" />                           {/* sub */}
    </div>
  )
}

export function NoteCardSkeleton() {
  return (
    <div className="card-base p-4 space-y-2">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  )
}

export function AbsenceCardSkeleton() {
  return (
    <div className="flex items-center gap-3 p-4 card-base">
      <Skeleton className="h-10 w-10 rounded-full" />             {/* avatar */}
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />                        {/* nome */}
        <Skeleton className="h-3 w-1/2" />                        {/* motivo */}
      </div>
      <Skeleton className="h-3 w-14" />                           {/* data */}
    </div>
  )
}

// Uso padrão com React Query:
if (isLoading) return (
  <div className="space-y-3">
    {Array.from({ length: 3 }).map((_, i) => (
      <EventCardSkeleton key={i} />
    ))}
  </div>
)
```

---

## 6. BUSCA EXPANSÍVEL

```typescript
// src/components/ui/SearchBar.tsx
/**
 * SearchBar — Ícone de lupa que expande para campo de texto
 * Desktop: expande horizontalmente (280px) com slide spring
 * Mobile: expande para full-width com overlay
 */
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { searchExpandVariants } from '@/lib/animations'

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function openSearch() {
    setIsOpen(true)
    // Foco automático após a animação começar
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  return (
    <motion.div
      variants={searchExpandVariants}
      animate={isOpen ? 'expanded' : 'collapsed'}
      className={cn(
        'flex items-center gap-2 rounded-full overflow-hidden',
        'bg-elevated border border-white/[0.08]',
        'h-9 px-3',
        isOpen ? 'w-[280px]' : 'w-9 cursor-pointer justify-center',
      )}
      onClick={!isOpen ? openSearch : undefined}
    >
      <motion.div
        animate={{ rotate: isOpen ? 0 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <Search size={16} className="text-secondary flex-shrink-0" />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.input
            ref={inputRef}
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.15 }}
            placeholder="Buscar..."
            className="
              flex-1 bg-transparent outline-none
              text-sm text-primary placeholder:text-muted
              min-w-0
            "
            onKeyDown={e => e.key === 'Escape' && setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.12 }}
            onClick={e => { e.stopPropagation(); setIsOpen(false) }}
            className="text-muted hover:text-primary transition-colors"
          >
            <X size={14} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
```

---

## 7. EFEITOS DE PROFUNDIDADE NOS CARDS

### Depth System — 4 camadas
```css
/* src/index.css — adicionar ao design system */

/* Layer 0 — Background (mais fundo) */
.depth-0 { background: var(--bg-base); }

/* Layer 1 — Surface padrão */
.depth-1 {
  background: var(--bg-surface);
  box-shadow: 0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3);
}

/* Layer 2 — Elevated (cards de destaque, navy) */
.depth-2 {
  background: var(--bg-elevated);
  box-shadow: 0 4px 12px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3);
}

/* Layer 3 — Overlay (modais, dropdowns, floating) */
.depth-3 {
  background: var(--bg-elevated);
  box-shadow: 0 16px 48px rgba(0,0,0,0.7), 0 8px 16px rgba(0,0,0,0.4);
}

/* Glow accent — para cards de saldo, CTA principal */
.depth-accent {
  background: var(--bg-elevated);
  box-shadow:
    0 4px 24px rgba(76, 114, 196, 0.25),
    0 1px 3px rgba(0,0,0,0.5);
}
```

### Gradientes nos cards
```typescript
// Cards que merecem gradient (use com parcimônia — máx 2 por tela):

// 1. Balance Card da Cantina — gradient navy para navy mais escuro
className="
  bg-gradient-to-br from-[#1B2A4A] to-[#0F1A2E]
  border border-[rgba(76,114,196,0.2)]
  shadow-[0_4px_24px_rgba(76,114,196,0.2)]
"

// 2. Card de próximo evento destacado
className="
  bg-gradient-to-r from-[#1B2A4A] to-[#141C2E]
  border-l-4 border-l-accent
"

// 3. Subtle gradient em card de notas global
className="
  bg-gradient-to-br from-surface to-elevated
  border border-white/[0.06]
"

// NUNCA usar gradient em: cards de lista padrão, inputs, sidebar
```

### Parallax sutil no scroll (Home)
```typescript
// src/pages/HomePage.tsx
// Header comprime levemente no scroll — dá sensação de profundidade
import { useScroll, useTransform, motion } from 'framer-motion'

const { scrollY } = useScroll()
const headerScale = useTransform(scrollY, [0, 100], [1, 0.98])
const headerOpacity = useTransform(scrollY, [0, 80], [1, 0.85])

<motion.header
  style={{ scale: headerScale, opacity: headerOpacity }}
  className="sticky top-0 z-30"
>
  {/* Greeting header */}
</motion.header>
```

---

## 8. MICRO-INTERAÇÕES POR COMPONENTE

### Toggle Dark/Light Mode
```typescript
// Não apenas trocar classe — animar a transição de tema
// 1. Ao clicar: ícone rotaciona 360deg
// 2. Toda a página faz cross-fade das cores em 300ms
// 3. Ícone sol/lua troca com scale bounce

const moonVariants: Variants = {
  dark:  { rotate: 0,   scale: 1,   opacity: 1 },
  light: { rotate: 180, scale: 0,   opacity: 0 },
}
const sunVariants: Variants = {
  dark:  { rotate: -180, scale: 0,  opacity: 0 },
  light: { rotate: 0,    scale: 1,  opacity: 1 },
}

// No CSS global: transition para color, background-color, border-color
* { transition: color 250ms ease, background-color 250ms ease, border-color 250ms ease; }
// EXCETO elementos com Framer Motion — esses não precisam
```

### FAB — Floating Action Button
```typescript
// Estado fechado → aberto:
// 1. Ícone + rotaciona 45deg → vira X
// 2. 3 opções sobem com stagger 55ms
// 3. Backdrop fade-in com blur
// 4. Ao fechar: ordem reversa

<motion.button
  animate={{ rotate: isOpen ? 45 : 0 }}
  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
  onClick={() => setIsOpen(!isOpen)}
  whileHover={{ scale: 1.08 }}
  whileTap={{ scale: 0.94 }}
>
  <Plus size={22} />
</motion.button>

// Items do FAB:
<AnimatePresence>
  {isOpen && fabItems.map((item, i) => (
    <motion.div
      key={item.id}
      variants={fabItemVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ delay: i * 0.055 }}
    >
```

### Sidebar — Nav Item Active Indicator
```typescript
// Indicador da rota ativa: uma pill que desliza entre os items
// NÃO remover/adicionar classes — usar layout animation do Framer

{isActive && (
  <motion.div
    layoutId="nav-active-indicator"  // ← magia do Framer layout
    className="absolute inset-0 bg-accent-subtle rounded-[10px]"
    transition={{ type: 'spring', damping: 30, stiffness: 400 }}
  />
)}
// A pill "viaja" suavemente entre nav items ao trocar de rota
```

### Bottom Nav — Tab Indicator
```typescript
// Mesmo padrão do Sidebar com layoutId
// Pill se move horizontalmente entre tabs com spring
{isActive && (
  <motion.div
    layoutId="bottom-nav-indicator"
    className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-accent"
    transition={{ type: 'spring', damping: 28, stiffness: 380 }}
  />
)}
```

### Número Counter — Saldo da Cantina
```typescript
// Quando o saldo muda, o número conta animado de oldValue para newValue
import { useSpring, useTransform, motion } from 'framer-motion'

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { damping: 30, stiffness: 100 })
  const display = useTransform(spring, (val) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency', currency: 'BRL'
    }).format(val)
  )

  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  return <motion.span>{display}</motion.span>
}
```

### Input — Focus State
```typescript
// Inputs têm 3 estados visuais animados:
// 1. Default: border border-strong
// 2. Focus: border accent + glow ring + label sobe e diminui
// 3. Error: border danger + shake animation + label fica vermelho

// Label flutuante (floating label):
<div className="relative">
  <motion.label
    animate={{
      y: isFocused || hasValue ? -22 : 0,
      scale: isFocused || hasValue ? 0.82 : 1,
      color: isFocused ? 'var(--accent-primary)' : 'var(--text-secondary)',
    }}
    transition={{ duration: 0.18, ease: ease.spring }}
    className="absolute left-4 top-3.5 pointer-events-none origin-left"
  >
    {label}
  </motion.label>
  <input ... />
</div>

// Shake no erro:
const shakeVariants: Variants = {
  shake: {
    x: [0, -8, 8, -8, 8, -4, 4, 0],
    transition: { duration: 0.4 }
  }
}
```

### Badges e Tags
```typescript
// Ao aparecer: scale bounce de 0.5 → 1.1 → 1.0
// Ao desaparecer: scale → 0 + opacity → 0
<motion.span
  initial={{ scale: 0.5, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  exit={{ scale: 0, opacity: 0 }}
  transition={{ type: 'spring', damping: 15, stiffness: 400 }}
>
  GLOBAL
</motion.span>
```

---

## 9. LISTAS E DADOS

### Entrada de lista (stagger obrigatório)
```typescript
// Toda lista de cards, transações, eventos, ausências
// DEVE usar stagger ao montar

<motion.ul
  variants={staggerContainer}
  initial="initial"
  animate="animate"
>
  {items.map(item => (
    <motion.li key={item.id} variants={cardVariants}>
      <ItemCard item={item} />
    </motion.li>
  ))}
</motion.ul>
```

### Item deletado da lista
```typescript
// Ao deletar: item comprime verticalmente antes de sumir
const deleteVariants: Variants = {
  exit: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
    transition: { duration: 0.25, ease: ease.spring }
  }
}

// Envolver cada item com AnimatePresence para isso funcionar
<AnimatePresence mode="popLayout">
  {items.map(item => (
    <motion.div key={item.id} variants={deleteVariants} exit="exit" layout>
      <ItemCard />
    </motion.div>
  ))}
</AnimatePresence>
// layout={true} faz os outros items "subirem" suavemente para preencher o espaço
```

### Pull-to-refresh (mobile)
```typescript
// Indicador visual de refresh:
// Puxa → ícone de refresh aparece e rotaciona
// Solta → ícone some, dados recarregam
// Enquanto recarrega → spinner suave
```

---

## 10. ESTADOS VAZIOS (EMPTY STATES)

```typescript
// Empty states NÃO são só texto — têm animação de entrada própria

export function EmptyState({ icon: Icon, title, subtitle, action }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="flex flex-col items-center justify-center py-14 gap-3 text-center"
    >
      {/* Ícone com bounce de entrada */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 14, stiffness: 280, delay: 0.15 }}
        className="p-4 rounded-2xl bg-elevated"
      >
        <Icon size={28} className="text-muted" />
      </motion.div>

      <p className="text-h3 text-primary font-semibold">{title}</p>
      <p className="text-small text-secondary max-w-[240px]">{subtitle}</p>

      {action && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button variant="secondary" size="sm" onClick={action.onClick}>
            {action.label}
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}
```

---

## 11. FEEDBACK DE AÇÕES

### Toast / Notificações
```typescript
// Usar: sonner (já configurado)
// SEMPRE dar feedback em toda ação do usuário:

// ✅ Sucesso
toast.success('Evento criado!', { duration: 3000 })

// ✅ Erro
toast.error('Não foi possível salvar. Tente novamente.')

// ✅ Loading (para operações > 1s)
const toastId = toast.loading('Salvando...')
// após concluir:
toast.success('Salvo!', { id: toastId })

// Posição: top-center no mobile, bottom-right no desktop
```

### Botão Loading State
```typescript
// Enquanto submete form, botão mostra spinner inline
// Nunca desabilitar apenas — mostrar estado de loading

<Button disabled={isPending}>
  {isPending ? (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    >
      <Loader2 size={16} />
    </motion.span>
  ) : (
    'Registrar Venda'
  )}
</Button>
```

### Optimistic Updates
```typescript
// Para delete e toggle:
// 1. Remove item visualmente IMEDIATO (sem esperar API)
// 2. Se API falhar: item volta com animação + toast de erro
// Resultado: app parece instantâneo

const { mutate: deleteAbsence } = useMutation({
  mutationFn: (id: string) => supabase.from('absences').delete().eq('id', id),
  onMutate: async (id) => {
    // Cancela refetches pendentes
    await queryClient.cancelQueries({ queryKey: ['absences'] })
    // Snapshot do estado anterior
    const previous = queryClient.getQueryData(['absences'])
    // Remove otimisticamente
    queryClient.setQueryData(['absences'], (old: Absence[]) =>
      old.filter(a => a.id !== id)
    )
    return { previous }
  },
  onError: (err, id, context) => {
    // Reverte em caso de erro
    queryClient.setQueryData(['absences'], context?.previous)
    toast.error('Não foi possível remover. Tente novamente.')
  },
})
```

---

## 12. SCROLL BEHAVIORS

### Scroll com header sticky e blur
```css
/* Header sticky com backdrop blur — efeito iOS/macOS */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 30;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background: rgba(var(--bg-base-rgb), 0.85);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}
/* Transição: ao fazer scroll, border bottom aparece gradualmente */
```

### Scroll horizontal sem scrollbar visível
```css
/* Para strips de cards horizontais (eventos, filtros) */
.scroll-horizontal {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;        /* Firefox */
}
.scroll-horizontal::-webkit-scrollbar { display: none; }  /* Chrome/Safari */

/* Cada card com snap */
.scroll-item { scroll-snap-align: start; }
```

### Swipe para deletar (mobile)
```typescript
// Cards de ausência/transação no mobile têm swipe para revelar ação de delete
import { useSwipeable } from 'react-swipeable'

// Desliza card para esquerda → revela botão vermelho de delete com ícone trash
// Desliza de volta → fecha
// Tap no vermelho → abre confirmação
```

---

## 13. RESPONSIVIDADE — REGRAS DE COMPORTAMENTO

```typescript
// Hook central para decisões de layout
// src/hooks/useMediaQuery.ts
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])
  return matches
}

// Uso:
const isMobile = useMediaQuery('(max-width: 767px)')
const isDesktop = useMediaQuery('(min-width: 1024px)')
```

### Tabela de decisões UI por breakpoint
```
AÇÃO                  | MOBILE              | DESKTOP
─────────────────────────────────────────────────────────
Criar/editar item     | Bottom Sheet        | Modal centralizado
Confirmar exclusão    | Action sheet baixo  | Modal pequeno centro
Ver detalhes          | Navega para página  | Drawer lateral direito
Busca                 | Overlay full screen | Expande inline no header
Menu de perfil        | Bottom Sheet        | Popover/dropdown
Filtros               | Bottom Sheet        | Dropdown inline
Calendário views      | Tabs horizontais    | Segmented control no header
Notificações          | Drawer de cima      | Dropdown do sino
```

---

## 14. CHECKLIST DE QUALIDADE — APLICAR EM TODA FEATURE

Antes de considerar qualquer tela/componente pronto:

### Interações
- [ ] Todos os botões têm hover + press animation
- [ ] Cards clicáveis têm hover lift + press
- [ ] Nav items têm layout animation (pill deslizante)
- [ ] Inputs têm floating label animado
- [ ] FAB tem expansão com stagger

### Dados e estados
- [ ] Skeleton loader com shape idêntico ao conteúdo real
- [ ] Empty state com animação de entrada
- [ ] Loading state no botão de submit
- [ ] Toast de sucesso E erro em toda mutation
- [ ] Optimistic update onde aplicável

### Modais e navegação
- [ ] Modal adaptativo (sheet no mobile, modal no desktop)
- [ ] Backdrop com blur
- [ ] Animação de entrada E saída do modal
- [ ] Fechar com Escape (desktop) e swipe down (mobile)
- [ ] Transição de página com AnimatePresence

### Visual
- [ ] Stagger animation na lista de items
- [ ] Depth correto (camada 1/2/3) para cada elemento
- [ ] Scroll horizontal sem scrollbar visível
- [ ] Header sticky com backdrop blur
- [ ] Safe area insets respeitados (mobile)

### Performance
- [ ] `will-change: transform` em elementos que animam sempre
- [ ] `prefers-reduced-motion` respeitado
- [ ] Animações não bloqueiam interação do usuário

---

## 15. ANTI-PADRÕES — NUNCA FAZER

```
❌ Animação linear — sempre ease ou spring
❌ Duration > 500ms em interações de UI
❌ Navegar para nova rota para ação que cabe em modal
❌ Deletar item sem confirmação
❌ Spinner genérico onde skeleton funciona
❌ Hover state sem transition
❌ Cards sem depth (box-shadow)
❌ Listas que aparecem de uma vez sem stagger
❌ Modal que abre sem animação
❌ Empty state só com texto (sem ícone e animação)
❌ Toast só no sucesso — erro também precisa de toast
❌ Botão de submit sem loading state
❌ Scrollbar visível em listas horizontais
❌ Tap highlight padrão do browser no mobile (sempre desabilitar)
❌ Gradient em mais de 2 cards por tela
❌ Animações diferentes para o mesmo tipo de elemento
```

---

*SKILL Motion & UX Premium — Líderes AD · v1.0*
*Consultar neste arquivo antes de desenvolver QUALQUER componente ou tela*
*O objetivo é que usuário nunca perceba as animações — apenas sinta que o app é premium*