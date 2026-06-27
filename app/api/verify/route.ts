import { NextRequest, NextResponse } from 'next/server';
import { getCertificateById } from '@/lib/certificates';

// In-memory rate limiter — resets on cold start (acceptable for serverless)
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }

  return false;
}

// Periodic cleanup to prevent memory leak (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap) {
    if (now - value.windowStart > RATE_LIMIT_WINDOW_MS * 2) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const certificateId = body?.certificateId;

    if (!certificateId || typeof certificateId !== 'string') {
      return NextResponse.json(
        { error: 'Certificate ID is required.' },
        { status: 400 }
      );
    }

    const trimmed = certificateId.trim().toUpperCase();

    if (trimmed.length > 64) {
      return NextResponse.json(
        { error: 'Certificate ID is too long.' },
        { status: 400 }
      );
    }

    if (!/^[A-Z0-9-]+$/.test(trimmed)) {
      return NextResponse.json(
        { error: 'Certificate ID may only contain letters, numbers, and hyphens.' },
        { status: 400 }
      );
    }

    const certificate = await getCertificateById(trimmed);

    if (!certificate) {
      return NextResponse.json(
        { error: 'Certificate not found. Please check your ID.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ found: true, certificateId: certificate.certificate_id });
  } catch (e) {
    console.error('Verify API error:', e instanceof Error ? e.message : 'Unknown error');
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
