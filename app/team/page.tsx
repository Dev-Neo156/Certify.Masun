'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const teamMembers = [
  {
    name: 'Anjika Santra',
    role: 'QA Tester',
    image: '/team/WhatsApp Image 2026-05-11 at 1.33.26 AM.jpeg',
  },
  {
    name: 'Aditya Kumar Kisan',
    role: 'Lead UI/UX Designer',
    image: '/team/WhatsApp Image 2026-05-11 at 1.46.38 AM.jpeg',
  },
  {
    name: 'Suraj Nath',
    role: 'Co-Founder',
    image: '/team/WhatsApp Image 2026-05-11 at 1.33.26 AM (2).jpeg',
  },
  {
    name: 'Manish Debnath',
    role: 'Founder & CEO',
    image: '/team/WhatsApp Image 2026-05-11 at 1.33.26 AM (1).jpeg',
  },
  {
    name: 'Deep Ball',
    role: 'CTO',
    image: '/team/WhatsApp Image 2026-05-11 at 1.34.37 AM.jpeg',
  },
  {
    name: 'Arka Bisai',
    role: 'CIO',
    image: '/team/WhatsApp Image 2026-05-11 at 1.37.10 AM.jpeg',
  },
  {
    name: 'Prakruti Parimita Rath',
    role: 'Social Media Director',
    image: '/team/WhatsApp Image 2026-05-11 at 1.33.25 AM (1).jpeg',
  },
];

export default function TeamPage() {
  const [activeIdx, setActiveIdx] = useState(3);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768 && scrollRef.current) {
      setTimeout(() => {
        if (scrollRef.current) {
          const children = scrollRef.current.children;
          if (children.length > 3) {
            const target = children[3] as HTMLElement;
            const containerWidth = scrollRef.current.clientWidth;
            const scrollPos = target.offsetLeft - containerWidth / 2 + target.clientWidth / 2;
            scrollRef.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
          }
        }
      }, 500);
    }
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -window.innerWidth * 0.7, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: window.innerWidth * 0.7, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      <main className="main-content">
        {/* Hero */}
        <section className="hero" style={{ paddingBottom: '3rem' }}>
          <div className="hero-bg">
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />
            <div className="hero-orb hero-orb-3" />
          </div>

          <div className="hero-content">
            <div className="hero-badge">✦ The People Behind Masun</div>

            <h1>
              Meet Our <span className="gradient-text">Team</span>
            </h1>

            <p>
              A collective of designers, engineers,
              and strategists united by craft
            </p>
          </div>
        </section>

        {/* Team Slider */}
        <section style={{ padding: '0 0 5rem', position: 'relative', zIndex: 10 }}>
          {/* Desktop Accordion */}
          <div className="team-desktop-container">
            {teamMembers.map((member, idx) => {
              const isActive = idx === activeIdx;
              return (
                <div
                  key={member.name}
                  className={`team-accordion-item ${isActive ? 'active' : ''}`}
                  style={{ width: isActive ? '28rem' : '5rem' }}
                  onMouseEnter={() => setActiveIdx(idx)}
                >
                  <img src={member.image} alt={member.name} className="team-accordion-img" />
                  <div className="team-accordion-overlay">
                    <div className="team-accordion-text">
                      <h4 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 500, margin: 0, whiteSpace: 'nowrap' }}>
                        {member.name}
                      </h4>
                      <p style={{ color: 'var(--masun-lime)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '4px 0 0', whiteSpace: 'nowrap' }}>
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Carousel */}
          <div className="team-mobile-container">
            <button className="team-carousel-btn left" onClick={scrollLeft}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="team-carousel-btn right" onClick={scrollRight}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            
            <div className="team-carousel" ref={scrollRef}>
              {teamMembers.map((member) => (
                <div key={member.name} className="team-carousel-item">
                  <img src={member.image} alt={member.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div className="team-carousel-overlay" />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', zIndex: 20, pointerEvents: 'none' }}>
                    <h4 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.05em', margin: '0 0 4px' }}>
                      {member.name}
                    </h4>
                    <p style={{ color: 'var(--masun-lime)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
