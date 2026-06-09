-- ============================================================
-- seed.sql — Dados de teste
-- ⚠️ Executar APENAS em desenvolvimento, após todas as migrations
-- ============================================================

INSERT INTO cantina_products (name, emoji, price, cost_price, stock_quantity, church_percent, created_by)
SELECT 'Suco de Laranja', '🥤', 5.00, 2.50, 20, 10, id FROM profiles LIMIT 1;

INSERT INTO cantina_products (name, emoji, price, cost_price, stock_quantity, church_percent, created_by)
SELECT 'Chocolate', '🍫', 3.00, 1.50, 30, 10, id FROM profiles LIMIT 1;

INSERT INTO cantina_products (name, emoji, price, cost_price, stock_quantity, church_percent, created_by)
SELECT 'Café', '☕', 2.00, 0.50, 50, 10, id FROM profiles LIMIT 1;

INSERT INTO cantina_products (name, emoji, price, cost_price, stock_quantity, church_percent, created_by)
SELECT 'Bala', '🍬', 1.00, 0.25, 100, 10, id FROM profiles LIMIT 1;

INSERT INTO cantina_products (name, emoji, price, cost_price, stock_quantity, church_percent, created_by)
SELECT 'Hambúrguer AD', '🍔', 10.00, 4.00, 15, 15, id FROM profiles LIMIT 1;

INSERT INTO cantina_products (name, emoji, price, cost_price, stock_quantity, church_percent, created_by)
SELECT 'Refrigerante Lata', '🥫', 6.00, 3.00, 25, 10, id FROM profiles LIMIT 1;

INSERT INTO events (title, description, start_at, end_at, color, created_by)
SELECT 'Culto Jovem', 'Culto semanal dos jovens',
  NOW() + INTERVAL '2 days', NOW() + INTERVAL '2 days' + INTERVAL '2 hours',
  '#4C72C4', id FROM profiles LIMIT 1;

INSERT INTO events (title, description, start_at, end_at, color, created_by)
SELECT 'Reunião de Líderes', 'Reunião mensal de alinhamento',
  NOW() + INTERVAL '5 days', NOW() + INTERVAL '5 days' + INTERVAL '1 hour',
  '#22D3A0', id FROM profiles LIMIT 1;

INSERT INTO events (title, description, start_at, end_at, color, created_by)
SELECT 'Retiro Espiritual 2025', 'Retiro anual da juventude',
  NOW() + INTERVAL '30 days', NOW() + INTERVAL '33 days',
  '#F5A623', id FROM profiles LIMIT 1;
