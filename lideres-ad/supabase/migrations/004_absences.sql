-- ============================================================
-- 004_absences.sql
-- ============================================================

CREATE TABLE absences (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id    UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  absence_date DATE NOT NULL,
  reason       TEXT,
  created_by   UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_absences_unique
  ON absences(member_id, absence_date);

CREATE INDEX idx_absences_date ON absences(absence_date);
CREATE INDEX idx_absences_member ON absences(member_id);

ALTER TABLE absences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "absences_select" ON absences
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "absences_insert" ON absences
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "absences_delete" ON absences
  FOR DELETE USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
