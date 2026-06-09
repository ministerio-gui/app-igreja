-- ============================================================
-- 002_events_notes.sql
-- ============================================================

CREATE TABLE events (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  description TEXT,
  location    TEXT,
  start_at    TIMESTAMPTZ NOT NULL,
  end_at      TIMESTAMPTZ NOT NULL,
  all_day     BOOLEAN DEFAULT FALSE,
  color       TEXT DEFAULT '#4C72C4',
  created_by  UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE notes (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title      TEXT,
  content    TEXT NOT NULL,
  is_global  BOOLEAN DEFAULT FALSE,
  pinned     BOOLEAN DEFAULT FALSE,
  author_id  UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

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

CREATE INDEX idx_events_start_at ON events(start_at);
CREATE INDEX idx_notes_author_pinned ON notes(author_id, pinned);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "events_authenticated" ON events
  FOR ALL USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "notes_select" ON notes
  FOR SELECT USING (
    auth.uid() IS NOT NULL AND (
      is_global = TRUE OR
      author_id = auth.uid()
    )
  );

CREATE POLICY "notes_insert" ON notes
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "notes_update_own" ON notes
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "notes_delete_own" ON notes
  FOR DELETE USING (auth.uid() = author_id);
