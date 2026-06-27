/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function VerifyContent() {
  const [certificateId, setCertificateId] = useState('');
  const [inputError, setInputError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
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
    setIsVerifying(true);
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
                disabled={!certificateId.trim() || isVerifying}
                id="verify-button"
              >
                {isVerifying ? 'Verifying...' : 'Verify'}
              </button>
            </form>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="features-grid">
            <div className="masun-card masun-card-landscape">
              <img src="/security-tamper.png" alt="Tamper-Proof" className="masun-card-img" />
              <div className="masun-card-overlay"></div>
              <div className="masun-card-content">
                <h3 className="masun-card-title">Tamper-Proof Security</h3>
                <p className="masun-card-desc">Each certificate has a unique ID stored securely. Verification is instant and reliable.</p>
              </div>
            </div>

            <div className="masun-card masun-card-landscape">
              <img src="/security-instant.png" alt="Instant Verify" className="masun-card-img" />
              <div className="masun-card-overlay"></div>
              <div className="masun-card-content">
                <h3 className="masun-card-title">Instant Verification</h3>
                <p className="masun-card-desc">Enter a certificate ID and get instant results. No account needed — fully public and transparent.</p>
              </div>
            </div>

            <div className="masun-card masun-card-landscape">
              <img src="/security-trusted.png" alt="Trusted" className="masun-card-img" />
              <div className="masun-card-overlay"></div>
              <div className="masun-card-content">
                <h3 className="masun-card-title">Trusted Platform</h3>
                <p className="masun-card-desc">Powered by Masun Technology — a trusted name in software development and tech education.</p>
              </div>
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
