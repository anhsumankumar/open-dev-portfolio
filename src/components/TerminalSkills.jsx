import React from 'react';
import './TerminalProjectGrid.css';

import { useProfileData } from '../context/ProfileContext';

// SKILL_CATEGORIES array removed, using portfolioData.skills instead

export default function TerminalSkills() {
  const portfolioData = useProfileData();
  return (
    <div className="t-section reveal reveal-up" id="skills">
      <div className="t-section-header">
        <span className="t-orange">// 05</span> 
        <h2>CAPABILITIES_MATRIX</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        {portfolioData.skills?.map((cat, idx) => (
          <div key={idx} style={{ border: '1px solid var(--t-border)', padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
            <h3 style={{ color: 'var(--t-orange)', marginBottom: '1.5rem', fontSize: '1rem', borderBottom: '1px dashed var(--t-border)', paddingBottom: '0.5rem' }}>
              [{String(idx + 1).padStart(2, '0')}] {cat.title?.toUpperCase()}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--t-text-secondary)' }}>
              {cat.items?.map((skill, sIdx) => (
                <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--t-orange)', fontSize: '0.8rem' }}>&gt;</span>
                  <span style={{ fontSize: '0.9rem' }}>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}