import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
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
          <h1 style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', marginBottom: '0.5rem', background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            404
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.75rem', fontWeight: 500 }}>
            Page Not Found
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
