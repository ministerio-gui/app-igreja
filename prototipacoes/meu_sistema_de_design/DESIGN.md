DESIGN.md — Líderes AD
Agent-friendly design system file · Compatible with Google Stitch, Antigravity, Lovable Version 2.0 · AD Youth Leadership Platform · Refined after visual reference review

BRAND IDENTITY
App Name
Líderes AD
Tagline (uso interno / login)
"Assembleia de Deus · Liderança Jovem"
Brand Personality
Sério sem ser pesado. Limpo sem ser frio. Jovem sem ser infantil. A identidade parte do navy profundo da logo — autoridade, confiança, pertencimento. Nenhum elemento decorativo religioso. O app fala por si mesmo.

Referências visuais absorvidas
- ToyCad (Ref A): tipografia display grande e bold, alto contraste dark, botões pill
- Task Manager (Ref B): navy + branco, saudação pessoal, espaçamento generoso, gráficos fluidos

Logo
- Arquivo: logo_admissao.jpg
- Símbolo: abstrato dentro de círculo, fundo navy #1B2A4A, símbolo cream #EEE8DC
- Uso no app:
  - Login: símbolo 72×72px centralizado, acima do nome do app
  - Sidebar desktop: símbolo 36×36px + "Líderes AD" ao lado, padding 20px
  - Splash: símbolo 56×56px, fade-in 400ms
  - Bottom nav mobile: não aparece
  - Versão light: inverter — fundo cream #EEE8DC, símbolo navy #1B2A4A

COLOR SYSTEM
Origem
Derivado direto da logo: navy #1B2A4A + cream #EEE8DC. Paleta intencionalmente contida — navy como protagonista, sem accent colorido por módulo.

Dark Theme (padrão)
/* Fundos — escala do navy */
--bg-base: #090D15; /* Preto azulado — mais fundo que navy */
--bg-surface: #111827; /* Superfície principal de cards */
--bg-elevated: #1B2A4A; /* Navy da logo — cards de destaque */
--bg-overlay: #243358; /* Hover, selecionado */
--bg-subtle: #0F1A2E; /* Fundo de inputs, áreas recuadas */

/* Accent — derivado do navy, não indigo genérico */
--accent-primary: #4C72C4; /* Azul-navy elevado em luminosidade */
--accent-hover: #6B8FDE; /* Hover */
--accent-subtle: #4C72C41A; /* 10% — fundos de badge, highlight ativo */
--accent-on: #EEE8DC; /* Cream sobre accent */

/* Cream — uso reservado e precioso */
--cream: #EEE8DC; /* Números hero, headings principais */
--cream-dim: #B8AFA3; /* Cream secundário, labels especiais */

/* Texto */
--text-primary: #EEE8DC; /* Cream como texto principal — DNA da logo */
--text-secondary: #7A8BA8; /* Azul-acinzentado muted */
--text-muted: #3D506B; /* Muito muted — timestamps, hints */

/* Bordas */
--border: #FFFFFF07; /* 3% white */
--border-strong: #FFFFFF12; /* 7% white */
--border-accent: #4C72C430; /* Accent 19% — card ativo */

/* Status */
--success: #22D3A0;
--warning: #F5A623;
--danger: #F05252;
--info: #4C72C4;

Light Theme
/* Fundos */
--bg-base: #F2EFE9; /* Cream muito suave */
--bg-surface: #FFFFFF;
--bg-elevated: #EEE8DC;
--bg-overlay: #E0D9CE;
--bg-subtle: #F7F4F0;

/* Accent */
--accent-primary: #1B2A4A;
--accent-hover: #243358;
--accent-subtle: #1B2A4A0D;
--accent-on: #EEE8DC;

TYPOGRAPHY
Decisão
Plus Jakarta Sans — geométrica, moderna, com personalidade. Combina com o peso visual da identidade AD.

Font Stack
/* Display + Headings + UI */
font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
/* Dados financeiros, números, código */
font-family: 'JetBrains Mono', 'Courier New', monospace;

Google Fonts Import
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">

Escala tipográfica
--text-display: 44px / 1.0 / Plus Jakarta Sans 800
--text-h1: 26px / 1.2 / Plus Jakarta Sans 700
--text-h2: 18px / 1.3 / Plus Jakarta Sans 600
--text-body: 15px / 1.6 / Plus Jakarta Sans 400
--text-label: 11px / 1.0 / Plus Jakarta Sans 600 / uppercase

SPACING & LAYOUT
Scale (base 4px)
--space-1: 4px, --space-4: 16px, --space-6: 24px, --space-8: 32px

Layout Constants
--sidebar-width: 240px
--bottom-nav-height: 64px
--content-max-width: 480px
--card-padding: 18px

BORDER RADIUS
--radius-xs: 6px
--radius-sm: 10px
--radius-md: 14px (Cards padrão)
--radius-lg: 18px
--radius-full: 9999px

ELEVATION & SHADOWS
--shadow-sm: 0 1px 4px rgba(0,0,0,0.5);
--shadow-md: 0 4px 16px rgba(0,0,0,0.55);
--shadow-accent: 0 4px 24px rgba(76,114,196,0.35);

COMPONENT PATTERNS
Cards
- Destaque: Background: var(--bg-elevated) (navy), Border: 1px solid var(--border-accent)

Buttons
- Primary: Background: var(--accent-primary) (#4C72C4), Color: var(--accent-on) (#EEE8DC)
- Border-radius: var(--radius-sm) (10px)

Navigation
- Sidebar: Background: var(--bg-elevated), Color: var(--cream)
- Bottom Nav: Active Color: var(--accent-primary)

DO'S AND DON'TS
✅ Faça
- Use navy (bg-elevated) em cards de destaque
- Use cream como cor de texto em headings hero
- Tipografia bold (700-800) em títulos e números
❌ Não faça
- Não use Instrument Serif (substituída por Plus Jakarta Sans)
- Não use branco puro no dark — use cream #EEE8DC
- Não use cores diferentes por módulo