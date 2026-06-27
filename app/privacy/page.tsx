import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { privacyPolicyHTML } from '@/lib/legalContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | MASUN Certificate Portal',
  description: 'Privacy Policy for the MASUN Certificate Verification Portal by Masun Technology.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <section className="hero" style={{ paddingBottom: '2rem' }}>
          <div className="hero-bg">
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />
            <div className="hero-orb hero-orb-3" />
          </div>
          <div className="hero-content">
            <h1>
              <span className="gradient-text">Privacy</span> Policy
            </h1>
          </div>
        </section>

        <section style={{ padding: '0 1.5rem 4rem', position: 'relative', zIndex: 1 }}>
          <div
            className="glass-card-static"
            style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}
            // legalContent.ts is a static compile-time file, not user-supplied input.
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: privacyPolicyHTML }}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
