'use client';

import { useRouter } from 'next/navigation';

export default function CertToolbar({ pdfUrl, certificateId }: { pdfUrl: string; certificateId: string }) {
  const router = useRouter();

  return (
    <div className="cert-toolbar">
      <button 
        onClick={() => router.back()} 
        className="btn btn-secondary cert-toolbar-btn"
      >
        ← Back
      </button>
      <a
        href={`${pdfUrl}?download=${certificateId}.pdf`}
        className="btn btn-primary cert-toolbar-btn"
        download
      >
        Download PDF
      </a>
    </div>
  );
}
