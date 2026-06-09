# SKILL — Padrões de Código
> Líderes AD · Boas práticas obrigatórias em todo o projeto
> Aplicar em 100% do código gerado ou revisado

---

## 1. PRINCÍPIOS GERAIS

```
✅ Código explícito > código "esperto"
✅ Um componente = uma responsabilidade
✅ Todo arquivo com comentário de cabeçalho
✅ Toda função não-óbvia com JSDoc
✅ Erros sempre tratados — nunca silenciados
✅ Loading states em toda operação async
✅ TypeScript strict — sem "any" exceto em último caso
```

---

## 2. ESTRUTURA DE COMPONENTE PADRÃO

```typescript
/**
 * BalanceCard — Exibe o saldo atual da cantina
 * Usado em: CantinaPage (Dashboard tab) + HomePage
 * Dados: hook useCantina → view cantina_balance no Supabase
 */

import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { useCantina } from '@/hooks/useCantina'
import { formatCurrency } from '@/lib/formatters'
import { cardItem } from '@/lib/animations'

// ─── Types ───────────────────────────────────────────────────────
interface BalanceCardProps {
  /** Mostra versão compacta para a Home */
  compact?: boolean
}

// ─── Component ───────────────────────────────────────────────────
export function BalanceCard({ compact = false }: BalanceCardProps) {
  const { balance, churchCut, isLoading } = useCantina()

  // Skeleton enquanto carrega
  if (isLoading) return <BalanceCardSkeleton compact={compact} />

  return (
    <motion.div variants={cardItem}>
      <Card variant="elevated">
        {/* Label */}
        <p className="text-label text-muted">SALDO ATUAL</p>

        {/* Valor principal */}
        <p className="text-display text-cream font-mono">
          {formatCurrency(balance)}
        </p>

        {/* Corte da igreja */}
        {!compact && (
          <p className="text-small text-success flex items-center gap-1 mt-1">
            <TrendingUp size={13} />
            {formatCurrency(churchCut)} destinados à igreja
          </p>
        )}
      </Card>
    </motion.div>
  )
}

// ─── Skeleton ────────────────────────────────────────────────────
function BalanceCardSkeleton({ compact }: { compact: boolean }) {
  return (
    <Card variant="elevated">
      <div className="skeleton h-3 w-24 mb-3" />
      <div className="skeleton h-10 w-48 mb-2" />
      {!compact && <div className="skeleton h-4 w-36" />}
    </Card>
  )
}
```

---

## 3. PADRÃO DE CUSTOM HOOK

```typescript
/**
 * useCantina — Gerencia estado e operações da cantina
 * 
 * Fornece:
 * - Saldo atual (balance) e corte da igreja (churchCut)
 * - Listagem de transações com filtros
 * - Funções de mutação: registerSale, registerExpense, registerDeposit
 * 
 * Fonte de dados: Supabase (cantina_transactions + cantina_balance view)
 * Realtime: NÃO — dados financeiros atualizam on-demand
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { supabase } from '@/lib/supabase'
import type { Transaction, CantinaBalance } from '@/types'

// Chaves de cache React Query
const QUERY_KEYS = {
  balance: ['cantina', 'balance'] as const,
  transactions: (filters: TransactionFilters) => ['cantina', 'transactions', filters] as const,
}

export function useCantina() {
  const queryClient = useQueryClient()

  // ─── Saldo ─────────────────────────────────────────────────────
  const { data: balanceData, isLoading: isLoadingBalance } = useQuery({
    queryKey: QUERY_KEYS.balance,
    queryFn: async (): Promise<CantinaBalance> => {
      const { data, error } = await supabase
        .from('cantina_balance')
        .select('*')
        .single()

      if (error) throw new Error(`Erro ao buscar saldo: ${error.message}`)
      return data
    },
    staleTime: 1000 * 30, // 30 segundos — saldo pode ser ligeiramente stale
  })

  // ─── Registrar Venda ───────────────────────────────────────────
  const { mutateAsync: registerSale, isPending: isRegistringSale } = useMutation({
    mutationFn: async (payload: RegisterSalePayload) => {
      // Calcula corte da igreja
      const churchCut = (payload.unitPrice * payload.quantity * payload.churchPercent) / 100

      const { error } = await supabase.from('cantina_transactions').insert({
        type: 'sale',
        amount: payload.unitPrice * payload.quantity,
        product_id: payload.productId,
        quantity: payload.quantity,
        church_cut: churchCut,
        created_by: payload.userId,
      })

      if (error) throw new Error(`Erro ao registrar venda: ${error.message}`)

      // Baixa estoque
      const { error: stockError } = await supabase.rpc('decrement_stock', {
        p_product_id: payload.productId,
        p_quantity: payload.quantity,
      })

      if (stockError) throw new Error(`Erro ao atualizar estoque: ${stockError.message}`)
    },

    onSuccess: () => {
      // Invalida cache para forçar re-fetch
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.balance })
      toast.success('Venda registrada com sucesso!')
    },

    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return {
    balance: balanceData?.balance ?? 0,
    churchCut: balanceData?.total_church_cut ?? 0,
    isLoading: isLoadingBalance,
    registerSale,
    isRegistringSale,
  }
}
```

---

## 4. TRATAMENTO DE ERROS

```typescript
// ✅ CORRETO — erro tratado e exibido ao usuário
const { error } = await supabase.from('events').insert(payload)
if (error) {
  console.error('[useEvents] Erro ao criar evento:', error)
  toast.error('Não foi possível criar o evento. Tente novamente.')
  throw error
}

// ❌ ERRADO — erro silenciado
const { error } = await supabase.from('events').insert(payload)
// error ignorado...

// ❌ ERRADO — error genérico sem contexto
if (error) throw error
```

### Padrão de Error Boundary
```typescript
// Em páginas principais, envolver com ErrorBoundary
<ErrorBoundary fallback={<PageErrorFallback />}>
  <CantinaPage />
</ErrorBoundary>
```

---

## 5. COMENTÁRIOS OBRIGATÓRIOS

### Cabeçalho de arquivo
```typescript
/**
 * formatters.ts — Funções de formatação de dados
 * 
 * formatCurrency(value)  → "R$ 1.247,50"
 * formatDate(date)       → "15 de Abril"
 * formatTime(date)       → "19:30"
 * getGreeting()          → "Bom dia" | "Boa tarde" | "Boa noite"
 * getInitials(name)      → "LC" (primeiras letras de cada palavra)
 */
```

### Funções complexas
```typescript
/**
 * Calcula o corte da igreja sobre uma venda
 * @param saleAmount - Valor total da venda em R$
 * @param percentual - Percentual configurado no produto (0-100)
 * @returns Valor em R$ que deve ir para a igreja
 */
export function calculateChurchCut(saleAmount: number, percentual: number): number {
  return (saleAmount * percentual) / 100
}
```

### Seções dentro de componentes longos
```typescript
// ─── Fetch de dados ───────────────────────────────────────────
// ─── Handlers ─────────────────────────────────────────────────
// ─── Render helpers ───────────────────────────────────────────
// ─── JSX ──────────────────────────────────────────────────────
```

---

## 6. TYPESCRIPT — REGRAS

```typescript
// ✅ Tipos explícitos em funções públicas
export function formatCurrency(value: number): string {}

// ✅ Interfaces para objetos de domínio
interface CantinaProduct {
  id: string
  name: string
  price: number
  stockQuantity: number
  churchPercent: number
  active: boolean
}

// ✅ Union types para status/enum
type TransactionType = 'sale' | 'expense' | 'deposit' | 'adjustment'

// ❌ Nunca "any" — usar "unknown" se necessário
const data: any = {} // ❌
const data: unknown = {} // ✅ (força type narrowing)

// ✅ Satisfies para objetos de config
const queryConfig = {
  staleTime: 1000 * 60,
  retry: 2,
} satisfies QueryOptions
```

---

## 7. TAILWIND — PADRÕES

```typescript
// ✅ Usar clsx/cn para classes condicionais
import { cn } from '@/lib/utils'

<div className={cn(
  'card-base transition-all',
  isActive && 'border-accent-primary',
  variant === 'elevated' && 'bg-elevated',
)}>

// ✅ Variáveis CSS para cores do tema (nunca hardcode hex)
<p className="text-[var(--cream)]">  // ✅
<p className="text-[#EEE8DC]">       // ❌

// ✅ Classes semânticas via @apply no index.css para padrões repetidos
// .card-base, .text-label, .text-display, .text-mono, etc.
```

---

## 8. PERFORMANCE

```typescript
// ✅ React.memo para componentes puros que recebem props simples
export const ProductCard = memo(function ProductCard({ product }: Props) {})

// ✅ useMemo para cálculos custosos
const sortedTransactions = useMemo(
  () => transactions.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
  [transactions]
)

// ✅ useCallback para funções passadas como props
const handleDelete = useCallback((id: string) => {
  deleteAbsence(id)
}, [deleteAbsence])

// ✅ Lazy loading de páginas
const CantinaPage = lazy(() => import('@/pages/CantinaPage'))
```

---

## 9. CHECKLIST DE CODE REVIEW

Antes de considerar qualquer feature pronta:

- [ ] Componente tem comentário de cabeçalho
- [ ] Funções complexas têm JSDoc
- [ ] Erros são tratados com toast ao usuário
- [ ] Loading state implementado (skeleton ou spinner)
- [ ] Empty state implementado
- [ ] TypeScript sem "any" não justificado
- [ ] Sem console.log esquecido (apenas console.error em catches)
- [ ] Responsivo: testado em 390px (mobile) e 1280px (desktop)
- [ ] Animações respeitam prefers-reduced-motion
- [ ] Dados sensíveis fora do código (env vars)

---

*SKILL Padrões de Código — Líderes AD · Aplicar em todo código do projeto*
