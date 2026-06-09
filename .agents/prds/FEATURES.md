# PRD — Líderes AD
> Product Requirements Document · Atualizado a cada feature concluída
> Stack: React 18 + TypeScript + Tailwind CSS + Supabase + PWA

---

## STATUS GERAL DO PROJETO

```
Fase atual:     🔧 Setup & Fundação
Última atualização: [DATA]
Progresso:      ░░░░░░░░░░ 0%
```

### Legenda de status
```
🔴 Não iniciado
🟡 Em progresso  
🟢 Concluído
🔵 Em revisão
⏸️  Bloqueado
```

---

## 1. VISÃO DO PRODUTO

**Produto:** Líderes AD — App de gestão da liderança jovem da Assembleia de Deus  
**Usuários:** Líderes jovens (5–15 pessoas), acesso por convite  
**Plataforma:** PWA mobile-first (Android via install banner, iOS via "Adicionar à tela inicial")  
**Autenticação:** Email + senha via Supabase Auth — sem cadastro público  

### Objetivo central
Eliminar planilhas, grupos de WhatsApp e anotações soltas. Centralizar calendário, cantina, ausências e notas em um único app premium.

---

## 2. MÓDULOS E FEATURES

### 2.1 🔐 AUTENTICAÇÃO
**Status:** 🔴 Não iniciado

| Feature | Descrição | Status |
|---|---|---|
| Login email/senha | Tela de login sem validação por enquanto | 🔴 |
| Recuperação de senha | Reset via email Supabase ainda não obrigatório | 🔴 |
| Sessão persistente | Auto-login no PWA | 🔴 |
| Perfil do usuário | Avatar (caso exista) + nome + role (caso exista) | 🔴 |
| Rotas protegidas | Redirect para login se não autenticado (quando auth estiver implementado) | 🔴 |
| Logout | Limpa sessão e redireciona | 🔴 |

**Critérios de aceite:**
- [ ] Login funcional com email e senha válidos (quando auth estiver implementado)
- [ ] Erro claro em credenciais inválidas (toast) (quando auth estiver implementado)
- [ ] Sessão persiste após fechar o app (quando auth estiver implementado)
- [ ] Recuperação de senha envia email (quando auth estiver implementado)
- [ ] Acesso negado a rotas sem autenticação (quando auth estiver implementado)

---

### 2.2 🏠 HOME / DASHBOARD
**Status:** 🔴 Não iniciado

| Feature | Descrição | Status |
|---|---|---|
| Saudação dinâmica | "Olá, [Nome] 👋" baseado na hora | 🔴 |
| Próximos eventos | Cards horizontais scroll, máx. 3 | 🔴 |
| Notas fixadas | Grid 2 colunas, globais + pessoais | 🔴 |
| Saldo cantina | Card destaque com valor em tempo real | 🔴 |
| Ausências da semana | Avatares com nomes | 🔴 |
| FAB expandido | Botão + com 3 ações rápidas | 🔴 |
| Skeleton loaders | Loading state de todos os blocos | 🔴 |
| Empty states | Estado vazio em cada seção | 🔴 |

**Critérios de aceite:**
- [ ] Saudação muda conforme horário (manhã/tarde/noite)
- [ ] Eventos ordenados por data, somente futuros
- [ ] Saldo reflete dados reais do Supabase
- [ ] FAB abre com animação spring e backdrop
- [ ] Skeletons têm o shape exato do conteúdo real

---

### 2.3 📅 CALENDÁRIO
**Status:** 🔴 Não iniciado

| Feature | Descrição | Status |
|---|---|---|
| Vista mês | Grade 7 colunas, eventos como chips | 🔴 |
| Vista semana | Colunas por dia com blocos de horário | 🔴 |
| Vista dia | Timeline vertical | 🔴 |
| Navegação temporal | Setas + swipe mobile | 🔴 |
| Criar evento | Modal/bottom sheet completo | 🔴 |
| Editar evento | Pré-preenche campos existentes | 🔴 |
| Deletar evento | Confirmação + toast | 🔴 |
| Cores por evento | 6 opções de cor selecionáveis | 🔴 |
| Evento dia inteiro | Toggle all-day | 🔴 |
| Realtime | Subscription Supabase — atualiza ao vivo | 🔴 |
| Localização | Campo opcional com link de Maps | 🔴 |

**Critérios de aceite:**
- [ ] Três views funcionam e transitam entre si
- [ ] Hoje destacado com círculo accent
- [ ] CRUD completo de eventos
- [ ] Swipe mobile navega entre períodos
- [ ] Eventos de outros usuários aparecem em tempo real

---

### 2.4 🛒 CANTINA JOVEM
**Status:** 🔴 Não iniciado

| Feature | Descrição | Status |
|---|---|---|
| **Dashboard** | | |
| Saldo atual | Número hero JetBrains Mono, atualizado | 🔴 |
| Total para igreja | Valor acumulado do corte | 🔴 |
| Stats do mês | Vendas / Despesas / Nº Produtos | 🔴 |
| Gráfico spline | Entradas vs saídas últimos 14 dias | 🔴 |
| Ranking de vendas | Produtos mais vendidos no mês | 🔴 |
| Ações rápidas | Botões + Venda / + Despesa / + Depósito | 🔴 |
| **Produtos** | | |
| Listagem de produtos | Cards com emoji, nome, preço, estoque | 🔴 |
| Criar produto | Modal completo com % para igreja | 🔴 |
| Editar produto | Pré-preenche campos | 🔴 |
| Toggle ativo/inativo | Ativa ou desativa produto | 🔴 |
| Ajuste de estoque | +/- direto na listagem | 🔴 |
| **Histórico** | | |
| Lista de transações | Ordenada por data decrescente | 🔴 |
| Filtro por tipo | Todos / Vendas / Despesas / Depósitos | 🔴 |
| Filtro por período | Date range picker | 🔴 |
| **Modais de Ação** | | |
| Modal Nova Venda | Seletor produto + stepper + resumo | 🔴 |
| Modal Nova Despesa | Descrição + valor + data | 🔴 |
| Modal Novo Depósito | Valor + descrição | 🔴 |

**Critérios de aceite:**
- [ ] Saldo calculado em tempo real via view Supabase
- [ ] Venda registra transação E baixa estoque automaticamente
- [ ] % para igreja calculado no momento da venda
- [ ] Gráfico mostra dados reais dos últimos 14 dias
- [ ] Histórico paginado (máx 50 por página)

---

### 2.5 🚫 AUSÊNCIAS
**Status:** 🔴 Não iniciado

| Feature | Descrição | Status |
|---|---|---|
| Listagem de ausências | Agrupada por data, filtro por mês | 🔴 |
| Registrar ausência | Seleciona membro + data + motivo | 🔴 |
| Deletar ausência | Com confirmação | 🔴 |
| Filtro por mês | Chips horizontais | 🔴 |
| Contador do mês | "X ausências em [Mês]" | 🔴 |
| Realtime | Ausência registrada aparece ao vivo | 🔴 |
| Empty state | Tela amigável quando não há registros | 🔴 |

**Critérios de aceite:**
- [ ] CRUD completo funcional
- [ ] Agrupamento por data correto
- [ ] Filtro de mês funciona
- [ ] Membro pode ser qualquer profile ativo
- [ ] Deleta apenas próprios registros (exceto admin)

---

### 2.6 📝 NOTAS
**Status:** 🔴 Não iniciado

| Feature | Descrição | Status |
|---|---|---|
| Criar nota pessoal | Título + conteúdo + fixar | 🔴 |
| Criar nota global | Visível para todos os líderes | 🔴 |
| Editar nota | Pré-preenche campos | 🔴 |
| Deletar nota | Com confirmação | 🔴 |
| Fixar/desafixar | Toggle pin na nota | 🔴 |
| Badge "Global" | Visual diferenciado para notas globais | 🔴 |

**Critérios de aceite:**
- [ ] Notas globais visíveis por todos os usuários
- [ ] Notas pessoais visíveis apenas pelo autor
- [ ] Notas fixadas aparecem primeiro na Home
- [ ] Limite de 500 chars no preview

---

### 2.7 ⚙️ CONFIGURAÇÕES & PERFIL
**Status:** 🔴 Não iniciado

| Feature | Descrição | Status |
|---|---|---|
| Editar nome | Atualiza profile no Supabase | 🔴 |
| Toggle dark/light | Persiste preferência no localStorage | 🔴 |
| Info do app | Versão, créditos | 🔴 |

---

### 2.8 📱 PWA & INFRA
**Status:** 🔴 Não iniciado

| Feature | Descrição | Status |
|---|---|---|
| Service Worker | Cache offline de dados e assets | 🔴 |
| Install banner | Prompt de instalação Android | 🔴 |
| iOS instructions | Modal explicando "Adicionar à tela" | 🔴 |
| Offline page | Fallback com banner "Você está offline" | 🔴 |
| Splash screen | Logo fade-in 400ms | 🔴 |
| Meta tags PWA | theme-color, apple-web-app-capable | 🔴 |
| Safe areas | env(safe-area-inset-*) em todo app | 🔴 |

---

## 3. ORDEM DE DESENVOLVIMENTO RECOMENDADA

```
SPRINT 1 — Fundação (Setup + Auth)
├── Setup Supabase (schema SQL completo)
├── Setup Antigravity (estrutura de pastas)
├── Design tokens (variáveis CSS do DESIGN.md)
├── AppShell (Sidebar + BottomNav + roteamento)
└── Autenticação completa

SPRINT 2 — Core (Home + Calendário)
├── Home Dashboard
└── Calendário (3 views + CRUD)

SPRINT 3 — Operacional (Cantina + Ausências)
├── Cantina completa (Dashboard + Produtos + Histórico)
└── Ausências completa

SPRINT 4 — Complementar (Notas + Config + PWA)
├── Notas
├── Configurações / Perfil
└── PWA + polish final
```

---

## 4. REQUISITOS NÃO FUNCIONAIS

| Requisito | Meta |
|---|---|
| Performance | First Contentful Paint < 1.5s |
| Offline | Leitura disponível sem internet |
| Bundle size | < 300kb gzipped |
| Acessibilidade | Touch targets mínimo 44×44px |
| Segurança | RLS no Supabase em todas as tabelas |
| Sessão | Persiste por 7 dias sem re-login |

---

## 5. CHANGELOG

| Data | Versão | O que mudou |
|---|---|---|
| — | v0.1 | PRD inicial criado |

---

*PRD — Líderes AD · Atualizar este arquivo a cada feature concluída ou modificada*
