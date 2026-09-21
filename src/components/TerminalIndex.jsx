import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const sections = [
  { id: 'home', num: '01', label: 'HOME' },
  { id: 'projects', num: '02', label: 'PROJECTS' },
  { id: 'about', num: '03', label: 'ABOUT' },
  { id: 'experience', num: '04', label: 'LAB' },
  { id: 'skills', num: '05', label: 'SKILLS' },
  { id: 'contact', num: '06', label: 'CONTACT' },
];

export default function TerminalIndex() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (theme !== 'terminal') return;
    
    const handleScroll = () => {
      let current = 'home';
      for (const section of sections) {
        const el = document.getElementById(section.id === 'home' ? 'root' : section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
            current = section.id;
          }
        }
      }
      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, theme]);

  if (theme !== 'terminal') return null;

  return (
    <div 
      className="t-index-container reveal reveal-left delay-500 is-visible"
      style={{
        position: 'fixed',
        left: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        fontFamily: 'var(--t-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.15em',
        color: 'var(--t-text-secondary)',
      }}
    >
      {sections.map((section) => (
        <div 
          key={section.id} 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            opacity: activeSection === section.id ? 1 : 0.3,
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            transform: activeSection === section.id ? 'translateX(5px)' : 'translateX(0)',
            cursor: 'pointer'
          }}
          onClick={() => {
            const el = document.getElementById(section.id === 'home' ? 'root' : section.id);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <span>{section.num}</span>
          {activeSection === section.id && (
            <>
              <div style={{ width: '20px', height: '1px', backgroundColor: 'var(--t-orange)' }} />
              <span style={{ color: 'var(--t-orange)' }}>{section.label}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
