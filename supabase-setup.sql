-- ============================================
-- Masun Technology — Certificate Verification
-- Supabase Database Setup Script
-- ============================================

-- 1. Create the certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  certificate_id TEXT UNIQUE NOT NULL,
  intern_name TEXT NOT NULL,
  intern_email TEXT,
  domain TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'revoked')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create index on certificate_id for fast lookups
CREATE INDEX IF NOT EXISTS idx_certificates_certificate_id ON certificates(certificate_id);

-- 3. Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_certificates_status ON certificates(status);

-- 4. Enable Row Level Security
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- 5. Public read policy (anyone can verify certificates)
CREATE POLICY "Public can read certificates" ON certificates
  FOR SELECT
  USING (true);

-- (Write policies have been removed. Certificate creation must be done via the Supabase dashboard)
