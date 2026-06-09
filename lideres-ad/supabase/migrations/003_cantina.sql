-- ============================================================
-- 003_cantina.sql
-- ============================================================

CREATE TABLE cantina_products (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  emoji           TEXT DEFAULT '🛒',
  price           NUMERIC(10,2) NOT NULL CHECK (price > 0),
  cost_price      NUMERIC(10,2),
  stock_quantity  INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
  church_percent  NUMERIC(5,2) DEFAULT 10 CHECK (church_percent BETWEEN 0 AND 100),
  active          BOOLEAN DEFAULT TRUE,
  created_by      UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE cantina_transactions (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type        TEXT NOT NULL CHECK (type IN ('sale', 'expense', 'deposit', 'adjustment')),
  description TEXT,
  amount      NUMERIC(10,2) NOT NULL CHECK (amount > 0),
  product_id  UUID REFERENCES cantina_products(id) ON DELETE SET NULL,
  quantity    INTEGER DEFAULT 1,
  church_cut  NUMERIC(10,2) DEFAULT 0,
  created_by  UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

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

CREATE OR REPLACE FUNCTION decrement_stock(
  p_product_id UUID,
  p_quantity   INTEGER
)
RETURNS void AS $$
BEGIN
  UPDATE cantina_products
  SET stock_quantity = stock_quantity - p_quantity
  WHERE id = p_product_id;

  UPDATE cantina_products
  SET stock_quantity = 0
  WHERE id = p_product_id AND stock_quantity < 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_cantina_products_updated
  BEFORE UPDATE ON cantina_products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX idx_cantina_transactions_type ON cantina_transactions(type);
CREATE INDEX idx_cantina_transactions_created_at ON cantina_transactions(created_at DESC);
CREATE INDEX idx_cantina_products_active ON cantina_products(active);

ALTER TABLE cantina_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cantina_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cantina_products_authenticated" ON cantina_products
  FOR ALL USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "cantina_transactions_authenticated" ON cantina_transactions
  FOR ALL USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);
