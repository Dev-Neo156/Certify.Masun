import { getSupabase } from './supabase';

export interface Certificate {
  certificate_id: string;
  intern_name: string;
  domain: string;
  start_date: string;
  end_date: string;
  issue_date: string;
  status: 'active' | 'revoked';
}

// Maximum allowed length for a certificate ID to prevent abuse
const MAX_CERT_ID_LENGTH = 64;

// Allowed pattern: alphanumeric characters and hyphens only (e.g. MASUN-2026-0001)
const CERT_ID_PATTERN = /^[A-Z0-9-]{1,64}$/;

/**
 * Fetch a certificate by its human-readable certificate_id (e.g., MASUN-2026-0001)
 * Used for public verification.
 *
 * Only non-sensitive columns are selected — intern_email and internal UUIDs
 * are intentionally excluded from this public-facing query.
 */
export async function getCertificateById(
  certificateId: string
): Promise<Certificate | null> {
  // --- Input validation ---
  if (!certificateId || typeof certificateId !== 'string') return null;

  const normalised = certificateId.toUpperCase().trim();

  if (normalised.length > MAX_CERT_ID_LENGTH) return null;
  if (!CERT_ID_PATTERN.test(normalised)) return null;

  // --- Database query (parameterized via Supabase client) ---
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('certificates')
    .select(
      'certificate_id, intern_name, domain, start_date, end_date, issue_date, status'
    )
    .eq('certificate_id', normalised)
    .single();

  if (error || !data) return null;
  return data as Certificate;
}
