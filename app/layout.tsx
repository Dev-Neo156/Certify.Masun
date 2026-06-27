import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MASUN | Certificate Verification Portal',
  description:
    'Official certificate verification portal for Masun Technology internship programs. Verify, view, and download your certificates instantly.',
  keywords: 'Masun Technology, certificate verification, internship certificate, MASUN',
  authors: [{ name: 'Masun Technology', url: 'https://www.masun.in' }],
  openGraph: {
    title: 'MASUN | Certificate Verification Portal',
    description:
      'Official certificate verification portal for Masun Technology internship programs.',
    siteName: 'MASUN',
    type: 'website',
  },
};
export const viewport = {
  themeColor: '#050508',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
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
