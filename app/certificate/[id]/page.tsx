import { getCertificateById } from '@/lib/certificates';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import CertToolbar from '@/components/CertToolbar';
import PdfViewer from '@/components/PdfViewer';

export const dynamic = 'force-dynamic';

export default async function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const certificateId = decodeURIComponent(resolvedParams.id);

  let certificate = null;
  try {
    certificate = await getCertificateById(certificateId);
  } catch (e) {
    // Log a generic message — avoid leaking internal error details
    console.error('Error fetching certificate:', e instanceof Error ? e.message : 'Unknown error');
  }

  if (!certificate) {
    return (
      <>
        <Navbar />
        <main
          className="main-content"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '1.5rem' }}
        >
          <div
            className="glass-card-static"
            style={{ textAlign: 'center', padding: '3rem 1.5rem', maxWidth: '500px', width: '100%' }}
          >
            <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '1rem', color: 'var(--red)' }}>
              Certificate Not Found
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
              We couldn&apos;t find a certificate matching the ID &quot;{certificateId}&quot;. Please check the ID and try again.
            </p>
            <Link href="/" className="btn btn-primary">
              Return Home
            </Link>
          </div>
        </main>
      </>
    );
  }

  if (certificate.status === 'revoked') {
    return (
      <>
        <Navbar />
        <main
          className="main-content"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '1.5rem' }}
        >
          <div
            className="glass-card-static"
            style={{ textAlign: 'center', padding: '3rem 1.5rem', maxWidth: '500px', width: '100%' }}
          >
            <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '1rem', color: 'var(--red)' }}>
              Certificate Revoked
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
              This certificate has been officially revoked by Masun Technology and is no longer valid.
            </p>
            <Link href="/" className="btn btn-primary">
              Return Home
            </Link>
          </div>
        </main>
      </>
    );
  }

  const storageBase =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL ??
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/certificates`;
  const pdfUrl = `${storageBase}/${certificate.certificate_id}.pdf`;

  return (
    <>
      <Navbar />

      {/* ── Toolbar row (back + download) ── */}
      <CertToolbar 
        pdfUrl={pdfUrl} 
        certificateId={certificate.certificate_id} 
      />

      {/* ── Full-height PDF viewer ── */}
      <div className="cert-viewer-wrap">
        <PdfViewer url={pdfUrl} />

        {/* Verified badge — bottom-right corner of iframe */}
        <div className="cert-verified-badge" aria-label="Verified authentic document">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/masun-logo.png" alt="Masun Logo" style={{ height: '24px', width: 'auto', borderRadius: '4px' }} />
          <div>
            <span className="cert-verified-label">Verified</span>
            <span className="cert-verified-sub">Authentic Document</span>
          </div>
        </div>
      </div>
    </>
  );
}
