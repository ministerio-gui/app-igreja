# SKILL — Mobile UX Premium
> Líderes AD · Bible exclusivo para experiência mobile
> Referências: Burger App (@ui.vikram) + Premium Food App
> Consultar em TODO componente com breakpoint < 768px

---

## FILOSOFIA MOBILE

> "Mobile não é desktop menor. É um produto diferente com física diferente."

No mobile, o polegar governa. Tudo que importa está na zona de alcance natural (parte inferior da tela). A interface responde ao toque como matéria física — ela tem peso, inércia, resistência. O usuário não *usa* o app, ele *sente* o app.

### Os 3 princípios que definem este app no mobile
1. **Profundidade de camadas** — fundos não são planos, são empilhados
2. **Glassmorphism intencional** — transparência com blur em elementos flutuantes
3. **Física de toque** — springs, inércia, snap, resistência — tudo tem massa

---

## 1. SISTEMA DE CAMADAS MOBILE

### Background com profundidade real
```css
/* O fundo não é um preto plano — tem textura e camadas */

/* Camada 0: base com noise texture sutil */
.mobile-bg {
  background: #090D15;
  background-image:
    radial-gradient(ellipse 80% 50% at 50% -10%, rgba(76,114,196,0.12) 0%, transparent 70%),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
}

/* Camada 1: gradient radial no topo — "glow" suave de accent */
.mobile-bg::before {
  content: '';
  position: fixed;
  top: -30%;
  left: 50%;
  transform: translateX(-50%);
  width: 120%;
  height: 60%;
  background: radial-gradient(ellipse, rgba(76,114,196,0.08) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}
```

### Glassmorphism — sistema de cards translúcidos
```css
/* Glass nível 1 — sutil, para cards secundários */
.glass-1 {
  background: rgba(27, 42, 74, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

/* Glass nível 2 — médio, para bottom sheets, drawers */
.glass-2 {
  background: rgba(17, 24, 39, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.10);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

/* Glass nível 3 — intenso, para modais, overlays */
.glass-3 {
  background: rgba(9, 13, 21, 0.92);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

/* Glass accent — para cards de destaque */
.glass-accent {
  background: linear-gradient(
    135deg,
    rgba(27, 42, 74, 0.8) 0%,
    rgba(15, 26, 46, 0.9) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(76, 114, 196, 0.2);
  box-shadow:
    0 4px 24px rgba(76, 114, 196, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
```

---

## 2. BOTTOM NAVIGATION — PREMIUM

### Estrutura
```typescript
// src/components/layout/BottomNav.tsx
// Bottom nav com glassmorphism + indicator animado + FAB central elevado

/**
 * BottomNav premium:
 * - Glass background com blur
 * - Indicator pill que VIAJA entre tabs (layoutId Framer)
 * - FAB central levemente elevado acima da barra
 * - Safe area inset respeitado
 * - Haptic feedback hint em cada tap
 */

export function BottomNav() {
  const location = useLocation()

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 pb-safe">

      {/* Glass container */}
      <div className="
        mx-3 mb-3 rounded-[26px]
        glass-2
        border border-white/[0.08]
        px-2 py-2
        flex items-center justify-around
        relative
      ">

        {NAV_ITEMS.map((item, index) => {
          const isActive = location.pathname === item.path
          const isCenterFAB = item.isFab

          if (isCenterFAB) return (
            // FAB central elevado — sobe acima da barra
            <motion.div
              key="fab"
              className="relative -mt-6"
              whileTap={{ scale: 0.92 }}
            >
              <Link to={item.path}>
                <div className="
                  w-14 h-14 rounded-full
                  bg-accent-primary
                  shadow-[0_4px_24px_rgba(76,114,196,0.5)]
                  flex items-center justify-center
                  border border-accent/30
                ">
                  <Plus size={22} className="text-cream" />
                </div>
              </Link>
            </motion.div>
          )

          return (
            <NavItem key={item.path} item={item} isActive={isActive} />
          )
        })}
      </div>
    </div>
  )
}

function NavItem({ item, isActive }) {
  return (
    <motion.div
      whileTap={{ scale: 0.88 }}
      transition={{ type: 'spring', damping: 20, stiffness: 500 }}
      className="relative flex flex-col items-center gap-1 px-4 py-1.5 min-w-[52px]"
    >
      {/* Pill indicator que viaja entre tabs */}
      {isActive && (
        <motion.div
          layoutId="bottom-nav-pill"
          className="
            absolute inset-0 rounded-2xl
            bg-accent/[0.12]
            border border-accent/[0.15]
          "
          transition={{ type: 'spring', damping: 28, stiffness: 380 }}
        />
      )}

      {/* Ícone */}
      <motion.div
        animate={{
          scale: isActive ? 1.1 : 1,
          y: isActive ? -1 : 0,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 400 }}
      >
        <item.icon
          size={20}
          strokeWidth={isActive ? 2 : 1.5}
          className={isActive ? 'text-accent' : 'text-muted'}
        />
      </motion.div>

      {/* Label */}
      <motion.span
        animate={{ opacity: isActive ? 1 : 0.5 }}
        className={cn(
          'text-[10px] font-medium leading-none',
          isActive ? 'text-accent' : 'text-muted'
        )}
      >
        {item.label}
      </motion.span>
    </motion.div>
  )
}
```

---

## 3. ARC CAROUSEL — "A ROLETA"

O elemento mais único da Ref 2. Items dispostos em arco curvo que respondem ao drag com física de inércia.

```typescript
// src/components/ui/ArcCarousel.tsx
/**
 * ArcCarousel — Carousel com items em arco curvo
 * Inspirado: Burger App (@ui.vikram) — seção "Show more details"
 *
 * No Líderes AD, usar para:
 * - Quick actions na Home (atalhos: Novo Evento, Nova Venda, etc.)
 * - Seleção de produto na modal de venda da Cantina
 * - Membros ausentes na semana (avatares em arco)
 */

import { motion, useDragControls, useMotionValue, useTransform } from 'framer-motion'

interface ArcItem {
  id: string
  label: string
  icon: React.ReactNode
  onPress: () => void
}

export function ArcCarousel({ items }: { items: ArcItem[] }) {
  const x = useMotionValue(0)
  // Cada item se desloca em Y baseado na posição X — cria o arco
  const totalItems = items.length

  return (
    <div className="relative h-28 overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={{ left: -(totalItems - 3) * 88, right: 0 }}
        dragElastic={0.15}          // ← resistência nas bordas
        style={{ x }}
        className="flex items-end gap-3 absolute bottom-0 left-4 cursor-grab active:cursor-grabbing"
      >
        {items.map((item, i) => {
          // Transform: quanto mais longe do centro, mais baixo fica
          const arcY = useTransform(x, [-800, 0, 800], [
            Math.abs(i - totalItems / 2) * 6,
            0,
            Math.abs(i - totalItems / 2) * 6
          ])
          const arcScale = useTransform(x, [-800, 0, 800], [
            1 - Math.abs(i - totalItems / 2) * 0.04,
            1,
            1 - Math.abs(i - totalItems / 2) * 0.04
          ])

          return (
            <motion.button
              key={item.id}
              style={{ y: arcY, scale: arcScale }}
              whileTap={{ scale: 0.88 }}
              onClick={item.onPress}
              className="
                flex flex-col items-center gap-2
                flex-shrink-0 w-20
              "
            >
              {/* Ícone glass pill */}
              <div className="
                w-14 h-14 rounded-2xl
                glass-1
                flex items-center justify-center
                border border-white/[0.08]
              ">
                {item.icon}
              </div>
              {/* Label */}
              <span className="text-[11px] text-secondary font-medium text-center leading-tight">
                {item.label}
              </span>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}
```

### Aplicação na Home
```typescript
// Quick actions na Home — items arrastáveis em arco
const quickActions: ArcItem[] = [
  { id: 'event',    label: 'Novo Evento',   icon: <CalendarPlus size={22} />, onPress: openEventModal },
  { id: 'note',     label: 'Nova Nota',     icon: <FileText size={22} />,     onPress: openNoteModal },
  { id: 'sale',     label: 'Registrar Venda', icon: <Receipt size={22} />,   onPress: openSaleModal },
  { id: 'absence',  label: 'Ausência',      icon: <UserX size={22} />,        onPress: openAbsenceModal },
  { id: 'deposit',  label: 'Depósito',      icon: <TrendingUp size={22} />,   onPress: openDepositModal },
]

// Na Home, abaixo do saldo:
<section>
  <p className="text-label text-muted px-5 mb-3">AÇÕES RÁPIDAS</p>
  <ArcCarousel items={quickActions} />
</section>
```

---

## 4. HERO SECTION MOBILE — HOME

```typescript
// Topo da Home mobile: não começa com texto plano
// Começa com uma área de hero com profundidade

// ESTRUTURA:
// ┌─────────────────────────────────┐
// │ [Avatar] Olá, Lucas 👋  [🔔][☀️]│  ← sticky header glass
// ├─────────────────────────────────┤
// │  HOJE, 21 DE ABRIL              │  ← data em label caps
// │  Segunda-feira                  │  ← dia da semana display
// │                                 │
// │  ┌───────────────────────────┐  │
// │  │  Próximo: Culto Jovem     │  │  ← card glass accent
// │  │  Hoje · 19:30 · 2h       │  │
// │  └───────────────────────────┘  │
// ├─────────────────────────────────┤
// │  ... resto do scroll            │

function HomeHero() {
  const now = new Date()

  return (
    <div className="
      relative px-5 pt-4 pb-6
      overflow-hidden
    ">
      {/* Glow de fundo no hero */}
      <div className="
        absolute top-0 left-0 right-0 h-48
        bg-gradient-to-b from-[rgba(76,114,196,0.08)] to-transparent
        pointer-events-none
      " />

      {/* Data */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-label text-muted mb-1"
      >
        {format(now, "EEEE, dd 'de' MMMM", { locale: ptBR }).toUpperCase()}
      </motion.p>

      {/* Próximo evento em destaque */}
      <AnimatePresence>
        {nextEvent && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, ...transition.spring }}
            className="glass-accent rounded-[18px] p-4 mt-3"
          >
            <p className="text-label text-accent mb-1">PRÓXIMO EVENTO</p>
            <p className="text-[17px] font-semibold text-cream leading-tight">
              {nextEvent.title}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-small text-secondary flex items-center gap-1">
                <Clock size={12} /> {format(nextEvent.start_at, "HH:mm")}
              </span>
              {nextEvent.location && (
                <span className="text-small text-secondary flex items-center gap-1">
                  <MapPin size={12} /> {nextEvent.location}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

---

## 5. STICKY HEADER MOBILE

```typescript
// Header que reage ao scroll:
// - Scroll 0: transparente, saudação visível
// - Scroll > 40px: glass blur se intensifica, título comprime

function MobileHeader() {
  const { scrollY } = useScroll()
  const headerBg = useTransform(scrollY, [0, 60], ['rgba(9,13,21,0)', 'rgba(9,13,21,0.92)'])
  const headerBlur = useTransform(scrollY, [0, 60], [0, 20])
  const borderOpacity = useTransform(scrollY, [40, 80], [0, 0.08])

  return (
    <motion.header
      style={{
        backgroundColor: headerBg,
        backdropFilter: useTransform(headerBlur, v => `blur(${v}px)`),
        borderBottomColor: useTransform(borderOpacity, v => `rgba(255,255,255,${v})`),
      }}
      className="
        sticky top-0 z-30
        flex items-center justify-between
        px-5 py-3
        border-b border-transparent
        safe-area-top
      "
    >
      {/* Avatar + saudação */}
      <div className="flex items-center gap-3">
        <Avatar size={36} name={user.name} />
        <div>
          <p className="text-[13px] text-secondary leading-none">{getGreeting()}</p>
          <p className="text-[16px] font-semibold text-cream leading-tight">
            {user.firstName} 👋
          </p>
        </div>
      </div>

      {/* Ações do header */}
      <div className="flex items-center gap-1">
        {/* Notificações com badge */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          className="relative p-2.5 rounded-full glass-1"
        >
          <Bell size={18} className="text-secondary" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="
                absolute top-1.5 right-1.5
                w-2 h-2 rounded-full bg-danger
              "
            />
          )}
        </motion.button>

        {/* Toggle tema */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          className="p-2.5 rounded-full glass-1"
          onClick={toggleTheme}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.header>
  )
}
```

---

## 6. CARDS MOBILE — PADRÕES

### Card de evento (horizontal scroll strip)
```typescript
// Estilo: foto/ícone à esquerda, info à direita
// Borda esquerda colorida, glass background

function EventCard({ event }: { event: Event }) {
  return (
    <motion.div
      variants={cardVariants}
      whileTap={{ scale: 0.97 }}
      className="
        flex items-center gap-4
        glass-1 rounded-[16px] p-4
        border-l-[3px]
        active:opacity-90
      "
      style={{ borderLeftColor: event.color }}
    >
      {/* Data badge */}
      <div className="
        flex flex-col items-center justify-center
        w-12 h-12 rounded-2xl
        bg-[var(--bg-elevated)] flex-shrink-0
      ">
        <span className="text-[10px] text-secondary uppercase font-medium">
          {format(event.start_at, 'MMM')}
        </span>
        <span className="text-[20px] font-bold text-cream leading-none">
          {format(event.start_at, 'dd')}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-semibold text-cream truncate">{event.title}</p>
        <p className="text-[13px] text-secondary mt-0.5">
          {format(event.start_at, 'HH:mm')} · {event.location || 'Sem local'}
        </p>
      </div>

      {/* Arrow */}
      <ChevronRight size={16} className="text-muted flex-shrink-0" />
    </motion.div>
  )
}
```

### Card de saldo (cantina na Home)
```typescript
// Full width, glass accent, número enorme

function BalanceCard() {
  return (
    <motion.div
      variants={cardVariants}
      className="
        mx-5 glass-accent rounded-[20px] p-5
        overflow-hidden relative
      "
    >
      {/* Glow decorativo no canto */}
      <div className="
        absolute -top-8 -right-8
        w-32 h-32 rounded-full
        bg-accent/[0.08] blur-2xl
        pointer-events-none
      " />

      <p className="text-label text-muted mb-2">SALDO ATUAL</p>

      <AnimatedNumber
        value={balance}
        className="text-[42px] font-mono font-bold text-cream leading-none"
      />

      <p className="text-[13px] text-success mt-2 flex items-center gap-1">
        <TrendingUp size={13} />
        {formatCurrency(churchCut)} para a igreja
      </p>

      {/* Botões de ação inline */}
      <div className="flex gap-2 mt-4">
        <button className="flex-1 h-9 rounded-full glass-1 text-[13px] font-medium text-cream border border-white/[0.08]">
          + Venda
        </button>
        <button className="flex-1 h-9 rounded-full glass-1 text-[13px] font-medium text-secondary border border-white/[0.08]">
          Histórico
        </button>
      </div>
    </motion.div>
  )
}
```

### Section header — padrão mobile
```typescript
// Toda seção tem: label caps + link "Ver todos" + conteúdo
function SectionHeader({ title, onViewAll }: Props) {
  return (
    <div className="flex items-center justify-between px-5 mb-3">
      <p className="text-[11px] font-semibold text-muted uppercase tracking-widest">
        {title}
      </p>
      {onViewAll && (
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={onViewAll}
          className="text-[13px] font-medium text-accent"
        >
          Ver todos
        </motion.button>
      )}
    </div>
  )
}
```

---

## 7. SWIPE GESTURES

### Swipe para deletar (ausências, transações)
```typescript
// src/components/ui/SwipeToDelete.tsx
/**
 * Envolve qualquer card para adicionar swipe-to-delete
 * Swipe left → revela área vermelha com ícone trash
 * Swipe > 50% → deleta com animação de colapso
 */
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion'

export function SwipeToDelete({ children, onDelete }: Props) {
  const x = useMotionValue(0)
  const controls = useAnimation()

  // Fundo vermelho aparece conforme arrasta
  const deleteOpacity = useTransform(x, [-80, -40], [1, 0])
  const deleteScale = useTransform(x, [-80, -40], [1, 0.8])

  async function handleDragEnd(_, info) {
    if (info.offset.x < -80) {
      // Passou do threshold — deleta
      await controls.start({ x: '-100%', opacity: 0,
        transition: { duration: 0.25 } })
      onDelete()
    } else {
      // Volta para posição original
      controls.start({ x: 0, transition: { type: 'spring', damping: 30, stiffness: 400 } })
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[14px]">
      {/* Background de delete */}
      <motion.div
        style={{ opacity: deleteOpacity }}
        className="
          absolute inset-0
          bg-danger/[0.85] rounded-[14px]
          flex items-center justify-end pr-5
        "
      >
        <motion.div style={{ scale: deleteScale }}>
          <Trash2 size={20} className="text-white" />
        </motion.div>
      </motion.div>

      {/* Card arrastável */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -100, right: 0 }}
        dragElastic={{ left: 0.1, right: 0.3 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  )
}
```

### Pull-to-refresh
```typescript
// Puxa de cima → ícone de refresh aparece
// Inércia real — não solta se não passar do threshold
const REFRESH_THRESHOLD = 72

function PullToRefresh({ onRefresh, children }: Props) {
  const y = useMotionValue(0)
  const refreshProgress = useTransform(y, [0, REFRESH_THRESHOLD], [0, 1])
  const refreshRotate = useTransform(y, [0, REFRESH_THRESHOLD], [0, 360])

  // ...implementação com drag constraints
}
```

---

## 8. BOTTOM SHEETS — MULTI-SNAP

```typescript
// Bottom sheet com 3 snap points: minimizado / meio / expandido
// Arrastar entre eles com física de spring
// Tap no backdrop fecha

const SNAP_POINTS = {
  closed: '100%',
  peek: '60%',     // mostra só o header do sheet
  half: '50%',
  full: '10%',     // quase tela cheia
}

// Indicadores de snap: dots na parte superior do sheet
// Current snap point highlighted

// Implementação com drag + snap:
async function handleSheetDragEnd(_, info) {
  const currentY = sheetY.get()
  const velocity = info.velocity.y

  // Com base na posição E velocidade, decide snap point
  if (velocity > 500 || currentY > height * 0.7) {
    snapTo('closed')
  } else if (velocity < -500 || currentY < height * 0.3) {
    snapTo('full')
  } else {
    snapTo('half')
  }
}
```

---

## 9. TIPOGRAFIA MOBILE — HIERARQUIA AGRESSIVA

```
/* Diferente do desktop — mobile tem hierarquia mais dramática */

Hero date label:   10px / caps / letter-spacing 0.12em / text-muted
Hero greeting:     24px / 700 / text-cream / letter-spacing -0.01em
Section label:     11px / 600 / caps / letter-spacing 0.08em / text-muted
Card title:        15px / 600 / text-cream
Card subtitle:     13px / 400 / text-secondary
Balance number:    42px / 800 / mono / text-cream / letter-spacing -0.02em
Church cut:        13px / 400 / text-success
Empty state title: 17px / 600 / text-primary / text-center
Button text:       14px / 600 / letter-spacing 0.01em

/* Regra: nunca dois elementos com o mesmo tamanho e peso na mesma seção */
/* A hierarquia deve ser óbvia — o olho sabe onde ir primeiro */
```

---

## 10. TOUCH TARGETS E ERGONOMIA

```
/* Zona de alcance do polegar (mão direita, 390px de largura):
   - Verde (fácil): parte inferior central
   - Amarelo (ok): meio inferior e lados inferiores
   - Vermelho (difícil): topo da tela
*/

/* Regras derivadas: */

1. Ações primárias → bottom 1/3 da tela (zona verde)
2. Nav items → sempre no bottom nav (zona verde)
3. FAB → bottom right, acima do safe area
4. Botão de ação em modal → sempre no final, full-width
5. Swipe gestures → horizontais (natural), evitar verticais
6. Targets tácteis: mínimo 48×48px (Android) / 44×44px (iOS)
7. Gap entre targets adjacentes: mínimo 8px
8. Áreas de "dead zone" no topo → usar para informação, não ação

/* Elementos frequentes → parte inferior */
/* Elementos informativos → podem ir no topo */
```

---

## 11. SCROLL BEHAVIOR MOBILE

```typescript
// 1. Momentum scroll nativo (já é padrão no iOS, adicionar no Android)
className="overflow-y-auto overflow-x-hidden"
style={{ WebkitOverflowScrolling: 'touch' }}

// 2. Scroll snap em carousels horizontais
className="
  flex gap-4 overflow-x-auto
  scroll-snap-type-x-mandatory
  [-webkit-overflow-scrolling:touch]
  [scrollbar-width:none]
  [&::-webkit-scrollbar]:hidden
"
// Cada item:
className="scroll-snap-align-start flex-shrink-0"

// 3. Overscroll behavior — evita bounce que puxa conteúdo pai
className="overscroll-contain"

// 4. Fade nas bordas dos carousels horizontais — indica scrollability
// Aplicar gradient mask nos lados:
style={{
  maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 90%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 90%, transparent 100%)',
}}
```

---

## 12. MICRO-INTERAÇÕES ESPECÍFICAS MOBILE

### Tap feedback visual
```css
/* Substituir o highlight azul padrão por feedback customizado */
* {
  -webkit-tap-highlight-color: transparent;
}

/* Todo elemento interativo: */
.interactive {
  transition: opacity 80ms ease;
}
.interactive:active {
  opacity: 0.75;
}
/* Para elementos com Framer Motion whileTap: não precisa do CSS acima */
```

### Haptic feedback (onde suportado)
```typescript
// Feedback tátil em ações importantes
function triggerHaptic(type: 'light' | 'medium' | 'success' | 'error') {
  if (!navigator.vibrate) return
  const patterns = {
    light:   [8],
    medium:  [15],
    success: [10, 50, 10],
    error:   [50, 30, 50],
  }
  navigator.vibrate(patterns[type])
}

// Usar em:
// - Registrar venda → triggerHaptic('success')
// - Deletar item → triggerHaptic('medium')
// - Erro de form → triggerHaptic('error')
// - Tab change → triggerHaptic('light')
```

### Icon bounce no tap
```typescript
// Ícones do bottom nav têm micro-bounce ao serem selecionados
whileTap: {
  scale: [1, 0.85, 1.15, 1],
  transition: { duration: 0.3, times: [0, 0.2, 0.6, 1] }
}
```

---

## 13. CHECKLIST EXCLUSIVO MOBILE

Antes de qualquer tela mobile ser considerada pronta:

### Layout
- [ ] Safe area insets respeitados (top + bottom)
- [ ] Nenhuma ação importante no top 1/4 da tela
- [ ] Bottom nav com glass background, não cor sólida
- [ ] FAB posicionado na zona verde (bottom right)
- [ ] Padding horizontal mínimo 20px

### Touch e gestos
- [ ] Swipe-to-delete em cards de lista
- [ ] Carousels horizontais com scroll snap
- [ ] Bottom sheets com snap points e drag
- [ ] Touch targets mínimo 48px
- [ ] Haptic feedback em ações confirmadas

### Visual
- [ ] Background com profundidade (gradiente + noise)
- [ ] Cards com glassmorphism nos elementos flutuantes
- [ ] Hierarquia tipográfica dramática (contraste de pesos)
- [ ] Fade nas bordas de carousels horizontais
- [ ] Sem scrollbar visível em qualquer scroll horizontal
- [ ] Glow/brilho sutil nos cards de destaque

### Animações
- [ ] ArcCarousel em quick actions ou seleção de produtos
- [ ] Bottom nav com pill indicator (layoutId)
- [ ] Header com reação ao scroll (glass intensifica)
- [ ] Stagger em todas as listas
- [ ] Page transition ativa

---

## 14. ANTI-PADRÕES MOBILE ESPECÍFICOS

```
❌ Background plano sem profundidade ou gradiente
❌ Bottom nav com fundo sólido (sempre glass)
❌ Cards sem glassmorphism em elementos flutuantes
❌ Touch targets abaixo de 44px
❌ Ações importantes no topo da tela
❌ Carousels sem scroll snap e sem fade nas bordas
❌ -webkit-tap-highlight-color visível (sempre transparent)
❌ Bottom sheets sem drag handle e sem snap points
❌ FAB sem sombra colorida (accent glow)
❌ Tipografia sem hierarquia dramática — tudo no mesmo peso
❌ Listas sem swipe gesture para delete
❌ Modal que ocupa tela cheia quando bottom sheet resolve
❌ Padding horizontal abaixo de 20px
```

---

*SKILL Mobile UX Premium — Líderes AD · v1.0*
*Consultar junto com MOTION_AND_UX.md em todo componente mobile*
*Mobile é onde o app vive — precisa ser melhor que o desktop*