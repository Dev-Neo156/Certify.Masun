import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://certify.masun.in'),
  title: 'MASUN | Certificate Verification Portal',
  description:
    'Official certificate verification portal for Masun Technology internship programs. Verify, view, and download your certificates instantly.',
  authors: [{ name: 'Masun Technology', url: 'https://www.masun.in' }],
  openGraph: {
    title: 'MASUN | Certificate Verification Portal',
    description:
      'Official certificate verification portal for Masun Technology internship programs.',
    siteName: 'MASUN',
    type: 'website',
    images: [
      {
        url: '/og-preview.png',
        width: 1200,
        height: 630,
        alt: 'MASUN Certificate Verification Portal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MASUN | Certificate Verification Portal',
    description:
      'Official certificate verification portal for Masun Technology internship programs.',
    images: ['/og-preview.png'],
  },
};
export const viewport = {
  themeColor: '#050508',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="page-wrapper">{children}</div>
      </body>
    </html>
  );
}
