'use client';

import { Document, Page, pdfjs } from 'react-pdf';

// Load the worker locally instead of from a CDN (which was blocked by our strict CSP)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function PdfViewer({ url }: { url: string }) {
  return (
    <div className="pdf-viewer-container">
      <Document
        file={url}
        loading={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
            Loading certificate image...
          </div>
        }
        error={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--red)' }}>
            Failed to load certificate. Please try downloading it.
          </div>
        }
      >
        <Page
          pageNumber={1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className="cert-pdf-page"
        />
      </Document>
    </div>
  );
}
