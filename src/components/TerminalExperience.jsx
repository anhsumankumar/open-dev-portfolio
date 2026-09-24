import React from 'react';
import './TerminalProjectGrid.css';

import { useProfileData } from '../context/ProfileContext';

// EXPERIENCES array removed, using portfolioData.experience instead

export default function TerminalExperience() {
  const portfolioData = useProfileData();
  return (
    <div className="t-section reveal reveal-up" id="experience">
      <div className="t-section-header">
        <span className="t-orange">// 04</span> 
        <h2>EXECUTION_LOGS [LAB]</h2>
      </div>
      <div className="t-projects-list">
        {portfolioData.experience?.map((exp, idx) => (
          <div key={exp.id} className="t-project-row" style={{ display: 'block', padding: '1.5rem', marginBottom: '1rem', border: '1px solid var(--t-border)', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div className="t-proj-title" style={{ fontSize: '1.2rem', color: 'var(--t-orange)' }}>&gt; {exp.role?.toUpperCase()}</div>
              {exp.period && <div style={{ color: 'var(--t-text-secondary)', fontSize: '0.85rem' }}>[{exp.period}]</div>}
            </div>
            {exp.company && <div style={{ color: 'var(--t-text-primary)', marginBottom: '1rem', fontWeight: 'bold' }}>@ {exp.company?.toUpperCase()}</div>}
            <div style={{ color: 'var(--t-text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              // {exp.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}