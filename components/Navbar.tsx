/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LegalWindow from './LegalWindow';
import { privacyPolicyHTML, termsOfServiceHTML } from '@/lib/legalContent';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modal, setModal] = useState<'privacy' | 'terms' | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/team', label: 'Team' },
  ];

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close menu on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && mobileOpen) {
      setMobileOpen(false);
    }
  }, [mobileOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close when clicking outside the navbar
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (mobileOpen && navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [mobileOpen]);

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo">
          <img src="/masun-logo.png" alt="Masun Logo" style={{ height: '36px', width: 'auto', borderRadius: '4px' }} />
          <span>MA<span style={{ color: 'var(--masun-lime)' }}>S</span>UN</span>
        </Link>

        <ul className="navbar-links" role="list">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? 'active' : ''}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger button */}
        <button
          className={`navbar-hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        id="mobile-nav"
        className={`navbar-mobile ${mobileOpen ? 'open' : ''}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? 'active' : ''}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        {/* Mobile legal links */}
        <a
          href="/privacy"
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            setModal('privacy');
          }}
          className="mobile-legal-link"
        >
          Privacy Policies
        </a>
        <a
          href="/terms"
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            setModal('terms');
          }}
          className="mobile-legal-link"
        >
          Terms of Service
        </a>
      </div>

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
    </nav>
  );
}
