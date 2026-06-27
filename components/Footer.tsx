/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import LegalWindow from './LegalWindow';
import { privacyPolicyHTML, termsOfServiceHTML } from '@/lib/legalContent';

export default function Footer() {
  const [modal, setModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src="/masun-logo.png" alt="Masun Logo" style={{ height: '24px', width: 'auto', borderRadius: '4px', marginRight: '8px' }} />
            <span>MA<span style={{ color: 'var(--masun-lime)' }}>S</span>UN</span>
          </div>
          <div className="footer-links">
            <a href="https://www.masun.in" target="_blank" rel="noopener noreferrer">
              About Us
            </a>
            <a href="https://www.masun.in/#contact" target="_blank" rel="noopener noreferrer">
              Contact
            </a>
            <a href="/privacy" onClick={(e) => { e.preventDefault(); setModal('privacy'); }}>
              Privacy Policies
            </a>
            <a href="/terms" onClick={(e) => { e.preventDefault(); setModal('terms'); }}>
              Terms of Service
            </a>
          </div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} Masun Technology. All rights reserved.
          </p>
        </div>
      </footer>

      {modal === 'privacy' && (
        <LegalWindow
          title="Privacy Policy"
          htmlContent={privacyPolicyHTML}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'terms' && (
        <LegalWindow
          title="Website Content License"
          htmlContent={termsOfServiceHTML}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
