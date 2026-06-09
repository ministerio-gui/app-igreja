# PRD — Estrutura do Projeto
> Documento vivo · Atualizar sempre que criar, mover ou deletar arquivos/pastas
> Stack: React 18 · TypeScript · Vite · Tailwind CSS · Supabase

---

## ESTRUTURA DE PASTAS

```
lideres-ad/
│
├── .prd/                          ← Documentação viva do projeto
│   ├── FEATURES.md                ← Status de cada feature (este arquivo)
│   ├── STRUCTURE.md               ← Estrutura de pastas (você está aqui)
│   └── CHANGELOG.md               ← Histórico de mudanças
│
├── .skills/                       ← Skills de desenvolvimento
│   ├── CODE_STANDARDS.md          ← Boas práticas e padrões de código
│   ├── SECURITY.md                ← Segurança e RLS
│   └── SUPABASE_SETUP.md          ← Configuração do banco de dados
│
├── public/
│   ├── favicon.ico
│   ├── apple-touch-icon.png       ← 180×180px para iOS
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   ├── masked-icon.svg            ← Para Android adaptive icon
│   └── logo_admissao.png          ← Logo original da AD
│
├── src/
│   │
│   ├── components/                ← Componentes reutilizáveis
│   │   │
│   │   ├── layout/                ← Estrutura global do app
│   │   │   ├── AppShell.tsx       ← Wrapper principal (sidebar + bottom nav + outlet)
│   │   │   ├── Sidebar.tsx        ← Navegação desktop (240px, navy)
│   │   │   ├── BottomNav.tsx      ← Navegação mobile (64px)
│   │   │   └── PageWrapper.tsx    ← Animação de entrada + padding de página
│   │   │
│   │   ├── ui/                    ← Design system — shadcn customizado
│   │   │   ├── Button.tsx         ← Primary / Secondary / Danger / Ghost
│   │   │   ├── Card.tsx           ← Default / Elevated / Subtle
│   │   │   ├── Input.tsx          ← Com label, error state, focus ring
│   │   │   ├── Badge.tsx          ← Default / Global / Status
│   │   │   ├── Avatar.tsx         ← Com iniciais, tamanhos 24/32/40/56px
│   │   │   ├── Skeleton.tsx       ← Shimmer loader
│   │   │   ├── Toast.tsx          ← Via sonner
│   │   │   ├── BottomSheet.tsx    ← Modal mobile (spring animation)
│   │   │   ├── FAB.tsx            ← Floating action button expansível
│   │   │   └── EmptyState.tsx     ← Ícone + título + subtítulo + CTA
│   │   │
│   │   ├── home/
│   │   │   ├── GreetingHeader.tsx
│   │   │   ├── UpcomingEventsStrip.tsx
│   │   │   ├── PinnedNotes.tsx
│   │   │   ├── CantinaQuickBalance.tsx
│   │   │   └── WeekAbsences.tsx
│   │   │
│   │   ├── calendar/
│   │   │   ├── CalendarHeader.tsx
│   │   │   ├── MonthView.tsx
│   │   │   ├── WeekView.tsx
│   │   │   ├── DayView.tsx
│   │   │   └── EventModal.tsx
│   │   │
│   │   ├── cantina/
│   │   │   ├── BalanceCard.tsx
│   │   │   ├── StatsRow.tsx
│   │   │   ├── SalesChart.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductModal.tsx
│   │   │   ├── TransactionList.tsx
│   │   │   ├── SaleModal.tsx
│   │   │   ├── ExpenseModal.tsx
│   │   │   └── DepositModal.tsx
│   │   │
│   │   ├── ausencias/
│   │   │   ├── AbsenceCard.tsx
│   │   │   ├── AbsenceGroupHeader.tsx
│   │   │   ├── MonthFilterChips.tsx
│   │   │   └── AbsenceModal.tsx
│   │   │
│   │   └── auth/
│   │       ├── LoginForm.tsx
│   │       └── RequireAuth.tsx    ← Wrapper de rotas protegidas
│   │
│   ├── pages/                     ← Páginas (1 por rota)
│   │   ├── LoginPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── CalendarPage.tsx
│   │   ├── CantinaPage.tsx
│   │   └── AusenciasPage.tsx
│   │
│   ├── hooks/                     ← Custom hooks (lógica de negócio)
│   │   ├── useAuth.ts             ← Contexto de autenticação
│   │   ├── useProfile.ts          ← Dados do perfil do usuário logado
│   │   ├── useEvents.ts           ← CRUD de eventos + realtime
│   │   ├── useNotes.ts            ← CRUD de notas
│   │   ├── useCantina.ts          ← Saldo, transações, produtos
│   │   ├── useProducts.ts         ← CRUD de produtos da cantina
│   │   └── useAbsences.ts         ← CRUD de ausências + realtime
│   │
│   ├── lib/                       ← Utilitários e clientes externos
│   │   ├── supabase.ts            ← Cliente Supabase (singleton)
│   │   ├── utils.ts               ← Helpers gerais (cn, formatDate, etc.)
│   │   ├── formatters.ts          ← Formatação de moeda, datas, nomes
│   │   └── animations.ts          ← Variantes Framer Motion reutilizáveis
│   │
│   ├── store/                     ← Estado global (Zustand)
│   │   ├── themeStore.ts          ← dark | light + persistência
│   │   └── uiStore.ts             ← Estado de modais, FAB aberto, etc.
│   │
│   ├── types/                     ← TypeScript types e interfaces
│   │   ├── index.ts               ← Re-export de todos os tipos
│   │   ├── database.types.ts      ← Tipos gerados pelo Supabase CLI
│   │   ├── event.types.ts
│   │   ├── cantina.types.ts
│   │   └── absence.types.ts
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx        ← Provider de autenticação global
│   │
│   ├── App.tsx                    ← Roteamento principal (React Router)
│   ├── main.tsx                   ← Entry point + providers
│   └── index.css                  ← CSS global + variáveis de tema
│
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql ← Schema completo do banco
│   └── seed.sql                   ← Dados iniciais de teste
│
├── .env.local                     ← Variáveis de ambiente (NÃO commitar)
├── .env.example                   ← Template de variáveis (commitar)
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## CONVENÇÕES DE NOMENCLATURA

### Arquivos
```
Componentes React:    PascalCase     → BalanceCard.tsx
Hooks:                camelCase      → useCantina.ts
Utilitários:          camelCase      → formatters.ts
Tipos:                camelCase      → cantina.types.ts
Páginas:              PascalCase     → CantinaPage.tsx
```

### Dentro do código
```typescript
// Componentes: PascalCase
export function BalanceCard() {}

// Hooks: prefixo "use" + camelCase
export function useCantina() {}

// Tipos e interfaces: PascalCase
interface CantinaProduct {}
type TransactionType = 'sale' | 'expense' | 'deposit'

// Constantes: SCREAMING_SNAKE_CASE
const MAX_PRODUCTS_PER_PAGE = 50

// Funções utilitárias: camelCase
function formatCurrency(value: number): string {}

// Variáveis: camelCase
const currentBalance = 0
```

### Tabelas Supabase
```
snake_case sempre:
profiles, events, notes, cantina_products, cantina_transactions, absences
```

---

## VARIÁVEIS DE AMBIENTE

### .env.example (commitar este)
```
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

### .env.local (NUNCA commitar)
```
VITE_SUPABASE_URL=sua_url_real
VITE_SUPABASE_ANON_KEY=sua_chave_real
```

---

## IMPORTS — ORDEM PADRÃO

```typescript
// 1. React e bibliotecas externas
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// 2. Componentes internos (absolutos via @/)
import { Card } from '@/components/ui/Card'
import { useCantina } from '@/hooks/useCantina'

// 3. Tipos
import type { CantinaProduct } from '@/types'

// 4. Assets e estilos
import styles from './Component.module.css'
```

---

## CHANGELOG DE ESTRUTURA

| Data | Mudança |
|---|---|
| — | Estrutura inicial definida |

---

*PRD Estrutura — Líderes AD · Atualizar este arquivo ao criar/mover/deletar qualquer pasta ou arquivo relevante*
