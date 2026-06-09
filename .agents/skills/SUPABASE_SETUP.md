# SKILL — Configuração do Supabase
> Líderes AD · Setup completo do banco de dados
> Executar via MCP Antigravity ou Supabase SQL Editor

---

## 1. CHECKLIST DE SETUP

```
[ ] 1. Criar projeto no Supabase Dashboard
[ ] 2. Conectar MCP Antigravity ao Supabase
[ ] 3. Executar migrations em ordem (001, 002, 003)
[ ] 4. Verificar RLS em todas as tabelas
[ ] 5. Criar usuários de teste
[ ] 6. Copiar URL e anon key para .env.local
[ ] 7. Testar conexão via app
```

---

## 2. CONFIGURAÇÃO VIA MCP ANTIGRAVITY

### Conectar Supabase ao Antigravity
```
1. No painel Antigravity → Integrações → Supabase
2. Inserir Project URL e Service Role Key
3. Testar conexão
4. Verificar acesso às tabelas
```

### Variáveis necessárias
```
SUPABASE_PROJECT_URL    → Settings > API > Project URL
SUPABASE_ANON_KEY       → Settings > API > anon public
SUPABASE_SERVICE_KEY    → Settings > API > service_role (⚠️ nunca no frontend)
```

---

## 3. MIGRATION 001 — EXTENSÕES E PROFILES

```sql
-- ============================================================
-- 001_initial_schema.sql
-- Líderes AD — Schema inicial
-- Executar primeiro
-- ============================================================

-- Extensão para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── PROFILES ─────────────────────────────────────────────────
-- Estende auth.users com dados do líder
CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT NOT NULL,
  avatar_url  TEXT,
  -- 'admin' pode deletar ausências de outros e ver tudo
  -- 'leader' é o padrão para todos os líderes
  role        TEXT DEFAULT 'leader' CHECK (role IN ('admin', 'leader')),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger: cria profile automaticamente ao criar usuário no Auth
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_authenticated" ON profiles
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

---

## 4. MIGRATION 002 — EVENTOS E NOTAS

```sql
-- ============================================================
-- 002_events_notes.sql
-- ============================================================

-- ─── EVENTS ───────────────────────────────────────────────────
CREATE TABLE events (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  description TEXT,
  location    TEXT,
  start_at    TIMESTAMPTZ NOT NULL,
  end_at      TIMESTAMPTZ NOT NULL,
  all_day     BOOLEAN DEFAULT FALSE,
  -- Cor do evento: hex code, padrão accent do app
  color       TEXT DEFAULT '#4C72C4',
  created_by  UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── NOTES ────────────────────────────────────────────────────
CREATE TABLE notes (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title      TEXT,
  content    TEXT NOT NULL,
  -- true = visível para todos os líderes
  -- false = apenas para o autor
  is_global  BOOLEAN DEFAULT FALSE,
  pinned     BOOLEAN DEFAULT FALSE,
  author_id  UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_events_updated
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_notes_updated
  BEFORE UPDATE ON notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Índices para performance
CREATE INDEX idx_events_start_at ON events(start_at);
CREATE INDEX idx_notes_author_pinned ON notes(author_id, pinned);

-- RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Eventos: qualquer líder autenticado acessa tudo
CREATE POLICY "events_authenticated" ON events
  FOR ALL USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Notas: seleciona globais OU próprias
CREATE POLICY "notes_select" ON notes
  FOR SELECT USING (
    auth.uid() IS NOT NULL AND (
      is_global = TRUE OR
      author_id = auth.uid()
    )
  );

-- Notas: insere e atualiza apenas as próprias
CREATE POLICY "notes_insert" ON notes
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "notes_update_own" ON notes
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "notes_delete_own" ON notes
  FOR DELETE USING (auth.uid() = author_id);
```

---

## 5. MIGRATION 003 — CANTINA

```sql
-- ============================================================
-- 003_cantina.sql
-- ============================================================

-- ─── PRODUTOS ─────────────────────────────────────────────────
CREATE TABLE cantina_products (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  emoji           TEXT DEFAULT '🛒',
  -- Preço de venda ao cliente
  price           NUMERIC(10,2) NOT NULL CHECK (price > 0),
  -- Preço de custo (opcional, para controle interno)
  cost_price      NUMERIC(10,2),
  stock_quantity  INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
  -- Percentual do valor da venda que vai para a igreja (0-100)
  church_percent  NUMERIC(5,2) DEFAULT 10 CHECK (church_percent BETWEEN 0 AND 100),
  active          BOOLEAN DEFAULT TRUE,
  created_by      UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── TRANSAÇÕES ───────────────────────────────────────────────
CREATE TABLE cantina_transactions (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  -- Tipo da transação:
  -- sale     = venda de produto
  -- expense  = despesa operacional
  -- deposit  = entrada de dinheiro (compra de estoque, etc.)
  -- adjustment = ajuste manual de saldo
  type        TEXT NOT NULL CHECK (type IN ('sale', 'expense', 'deposit', 'adjustment')),
  description TEXT,
  -- Valor sempre positivo — o tipo define se é entrada ou saída
  amount      NUMERIC(10,2) NOT NULL CHECK (amount > 0),
  product_id  UUID REFERENCES cantina_products(id) ON DELETE SET NULL,
  quantity    INTEGER DEFAULT 1,
  -- Valor calculado que foi destinado à igreja nesta transação
  church_cut  NUMERIC(10,2) DEFAULT 0,
  created_by  UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── VIEW: SALDO ATUAL ─────────────────────────────────────────
-- Calcula saldo e total para a igreja baseado em todas as transações
CREATE OR REPLACE VIEW cantina_balance AS
SELECT
  COALESCE(SUM(
    CASE
      WHEN type IN ('sale', 'deposit') THEN amount
      WHEN type IN ('expense', 'adjustment') THEN -amount
      ELSE 0
    END
  ), 0) AS balance,
  COALESCE(SUM(
    CASE WHEN type = 'sale' THEN church_cut ELSE 0 END
  ), 0) AS total_church_cut
FROM cantina_transactions;

-- ─── FUNCTION: DECREMENTAR ESTOQUE ────────────────────────────
-- Chamada após registrar uma venda
CREATE OR REPLACE FUNCTION decrement_stock(
  p_product_id UUID,
  p_quantity   INTEGER
)
RETURNS void AS $$
BEGIN
  UPDATE cantina_products
  SET stock_quantity = stock_quantity - p_quantity
  WHERE id = p_product_id;

  -- Garante que estoque não fica negativo
  UPDATE cantina_products
  SET stock_quantity = 0
  WHERE id = p_product_id AND stock_quantity < 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger updated_at
CREATE TRIGGER trg_cantina_products_updated
  BEFORE UPDATE ON cantina_products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Índices
CREATE INDEX idx_cantina_transactions_type ON cantina_transactions(type);
CREATE INDEX idx_cantina_transactions_created_at ON cantina_transactions(created_at DESC);
CREATE INDEX idx_cantina_products_active ON cantina_products(active);

-- RLS
ALTER TABLE cantina_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cantina_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cantina_products_authenticated" ON cantina_products
  FOR ALL USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "cantina_transactions_authenticated" ON cantina_transactions
  FOR ALL USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);
```

---

## 6. MIGRATION 004 — AUSÊNCIAS

```sql
-- ============================================================
-- 004_absences.sql
-- ============================================================

CREATE TABLE absences (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  -- Líder que estará ausente
  member_id    UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  absence_date DATE NOT NULL,
  reason       TEXT,
  -- Quem registrou a ausência
  created_by   UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Impede duplicatas: mesmo líder, mesma data
CREATE UNIQUE INDEX idx_absences_unique
  ON absences(member_id, absence_date);

-- Índices para queries comuns
CREATE INDEX idx_absences_date ON absences(absence_date);
CREATE INDEX idx_absences_member ON absences(member_id);

-- RLS
ALTER TABLE absences ENABLE ROW LEVEL SECURITY;

-- Qualquer líder autenticado vê todas as ausências
CREATE POLICY "absences_select" ON absences
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Qualquer líder autenticado registra ausência
CREATE POLICY "absences_insert" ON absences
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Só o criador ou admin pode deletar
CREATE POLICY "absences_delete" ON absences
  FOR DELETE USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

---

## 7. SEED — DADOS DE TESTE

```sql
-- ============================================================
-- seed.sql — Dados de teste (executar APÓS migrations)
-- ⚠️ Apenas em ambiente de desenvolvimento
-- ============================================================

-- Produtos da cantina
INSERT INTO cantina_products (name, emoji, price, cost_price, stock_quantity, church_percent)
VALUES
  ('Suco de Laranja', '🥤', 5.00, 2.50, 20, 10),
  ('Chocolate', '🍫', 3.00, 1.50, 30, 10),
  ('Café', '☕', 2.00, 0.50, 50, 10),
  ('Bala', '🍬', 1.00, 0.25, 100, 10),
  ('Hambúrguer AD', '🍔', 10.00, 4.00, 15, 15),
  ('Refrigerante Lata', '🥫', 6.00, 3.00, 25, 10);

-- Eventos de exemplo
-- Nota: substitua os UUIDs por IDs reais dos usuários criados
INSERT INTO events (title, description, start_at, end_at, color)
VALUES
  ('Culto Jovem', 'Culto semanal dos jovens', NOW() + INTERVAL '2 days', NOW() + INTERVAL '2 days' + INTERVAL '2 hours', '#4C72C4'),
  ('Reunião de Líderes', 'Reunião mensal de alinhamento', NOW() + INTERVAL '5 days', NOW() + INTERVAL '5 days' + INTERVAL '1 hour', '#22D3A0'),
  ('Retiro Espiritual 2025', 'Retiro anual da juventude', NOW() + INTERVAL '30 days', NOW() + INTERVAL '33 days', '#F5A623');
```

---

## 8. VERIFICAÇÃO PÓS-SETUP

```sql
-- Verificar tabelas criadas
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
-- Esperado: absences, cantina_products, cantina_transactions, events, notes, profiles

-- Verificar RLS ativo em todas as tabelas
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
-- Todas devem ter rowsecurity = true

-- Verificar view de saldo
SELECT * FROM cantina_balance;
-- Deve retornar: balance = 0, total_church_cut = 0 (sem dados)

-- Verificar function de estoque
SELECT proname FROM pg_proc WHERE proname = 'decrement_stock';
-- Deve retornar 1 linha
```

---

## 9. CONFIGURAÇÃO AUTH NO DASHBOARD SUPABASE

```
Authentication > Settings:

1. Email Auth: HABILITADO
2. Confirm email: DESABILITADO (líderes por convite, confiamos nos emails)
3. Min password length: 8
4. Site URL: https://seu-app.vercel.app
5. Redirect URLs: 
   - https://seu-app.vercel.app/**
   - http://localhost:5173/** (dev)

Authentication > Email Templates:
6. Personalizar template de reset de senha com nome do app "Líderes AD"
```

---

## 10. CRIAR PRIMEIRO USUÁRIO ADMIN

```
1. Supabase Dashboard → Authentication → Users → "Add user"
2. Email + senha do líder principal
3. Após criar, executar SQL:

UPDATE profiles 
SET role = 'admin', full_name = 'Nome do Líder Principal'
WHERE id = 'uuid-do-usuario-criado';
```

---

*SKILL Supabase Setup — Líderes AD · Executar migrations em ordem sequencial*
