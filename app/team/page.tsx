'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const teamMembers = [
  {
    name: 'Manish Debnath',
    role: 'Founder & CEO',
    description: 'Leading the vision and operations to deliver transformative digital products.',
    image: '/team/manish-debnath.jpeg',
  },
  {
    name: 'Suraj Nath',
    role: 'Co-Founder',
    description: 'Driving technical strategy and engineering scalable architectural solutions.',
    image: '/team/suraj-nath.jpeg',
  },
  {
    name: 'Deep Ball',
    role: 'CTO',
    description: 'Overseeing the technology stack and driving innovative engineering practices.',
    image: '/team/deep-ball.jpeg',
  },
  {
    name: 'Arka Bisai',
    role: 'CIO',
    description: 'Managing information strategy and ensuring robust data security protocols.',
    image: '/team/arka-bisai.jpeg',
  },
  {
    name: 'Aditya Kumar Kisan',
    role: 'Lead UI/UX Designer',
    description: 'Crafting intuitive, premium user experiences and stunning visual identities.',
    image: '/team/aditya-kisan.jpeg',
  },
  {
    name: 'Anjika Santra',
    role: 'QA Tester',
    description: 'Ensuring flawless quality and hunting down bugs before they reach our users.',
    image: '/team/anjika-santra.jpeg',
  },
  {
    name: 'Prakruti Parimita Rath',
    role: 'QA Tester',
    description: 'Rigorous testing and quality assurance to guarantee flawless performance.',
    image: '/team/prakruti-rath.jpeg',
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

        {/* Team Grid */}
        <section className="features">
          <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {teamMembers.map((member, idx) => (
              <div key={member.name} className="masun-card" style={{ aspectRatio: '3/4' }}>
                <img src={member.image} alt={member.name} className="masun-card-img" />
                <div className="masun-card-overlay"></div>
                <div className="masun-card-badge">{member.role}</div>
                <div className="masun-card-content">
                  <h3 className="masun-card-title">{member.name}</h3>
                  <p className="masun-card-desc">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
