/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function VerifyContent() {
  const [certificateId, setCertificateId] = useState('');
  const [inputError, setInputError] = useState('');
  const router = useRouter();

  const MAX_ID_LENGTH = 64;
  const CERT_ID_PATTERN = /^[A-Z0-9-]+$/;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = certificateId.trim().toUpperCase();
    if (!trimmed) return;
    if (trimmed.length > MAX_ID_LENGTH) {
      setInputError('Certificate ID is too long.');
      return;
    }
    if (!CERT_ID_PATTERN.test(trimmed)) {
      setInputError('Certificate ID may only contain letters, numbers, and hyphens.');
      return;
    }
    setInputError('');
    router.push(`/certificate/${encodeURIComponent(trimmed)}`);
  }

  return (
    <>
      <Navbar />
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero" style={{ paddingBottom: '2rem' }}>
          <div className="hero-bg">
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />
            <div className="hero-orb hero-orb-3" />
          </div>

          <div className="hero-content">
            <div className="hero-badge">
              ✦ Official Certificate Portal
            </div>

            <h1>
              <span className="gradient-text">Verify</span> Your
              <br />
              Certificate
            </h1>

            <p>
              Enter your certificate ID to instantly verify its authenticity.
              Trusted, secure, and always accessible.
            </p>
          </div>
        </section>

        {/* Verify Form */}
        <section style={{ padding: '0 0 4rem', position: 'relative', zIndex: 1 }}>
          <div className="verify-container">
            <form className="verify-form" onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. MASUN-2026-0001"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                id="verify-input"
              />
              {inputError && (
                <p style={{ color: 'var(--red)', fontSize: '0.8rem', marginTop: '0.4rem', textAlign: 'center' }}>
                  {inputError}
                </p>
              )}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!certificateId.trim()}
                id="verify-button"
              >
                Verify
              </button>
            </form>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="features-grid">
            <div className="glass-card feature-card">
              <div className="feature-icon">
                <img src="/security-tamper.png" alt="Tamper-Proof Security" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
              </div>
              <h3>Tamper-Proof Security</h3>
              <p>
                Each certificate has a unique ID stored securely.
                Verification is instant and reliable.
              </p>
            </div>

            <div className="glass-card feature-card">
              <div className="feature-icon">
                <img src="/security-instant.png" alt="Instant Verification" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
              </div>
              <h3>Instant Verification</h3>
              <p>
                Enter a certificate ID and get instant results.
                No account needed — fully public and transparent.
              </p>
            </div>

            <div className="glass-card feature-card">
              <div className="feature-icon">
                <img src="/security-trusted.png" alt="Trusted Platform" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
              </div>
              <h3>Trusted Platform</h3>
              <p>
                Powered by Masun Technology — a trusted name in
                software development and tech education.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function HomePage() {
  return <VerifyContent />;
}
