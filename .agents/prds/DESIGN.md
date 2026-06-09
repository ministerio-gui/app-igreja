# DESIGN.md — Líderes AD
> Agent-friendly design system file · Compatible with Google Stitch, Antigravity, Lovable
> Version 2.0 · AD Youth Leadership Platform · Refined after visual reference review

---

## BRAND IDENTITY

### App Name
**Líderes AD**

### Tagline (uso interno / login)
"Assembleia de Deus · Liderança Jovem"

### Brand Personality
Sério sem ser pesado. Limpo sem ser frio. Jovem sem ser infantil.
A identidade parte do navy profundo da logo — autoridade, confiança, pertencimento.
Nenhum elemento decorativo religioso. O app fala por si mesmo.

### Referências visuais absorvidas
- **ToyCad (Ref A):** tipografia display grande e bold, alto contraste dark, botões pill
- **Task Manager (Ref B):** navy + branco, saudação pessoal, espaçamento generoso, gráficos fluidos

### Logo
- Arquivo: `logo_admissao.jpg`
- Símbolo: abstrato dentro de círculo, fundo navy `#1B2A4A`, símbolo cream `#EEE8DC`
- Uso no app:
  - **Login:** símbolo 72×72px centralizado, acima do nome do app
  - **Sidebar desktop:** símbolo 36×36px + "Líderes AD" ao lado, padding 20px
  - **Splash:** símbolo 56×56px, fade-in 400ms
  - **Bottom nav mobile:** não aparece
- Versão light: inverter — fundo cream `#EEE8DC`, símbolo navy `#1B2A4A`
- Proibido: sombra, rotação, alteração de cores, texto colado à logo

---

## COLOR SYSTEM

### Origem
Derivado direto da logo: navy `#1B2A4A` + cream `#EEE8DC`
Paleta intencionalmente contida — navy como protagonista, sem accent colorido por módulo.

### Dark Theme (padrão)

```
/* Fundos — escala do navy */
--bg-base:          #090D15;   /* Preto azulado — mais fundo que navy */
--bg-surface:       #111827;   /* Superfície principal de cards */
--bg-elevated:      #1B2A4A;   /* Navy da logo — cards de destaque */
--bg-overlay:       #243358;   /* Hover, selecionado */
--bg-subtle:        #0F1A2E;   /* Fundo de inputs, áreas recuadas */

/* Accent — derivado do navy, não indigo genérico */
--accent-primary:   #4C72C4;   /* Azul-navy elevado em luminosidade */
--accent-hover:     #6B8FDE;   /* Hover */
--accent-subtle:    #4C72C41A; /* 10% — fundos de badge, highlight ativo */
--accent-on:        #EEE8DC;   /* Cream sobre accent */

/* Cream — uso reservado e precioso */
--cream:            #EEE8DC;   /* Números hero, headings principais */
--cream-dim:        #B8AFA3;   /* Cream secundário, labels especiais */

/* Texto */
--text-primary:     #EEE8DC;   /* Cream como texto principal — DNA da logo */
--text-secondary:   #7A8BA8;   /* Azul-acinzentado muted */
--text-muted:       #3D506B;   /* Muito muted — timestamps, hints */

/* Bordas */
--border:           #FFFFFF07; /* 3% white */
--border-strong:    #FFFFFF12; /* 7% white */
--border-accent:    #4C72C430; /* Accent 19% — card ativo */

/* Status */
--success:          #22D3A0;   /* Teal-verde */
--warning:          #F5A623;   /* Âmbar */
--danger:           #F05252;   /* Vermelho */
--info:             #4C72C4;   /* Mesmo que accent */
```

### Light Theme

```
/* Fundos */
--bg-base:          #F2EFE9;   /* Cream muito suave — derivado do símbolo */
--bg-surface:       #FFFFFF;
--bg-elevated:      #EEE8DC;   /* Cream da logo — cards de destaque */
--bg-overlay:       #E0D9CE;
--bg-subtle:        #F7F4F0;

/* Accent — navy vira accent no light */
--accent-primary:   #1B2A4A;   /* Navy como accent */
--accent-hover:     #243358;
--accent-subtle:    #1B2A4A0D;
--accent-on:        #EEE8DC;   /* Cream sobre navy */

/* Cream */
--cream:            #1B2A4A;   /* Inverte — navy vira o "destaque" */
--cream-dim:        #3A4A6A;

/* Texto */
--text-primary:     #0D1117;
--text-secondary:   #3A4A6A;
--text-muted:       #8896B0;

/* Bordas */
--border:           #1B2A4A08;
--border-strong:    #1B2A4A15;
--border-accent:    #1B2A4A35;

/* Status */
--success:          #0D9E72;
--warning:          #D48A0A;
--danger:           #D03030;
--info:             #1B2A4A;
```

### Regras de uso de cor
- `bg-elevated` = navy da logo → cards de destaque, sidebar, header sticky
- `cream` = reservado para texto hero, saldo, número principal de cada tela
- Accent `#4C72C4` → apenas botões CTA, nav ativo, focus ring, link
- Sem cores por módulo — tudo dentro da família navy/cream/accent
- Status colors apenas para feedback (sucesso de ação, erro, alerta) — nunca decoração

---

## TYPOGRAPHY

### Decisão
Instrument Serif removida — muito editorial para um app de gestão.
Substituída por **Plus Jakarta Sans** — geométrica, moderna, com personalidade.
Combina exatamente com o DNA da Ref B (Task Manager) e com o peso visual da Ref A.

### Font Stack
```css
/* Display + Headings + UI — fonte única, múltiplos pesos */
font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;

/* Dados financeiros, números, código */
font-family: 'JetBrains Mono', 'Courier New', monospace;
```

### Google Fonts Import
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
```

### Escala tipográfica
```
/* Display — saldo, número hero — impacto máximo */
--text-display:  44px / 1.0  / Plus Jakarta Sans 800  / cream

/* H1 — título de página */
--text-h1:       26px / 1.2  / Plus Jakarta Sans 700

/* H2 — título de seção */
--text-h2:       18px / 1.3  / Plus Jakarta Sans 600

/* H3 — título de card */
--text-h3:       15px / 1.4  / Plus Jakarta Sans 600

/* Body — texto corrido */
--text-body:     15px / 1.6  / Plus Jakarta Sans 400

/* Small — metadados, labels secundários */
--text-small:    13px / 1.5  / Plus Jakarta Sans 400

/* Caption — timestamps, versões, hints */
--text-caption:  11px / 1.4  / Plus Jakarta Sans 400

/* Label caps — títulos de seção em caps */
--text-label:    11px / 1.0  / Plus Jakarta Sans 600 / letter-spacing 0.08em / uppercase

/* Mono grande — saldo, valores principais */
--text-mono-xl:  44px / 1.0  / JetBrains Mono 700
--text-mono-lg:  28px / 1.0  / JetBrains Mono 600
--text-mono-md:  18px / 1.0  / JetBrains Mono 500
--text-mono-sm:  13px / 1.0  / JetBrains Mono 400
```

### Regras tipográficas
- Todo valor financeiro: obrigatoriamente JetBrains Mono
- Saudação ("Olá, Lucas 👋"): Plus Jakarta Sans 700, 24px
- Nome do app em contexto de login: Plus Jakarta Sans 800, 32px
- Caps labels (títulos de seção): sempre 11px + letter-spacing 0.08em
- Nunca abaixo de weight 300
- Line-height mínimo: 1.4 em qualquer contexto

---

## SPACING & LAYOUT

### Scale (base 4px)
```
--space-1:   4px
--space-2:   8px
--space-3:   12px
--space-4:   16px
--space-5:   20px
--space-6:   24px
--space-8:   32px
--space-10:  40px
--space-12:  48px
--space-16:  64px
```

### Layout Constants
```
--sidebar-width:         240px
--bottom-nav-height:     64px
--bottom-nav-safe:       calc(64px + env(safe-area-inset-bottom))
--top-bar-height:        56px
--content-max-width:     480px
--page-padding-mobile:   20px
--card-padding:          18px
--section-gap-mobile:    24px
--section-gap-desktop:   32px
```

### Breakpoints
```
mobile:   < 768px    → Bottom Navigation
tablet:   768–1024px → Bottom Navigation
desktop:  > 1024px   → Sidebar fixa 240px
```

---

## BORDER RADIUS

```
--radius-xs:    6px     /* badges, chips */
--radius-sm:    10px    /* inputs */
--radius-md:    14px    /* cards padrão */
--radius-lg:    18px    /* modais, drawers */
--radius-xl:    26px    /* bottom sheets */
--radius-full:  9999px  /* pills, avatares, FAB */
```

---

## ELEVATION & SHADOWS

```css
/* Dark */
--shadow-sm:     0 1px 4px rgba(0,0,0,0.5);
--shadow-md:     0 4px 16px rgba(0,0,0,0.55);
--shadow-lg:     0 12px 40px rgba(0,0,0,0.65);
--shadow-accent: 0 4px 24px rgba(76,114,196,0.35);   /* glow navy-blue no FAB */

/* Light */
--shadow-sm:     0 1px 4px rgba(27,42,74,0.07);
--shadow-md:     0 4px 16px rgba(27,42,74,0.11);
--shadow-lg:     0 12px 40px rgba(27,42,74,0.16);
--shadow-accent: 0 4px 24px rgba(27,42,74,0.22);
```

---

## COMPONENT PATTERNS

### Cards
```
Padrão:
  Background:    var(--bg-surface)
  Border:        1px solid var(--border)
  Border-radius: var(--radius-md)     14px
  Padding:       var(--card-padding)  18px
  Shadow:        var(--shadow-sm)

Destaque (ex: saldo cantina, próximo evento):
  Background:    var(--bg-elevated)   ← navy da logo
  Border:        1px solid var(--border-accent)
  Shadow:        var(--shadow-accent)
  
Subtle (ex: notas, ausências secundárias):
  Background:    var(--bg-subtle)
  Border:        1px solid var(--border)
```

### Buttons
```
Primary:
  Background:    var(--accent-primary)  #4C72C4
  Color:         var(--accent-on)       #EEE8DC (cream)
  Height:        52px mobile / 44px desktop
  Border-radius: var(--radius-sm)  10px
  Font:          Plus Jakarta Sans 600 15px
  Shadow:        var(--shadow-accent)
  Hover:         background lighten 8%
  Active:        scale(0.97) spring

Secondary:
  Background:    transparent
  Border:        1px solid var(--border-strong)
  Color:         var(--text-primary)

Danger:
  Background:    transparent
  Border:        1px solid var(--danger)
  Color:         var(--danger)

Ghost:
  Background:    transparent
  Color:         var(--text-secondary)
  No border
```

### Inputs
```
Background:    var(--bg-subtle)
Border:        1px solid var(--border-strong)
Border-radius: var(--radius-sm)  10px
Height:        50px
Padding:       0 16px
Font:          Plus Jakarta Sans 400 15px
Color:         var(--text-primary)
Placeholder:   var(--text-muted)

Focus:
  Border:      1px solid var(--accent-primary)
  Box-shadow:  0 0 0 3px var(--accent-subtle)

Label:
  Plus Jakarta Sans 500 13px
  Color: var(--text-secondary)
  Margin-bottom: 7px
```

### Navigation — Sidebar Desktop
```
Width:         240px
Background:    var(--bg-elevated)   ← navy da logo
Border-right:  1px solid var(--border)
Padding:       20px 14px

Logo area:
  Padding:     20px 6px 32px
  Logo:        36×36px círculo
  Nome:        "Líderes AD" Plus Jakarta Sans 700 15px
  Color:       var(--cream)

Nav item:
  Height:      46px
  Border-radius: var(--radius-sm)  10px
  Padding:     0 14px
  Gap:         11px
  Font:        Plus Jakarta Sans 500 14px

Inactive:
  Color:       var(--text-secondary)
  Background:  transparent

Active:
  Color:       var(--cream)
  Background:  var(--accent-subtle)
  Border-left: 3px solid var(--accent-primary)

Hover:
  Background:  var(--bg-overlay)
  Color:       var(--text-primary)

User profile (bottom):
  Avatar:      34px, initials, bg: var(--accent-subtle)
  Name:        Plus Jakarta Sans 500 13px, var(--text-secondary)
  Padding:     16px 6px
  Border-top:  1px solid var(--border)
```

### Navigation — Bottom Nav Mobile
```
Height:        64px
Background:    var(--bg-surface)
Border-top:    1px solid var(--border)
Padding-bottom: env(safe-area-inset-bottom)

Item:
  Flex: 1
  Flex-direction: column
  Align: center
  Gap: 3px

Icon:  22px stroke 1.5
Label: Plus Jakarta Sans 500 10px letter-spacing 0.02em

Inactive: var(--text-muted)
Active:
  Color:       var(--accent-primary)
  Icon pill:   background var(--accent-subtle), border-radius 12px, padding 4px 12px
```

### FAB
```
Size:          56×56px
Border-radius: var(--radius-full)
Background:    var(--accent-primary)
Icon:          cream #EEE8DC, 22px
Shadow:        var(--shadow-accent)
Position:      fixed, bottom calc(80px + env(safe-area-inset-bottom)), right 20px

Expanded (3 opções):
  Direção:     radial para cima
  Cada opção:  pill 44px + label à esquerda
  Animation:   stagger 55ms, spring up
  Backdrop:    rgba(0,0,0,0.45) blur(4px)
```

### Avatares
```
Sizes:    24 / 32 / 40 / 56px
Shape:    circle
Default:  bg var(--bg-elevated), text var(--cream), Plus Jakarta Sans 700
Border:   2px solid var(--bg-surface) para stack
```

### Skeleton Loaders
```
Background:  var(--bg-elevated)
Shimmer:     linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)
Animation:   shimmer 1.6s ease infinite
```

### Empty States
```
Icon:     SVG Lucide, 44px, color var(--text-muted)
Title:    Plus Jakarta Sans 600 17px, var(--text-primary)
Subtitle: Plus Jakarta Sans 400 14px, var(--text-secondary)
Gap:      12px entre elementos
Padding:  56px vertical
```

---

## ICONS
**Lucide Icons** — stroke 1.5px padrão, 2px em ênfase

```
Home:          lucide:home
Calendário:    lucide:calendar-days
Cantina:       lucide:shopping-basket
Ausências:     lucide:user-x
Nota:          lucide:file-text
Novo evento:   lucide:calendar-plus
Venda:         lucide:receipt
Despesa:       lucide:arrow-down-left
Depósito:      lucide:arrow-up-right
Produto:       lucide:package
Editar:        lucide:pencil-line
Deletar:       lucide:trash-2
Fechar:        lucide:x
Voltar:        lucide:chevron-left
Avançar:       lucide:chevron-right
Perfil:        lucide:user-circle
Sair:          lucide:log-out
Tema:          lucide:sun / lucide:moon
Mais:          lucide:more-horizontal
Fixar nota:    lucide:pin
```

Sizes: 16px inline · 20px nav/buttons · 24px headers · 40px empty states

---

## ANIMATIONS

### Princípios
- Spring e ease-out — nunca linear
- Máximo 400ms para interações de UI
- Propósito em cada animação
- Respeitar `prefers-reduced-motion`

### Tokens
```css
--dur-instant:  80ms
--dur-fast:     150ms
--dur-normal:   220ms
--dur-slow:     350ms
--dur-enter:    380ms

--ease-spring:  cubic-bezier(0.25, 0.46, 0.45, 0.94)
--ease-out:     cubic-bezier(0.0, 0.0, 0.2, 1.0)
--ease-bounce:  cubic-bezier(0.34, 1.56, 0.64, 1.0)
```

### Padrões

**Page transition:**
```js
initial:    { opacity: 0, y: 16 }
animate:    { opacity: 1, y: 0 }
exit:       { opacity: 0, y: -8 }
transition: { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }
```

**Card stagger (lista):**
```js
// container
staggerChildren: 0.055

// cada card
initial:    { opacity: 0, y: 20, scale: 0.97 }
animate:    { opacity: 1, y: 0,  scale: 1.0  }
transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }
```

**Button press:**
```js
whileTap:   { scale: 0.96 }
transition: { duration: 0.08 }
```

**Bottom sheet:**
```js
initial:    { y: "100%" }
animate:    { y: 0 }
exit:       { y: "100%" }
transition: { type: "spring", damping: 32, stiffness: 360 }
```

**Number counter (saldo):**
```
Ao mudar valor → count up/down em 600ms ease-out
```

---

## SCREEN-BY-SCREEN SPECS

### Login
```
BG:           var(--bg-base) full screen
              Detalhe: textura noise muy sutil (opacity 2-3%) opcional

Logo area:    top 30% da tela
  Logo:       72×72px círculo, centralizado
  App name:   "Líderes AD" Plus Jakarta Sans 800 32px, var(--cream)
              letter-spacing -0.02em (tight = premium)
  Tagline:    "Assembleia de Deus · Liderança Jovem"
              Plus Jakarta Sans 400 12px, var(--text-muted)
              letter-spacing 0.12em uppercase

Form card:    var(--bg-surface), radius 18px, padding 24px, shadow-lg
              margin: 0 24px

Fields:       Email + Senha (show/hide)
              "Esqueci minha senha" → right-aligned, var(--text-secondary) 13px

CTA:          "Entrar →" full width, primary button 52px
Version:      "v1.0" caption, bottom center, var(--text-muted)
```

### Home
```
Header:       sticky, bg var(--bg-base) blur(12px)
  Left:       "Olá, [Nome] 👋" Plus Jakarta Sans 700 24px
  Right:      avatar 36px + theme toggle

Sections:     vertical scroll, gap 24px, padding 20px

Próximos eventos:
  Cards:      160×96px horizontal scroll
              bg var(--bg-elevated) — navy
              left border 4px accent
              título 14px 600, data 12px muted

Notas:        grid 2 colunas
              card bg-surface
              badge "Global" em success tint

Cantina:      1 card destaque
              "Saldo Atual" label 11px caps muted
              valor JetBrains Mono 700 44px cream
              sub "R$ X para a igreja" success 13px

Ausências:    row de avatares com nomes
```

### Calendário
```
Hoje:         circle solid var(--accent-primary), text cream
Eventos:      dots coloridos abaixo do número
Chip evento:  bg var(--bg-elevated), text cream, radius-full
Current time: linha var(--danger) 1px + dot 6px
```

### Cantina
```
Balance card: bg var(--bg-elevated)
              "Saldo Atual" 11px caps muted
              valor mono-xl cream  
              church cut success 13px

Stats:        3 mini cards bg-subtle
Chart:        linhas spline — success (entradas) + danger (saídas)
              sem grid lines, apenas axes leves
```

### Ausências
```
Group header: Plus Jakarta Sans 500 11px, uppercase, letter-spacing 0.1em, text-muted
Card:         left border 3px var(--accent-primary)
              avatar 40px bg-elevated
              nome 600, motivo 400 muted
```

---

## PWA & MOBILE

```html
<meta name="theme-color" content="#111827" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#F2EFE9" media="(prefers-color-scheme: light)">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Líderes AD">
```

```
Safe areas:    env(safe-area-inset-*) em todo conteúdo próximo às bordas
Touch targets: mínimo 44×44px
Tap highlight: -webkit-tap-highlight-color: transparent
Scroll:        -webkit-overflow-scrolling: touch
```

---

## DO'S AND DON'TS

### ✅ Faça
- Use navy (`bg-elevated`) em cards de destaque — presença da logo sem mostrar ela
- Use cream como cor de texto em headings hero e números grandes
- Mantenha tudo dentro da família navy/cream — sem accent colorido por módulo
- Tipografia bold (700-800) em títulos e números para alto contraste = premium
- Espaçamento generoso — padding nunca abaixo de 18px em cards
- Letter-spacing negativo (-0.02em) em títulos display — tightening = sofisticação
- Gráficos com linhas spline (curvas) em vez de linhas retas

### ❌ Não faça
- Não use cores diferentes por módulo (confirmado: tudo navy/neutro)
- Não use branco puro `#FFFFFF` como cor de texto no dark — use cream `#EEE8DC`
- Não use Instrument Serif — substituída por Plus Jakarta Sans
- Não coloque a logo com texto colado no mobile
- Não use mais de 2 famílias tipográficas por tela
- Não use gradientes coloridos em backgrounds de cards
- Não use peso abaixo de 400 em texto funcional
- Não anime sem propósito — cada animação deve comunicar estado ou feedback
- Não use emojis como ícones de navegação — apenas Lucide Icons

---

*DESIGN.md — Líderes AD · v2.0*
*Cole este arquivo como contexto inicial no Google Stitch antes de qualquer geração de tela.*
*Antigravity: usar como design token reference no import.*